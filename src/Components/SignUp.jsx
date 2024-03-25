import React from "react";
import { Col, Row, Button, Form, Input } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignUp() {
  const navigate = useNavigate();

  const success = () => toast.success("Created Successfully");

  const unSuccess = () => toast.error("Invalid Credentials");

  const onFinish = async (values) => {
    try {
      console.log(values, "values....");
      // return false;
      var formdata = new FormData();
      formdata.append("email", values.email);
      formdata.append("password", values.password);
      formdata.append("confirmPassword", values.confirm_password);

      const response = await axios.post(
        "http://127.0.0.1:5000/signup",
        formdata
      );
      navigate("/login");
      success();
      console.log("post", response.data);
    } catch (error) {
      console.error("Error creating post:", error);
      unSuccess();
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="signup">
      <div className="container">
        <Row align="middle" style={{ minHeight: "calc(100vh - 30px)" }}>
          <Col xs={24} lg={7} className="signupForm">
            <h1>Signup</h1>
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
