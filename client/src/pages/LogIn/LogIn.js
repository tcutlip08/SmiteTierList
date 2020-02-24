import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import "./LogIn.css";

class LogIn extends Component {
  state = {
    username: "",
    email: "",
    password: ""
  };

  componentDidMount() {}

  componentDidUpdate() {}

  handleInputChange = event => {
    const { name, value } = event.target;
    if (name === "username" && value.length > 15) {
      return;
    } else {
      this.setState({
        [name]: value
      });
    }
  };

  handleSubmit = event => {
    event.preventDefault();

    axios
      .post("/api/user/log-in", this.state)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  signUp = () => {
    if (this.state.username && this.state.email && this.state.password) {
      axios
        .post("/api/user", this.state)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  render() {
    return (
      <Container>
        <Row>
          <Col xs={3}></Col>
          <Col xs={6} className="justify-content-sm-center">
            <b>Log In Hoe</b>
          </Col>
          <Col xs={3}></Col>
        </Row>
        <Row className="justify-content-sm-center">
          <Col xs={6} className="contact-fields">
            <form method="post" id="contact" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label className="sr-only" for="username">
                  User Name *
                </label>
                <input
                  className="required form-control"
                  id="username"
                  name="username"
                  placeholder="User Name&nbsp;*"
                  value={this.state.username}
                  onChange={this.handleInputChange}
                  type="username"
                  required
                />
              </div>
              <div className="form-group">
                <label className="sr-only" for="email">
                  Email *
                </label>
                <input
                  className="required form-control h5-email"
                  id="email"
                  name="email"
                  placeholder="Email&nbsp;*"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  type="email"
                  required
                />
              </div>
              <div className="form-group">
                <label className="sr-only" for="password">
                  Password *
                </label>
                <input
                  className="required form-control h5-password"
                  name="password"
                  placeholder="Password&nbsp;*"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  type="password"
                  autocomplete="current-password"
                  required
                />
              </div>
              <button className="btn btn-primary" type="submit">
                Log In
              </button>
            </form>
            <button className="btn btn-success" onClick={this.signUp}>
              Sign Up
            </button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default LogIn;
