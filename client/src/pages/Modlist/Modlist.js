import React, { Component } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { GoogleLogin } from "react-google-login";
import env from "../../env.json";
import axios from "axios";
import "./Modlist.css";

class Modlist extends Component {
  state = {
    users: [],
    user: "",
    auth: false,
    authed: [
      "tcutlip08@gmail.com",
      "sexcrexsi@gmail.com",
      "jessman51386@gmail.com",
      "rosykittenlove@gmail.com"
    ]
  };

  componentDidMount() {
    this.getUsers();
  }

  componentDidUpdate() {
    console.log(this.state.users[0].mod);
  }

  getUsers() {
    axios
      .get("/api/user")
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => {
        this.getUsers();
      });
  }

  changeCheckBox = event => {
    const { name, checked } = event.target;
    let newArray = this.state.users.map(user => {
      if (user._id === name && !this.state.authed.includes(user.email)) {
        user.mod = checked;
      }
      return user;
    });
    this.setState({ users: newArray });
  };

  submit = users => {
    let user = users[0];
    if (user) {
      if (!this.state.authed.includes(user.email)) {
        axios
          .put(`/api/user/mod/${user._id}`, { mod: user.mod })
          .then(res => {
            users.splice(0, 1);
            this.submit(users);
          })
          .catch(err => {
            // console.log(err);
          });
      } else {
        users.splice(0, 1);
        this.submit(users);
      }
    } else {
      this.getUsers();
    }
  };

  responseGoogle = response => {
    axios
      .get(
        "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" +
          response.uc.id_token
      )
      .then(res => {
        this.setState({ user: res.data.email });
        this.checkAuth();
      })
      .catch(err => {
        // console.log(err);
      });
  };

  checkAuth = () => {
    if (this.state.authed.includes(this.state.user)) {
      this.setState({ auth: true });
    }
  };

  render() {
    return (
      <Container className="Modlist">
        {this.state.auth ? (
          <>
            <Row>
              {this.state.users.map(data => {
                return (
                  <Col className="user">
                    <Row>
                      <Col>{`Email: ${data.email}`}</Col>
                      <Col className="Checkbox">
                        <input
                          type="checkbox"
                          name={data._id}
                          defaultChecked={data.mod}
                          onChange={this.changeCheckBox}
                        />
                        <span>Mod</span>
                      </Col>
                    </Row>
                  </Col>
                );
              })}
            </Row>
            <Row>
              <Col>
                <button
                  className="btn btn-primary"
                  onClick={() => this.submit(this.state.users)}
                >
                  Submit
                </button>
              </Col>
            </Row>
          </>
        ) : (
          <Row>
            {this.state.user ? (
              <>
                <Col>You uh.....shouldn't be here</Col>
                <Col>I'll make this easy on you though</Col>
                <Col>
                  <Link to="/">
                    <button className="btn btn-primary">BYE</button>
                  </Link>
                </Col>
              </>
            ) : (
              <>
                <Col>
                  <GoogleLogin
                    clientId={env.clientId}
                    buttonText="Login"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy={"single_host_origin"}
                  />
                </Col>
                <Col>"What cha doin?"</Col>
              </>
            )}
          </Row>
        )}
      </Container>
    );
  }
}

export default Modlist;
