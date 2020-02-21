import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import God from "../../components/God/God";
import "./Landing.css";

class Landing extends Component {
  state = {
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
    // console.log(process.env.REACT_APP_OKTA_ORG_URL);
    this.getGods();
  }

  componentDidUpdate() {
    // console.log(this.state.tier);
  }

  getGods() {
    axios
      .get("/api/gods")
      .then(res => {
        // console.log(res.data[0]);
        // console.log(res.data[0].rank[0].gods[0]);
        this.seperateGodByTier(res.data);
      })
      .catch(err => {
        console.log(err);
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
      let average = 0;
      for (let r = 0; r < god.rank.length; r++) {
        let rank = god.rank[r];
        average = average + rank.gods[g].rank;
      }
      if (Math.round(average / god.rank.length) === 1) {
        tier.d.push({ god: god });
      } else if (Math.round(average / god.rank.length) === 2) {
        tier.c.push({ god: god });
      } else if (Math.round(average / god.rank.length) === 3) {
        tier.b.push({ god: god });
      } else if (Math.round(average / god.rank.length) === 4) {
        tier.bp.push({ god: god });
      } else if (Math.round(average / god.rank.length) === 5) {
        tier.a.push({ god: god });
      } else if (Math.round(average / god.rank.length) === 6) {
        tier.ap.push({ god: god });
      } else if (Math.round(average / god.rank.length) === 7) {
        tier.s.push({ god: god });
      } else if (Math.round(average / god.rank.length) === 8) {
        tier.sp.push({ god: god });
      } else if (Math.round(average / god.rank.length) === 9) {
        tier.ss.push({ god: god });
      } else {
        tier.none.push({ god: god });
      }
    }
    this.setState({ tier: tier });
  }

  submitList = () => {
    let tier = [];
    let keys = Object.keys(this.state.tier);
    let values = Object.values(this.state.tier);
    for (let i = 0; i < keys.length; i++) {
      for (let g = 0; g < values[i].length; g++) {
        if (keys[i] === "none") {
        } else if (keys[i] === "ss") {
          tier.push({ data: values[i][g], tier: 9 });
        } else if (keys[i] === "sp") {
          tier.push({ data: values[i][g], tier: 8 });
        } else if (keys[i] === "s") {
          tier.push({ data: values[i][g], tier: 7 });
        } else if (keys[i] === "ap") {
          tier.push({ data: values[i][g], tier: 6 });
        } else if (keys[i] === "a") {
          tier.push({ data: values[i][g], tier: 5 });
        } else if (keys[i] === "bp") {
          tier.push({ data: values[i][g], tier: 4 });
        } else if (keys[i] === "b") {
          tier.push({ data: values[i][g], tier: 3 });
        } else if (keys[i] === "c") {
          tier.push({ data: values[i][g], tier: 2 });
        } else if (keys[i] === "d") {
          tier.push({ data: values[i][g], tier: 1 });
        }
      }
    }
    this.updateGodTier(tier);
    // console.log(tier);
  };

  updateGodTier(tier) {
    axios
      .put("/api/gods", { data: tier[0] })
      .then(res => {
        tier.splice(0, 1);
        if (tier[0]) {
          this.updateGodTier(tier);
        } else {
          console.log(res);
          return;
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

  render() {
    return (
      <Container>
        <div id="tierlist">
          <Row>
            <button
              className="btn btn-primary"
              id="submit"
              onClick={this.submitList}
            >
              Submit
            </button>
          </Row>
          <Row>
            <button className="btn btn-primary" onClick={this.resetList}>
              Reset
            </button>
          </Row>
          <Row>
            <Col>
              <div id="ss-container" className="tiercontainer">
                <div className="tier-label ss">SS</div>
                <div id="ss" className="tier ss ">
                  {this.state.tier.ss[0]
                    ? this.state.tier.ss.map((god, i) => {
                        return (
                          <God
                            god={god.god.name}
                            class={god.god.class}
                            tier="ss"
                            i={i}
                          />
                        );
                      })
                    : "Empty"}
                </div>
              </div>
            </Col>
            <Col>
              <div id="new-container" className="tiercontainer">
                <div className="tier-label new">New</div>
                <div id="new" className="tier new ">
                  {this.state.tier.new[0]
                    ? this.state.tier.new.map((god, i) => {
                        return (
                          <God
                            god={god.god.name}
                            class={god.god.class}
                            tier="new"
                            i={i}
                          />
                        );
                      })
                    : "Empty"}
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="tiercontainer">
              <div className="tier-label splus">S+</div>
              <div id="splus" className="tier splus ">
                {this.state.tier.sp[0]
                  ? this.state.tier.sp.map((god, i) => {
                      return (
                        <God
                          god={god.god.name}
                          class={god.god.class}
                          tier="sp"
                          i={i}
                        />
                      );
                    })
                  : "Empty"}
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="tiercontainer">
              <div className="tier-label s">S</div>
              <div id="s" className="tier s ">
                {this.state.tier.s[0]
                  ? this.state.tier.s.map((god, i) => {
                      return (
                        <God
                          god={god.god.name}
                          class={god.god.class}
                          tier="s"
                          i={i}
                        />
                      );
                    })
                  : "Empty"}
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="tiercontainer">
              <div className="tier-label aplus">A+</div>
              <div id="aplus" className="tier aplus ">
                {this.state.tier.ap[0]
                  ? this.state.tier.ap.map((god, i) => {
                      return (
                        <God
                          god={god.god.name}
                          class={god.god.class}
                          tier="ap"
                          i={i}
                        />
                      );
                    })
                  : "Empty"}
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="tiercontainer">
              <div className="tier-label a">A</div>
              <div id="a" className="tier a ">
                {this.state.tier.a[0]
                  ? this.state.tier.a.map((god, i) => {
                      return (
                        <God
                          god={god.god.name}
                          class={god.god.class}
                          tier="a"
                          i={i}
                        />
                      );
                    })
                  : "Empty"}
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="tiercontainer">
              <div className="tier-label bplus">B+</div>
              <div id="bplus" className="tier bplus ">
                {this.state.tier.bp[0]
                  ? this.state.tier.bp.map((god, i) => {
                      return (
                        <God
                          god={god.god.name}
                          class={god.god.class}
                          tier="bp"
                          i={i}
                        />
                      );
                    })
                  : "Empty"}
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="tiercontainer">
              <div className="tier-label b">B</div>
              <div id="b" className="tier b ">
                {this.state.tier.b[0]
                  ? this.state.tier.b.map((god, i) => {
                      return (
                        <God
                          god={god.god.name}
                          class={god.god.class}
                          tier="b"
                          i={i}
                        />
                      );
                    })
                  : "Empty"}
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="tiercontainer">
              <div className="tier-label c">C</div>
              <div id="c" className="tier c ">
                {this.state.tier.c[0]
                  ? this.state.tier.c.map((god, i) => {
                      return (
                        <God
                          god={god.god.name}
                          class={god.god.class}
                          tier="c"
                          i={i}
                        />
                      );
                    })
                  : "Empty"}
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="tiercontainer">
              <div className="tier-label d">D</div>
              <div id="d" className="tier d ">
                {this.state.tier.d[0]
                  ? this.state.tier.d.map((god, i) => {
                      return (
                        <God
                          god={god.god.name}
                          class={god.god.class}
                          tier="d"
                          i={i}
                        />
                      );
                    })
                  : "Empty"}
              </div>
            </Col>
          </Row>
          <Row id="gods" className="">
            {this.state.tier.none[0] ? (
              this.state.tier.none.map((god, i) => {
                return (
                  <Col>
                    <God
                      god={god.god.name}
                      class={god.god.class}
                      tier="none"
                      i={i}
                    />
                  </Col>
                );
              })
            ) : (
              <Col>Empty</Col>
            )}
          </Row>
          <div id="blog"></div>
        </div>
      </Container>
    );
  }
}

export default Landing;
