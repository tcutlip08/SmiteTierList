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
    modal: {
      message: "",
      show: false,
      cancelBtn: false,
      btnVal: ""
    },
    troll: {
      checking: false,
      godArray: [],
      currentUser: 0,
      userInfo: "",
      totalUsers: 0
    },
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
        if (this.state.troll.checking) {
          this.setTrollGodArray(res.data);
        } else {
          if (this.state.page === "Public") {
            this.sepPubTierList(res.data);
          } else if (this.state.page === "Private") {
            if (this.state.user) {
              this.sepPrivTierList(res.data);
            } else {
              this.handleOpenModal(
                "You must sign in to access this content",
                false
              );
              this.setState({
                page: "Public"
              });
            }
          }
        }
      })
      .catch(err => {
        // console.log(err);
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
        if (god.rank.length > 0 && rank.mode[mode] !== 0 && !rank._id.banned) {
          users++;
          average = average + rank.mode[mode];
        }
        return "";
      });
      let rank = this.testValRank(Math.round(average / users));
      tier[rank].push({ god: god });
      return "";
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
        return "";
      });
      return "";
    });
    this.setState({ tier: tier });
  }

  startCheckForTrolls = () => {
    this.setState({
      troll: {
        checking: true,
        godArray: [],
        currentUser: 0,
        totalUsers: 0
      }
    });
    this.getGodList();
  };

  endCheckForTrolls = () => {
    this.setState({
      troll: {
        checking: false,
        godArray: [],
        currentUser: 0,
        totalUsers: 0,
        loop: false
      }
    });
    this.getGodList();
  };

  setTrollGodArray = gods => {
    let troll = this.state.troll;
    troll.godArray = gods;
    troll.totalUsers = gods[0].rank.length;
    this.setState({
      troll: troll
    });
    this.displayTroll();
  };

  displayTroll() {
    let tier = this.emptyTier();
    let troll = this.state.troll;
    let userInfo = troll.godArray[0].rank[troll.currentUser]._id;
    troll.userInfo = userInfo;
    this.setState({ troll: troll });
    this.state.troll.godArray.map(god => {
      let mode = this.state.mode.toLowerCase();
      let rank = this.testValRank(
        god.rank[this.state.troll.currentUser].mode[mode]
      );
      tier[rank].push({ god: god });
      return "";
    });
    this.setState({ tier: tier });
  }

  trollFound = () => {
    this.handleOpenModal(
      "You're about to ruin someones day, Are you sure?",
      true
    );
    this.areYouSure("troll");
    this.trollConfirmed();
  };

  trollConfirmed = () => {
    let troll = this.state.troll;
    let user = troll.godArray[0].rank[troll.currentUser]._id;
    if (!user.mod) {
      axios
        .put(`/api/user/ban/${user._id}`)
        .then(res => {})
        .catch(err => {
          // console.log(err);
        });
    } else {
      this.handleOpenModal("You can't ban another Mod");
    }
  };

  nextTroll = val => {
    let troll = this.state.troll;
    if (val === "last" || troll.currentUser + val >= troll.totalUsers - 1) {
      troll.currentUser = troll.totalUsers - 1;
    } else {
      troll.currentUser += val;
    }
    this.displayTroll();
  };

  prevTroll = val => {
    let troll = this.state.troll;
    if (val === "first" || troll.currentUser - val <= 0) {
      troll.currentUser = 0;
    } else {
      troll.currentUser -= val;
    }
    this.setState({ troll: troll });
    this.displayTroll();
  };

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

  areYouSure(funcCall) {
    if (this.state.modal.btnVal === "") {
      setTimeout(() => {
        this.areYouSure(funcCall);
      }, 1000);
    } else {
      if (this.state.modal.btnVal) {
        if (funcCall === "submit") {
          this.submitListConfirmed(this.state.modal.btnVal);
        } else if (funcCall === "troll") {
          this.trollConfirmed(this.state.modal.btnVal);
        }
      }
      this.setState({
        modal: { show: false, message: "", cancelBtn: false, btnVal: "" }
      });
    }
  }

  submitList = () => {
    if (this.state.user) {
      this.handleOpenModal(
        "This is going to over write current data! Are you sure?",
        true
      );
      this.areYouSure("submit");
    } else {
      this.handleOpenModal("You must sign in to access this content", false);
    }
  };

  submitListConfirmed() {
    let tier = [];
    Object.keys(this.state.tier).map((key, k) => {
      let rank = 9 - k;
      Object.values(this.state.tier).map((value, v) => {
        value.map(god => {
          if (k === v) {
            tier.push({ god: god.god, rank: rank });
          }
          return "";
        });
        return "";
      });
      return "";
    });
    this.updateGodTier(tier);
  }

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
          this.handleOpenModal("This may take a minute...", false);
          this.updateGodTier(tier);
        } else {
          this.handleCancelButton();
        }
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
    axios
      .get(
        "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" +
          response.uc.id_token
      )
      .then(res => {
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
    this.setState({ user: "", page: "Public", troll: { checking: false } });
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

  handleOpenModal = (message, cancelBtn) => {
    this.setState({
      modal: { show: true, message: message, cancelBtn: cancelBtn, btnVal: "" }
    });
  };

  handleOkButton = () => {
    this.setState({
      modal: { show: false, message: "", cancelBtn: false, btnVal: true }
    });
  };

  handleCancelButton = () => {
    this.setState({
      modal: { show: false, message: "", cancelBtn: false, btnVal: false }
    });
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
      Object.keys(this.state.tier).map(t => {
        tier[t] = tier[t].sort((a, b) => (a.key > b.key ? 1 : -1));
        return "";
      });
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
                className="btn btn-secondary"
                id="submit"
                onClick={this.submitList}
              >
                Submit
              </Button>
            </Col>
            <Col>
              {/*variant="outline-danger" instead of className="btn btn-danger"*/}
              <Button className="btn btn-secondary" onClick={this.resetList}>
                Reset
              </Button>
            </Col>
            {this.state.user.mod ? (
              this.state.troll.checking ? (
                <Col>
                  <Button
                    className="btn btn-secondary"
                    onClick={this.endCheckForTrolls}
                  >
                    Stop Search
                  </Button>
                </Col>
              ) : (
                <Col>
                  <Button
                    className="btn btn-secondary"
                    onClick={this.startCheckForTrolls}
                  >
                    Check 4 Trolls
                  </Button>
                </Col>
              )
            ) : (
              ""
            )}
            <Col>
              <DropdownButton
                variant="secondary"
                title={this.state.page}
                onSelect={this.handlePubOrPriv}
              >
                <Dropdown.Item eventKey="Public">Public</Dropdown.Item>
                <Dropdown.Item eventKey="Private">Private</Dropdown.Item>
              </DropdownButton>
            </Col>
            <Col>
              <DropdownButton
                variant="secondary"
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
                variant="secondary"
                title={this.state.mode}
                onSelect={this.handleModeType}
              >
                <Dropdown.Item eventKey="Duel">Duel</Dropdown.Item>
                <Dropdown.Item eventKey="Joust">Joust</Dropdown.Item>
                <Dropdown.Item eventKey="Conquest">Conquest</Dropdown.Item>
              </DropdownButton>
            </Col>
          </Row>
          {this.state.troll.checking ? (
            <>
              <Row className="text-center">
                <Col xs={1}>
                  <Button
                    className="btn btn-secondary"
                    id="submit"
                    onClick={() => this.prevTroll("first")}
                  >
                    {`First`}
                  </Button>
                </Col>
                <Col xs={1}>
                  <Button
                    className="btn btn-secondary"
                    id="submit"
                    onClick={() => this.prevTroll(5)}
                  >
                    {`5-`}
                  </Button>
                </Col>
                <Col xs={2}>
                  <Button
                    className="btn btn-secondary"
                    id="submit"
                    onClick={() => this.prevTroll(1)}
                  >
                    {`< Prev`}
                  </Button>
                </Col>
                <Col xs={4}>
                  <Button
                    className="btn btn-secondary"
                    id="submit"
                    onClick={this.trollFound}
                  >
                    {`Troll`}
                  </Button>
                </Col>
                <Col xs={2}>
                  <Button
                    className="btn btn-secondary"
                    id="submit"
                    onClick={() => this.nextTroll(1)}
                  >
                    {`Next >`}
                  </Button>
                </Col>
                <Col xs={1}>
                  <Button
                    className="btn btn-secondary"
                    id="submit"
                    onClick={() => this.nextTroll(5)}
                  >
                    {`5+`}
                  </Button>
                </Col>
                <Col xs={1}>
                  <Button
                    className="btn btn-secondary"
                    id="submit"
                    onClick={() => this.nextTroll("last")}
                  >
                    {`Last`}
                  </Button>
                </Col>
              </Row>
              <Row className="troll text-center">
                {this.state.troll.userInfo ? (
                  <>
                    <Col>{`User: ${this.state.troll.currentUser + 1} of ${
                      this.state.troll.totalUsers
                    }`}</Col>
                    <Col>{this.state.troll.userInfo.email}</Col>
                    <Col>
                      {this.state.troll.userInfo.mod ? "Moderator" : "User"}
                    </Col>
                    <Col>
                      {this.state.troll.userInfo.banned
                        ? "Banned"
                        : "Not Banned"}
                    </Col>
                  </>
                ) : (
                  "Loading"
                )}
              </Row>
            </>
          ) : (
            ""
          )}
          <Row className="tier-list">
            <Col>
              {Object.keys(tier).map(t => (
                <Row key={t}>
                  <Col className={`tier tier-label`} id={`${t}-label`} xs={1}>
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
            isOpen={this.state.modal.show}
            onRequestClose={this.handleCancelButton}
            contentLabel="Error"
            style={customStyles}
          >
            <Row>
              <h3>{this.state.modal.message}</h3>
            </Row>
            <Row>
              <Col>
                <button
                  className="btn btn-secondary"
                  onClick={this.handleOkButton}
                >
                  Ok
                </button>
              </Col>
              {this.state.modal.cancelBtn ? (
                <Col>
                  <button
                    className="btn btn-secondary"
                    onClick={this.handleCancelButton}
                  >
                    Cancel
                  </button>
                </Col>
              ) : (
                ""
              )}
            </Row>
          </Modal>
        </Container>
      </>
    );
  }
}

export default Landing;
