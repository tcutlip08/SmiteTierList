import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-modal";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import axios from "axios";
import env from "../../env.json";
// import "./Landing.css";
import "./Landing.scss";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

class Landing extends Component {
  state = {
    message: "",
    showModal: false,
    mode: "Duel",
    class: "All",
    page: "Public",
    loop: true,
    user: "",
    tier: this.emptyTier()
  };

  componentDidMount() {
    this.getGodList();
  }

  componentDidUpdate() {
    if (!this.state.loop) {
      this.setState({ loop: true });
      this.getGodList();
    }
  }

  getGodList() {
    axios
      .get("/api/gods")
      .then(res => {
        if (this.state.page === "Public") {
          this.sepPubTierList(res.data);
        } else if (this.state.page === "Private") {
          if (this.state.user) {
            this.sepPrivTierList(res.data);
          } else {
            this.setState({
              page: "Public",
              showModal: true,
              message: "You must sign in to access this content"
            });
          }
        }
      })
      .catch(err => {
        console.log(err);
        this.getGodList();
      });
  }

  sepPubTierList(gods) {
    let tier = this.emptyTier();
    gods.map(god => {
      let mode = this.state.mode.toLowerCase();
      let users = 0;
      let average = 0;
      god.rank.map(rank => {
        if (god.rank.length > 0 && rank.mode[mode] !== 0) {
          users++;
          average = average + rank.mode[mode];
        }
      });
      let rank = this.testValRank(Math.round(average / users));
      tier[rank].push({ god: god });
    });
    this.setState({ tier: tier });
  }

  sepPrivTierList(gods) {
    let tier = this.emptyTier();
    gods.map(god => {
      god.rank.map(user => {
        if (user._id._id === this.state.user._id) {
          let val = user.mode[this.state.mode.toLowerCase()];
          let rank = this.testValRank(val);
          tier[rank].push({ god: god });
        }
      });
    });
    this.setState({ tier: tier });
  }

  testValRank(val) {
    if (val === 0) {
      return "none";
    } else if (val === 1) {
      return "d";
    } else if (val === 2) {
      return "c";
    } else if (val === 3) {
      return "b";
    } else if (val === 4) {
      return "bp";
    } else if (val === 5) {
      return "a";
    } else if (val === 6) {
      return "ap";
    } else if (val === 7) {
      return "s";
    } else if (val === 8) {
      return "sp";
    } else if (val === 9) {
      return "ss";
    } else {
      return "none";
    }
  }

  submitList = () => {
    if (this.state.user) {
      let tier = [];
      Object.keys(this.state.tier).map((key, k) => {
        let rank = 9 - k;
        Object.values(this.state.tier).map((value, v) => {
          value.map(god => {
            if (k === v) {
              tier.push({ god: god.god, rank: rank });
            }
          });
        });
      });
      this.setState({ showModal: true, message: "This may take a minute..." });
      this.updateGodTier(tier);
    } else {
      this.setState({
        showModal: true,
        message: "You must sign in to access this content"
      });
    }
  };

  updateGodTier(tier) {
    let god = tier[0].god;
    axios
      .put(`/api/gods/${god._id}`, {
        user: this.state.user._id,
        mode: this.state.mode.toLowerCase(),
        rank: tier[0].rank
      })
      .then(res => {
        tier.splice(0, 1);
        if (tier[0]) {
          this.updateGodTier(tier);
        } else {
          this.setState({
            showModal: false,
            message: "All finnished",
            loop: false
          });
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
    let newTier = this.emptyTier();
    newTier.none = tier.none;
    this.setState({ tier: newTier });
  };

  responseGoogle = response => {
    // console.log(response);
    axios
      .get(
        "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" +
          response.uc.id_token
      )
      .then(res => {
        // console.log(res.data.sub);
        this.signInUser(res.data);
      })
      .catch(err => {
        // console.log(err);
      });
  };

  signInUser(user) {
    axios
      .get(`/api/user/google/${user.sub}`)
      .then(res => {
        // console.log(res);
        this.setState({ user: res.data });
      })
      .catch(err => {
        this.createUser(user);
      });
  }

  createUser(user) {
    axios
      .put(`/api/user/google`, {
        email: user.email,
        sub: user.sub
      })
      .then(res => {
        this.setState({ user: res.data });
      })
      .catch(err => {
        // console.log(err);
      });
  }

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

  logOut = () => {
    this.setState({ user: "", page: "Public" });
  };

  onDragOver = ev => {
    ev.preventDefault();
  };

  onDragStart = (ev, name) => {
    ev.dataTransfer.setData("name", name);
  };

  onDrop = (ev, newTier) => {
    const name = ev.dataTransfer.getData("name");

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

  handleCloseModal = () => {
    this.setState({ showModal: false, message: "" });
  };

  handlePubOrPriv = evt => {
    this.setState({ page: evt, loop: false });
  };

  handleClassType = evt => {
    this.setState({ class: evt });
  };

  handleModeType = evt => {
    this.setState({ mode: evt, loop: false });
  };

  render() {
    let tier = this.emptyTier();

    Object.keys(this.state.tier).map(t => {
      this.state.tier[t].map(g => {
        if (
          g.god.name &&
          (this.state.class === g.god.class || this.state.class === "All")
        ) {
          tier[t].push(
            <img
              src={`http://www.smitetierlist.com/gods/${g.god.name
                .toLowerCase()
                .split(" ")
                .join("")}.jpg`}
              className={`item-container ${g.god.class}`}
              key={g.god.name}
              title={g.god.god}
              draggable
              onDragStart={e => this.onDragStart(e, g.god.name)}
              alt={g.god.name}
            />
          );
        }
        return "";
      });
      return "";
    });

    return (
      <>
        <Container>
          <Row className="text-center auth">
            <Col>
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
            </Col>
            <Col className="email-parent">
              <span className="email">
                {this.state.user ? `${this.state.user.email}` : "Sign In"}
              </span>
            </Col>
          </Row>
          <Row className="text-center">
            <Col>
              <Button
                className="btn btn-primary"
                id="submit"
                onClick={this.submitList}
              >
                Submit
              </Button>
            </Col>
            <Col>
              {/*variant="outline-danger" instead of className="btn btn-danger"*/}
              <Button className="btn btn-danger" onClick={this.resetList}>
                Reset
              </Button>
            </Col>
            <Col>
              <DropdownButton
                title={this.state.page}
                onSelect={this.handlePubOrPriv}
              >
                <Dropdown.Item eventKey="Public">Public</Dropdown.Item>
                <Dropdown.Item eventKey="Private">Private</Dropdown.Item>
              </DropdownButton>
            </Col>
            <Col>
              <DropdownButton
                title={this.state.class}
                onSelect={this.handleClassType}
              >
                <Dropdown.Item eventKey="All">All</Dropdown.Item>
                <Dropdown.Item eventKey="Mage">Mage</Dropdown.Item>
                <Dropdown.Item eventKey="Hunter">Hunter</Dropdown.Item>
                <Dropdown.Item eventKey="Assassin">Assassin</Dropdown.Item>
                <Dropdown.Item eventKey="Warrior">Warrior</Dropdown.Item>
                <Dropdown.Item eventKey="Guardian">Guardian</Dropdown.Item>
              </DropdownButton>
            </Col>
            <Col>
              <DropdownButton
                title={this.state.mode}
                onSelect={this.handleModeType}
              >
                <Dropdown.Item eventKey="Duel">Duel</Dropdown.Item>
                <Dropdown.Item eventKey="Joust">Joust</Dropdown.Item>
                <Dropdown.Item eventKey="Conquest">Conquest</Dropdown.Item>
              </DropdownButton>
            </Col>
          </Row>
          <Row className="tier-list">
            <Col>
              {Object.keys(tier).map(t => (
                <Row key={t}>
                  <Col className={`tier tier-label`} id={t} xs={1}>
                    {t.includes("p")
                      ? `${t[0].toUpperCase()}+`
                      : t.toUpperCase()}
                  </Col>
                  <Col
                    className={`tier drop-area`}
                    id={t}
                    onDragOver={e => this.onDragOver(e)}
                    onDrop={e => this.onDrop(e, t)}
                  >
                    {tier[t]}
                  </Col>
                </Row>
              ))}
            </Col>
          </Row>
        </Container>
        <Container>
          <Modal
            isOpen={this.state.showModal}
            onRequestClose={this.handleCloseModal}
            contentLabel="Error"
            style={customStyles}
          >
            <h3>{this.state.message}</h3>
            <button className="btn btn-primary" onClick={this.handleCloseModal}>
              Ok
            </button>
          </Modal>
        </Container>
      </>
    );
  }
}

export default Landing;
