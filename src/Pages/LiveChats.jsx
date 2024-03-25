import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Avatar,
  Input,
  Button,
  Space,
  Form,
  TimePicker,
  DatePicker,
  Dropdown,
} from "antd";
import { SendOutlined, DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import BotImage from "../Assets/Images/userimage.jpeg";
import axios from "axios";

export default function LiveChats() {
  const [configureMsg, setConfigureMsg] = useState([]);
  const params = new URLSearchParams(document.location.search);
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [time, setTime] = useState(null);
  const [date, setDate] = useState("");
  const [nextResponses, setNextResponses] = useState();

  const baseUrl = "http://127.0.0.1:5000/";

  const botImage = params.get("imageUrl");
  const botId = params.get("id");
  const botName = params.get("botName");
  const [form] = Form.useForm();

  const getUserMessage = (e) => {
    setUserMessage(e.target.value);
  };

  const onChange = (time, timeString) => {
    setTime(timeString);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const nextResponse = async (e) => {
    console.log("click", e.key);
    const value = e.key;
    const response = await axios.get(
      `${baseUrl}fetch_next_responses/${botId}`,
      {
        params: {
          clickedValue: value,
          bot_id: botId,
        },
      }
    );
    console.log(response.data);
    setNextResponses(e.key);
  };

  const items = [
    {
      label: messages.length > 0 && messages[1].bot.option1,
      key: messages.length > 0 && messages[1].bot.option1,
    },
    {
      label: messages.length > 0 && messages[1].bot.option2,
      key: messages.length > 0 && messages[1].bot.option2,
    },
  ];

  const menuProps = {
    items,
    onClick: nextResponse,
  };

  const getTime = async () => {
    const formData = new FormData();
    formData.append("questions", time);
    const response = await axios.post(`${baseUrl}store_time`, formData);
    console.log("response.....", response);
  };

  const getDate = async () => {
    const formData = new FormData();
    formData.append("questions", date);
    const response = await axios.post(`${baseUrl}store_date`, formData);
    console.log("response.....", response);
  };

  const getEmail = async (values) => {
    console.log("values", values);
    const formData = new FormData();
    formData.append("questions", values.mail);
    const response = await axios.post(`${baseUrl}store_email`, formData);
    console.log("response.....", response);
  };

  const getPhone = async (values) => {
    const formData = new FormData();
    formData.append("questions", values.phone);
    const response = await axios.post(`${baseUrl}store_phone`, formData);
    console.log("response.....", response);
  };

  const dateChange = (date, dateString) => {
    setDate(dateString);
  };

  useEffect(() => {
    axios.get(`${baseUrl}welcomemsg/${botId}`).then((res) => {
      setConfigureMsg(res);
    });
  }, [messages]);

  const handleResetForm = () => {
    form.resetFields();
  };

  const handleChatClick = async () => {
    const newMessage = {
      user: userMessage,
    };

    try {
      const response = await axios.get(`${baseUrl}fetchchat`, {
        params: {
          question: userMessage,
          bot_id: botId,
        },
      });

      const botResponse = {
        bot: response.data,
      };

      setMessages([...messages, newMessage, botResponse]);
      handleResetForm();
    } catch (error) {
      console.error("Error fetching chat:", error);
    }
  };

  useEffect(() => {
    console.log("messages", messages);
  }, [messages]);
  return (
    <div className="livechats">
      <Row justify="center" align="middle">
        <Col xl={6} md={8}>
          <Row className="chatbotHeader" align="middle">
            <Col span={3}>
              <Avatar src={botImage} />
            </Col>
            <Col span={21}>
              <h3>
                <b>{botName}</b>
              </h3>
              <p>Ask me anything</p>
            </Col>
          </Row>
          <div className="chatbot">
            <div className="MsgContainer">
              {/* Configure Message */}
              <div className="configureMessage">
                <div>
                  <Space>
                    <Avatar src={botImage} />
                    {configureMsg ? (
                      <p className="userMessage">{configureMsg.data}</p>
                    ) : (
                      <p className="userMessage">Hi</p>
                    )}
                  </Space>
                </div>
              </div>

              {/* User Message */}
              {messages.map((message, index) => (
                <div className="botmsg" key={index}>
                  <div>
                    {message["bot"] && message["bot"].type === "message" ? (
                      <Space>
                        <Avatar src={botImage} />
                        <p className="bot-L">{message["bot"].value}</p>
                      </Space>
                    ) : message["bot"] && message["bot"].type === "time" ? (
                      message["bot"] &&
                      message["bot"].type === "time" && (
                        <Space>
                          <Avatar src={botImage} />
                          <Form
                            className="scheduler"
                            name="basicTime"
                            labelCol={{
                              span: 24,
                            }}
                            wrapperCol={{
                              span: 24,
                            }}
                            style={{
                              maxWidth: 600,
                            }}
                            initialValues={{
                              remember: true,
                            }}
                            onFinish={getTime}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                          >
                            <Form.Item
                              label="Pick a time"
                              name="time"
                              rules={[
                                {
                                  required: true,
                                  message: "Please Enter Time!",
                                },
                              ]}
                            >
                              <TimePicker
                                picker="time"
                                className="dataForms"
                                value={time}
                                onChange={onChange}
                              />
                            </Form.Item>

                            <Form.Item
                              wrapperCol={{
                                span: 16,
                              }}
                            >
                              <Button
                                type="primary"
                                htmlType="submit"
                                className="timeSchedulerBtn"
                              >
                                Save Response
                              </Button>
                            </Form.Item>
                          </Form>
                          {/* <div
                            dangerouslySetInnerHTML={{
                              __html: message["bot"].value,
                            }}
                          ></div> */}
                        </Space>
                      )
                    ) : message["bot"] && message["bot"].type === "date" ? (
                      message["bot"] &&
                      message["bot"].type === "date" && (
                        <Space>
                          <Avatar src={botImage} />
                          <Form
                            className="scheduler"
                            name="basicTime"
                            labelCol={{
                              span: 24,
                            }}
                            wrapperCol={{
                              span: 24,
                            }}
                            style={{
                              maxWidth: 600,
                            }}
                            initialValues={{
                              remember: true,
                            }}
                            onFinish={getDate}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                          >
                            <Form.Item
                              label="Pick a Date"
                              name="date"
                              rules={[
                                {
                                  required: true,
                                  message: "Please Enter Date!",
                                },
                              ]}
                            >
                              <DatePicker
                                format="YYYY-MM-DD"
                                onChange={dateChange}
                                className="dataForms"
                              />
                            </Form.Item>

                            <Form.Item
                              wrapperCol={{
                                span: 16,
                              }}
                            >
                              <Button
                                type="primary"
                                htmlType="submit"
                                className="timeSchedulerBtn"
                              >
                                Save Response
                              </Button>
                            </Form.Item>
                          </Form>
                          {/* <div
                            dangerouslySetInnerHTML={{
                              __html: message["bot"].value,
                            }}
                          ></div> */}
                        </Space>
                      )
                    ) : message["bot"] && message["bot"].type === "image" ? (
                      message["bot"] &&
                      message["bot"].type === "image" && (
                        <Space>
                          <Avatar src={botImage} />
                          <div
                            dangerouslySetInnerHTML={{
                              __html: message["bot"].value,
                            }}
                          ></div>
                        </Space>
                      )
                    ) : message["bot"] && message["bot"].type === "email" ? (
                      message["bot"] &&
                      message["bot"].type === "email" && (
                        <Space>
                          <Avatar src={botImage} />
                          <Form
                            className="scheduler"
                            name="basicTime"
                            labelCol={{
                              span: 24,
                            }}
                            wrapperCol={{
                              span: 24,
                            }}
                            style={{
                              maxWidth: 600,
                            }}
                            initialValues={{
                              remember: true,
                            }}
                            onFinish={getEmail}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                          >
                            <Form.Item
                              label="Email Address"
                              name="mail"
                              rules={[
                                {
                                  required: true,
                                  message: "Please Enter Email Address!",
                                },
                              ]}
                            >
                              <Input className="dataForms" />
                            </Form.Item>

                            <Form.Item
                              wrapperCol={{
                                span: 16,
                              }}
                            >
                              <Button
                                type="primary"
                                htmlType="submit"
                                className="timeSchedulerBtn"
                              >
                                Save
                              </Button>
                            </Form.Item>
                          </Form>
                          {/* <div
                            dangerouslySetInnerHTML={{
                              __html: message["bot"].value,
                            }}
                          ></div> */}
                        </Space>
                      )
                    ) : message["bot"] && message["bot"].type === "phone" ? (
                      message["bot"] &&
                      message["bot"].type === "phone" && (
                        <Space>
                          <Avatar src={botImage} />
                          <Form
                            className="scheduler"
                            name="basicTime"
                            labelCol={{
                              span: 24,
                            }}
                            wrapperCol={{
                              span: 24,
                            }}
                            style={{
                              maxWidth: 600,
                            }}
                            initialValues={{
                              remember: true,
                            }}
                            onFinish={getPhone}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                          >
                            <Form.Item
                              label="Phone Number"
                              name="phone"
                              rules={[
                                {
                                  required: true,
                                  message: "Please Enter  Phone Number!",
                                },
                              ]}
                            >
                              <Input className="dataForms" />
                            </Form.Item>

                            <Form.Item
                              wrapperCol={{
                                span: 16,
                              }}
                            >
                              <Button
                                type="primary"
                                htmlType="submit"
                                className="timeSchedulerBtn"
                              >
                                Save
                              </Button>
                            </Form.Item>
                          </Form>
                          {/* <div
                            dangerouslySetInnerHTML={{
                              __html: message["bot"].value,
                            }}
                          ></div> */}
                        </Space>
                      )
                    ) : message["bot"] && message["bot"].type === "video" ? (
                      message["bot"] &&
                      message["bot"].type === "video" && (
                        <Space>
                          <Avatar src={botImage} />
                          <div
                            dangerouslySetInnerHTML={{
                              __html: message["bot"].value,
                            }}
                          ></div>
                        </Space>
                      )
                    ) : message["bot"] && message["bot"].type === "value" ? (
                      message["bot"] &&
                      message["bot"].type === "value" && (
                        <Space className="nextResponse">
                          <Avatar src={botImage} />
                          <div className="nextResponseBtn">
                            {messages && (
                              <Dropdown menu={menuProps}>
                                <Button>
                                  <Space>
                                    Choose any one option
                                    <DownOutlined />
                                  </Space>
                                </Button>
                              </Dropdown>
                            )}
                          </div>

                          {/* <div
                            dangerouslySetInnerHTML={{
                              __html: message["bot"].value,
                            }}
                          ></div> */}
                        </Space>
                      )
                    ) : null}
                  </div>
                  <div className="userChat">
                    {message["user"] && (
                      <Space>
                        <p className="bot-R">{message["user"]}</p>
                        <Avatar src={BotImage} />
                      </Space>
                    )}
                  </div>
                </div>
              ))}
              <div className="botmsg">
                <div className="scheduler">
                  <div>
                    {nextResponses === "time" && (
                      <Space>
                        <Avatar src={botImage} />
                        <Form
                          className="scheduler"
                          name="basicTime"
                          labelCol={{
                            span: 24,
                          }}
                          wrapperCol={{
                            span: 24,
                          }}
                          style={{
                            maxWidth: 600,
                          }}
                          initialValues={{
                            remember: true,
                          }}
                          onFinish={getTime}
                          onFinishFailed={onFinishFailed}
                          autoComplete="off"
                        >
                          <Form.Item
                            label="Pick a time"
                            name="time"
                            rules={[
                              {
                                required: true,
                                message: "Please Enter Time!",
                              },
                            ]}
                          >
                            <TimePicker
                              picker="time"
                              className="dataForms"
                              value={time}
                              onChange={onChange}
                            />
                          </Form.Item>

                          <Form.Item
                            wrapperCol={{
                              span: 16,
                            }}
                          >
                            <Button
                              type="primary"
                              htmlType="submit"
                              className="timeSchedulerBtn"
                            >
                              Save Response
                            </Button>
                          </Form.Item>
                        </Form>
                        {/* <div
                            dangerouslySetInnerHTML={{
                              __html: message["bot"].value,
                            }}
                          ></div> */}
                      </Space>
                    )}
                  </div>
                  <div>
                    {nextResponses === "date" && (
                      <Space>
                        <Avatar src={botImage} />
                        <Form
                          className="scheduler"
                          name="basicTime"
                          labelCol={{
                            span: 24,
                          }}
                          wrapperCol={{
                            span: 24,
                          }}
                          style={{
                            maxWidth: 600,
                          }}
                          initialValues={{
                            remember: true,
                          }}
                          onFinish={getDate}
                          onFinishFailed={onFinishFailed}
                          autoComplete="off"
                        >
                          <Form.Item
                            label="Pick a Date"
                            name="date"
                            rules={[
                              {
                                required: true,
                                message: "Please Enter Date!",
                              },
                            ]}
                          >
                            <DatePicker
                              format="YYYY-MM-DD"
                              onChange={dateChange}
                              className="dataForms"
                            />
                          </Form.Item>

                          <Form.Item
                            wrapperCol={{
                              span: 16,
                            }}
                          >
                            <Button
                              type="primary"
                              htmlType="submit"
                              className="timeSchedulerBtn"
                            >
                              Save Response
                            </Button>
                          </Form.Item>
                        </Form>
                        {/* <div
                            dangerouslySetInnerHTML={{
                              __html: message["bot"].value,
                            }}
                          ></div> */}
                      </Space>
                    )}
                  </div>
                  <div>
                    {nextResponses === "phone" && (
                      <Space>
                        <Avatar src={botImage} />
                        <Form
                          className="scheduler"
                          name="basicTime"
                          labelCol={{
                            span: 24,
                          }}
                          wrapperCol={{
                            span: 24,
                          }}
                          style={{
                            maxWidth: 600,
                          }}
                          initialValues={{
                            remember: true,
                          }}
                          onFinish={getPhone}
                          onFinishFailed={onFinishFailed}
                          autoComplete="off"
                        >
                          <Form.Item
                            label="Phone Number"
                            name="phone"
                            rules={[
                              {
                                required: true,
                                message: "Please Enter  Phone Number!",
                              },
                            ]}
                          >
                            <Input className="dataForms" />
                          </Form.Item>

                          <Form.Item
                            wrapperCol={{
                              span: 16,
                            }}
                          >
                            <Button
                              type="primary"
                              htmlType="submit"
                              className="timeSchedulerBtn"
                            >
                              Save
                            </Button>
                          </Form.Item>
                        </Form>
                        {/* <div
                          dangerouslySetInnerHTML={{
                            __html: message["bot"].value,
                          }}
                        ></div> */}
                      </Space>
                    )}
                  </div>
                  <div>
                    {nextResponses === "email" && (
                      <Space>
                        <Avatar src={botImage} />
                        <Form
                          className="scheduler"
                          name="basicTime"
                          labelCol={{
                            span: 24,
                          }}
                          wrapperCol={{
                            span: 24,
                          }}
                          style={{
                            maxWidth: 600,
                          }}
                          initialValues={{
                            remember: true,
                          }}
                          onFinish={getEmail}
                          onFinishFailed={onFinishFailed}
                          autoComplete="off"
                        >
                          <Form.Item
                            label="Email Address"
                            name="mail"
                            rules={[
                              {
                                required: true,
                                message: "Please Enter  Phone Number!",
                              },
                            ]}
                          >
                            <Input className="dataForms" />
                          </Form.Item>

                          <Form.Item
                            wrapperCol={{
                              span: 16,
                            }}
                          >
                            <Button
                              type="primary"
                              htmlType="submit"
                              className="timeSchedulerBtn"
                            >
                              Save
                            </Button>
                          </Form.Item>
                        </Form>
                        {/* <div
                          dangerouslySetInnerHTML={{
                            __html: message["bot"].value,
                          }}
                        ></div> */}
                      </Space>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="chatbotFooter">
              <Form
                form={form}
                name="basic"
                className="welcomeMessageForm"
                wrapperCol={{
                  span: 24,
                }}
                style={{
                  maxWidth: 600,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  style={{ marginBottom: "0" }}
                  name="sendMessage"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Send Message!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Type your message...."
                    className="messagetext"
                    onChange={getUserMessage}
                    suffix={
                      <SendOutlined
                        onClick={handleChatClick}
                        className="icon"
                        style={{
                          color: "rgba(0,0,0,.45)",
                        }}
                      />
                    }
                  />
                </Form.Item>
              </Form>

              <Row justify="space-between" align="middle" className="botFooter">
                <p className="footerContent">Need more assistance ?</p>
                <Link to="/liveagent">
                  <Button type="primary">Talk to Live Agent</Button>
                </Link>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
