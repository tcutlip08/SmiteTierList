import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
// import NavBar from "../../components/NavBar/NavBar";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import env from "../../env.json";
import Tier from "../../components/Tier/Tier";
import "./Landing.css";

class Landing extends Component {
  state = {
    user: "",
    tier: {
      ss: [],
      sp: [],
      s: [],
      ap: [],
      a: [],
      bp: [],
      b: [],
      c: [],
      d: [],
      new: [],
      none: []
    }
  };

  componentDidMount() {
    this.getGods();
  }

  componentDidUpdate() {
    console.log(this.state.user);
  }

  getGods() {
    axios
      .get("/api/gods")
      .then(res => {
        this.seperateGodByTier(res.data);
      })
      .catch(err => {
        this.getGods();
      });
  }

  seperateGodByTier(gods) {
    let tier = {
      ss: [],
      sp: [],
      s: [],
      ap: [],
      a: [],
      bp: [],
      b: [],
      c: [],
      d: [],
      new: [],
      none: []
    };

    for (let g = 0; g < gods.length; g++) {
      let god = gods[g];
      let users = 0;
      let average = 0;
      for (let r = 0; r < god.rank.length; r++) {
        let rank = god.rank[r];
        if (rank.gods[g].rank !== 0) {
          users++;
          average = average + rank.gods[g].rank;
        }
      }
      if (Math.round(average / users) === 1) {
        tier.d.push({ god: god });
      } else if (Math.round(average / users) === 2) {
        tier.c.push({ god: god });
      } else if (Math.round(average / users) === 3) {
        tier.b.push({ god: god });
      } else if (Math.round(average / users) === 4) {
        tier.bp.push({ god: god });
      } else if (Math.round(average / users) === 5) {
        tier.a.push({ god: god });
      } else if (Math.round(average / users) === 6) {
        tier.ap.push({ god: god });
      } else if (Math.round(average / users) === 7) {
        tier.s.push({ god: god });
      } else if (Math.round(average / users) === 8) {
        tier.sp.push({ god: god });
      } else if (Math.round(average / users) === 9) {
        tier.ss.push({ god: god });
      } else {
        tier.none.push({ god: god });
      }
    }
    this.setState({ tier: tier });
  }

  submitList = () => {
    if (this.state.user) {
      let tier = [];
      let keys = Object.keys(this.state.tier);
      let values = Object.values(this.state.tier);
      for (let i = 0; i < keys.length; i++) {
        for (let g = 0; g < values[i].length; g++) {
          if (keys[i] === "none") {
          } else if (keys[i] === "ss") {
            tier.push({ data: values[i][g], rank: 9 });
          } else if (keys[i] === "sp") {
            tier.push({ data: values[i][g], rank: 8 });
          } else if (keys[i] === "s") {
            tier.push({ data: values[i][g], rank: 7 });
          } else if (keys[i] === "ap") {
            tier.push({ data: values[i][g], rank: 6 });
          } else if (keys[i] === "a") {
            tier.push({ data: values[i][g], rank: 5 });
          } else if (keys[i] === "bp") {
            tier.push({ data: values[i][g], rank: 4 });
          } else if (keys[i] === "b") {
            tier.push({ data: values[i][g], rank: 3 });
          } else if (keys[i] === "c") {
            tier.push({ data: values[i][g], rank: 2 });
          } else if (keys[i] === "d") {
            tier.push({ data: values[i][g], rank: 1 });
          }
        }
      }
      this.updateGodTier(tier);
    } else {
      console.log("Sign in you fuck");
    }
  };

  updateGodTier(tier) {
    axios
      .put(`/api/user/${this.state.user._id}`, {
        _id: tier[0].data.god._id,
        rank: tier[0].rank
      })
      .then(res => {
        tier.splice(0, 1);
        if (tier[0]) {
          this.updateGodTier(tier);
        } else {
          console.log("Updated");
          this.getGods();
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  resetList = () => {
    let tier = this.state.tier;
    let keys = Object.keys(tier);
    let values = Object.values(tier);
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] === "none") {
      } else {
        for (let g = 0; g < values[i].length; g++) {
          tier.none.push(values[i][g]);
        }
      }
    }
    this.setState({
      tier: {
        ss: [],
        sp: [],
        s: [],
        ap: [],
        a: [],
        bp: [],
        b: [],
        c: [],
        d: [],
        new: [],
        none: tier.none
      }
    });
  };

  responseGoogle = response => {
    axios
      .get(
        "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" +
          response.uc.id_token
      )
      .then(res => {
        axios
          .get(`/api/user/google/${res.data.sub}`)
          .then(res => {
            this.setState({ user: res.data });
          })
          .catch(err => {
            axios
              .put(`/api/user/google`, {
                email: res.data.email,
                sub: res.data.sub
              })
              .then(res => {
                this.push_new_ID_into_god_array(res.data._id, res.data.gods);
                this.setState({ user: res.data });
              })
              .catch(err => {
                console.log(err);
              });
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  logOut = () => {
    this.setState({ user: "" });
  };

  push_new_ID_into_god_array = (id, array) => {
    for (let g = 0; g < array.length; g++) {
      axios
        .put("/api/gods", {
          godID: array[g]._id,
          _id: id
        })
        .then(res => {})
        .catch(err => {
          console.log(err);
        });
    }
  };

  render() {
    return (
      <Container>
        <Row>
          {this.state.user ? (
            <GoogleLogout
              clientId={env.clientId}
              buttonText="Logout"
              onLogoutSuccess={this.logOut}
            />
          ) : (
            <GoogleLogin
              clientId={env.clientId}
              buttonText="Login"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          )}
        </Row>
        <Row className="tierlist">
          <Col>
            <Row>
              <Col>
                <button
                  className="btn btn-primary"
                  id="submit"
                  onClick={this.submitList}
                >
                  Submit
                </button>
              </Col>
              <Col>
                <button className="btn btn-primary" onClick={this.resetList}>
                  Reset
                </button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Row>
                  <Tier
                    tierLabel="SS"
                    tierClass="ss"
                    array={this.state.tier.ss}
                    width={8}
                  />
                  <Tier
                    tierLabel="New"
                    tierClass="new"
                    array={this.state.tier.new}
                    width={4}
                  />
                </Row>
                <Row>
                  <Tier
                    tierLabel="S+"
                    tierClass="sp"
                    array={this.state.tier.sp}
                    width={12}
                  />
                </Row>
                <Row>
                  <Tier
                    tierLabel="S"
                    tierClass="s"
                    array={this.state.tier.s}
                    width={12}
                  />
                </Row>
                <Row>
                  <Tier
                    tierLabel="A+"
                    tierClass="ap"
                    array={this.state.tier.ap}
                    width={12}
                  />
                </Row>
                <Row>
                  <Tier
                    tierLabel="A"
                    tierClass="a"
                    array={this.state.tier.a}
                    width={12}
                  />
                </Row>
                <Row>
                  <Tier
                    tierLabel="B+"
                    tierClass="bp"
                    array={this.state.tier.bp}
                    width={12}
                  />
                </Row>
                <Row>
                  <Tier
                    tierLabel="B"
                    tierClass="b"
                    array={this.state.tier.b}
                    width={12}
                  />
                </Row>
                <Row>
                  <Tier
                    tierLabel="C"
                    tierClass="c"
                    array={this.state.tier.c}
                    width={12}
                  />
                </Row>
                <Row>
                  <Tier
                    tierLabel="D"
                    tierClass="d"
                    array={this.state.tier.d}
                    width={12}
                  />
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Tier
            array={this.state.tier.none}
            tierLabel="None"
            tierClass="none"
            width={12}
          />
        </Row>
        <div id="blog"></div>
      </Container>
    );
  }
}

export default Landing;
