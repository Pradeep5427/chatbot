import React from "react";
import { Col, Row, Button, Form, Input } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import ChatBot from "../Assets/Images/loginSideImage.jpeg";
import routesPath from "../Routes";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  const success = () => toast.success("Login Successfully");

  const unSuccess = () => toast.error("Invalid Email or Password");

  const onFinish = async (values) => {
    try {
      var formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);
      const response = await axios.post(
        "http://127.0.0.1:5000/login",
        formData
      );
      let datas = response.data.data;
      if (response.status === 200) {
        success();
        navigate("/dashboard", { state: { email: datas.email, id: datas.id } });
      }
    } catch (error) {
      unSuccess();
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login">
      <Row
        justify="center"
        align="middle"
        style={{ minHeight: "calc(100vh - 30px)" }}
      >
        <Col xs={24} lg={12} className="loginForm">
          <Row gutter={24}>
            <Col xs={0} md={12} lg={11} className="loginImage">
              <img src={ChatBot} alt="chatbot" className="loginsideImage" />
            </Col>
            <Col xs={24} md={12} lg={12}>
              <h1>Login </h1>
              <Form
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
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Email!",
                    },
                  ]}
                >
                  <Input className="userInput" placeholder="Email" />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password
                    className="userInput"
                    placeholder="Password"
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
                    className="loginBtn"
                  >
                    Login
                  </Button>
                </Form.Item>
                <Form.Item style={{ textAlign: "center" }}>
                  <Link className="account" to={routesPath.createAccount}>
                    <b style={{ color: "white" }}>Create an Account</b>
                  </Link>{" "}
                  <br />
                  <Link className="account" to={routesPath.agentLogin}>
                    <b style={{ color: "white" }}>Agent login</b>
                  </Link>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
