import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import axios from "axios";
import env from "../../env.json";
import "./Landing.scss";

class Landing extends Component {
  state = {
    page: "Public",
    loop: true,
    user: "",
    tier: this.emptyTier()
  };

  componentDidMount() {
    this.getPubTierList();
  }

  componentDidUpdate() {
    if (!this.state.loop) {
      this.testPubOrPriv();
      this.setState({ loop: true });
    }
  }

  testPubOrPriv() {
    if (this.state.page === "Public") {
      this.getPubTierList();
    } else if (this.state.page === "Private") {
      if (this.state.user) {
        this.sepPrivTierList(this.state.user.gods);
        this.setState({ loop: true });
      } else {
        console.log("Sign in ya fuck");
        this.setState({ page: "Public" });
      }
    }
  }

  getPubTierList() {
    axios
      .get("/api/gods")
      .then(res => {
        this.sepPubTierList(res.data);
      })
      .catch(err => {
        // if (!this.state.loop) {
        this.getPubTierList();
        // }
      });
  }

  sepPrivTierList(gods) {
    let tier = this.emptyTier();

    for (let g = 0; g < gods.length; g++) {
      let god = gods[g]._id;

      if (gods[g].rank === 1) {
        tier.d.push({ god: god });
      } else if (gods[g].rank === 2) {
        tier.c.push({ god: god });
      } else if (gods[g].rank === 3) {
        tier.b.push({ god: god });
      } else if (gods[g].rank === 4) {
        tier.bp.push({ god: god });
      } else if (gods[g].rank === 5) {
        tier.a.push({ god: god });
      } else if (gods[g].rank === 6) {
        tier.ap.push({ god: god });
      } else if (gods[g].rank === 7) {
        tier.s.push({ god: god });
      } else if (gods[g].rank === 8) {
        tier.sp.push({ god: god });
      } else if (gods[g].rank === 9) {
        tier.ss.push({ god: god });
      } else {
        tier.none.push({ god: god });
      }
    }
    this.setState({ tier: tier });
  }

  sepPubTierList(gods) {
    let tier = this.emptyTier();

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
      console.log("Updated");
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
          this.testPubOrPriv();
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
      tier: this.emptyTier()
    });
    this.passTierIntoData(this.emptyTier());
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
    this.setState({ user: "", page: "Public" });
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

  emptyTier() {
    return {
      ss: [],
      sp: [],
      s: [],
      ap: [],
      a: [],
      bp: [],
      b: [],
      c: [],
      d: [],
      none: []
    };
  }

  onDragOver = ev => {
    ev.preventDefault();
  };

  onDragStart = (ev, name) => {
    ev.dataTransfer.setData("name", name);
  };

  onDrop = (ev, newTier) => {
    const name = ev.dataTransfer.getData("name");
    // console.log("New Tier: " + newTier);
    // console.log("Name: " + name);

    let tier = this.emptyTier();

    Object.keys(this.state.tier).forEach(t => {
      this.state.tier[t].map(god => {
        if (god.god.name === name) {
          tier[newTier].push(god);
        } else {
          tier[t].push(god);
        }
        return "";
      });
    });

    this.setState({
      tier: tier
    });
  };

  handleSelect = evt => {
    this.setState({ page: evt, loop: false });
  };

  render() {
    let tier = this.emptyTier();

    Object.keys(this.state.tier).forEach(t => {
      this.state.tier[t].forEach(g => {
        tier[t].push(
          <img
            src={`http://www.smitetierlist.com/gods/${g.god.name
              .toLowerCase()
              .split(" ")
              .join("")}.jpg`}
            className={`item-container ${g.god.class}`}
            key={g.god.name}
            draggable
            onDragStart={e => this.onDragStart(e, g.god.name)}
            alt={g.god.name}
          />
        );
      });
    });

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
              <Col>
                <b>Tier List:</b>&nbsp;
                <DropdownButton
                  title={this.state.page}
                  onSelect={this.handleSelect}
                >
                  <Dropdown.Item eventKey="Public">Public</Dropdown.Item>
                  <Dropdown.Item eventKey="Private">Private</Dropdown.Item>
                </DropdownButton>
              </Col>
            </Row>
            {Object.keys(tier).map(t => (
              <Row>
                <Col className="tier-label" xs={1}>
                  {t.includes("p") ? `${t[0].toUpperCase()}+` : t.toUpperCase()}
                </Col>
                <Col
                  className="drop-area"
                  onDragOver={e => this.onDragOver(e)}
                  onDrop={e => this.onDrop(e, t)}
                >
                  {tier[t]}
                </Col>
              </Row>
            ))}
          </Col>
        </Row>
        <div id="blog"></div>
      </Container>
    );
  }
}

export default Landing;
