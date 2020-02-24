import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
          <Link to="/log-in">
            <b>Log In</b>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NavBar;
