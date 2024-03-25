import React, { useState } from "react";
import { Tabs, Button, Tooltip, Input, Row, Col, Form } from "antd";
import { Link } from "react-router-dom";
import ConfigureRobo from "../Assets/Images/configure.png";
import axios from "axios";
import {
  RobotOutlined,
  CloudUploadOutlined,
  VideoCameraOutlined,
  FieldTimeOutlined,
  MailOutlined,
  CalendarOutlined,
  ToolOutlined,
  ApiOutlined,
  PhoneOutlined,
  CheckOutlined,
} from "@ant-design/icons";
const App = () => {
  const [uploadImage, setUploladImage] = useState(null);
  const [aiFile, setAiFile] = useState(null);

  const params = new URLSearchParams(document.location.search);

  const botImage = params.get(`imageUrl`);
  const botId = params.get(`id`);
  const botName = params.get(`botName`);

  // welcome message function
  const welcomeMessage = async (values) => {
    const formData = new FormData();
    formData.append("welcomemsg", values.welcomeMessage);
    const response = await axios.post(
      `http://127.0.0.1:5000/welcomemsg/${botId}`,
      formData
    );
    console.log(response);

    // let data = response.data;
  };
  // config message function
  const configMessage = async (values) => {
    console.log("values", values);
    const formData = new FormData();
    formData.append("key", values.configquestion);
    formData.append("value1", values.configoption_1);
    formData.append("value2", values.configoption_2);
    const response = await axios.post(
      `http://127.0.0.1:5000/add_response/${botId}`,
      formData
    );
    console.log(response);

    // let data = response.data;
  };
  // upload message function
  const fileUpload = (e) => {
    setUploladImage(e.target.files[0]);
  };

  const uploadConfig = async (values) => {
    console.log("values", values);
    const formData = new FormData();
    formData.append("image", uploadImage);
    formData.append("key1", values.configUpload);
    const response = await axios.post(
      `http://127.0.0.1:5000/upload_image_old/${botId}`,
      formData
    );
    let data = response.data;

    console.log("uploadConfig", data);
  };

  // video message function
  const video = async (values) => {
    const formData = new FormData();
    console.log("values", values);
    formData.append("key", values.uploadVideo);
    formData.append("value1", values.videolink);
    const response = await axios.post(
      `http://127.0.0.1:5000/add_link/${botId}`,
      formData
    );
    let data = response.data;

    console.log("video Data", data);
  };

  // Timer message function
  const timer = async (values) => {
    console.log("values", values);
    const formData = new FormData();
    formData.append("question_text", values.timerMessage);
    const response = await axios.post(
      `http://127.0.0.1:5000/save_question/${botId}`,
      formData
    );
    console.log(response);

    // let data = response.data;
  };
  // email message function
  const email = async (values) => {
    const formData = new FormData();
    formData.append("question_text", values.configmail);
    const response = await axios.post(
      `http://127.0.0.1:5000/save_question_email/${botId}`,
      formData
    );
    console.log(response);

    // let data = response.data;
  };

  // date message function
  const date = async (values) => {
    const formData = new FormData();
    formData.append("questions", values.configdate);
    const response = await axios.post(
      `http://127.0.0.1:5000/set_date/${botId}`,
      formData
    );
    console.log(response);

    // let data = response.data;
  };

  // phone message function
  const phone = async (values) => {
    const formData = new FormData();
    formData.append("question_phone", values.configPhone);
    const response = await axios.post(
      `http://127.0.0.1:5000/save_question_phone/${botId}`,
      formData
    );
    console.log(response);

    // let data = response.data;
  };

  // OpenAi message function
  const aiImageUpload = (e) => {
    setAiFile(e.target.files[0]);
    console.log("e.target.value", e.target.files[0]);
  };

  const openAI = async (values) => {
    console.log("values", values);
    debugger;
    const formData = new FormData();
    formData.append("aiFile", aiFile);
    const response = await axios.post(
      `http://127.0.0.1:5000/save_ai/${botId}`,
      formData
    );
    console.log(response);

    // let data = response.data;
  };

  // submit failed  function

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const tabData = [
    {
      id: "0",
      label: (
        <div className="tabImage">
          <img src={ConfigureRobo} alt="tabImage" className="configureRobo" />
          <p>Choose the below options to configure your bot</p>
        </div>
      ),
      children: (
        <div className="tabSideImage">
          <img
            src={ConfigureRobo}
            alt="tabImage"
            className="mainconfigureRobo"
          />
          <p>Choose the Left Side options to configure your bot</p>{" "}
        </div>
      ),
    },
    {
      label: (
        <Tooltip title="Welcome Message" color={"lightslategray"}>
          <ApiOutlined />
        </Tooltip>
      ),
      id: "1",
      children: (
        <div>
          <h1>Welcome Message </h1>
          <div className="configureContents">
            <p>
              Configure the options that users will see by entering a triggering
              question.
            </p>
            <p>
              For example, type the question users must enter to reveal the
              available options.
            </p>
            <p>
              Fill in the options users can choose from in response to the
              configured question.
            </p>
            <Row align="middle" gutter={16}>
              <Col span={12}>
                <Form
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
                  onFinish={welcomeMessage}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    style={{ marginBottom: "0", flexGrow: "1" }}
                    name="welcomeMessage"
                    rules={[
                      {
                        required: true,
                        message: "Please input your welcomeMessage!",
                      },
                    ]}
                  >
                    <Input
                      className="configInput"
                      placeholder="Enter the default message"
                    />
                  </Form.Item>
                  <Form.Item style={{ marginBottom: "0" }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="Btn configureBtn"
                    >
                      Add Config
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      ),
    },
    {
      label: (
        <Tooltip title="Workflow Config" color={"lightslategray"}>
          <ToolOutlined />
        </Tooltip>
      ),
      id: "2",
      children: (
        <div className="configureContents">
          <h1>Workflow Config</h1>
          <div>
            <p>
              Configure the options that users will see by entering a triggering
              question.
            </p>
            <p>
              For example, type the question users must enter to reveal the
              available options.
            </p>
            <p>
              Fill in the options users can choose from in response to the
              configured question.
            </p>
            <Row align="middle" gutter={16}>
              <Col span={24}>
                <Form
                  name="basic"
                  className="welcomeMessageForm"
                  wrapperCol={{
                    span: 24,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={configMessage}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    style={{ marginBottom: "0" }}
                    name="configquestion"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Config Question!",
                      },
                    ]}
                  >
                    <Input
                      className="configInput"
                      placeholder="Enter a question"
                      // name="welcomeMessage"
                    />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "0" }}
                    name="configoption_1"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Config Option 1!",
                      },
                    ]}
                  >
                    <Input
                      className="configInput"
                      placeholder="Enter a option 2"
                      // name="welcomeMessage"
                    />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "0" }}
                    name="configoption_2"
                    rules={[
                      {
                        required: true,
                        message: "Please input your configOption 2!",
                      },
                    ]}
                  >
                    <Input
                      className="configInput"
                      placeholder="Enter a option 2"
                      // name="welcomeMessage"
                    />
                  </Form.Item>
                  <Form.Item style={{ marginBottom: "0" }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="Btn configureBtn"
                    >
                      Add Config
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      ),
    },
    {
      label: (
        <Tooltip title="Upload Image" color={"lightslategray"}>
          <CloudUploadOutlined />
        </Tooltip>
      ),
      id: "3",
      children: (
        <div className="configureContents">
          <h1>Upload Image</h1>
          <div>
            <p>
              Configure the image that users will see by entering a triggering
              question.
            </p>
            <p>
              For example, type the question users must enter to reveal the
              image.
            </p>
            <p>please ensure that the image is of JPG format.</p>
            <Row align="middle" gutter={16}>
              <Col span={16}>
                <Form
                  name="basicConfig"
                  className="welcomeMessageForm"
                  wrapperCol={{
                    span: 24,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={uploadConfig}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    style={{ marginBottom: "0", flexGrow: "1" }}
                    name="configUpload"
                    rules={[
                      {
                        required: true,
                        message: "Please input your config upload!",
                      },
                    ]}
                  >
                    <Input
                      className="configInput"
                      placeholder="Enter a question"
                    />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "0", flexGrow: "1" }}
                    name="uploadInput"
                    rules={[
                      {
                        required: true,
                        message: "Please input your upload Input!",
                      },
                    ]}
                  >
                    <Input
                      type="file"
                      onChange={fileUpload}
                      className="configInput"
                      placeholder="Enter a question"
                      // name="welcomeMessage"
                    />
                  </Form.Item>
                  <Form.Item style={{ marginBottom: "0" }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="Btn configureBtn"
                    >
                      Upload Image
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      ),
    },
    {
      label: (
        <Tooltip title="Video Link" color={"lightslategray"}>
          <VideoCameraOutlined />
        </Tooltip>
      ),
      id: "4",
      children: (
        <div className="configureContents">
          <h1>Video Link</h1>
          <div>
            <p>
              Configure the youtube video link that users will see by entering a
              triggering question.
            </p>
            <p>
              For example, type the question users must enter to reveal the
              video.
            </p>
            <p>Please provide the full URL of the youtube video.</p>
            <Row align="middle" gutter={16}>
              <Col span={24}>
                <Form
                  name="basic"
                  className="welcomeMessageForm"
                  wrapperCol={{
                    span: 24,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={video}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    style={{ marginBottom: "0" }}
                    name="uploadVideo"
                    rules={[
                      {
                        required: true,
                        message: "Please input your upload video!",
                      },
                    ]}
                  >
                    <Input
                      className="configInput"
                      placeholder="Enter a upload Video"
                      // name="welcomeMessage"
                    />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "0" }}
                    name="videolink"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Config video link!",
                      },
                    ]}
                  >
                    <Input
                      className="configInput"
                      placeholder="Enter a video link"
                      name="welcomeMessage"
                    />
                  </Form.Item>

                  <Form.Item style={{ marginBottom: "0" }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="Btn configureBtn"
                    >
                      Upload Video Link
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      ),
    },
    {
      label: (
        <Tooltip title="Time Picker" color={"lightslategray"}>
          <FieldTimeOutlined />
        </Tooltip>
      ),
      id: "5",
      children: (
        <div className="configureContents">
          <h1>Time Picker</h1>
          <div>
            <p>
              Configure the triggering question that should be entered by the
              user to select time.
            </p>
            <p>
              For example, type the question users must enter to reveal the time
              picker.
            </p>
            <p>The time picked by the user will be saved.</p>
            <Row align="middle" gutter={16}>
              <Col span={15}>
                <Form
                  name="basic"
                  className="welcomeMessageForm"
                  wrapperCol={{
                    span: 24,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={timer}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    style={{ marginBottom: "0", flexGrow: "1" }}
                    name="timerMessage"
                    rules={[
                      {
                        required: true,
                        message: "Please input your welcomeMessage!",
                      },
                    ]}
                  >
                    <Input
                      className="configInput"
                      placeholder="Enter the Time"
                      // name="timeselect"
                    />
                  </Form.Item>
                  <Form.Item style={{ marginBottom: "0", flexGrow: 1 }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="Btn configureBtn"
                    >
                      Config time picker question
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      ),
    },
    {
      label: (
        <Tooltip title="Email" color={"lightslategray"}>
          <MailOutlined />
        </Tooltip>
      ),
      id: "6",
      children: (
        <div className="configureContents">
          <h1>Email</h1>
          <div>
            <p>
              Configure the triggering question that should be entered by the
              user to get their email.
            </p>
            <p>
              For example, type the question users must enter to get email from
              them.
            </p>
            <p>The user's email will be saved.</p>
            <Row align="middle" gutter={16}>
              <Col span={15}>
                <Form
                  name="basic"
                  className="welcomeMessageForm"
                  wrapperCol={{
                    span: 24,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={email}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    style={{ marginBottom: "0", flexGrow: "1" }}
                    name="configmail"
                    rules={[
                      {
                        required: true,
                        message: "Please input your config mail!",
                      },
                    ]}
                  >
                    <Input
                      className="configInput"
                      placeholder="Enter the Date"
                      // name="timeselect"
                    />
                  </Form.Item>
                  <Form.Item style={{ marginBottom: "0", flexGrow: 1 }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="Btn configureBtn"
                    >
                      Config Email Question
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      ),
    },
    {
      label: (
        <Tooltip title="Date Picker" color={"lightslategray"}>
          <CalendarOutlined />
        </Tooltip>
      ),
      id: "7",
      children: (
        <div className="configureContents">
          <h1>Date Picker</h1>
          <div>
            <p>
              Configure the triggering question that should be entered by the
              user to select the date.
            </p>
            <p>
              For example, type the question users must enter to reveal the date
              picker.
            </p>
            <p>The date picked by the user will be saved.</p>
            <Row align="middle" gutter={16}>
              <Col span={15}>
                <Form
                  name="basic"
                  className="welcomeMessageForm"
                  wrapperCol={{
                    span: 24,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={date}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    style={{ marginBottom: "0", flexGrow: "1" }}
                    name="configdate"
                    rules={[
                      {
                        required: true,
                        message: "Please input your configdate!",
                      },
                    ]}
                  >
                    <Input
                      className="configInput"
                      placeholder="Enter the Date"
                    />
                  </Form.Item>
                  <Form.Item style={{ marginBottom: "0", flexGrow: 1 }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="Btn configureBtn"
                    >
                      Config date picker question
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      ),
    },
    {
      label: (
        <Tooltip title="Phone" color={"lightslategray"}>
          <PhoneOutlined />
        </Tooltip>
      ),
      id: "8",
      children: (
        <div className="configureContents">
          <h1>Phone</h1>
          <div>
            <p>
              Configure the triggering question that should be entered by the
              user to get their phone number.
            </p>
            <p>
              For example, type the question users must enter to get phone
              number from them.
            </p>
            <p>The user's phone number will be saved.</p>
            <Row align="middle" gutter={16}>
              <Col span={12}>
                <Form
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
                  onFinish={phone}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    style={{ marginBottom: "0", flexGrow: "1" }}
                    name="configPhone"
                    rules={[
                      {
                        required: true,
                        message: "Please input your welcomeMessage!",
                      },
                    ]}
                  >
                    <Input
                      className="configInput"
                      placeholder="Enter the phone question"
                    />
                  </Form.Item>
                  <Form.Item style={{ marginBottom: "0" }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="Btn configureBtn"
                    >
                      Config Phone Question
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      ),
    },
    {
      label: (
        <Tooltip title="OpenAI Integration" color={"lightslategray"}>
          <RobotOutlined />
        </Tooltip>
      ),

      id: "9",
      children: (
        <div className="configureContents">
          <h1>OpenAI Integration</h1>
          <div>
            <p>Configure openai for your chatbot.</p>
            <p>
              For example, when the user types something that is not configured,
              the response will be fetched using openai.
            </p>
            <Row>
              <Col span={12}>
                <Form
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
                  onFinish={openAI}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    style={{ marginBottom: "0", flexGrow: "1" }}
                    name="configjson"
                    rules={[
                      {
                        required: true,
                        message: "Please input your configjson!",
                      },
                    ]}
                  >
                    <Input
                      className="configInput"
                      type="file"
                      onChange={aiImageUpload}
                    />
                  </Form.Item>
                  <Form.Item style={{ marginBottom: "0" }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="Btn configureBtn"
                    >
                      Add AI in chatbot
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      ),
    },
    {
      id: "10",
      label: (
        <div className="finishBtn">
          <Tooltip title="Preview Configuration" color={"lightslategray"}>
            <CheckOutlined />
          </Tooltip>
        </div>
      ),
      children: (
        <div className="configureContents">
          <p>Preview your configured chatbot by clicking the button below.</p>
          <p>
            Ensure everything is set as desired before proceeding to the
            preview.
          </p>
          <Link
            to={{
              pathname: "/livechat",
              search: new URLSearchParams({
                id: params.get(`id`),
                imageUrl: botImage,
                botName: botName,
              }).toString(),
            }}
          >
            <Button type="primary" className="Btn configureBtn">
              Preview Configuration
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="configure">
      <div className="container">
        <Tabs
          defaultActiveKey="1"
          tabPosition="left"
          items={tabData.map((data) => {
            return {
              key: data.id,
              label: data.label,
              children: data.children,
              id: data.id,
            };
          })}
        />
      </div>
    </div>
  );
};
export default App;
