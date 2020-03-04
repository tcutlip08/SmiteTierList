import React from "react";
import { Link } from "react-router-dom";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import env from "../../env.json";
import "./NavBar.css";

const NavBar = props => {
  return (
    <Container>
      <Row className="justify-content-sm-center">
        <Col>
          <Link to="/">
            <b>Home</b>
          </Link>
        </Col>
        <Col>
          <Link to="/about-us">
            <b>About Us</b>
          </Link>
        </Col>
        <Col>
          {/* {props.user ? (
            <GoogleLogout
              clientId={env.clientId}
              buttonText="Logout"
              onLogoutSuccess={() => props.logOutRes()}
            />
          ) : (
            <GoogleLogin
              clientId={env.clientId}
              buttonText="Login"
              onSuccess={() => props.logInRes()}
              onFailure={() => props.logInRes()}
              cookiePolicy={"single_host_origin"}
            />
          )} */}
          <GoogleLogout
            clientId={env.clientId}
            buttonText="Logout"
            onLogoutSuccess={props.logOutRes}
          />
          <GoogleLogin
            clientId={env.clientId}
            buttonText="Login"
            onSuccess={props.logInRes}
            onFailure={props.logInRes}
            cookiePolicy={"single_host_origin"}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default NavBar;
