import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
// import God from "../../components/God/God";
import Tier from "../../components/Tier/Tier";
import "./Landing.css";
require("dotenv").config();

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
    console.log(process.env.REACT_APP_OKTA_ORG_URL);
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
