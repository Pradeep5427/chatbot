import React from "react";
import { Button, Row, Col } from "antd";
import { Link } from "react-router-dom";
import routesPath from "../Routes";
import LandingImage from "../Assets/Images/landingImage.png";
import Logo from "../Assets/Images/Logo.png";
import { RiseOutlined, LoginOutlined, LogoutOutlined } from "@ant-design/icons";

export default function Landingpage() {
  return (
    <div className="landingPage">
      <div className="container">
        <div className="landingHeader">
          <Link to={routesPath.default}>
            <img src={Logo} alt="Logo" className="landingLogo" />
          </Link>
          <div>
            <Link to={routesPath.login}>
              <Button className="landingBtn">
                <b>
                  Sign In <LoginOutlined style={{ margin: "0 5px" }} />
                </b>
              </Button>
            </Link>
            <Link to={routesPath.createAccount}>
              <Button className="landingBtn " Link>
                <b>
                  Sign Up <LogoutOutlined style={{ margin: "0 5px" }} />
                </b>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container">
        <Row className="landingContent">
          <Col xl={12} lg={12} md={12} sm={24}>
            <h1>Superchange Your Customer Service With Ai Chatbot.</h1>
            <Link to={routesPath.login}>
              <div className="btnLayer">
                <Button className="landingContentBtn">
                  <b>
                    Lets Start <RiseOutlined />
                  </b>
                </Button>
              </div>
            </Link>
          </Col>
          <Col xl={12} lg={12} md={12} sm={24}>
            <img
              src={LandingImage}
              alt="landingpage"
              className="landingImage"
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}
