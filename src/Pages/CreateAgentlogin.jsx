import React from "react";
import { Col, Row, Button, Form, Input } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  const navigate = useNavigate();

  const success = () => toast.success("Created Successfully");

  const unSuccess = () => toast.error("Invalid Credentials");

  const onFinish = async (values) => {
    try {
      console.log(values, "values....");
      var formdata = new FormData();
      formdata.append("email", values.email);
      formdata.append("password", values.password);
      formdata.append("confirmPassword", values.confirm_password);

      const response = await axios.post(
        "http://127.0.0.1:5000/agentsignup",
        formdata
      );
      if (response.status === 200) {
        success();
        navigate("/agentlogin");
      }
      console.log("post", response.data);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    unSuccess();
  };
  return (
    <div className="signup createagentsignup">
      <div className="container">
        <Row
          align="middle"
          style={{ minHeight: "calc(100vh - 30px)", justifyContent: "center" }}
        >
          <Col xs={24} lg={7} className="signupForm">
            <h1>Agent Signup</h1>
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
                <Input.Password className="userInput" placeholder="Password" />
              </Form.Item>

              <Form.Item
                label="Confirm Password"
                name="confirm_password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password
                  className="userInput"
                  placeholder="Confirm Password"
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
                  className="signinBtn"
                >
                  Signup
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
}
