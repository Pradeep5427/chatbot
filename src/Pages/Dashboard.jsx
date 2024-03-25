import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Input,
  Dropdown,
  Space,
} from "antd";
import {
  UsergroupAddOutlined,
  LogoutOutlined,
  SlidersOutlined,
  DeleteFilled,
  WechatWorkOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import UploadImage from "../Assets/Images/uploadimg.jpeg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addChatBot, deleteChatBot } from "../Features/Chatbot/chatbot";
import AI from "../Assets/Images/dashboard.png";

export default function Dashboard() {
  const [size, setSize] = useState("large");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState();

  const botData = useSelector((state) => state.chatbotDetails);

  const dispatch = useDispatch();

  const [cardData, setcardData] = useState(botData);
  const success = () => toast.success("Created Successfully");
  const unSuccess = () => toast.error("Something went wrong");

  const location = useLocation();
  const user = location.state;
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
    dispatch(
      addChatBot({
        id: cardData.length + 1,
        botName: values.botName,
        wizardPicture: preview,
        botDescription: values.botDescription,
      })
    );
    try {
      var formData = new FormData();
      formData.append("botName", values.botName);
      formData.append("botDescription", values.botDescription);
      formData.append("wizard-picture", file);
      formData.append("userId", user.id);
      const response = await axios.post(
        "http://127.0.0.1:5000/create_bot",
        formData
      );
      if (response.status === 200) {
        success();
        setPreview("");
        form.resetFields();
        handleCancel();
      }
    } catch (error) {
      unSuccess(error);
    }
    handleCancel();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {}, [cardData]);

  const handleFileChange = (e) => {
    const selectedFile = URL.createObjectURL(e.target.files[0]);
    setFile(e.target.files[0]);
    setPreview(selectedFile);
  };
  const botDelete = (id) => {
    dispatch(deleteChatBot({ id }));
  };

  return (
    <div className="dashboard">
      <Row className="dashboardContainer">
        <Col span={4} className="dashboardLeft">
          <h1 style={{ textAlign: "center" }}>Dashboard</h1>
          <div className="dashboardImg">
            <img src={AI} alt="dashboardImg" />
          </div>
        </Col>
        <Col span={20} className="dashboardRight">
          <Row
            className="chatbotDetailsheader"
            align="middle"
            justify="space-between"
          >
            <Col>
              <h1>Welcome {user.email} &#128075;</h1>
            </Col>
            <Col>
              <Button
                className="dashboardBtn Btn"
                type="primary"
                shape="round"
                icon={<UsergroupAddOutlined />}
                size={size}
              >
                Log Out
              </Button>
            </Col>
          </Row>

          <Row
            className="chatbotDetails"
            align="middle"
            justify="space-between"
          >
            <Col>
              <h2 className="chatbotHeader">Your Chatbots</h2>
            </Col>
            <Col>
              <Button
                className="dashboardBtn Btn"
                type="primary"
                shape="round"
                icon={<UsergroupAddOutlined />}
                size={size}
                onClick={showModal}
              >
                Create your bot
              </Button>
            </Col>
          </Row>
          <div className="container">
            <Row gutter={[16, 24]} style={{ marginTop: "-70px" }}>
              {botData.map((datas) => {
                return (
                  <Col xl={7} md={12} sm={24} lg={10} xs={24}>
                    <Card
                      title={datas.botName}
                      key={datas.id}
                      className="botsCard"
                    >
                      <img
                        src={datas.wizardPicture}
                        alt="botimage"
                        className="botimg"
                      />

                      <h3>{datas.botDescription}</h3>
                      <div className="contentBtns">
                        <Link
                          to={{
                            pathname: "/configure/id",
                            search: new URLSearchParams({
                              id: datas.id,
                              imageUrl: datas.wizardPicture,
                              botName: datas.botName,
                            }).toString(),
                          }}
                        >
                          <Button
                            type="primary"
                            shape="round"
                            icon={<SlidersOutlined />}
                          >
                            configure
                          </Button>
                        </Link>

                        <Button
                          onClick={() => botDelete(datas.id)}
                          type="primary"
                          shape="round"
                          icon={<DeleteFilled />}
                        >
                          Delete
                        </Button>
                      </div>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </div>
        </Col>
      </Row>

      <Modal
        title="Create Your Chatbot"
        className="createBot"
        open={isModalOpen}
        onOk={handleOk}
        footer={false}
        onCancel={handleCancel}
      >
        <Row className="createBotContent">
          <Col span={24}>
            <Form
              form={form}
              name="basic"
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
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <div className="createRoboUpload">
                <Form.Item
                  label="Choose Picture"
                  name="wizardPicture"
                  className="upload"
                  rules={[
                    {
                      required: true,
                      message: "Please Upload Image",
                    },
                  ]}
                >
                  <Input
                    type="file"
                    className="imageUpload"
                    onChange={handleFileChange}
                  />
                </Form.Item>
                <div className="adduserContent">
                  {preview ? (
                    <img src={preview} className="adduser" />
                  ) : (
                    <img src={UploadImage} className="adduser" />
                  )}
                </div>
              </div>

              <Form.Item
                label="Bot Name"
                name="botName"
                className="botinput"
                rules={[
                  {
                    required: true,
                    message: "Please input your Botname!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Bot Description"
                name="botDescription"
                className="botinput"
                rules={[
                  {
                    required: true,
                    message: "Please input your Description!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  span: 24,
                }}
              >
                <Button
                  shape="round"
                  type="primary"
                  htmlType="submit"
                  className="botCreate"
                >
                  Create Bot
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
    </div>
  );
}
