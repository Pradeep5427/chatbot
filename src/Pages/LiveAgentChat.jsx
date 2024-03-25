import React, { useState, useEffect } from "react";
import { Row, Col, Input, Button, Form } from "antd";
import { Link } from "react-router-dom";
import liveAgent from "../Assets/Images/liveagent.png";
import { LoginOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import io from "socket.io-client";
import axios from "axios";

export default function LiveAgentChats() {
  const [socket, setSocket] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState([]);
  const [form] = Form.useForm();

  const baseUrl = "http://127.0.0.1:5000/";

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    const newSocket = io("http://localhost:3000");

    newSocket.on("connect", () => {
      console.log("Connected to server");
    });

    newSocket.on("message", (data) => {
      setReceivedMessage((prevMessages) => [...prevMessages, data]);
      console.log(`agent message: ${data}`);
    });

    setSocket(newSocket);

    return () => newSocket.off();
  }, []);

  const onFinish = async (values) => {
    console.log("values", values);
    const formData = new FormData();
    formData.append("message", values.agentmessage);
    const response = await axios.post(`${baseUrl}send_agent_message`, formData);
    if (socket && values) {
      socket.emit("live_agent_message", values.agentmessage);
    }
    form.resetFields();
  };

  return (
    <div className="livechats liveAgent">
      <Row justify="center" align="middle">
        <Col sm={24} md={10} lg={6} xl={6}>
          <div className="chatbot">
            <Link to="/agentlogin">
              <div className="back">
                <ArrowLeftOutlined />
              </div>
            </Link>

            <h1>Live Agent Chat</h1>
            <img src={liveAgent} alt="liveagent" className="liveAgentImage" />
            <div className="chatbotFooter">
              <div className="chatResult">
                {receivedMessage.map((msg, index) => (
                  <p
                    key={index}
                    className={`message ${
                      msg.trim().toLowerCase().startsWith("agent:")
                        ? "agent-message"
                        : "user-message"
                    }`}
                  >
                    {msg}
                  </p>
                ))}
              </div>
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
                <Form.Item
                  label="send your message"
                  name="agentmessage"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Email!",
                    },
                  ]}
                >
                  <Input
                    className="userInput"
                    placeholder="Your Message"
                    style={{ padding: "10px" }}
                  />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    span: 24,
                  }}
                >
                  <Button
                    icon={<LoginOutlined />}
                    type="primary"
                    htmlType="submit"
                    className="loginBtn Btn"
                  >
                    send
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
