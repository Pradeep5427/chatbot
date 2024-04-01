import React from "react";
import { Col, Row, Button, Form, Input } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import routesPath from "../Routes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const success = () => toast.success("Login Successfully");

  const unSuccess = () => toast.error("Invalid Email or Password");

  const baseUrl = "http://13.127.154.146:81/";

  const onFinish = async (values) => {
    try {
      var formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);
      const response = await axios.post(`${baseUrl}agentlogin`, formData);
      let datas = response.data.datas;
      console.log("datas", datas);
      if (response.status === 200) {
        navigate("/liveagentchat");
        success();
      }
    } catch (error) {
      unSuccess();
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login agentLogin">
      <Row
        justify="center"
        align="middle"
        style={{ minHeight: "calc(100vh - 30px)" }}
      >
        <Col xs={24} lg={7} className="loginForm">
          <Row gutter={24}>
            <Col xs={24} md={12} lg={24}>
              <h1>Agent Login</h1>
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
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input className="userInput" placeholder="email" />
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
                  <Link
                    className="account"
                    to={routesPath.createagentlogin}
                    style={{ color: "white" }}
                  >
                    <b>Create an Agent Account</b>
                  </Link>{" "}
                  <br />
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
