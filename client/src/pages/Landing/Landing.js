import React, { Component } from "react";
import Modal from "react-modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
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
        this.setState({
          page: "Public",
          showModal: true,
          message: "You must sign in to access this content"
        });
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
        this.getPubTierList();
      });
  }

  sepPrivTierList(gods) {
    let tier = this.emptyTier();

    for (let g = 0; g < gods.length; g++) {
      let god = gods[g]._id;
      let modeRank = gods[g].mode[this.state.mode.toLowerCase()];

      let rank = this.testValRank(modeRank);
      tier[rank].push({ god: god });
    }
    this.setState({ tier: tier });
  }

  sepPubTierList(gods) {
    let tier = this.emptyTier();

    for (let g = 0; g < gods.length; g++) {
      let mode = this.state.mode.toLowerCase();
      let god = gods[g];
      let users = 0;
      let average = 0;
      for (let r = 0; r < god.rank.length; r++) {
        let rank = god.rank[r];
        if (rank.gods[g].mode[mode] !== 0) {
          users++;
          average = average + rank.gods[g].mode[mode];
        }
      }
      let rank = this.testValRank(Math.round(average / users));
      tier[rank].push({ god: god });
    }
    this.setState({ tier: tier });
  }

  testValRank(val) {
    if (val === 1) {
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
      let keys = Object.keys(this.state.tier);
      let values = Object.values(this.state.tier);
      for (let i = 0; i < keys.length; i++) {
        for (let g = 0; g < values[i].length; g++) {
          if (keys[i] === "none") {
            tier.push({ data: values[i][g], rank: 0 });
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
    axios
      .put(`/api/user/${this.state.user._id}`, {
        _id: tier[0].data.god._id,
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
          this.refreshUserData();
        }
      })
      .catch(err => {
        // console.log(err);
      });
  }

  refreshUserData() {
    axios
      .get(`/api/user/${this.state.user._id}`)
      .then(res => {
        this.setState({ user: res.data, loop: false });
      })
      .catch(err => {
        // console.log(err);
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
    // console.log(response)
    axios
      .get(
        "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" +
          response.uc.id_token
      )
      .then(res => {
        axios
          .get(`/api/user/google/${res.data.sub}`)
          .then(res => {
            this.setState({ user: res.data, loop: false });
          })
          .catch(err => {
            axios
              .put(`/api/user/google`, {
                email: res.data.email,
                sub: res.data.sub
              })
              .then(res => {
                this.setState({ user: res.data, loop: false });
                this.push_new_ID_into_god_array(res.data._id, res.data.gods);
              })
              .catch(err => {
                // console.log(err);
              });
          });
      })
      .catch(err => {
        // console.log(err);
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
          // console.log(err);
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
    this.setState({ class: evt, loop: false });
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
                <Dropdown.Item eventKey="Conquest">Conquest</Dropdown.Item>
                <Dropdown.Item eventKey="Joust">Joust</Dropdown.Item>
                <Dropdown.Item eventKey="Duel">Duel</Dropdown.Item>
              </DropdownButton>
            </Col>
          </Row>
          <Row className="tier-list">
            <Col>
              {Object.keys(tier).map(t => (
                <Row key={t}>
                  <Col className="tier tier-label" xs={1}>
                    {t.includes("p")
                      ? `${t[0].toUpperCase()}+`
                      : t.toUpperCase()}
                  </Col>
                  <Col
                    className="tier drop-area"
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
