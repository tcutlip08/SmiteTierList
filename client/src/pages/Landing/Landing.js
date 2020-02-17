import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import God from "../../components/God/God";
import "./Landing.css";

class Landing extends Component {
  state = {
    gods: "",
    tier: ""
  };

  componentDidMount() {
    this.getGods();
  }

  componentDidUpdate() {
    console.log(this.state.tier);
  }

  getGods() {
    axios
      .get("/api/gods")
      .then(res => {
        this.setState({ gods: res.data });
        this.seperateGodByTier(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  seperateGodByTier(data) {
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
    for (let c = 0; c < data.length; c++) {
      // console.log(data[c]);
      for (let g = 0; g < data[c].gods.length; g++) {
        let god = data[c].gods[g];
        // console.log(god);
        let average = 0;
        for (let r = 0; r < god.rank.length; r++) {
          average = average + god.rank[r];
        }
        if (Math.round(average / god.rank.length) === 1) {
          tier.d.push({ class: data[c].class, god: god });
        } else if (Math.round(average / god.rank.length) === 2) {
          tier.c.push({ class: data[c].class, god: god });
        } else if (Math.round(average / god.rank.length) === 3) {
          tier.b.push({ class: data[c].class, god: god });
        } else if (Math.round(average / god.rank.length) === 4) {
          tier.bp.push({ class: data[c].class, god: god });
        } else if (Math.round(average / god.rank.length) === 5) {
          tier.a.push({ class: data[c].class, god: god });
        } else if (Math.round(average / god.rank.length) === 6) {
          tier.ap.push({ class: data[c].class, god: god });
        } else if (Math.round(average / god.rank.length) === 7) {
          tier.s.push({ class: data[c].class, god: god });
        } else if (Math.round(average / god.rank.length) === 8) {
          tier.sp.push({ class: data[c].class, god: god });
        } else if (Math.round(average / god.rank.length) === 9) {
          tier.ss.push({ class: data[c].class, god: god });
        } else {
          tier.none.push({ class: data[c].class, god: god });
        }
      }
    }
    this.setState({ tier: tier });
  }
  render() {
    return (
      <Container>
        <div id="tierlist">
          <Row>
            <Col>
              <div id="ss-container" className="tiercontainer">
                <div className="tier-label ss">SS</div>
                <div id="ss" className="tier ss ">
                  {this.state.tier.ss
                    ? this.state.tier.ss.map(god => {
                        return <God god={god.god.name} class={god.class} />;
                      })
                    : "Empty"}
                </div>
              </div>
              <div id="new-container" className="tiercontainer">
                <div className="tier-label new">New</div>
                <div id="new" className="tier new ">
                  {this.state.tier.new
                    ? this.state.tier.new.map(god => {
                        return <God god={god.god.name} class={god.class} />;
                      })
                    : "Empty"}
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <div className="tiercontainer">
              <div className="tier-label splus">S+</div>
              <div id="splus" className="tier splus ">
                {this.state.tier.sp
                  ? this.state.tier.sp.map(god => {
                      return <God god={god.god.name} class={god.class} />;
                    })
                  : "Empty"}
              </div>
            </div>
          </Row>
          <Row>
            <div className="tiercontainer">
              <div className="tier-label s">S</div>
              <div id="s" className="tier s ">
                {this.state.tier.s
                  ? this.state.tier.s.map(god => {
                      return <God god={god.god.name} class={god.class} />;
                    })
                  : "Empty"}
              </div>
            </div>
          </Row>
          <Row>
            <div className="tiercontainer">
              <div className="tier-label aplus">A+</div>
              <div id="aplus" className="tier aplus ">
                {this.state.tier.ap
                  ? this.state.tier.ap.map(god => {
                      return <God god={god.god.name} class={god.class} />;
                    })
                  : "Empty"}
              </div>
            </div>
          </Row>
          <Row>
            <div className="tiercontainer">
              <div className="tier-label a">A</div>
              <div id="a" className="tier a ">
                {this.state.tier.a
                  ? this.state.tier.a.map(god => {
                      return <God god={god.god.name} class={god.class} />;
                    })
                  : "Empty"}
              </div>
            </div>
          </Row>
          <Row>
            <div className="tiercontainer">
              <div className="tier-label bplus">B+</div>
              <div id="bplus" className="tier bplus ">
                {this.state.tier.bp
                  ? this.state.tier.bp.map(god => {
                      return <God god={god.god.name} class={god.class} />;
                    })
                  : "Empty"}
              </div>
            </div>
          </Row>
          <Row>
            <div className="tiercontainer">
              <div className="tier-label b">B</div>
              <div id="b" className="tier b ">
                {this.state.tier.b
                  ? this.state.tier.b.map(god => {
                      return <God god={god.god.name} class={god.class} />;
                    })
                  : "Empty"}
              </div>
            </div>
          </Row>
          <Row>
            <div className="tiercontainer">
              <div className="tier-label c">C</div>
              <div id="c" className="tier c ">
                {this.state.tier.c
                  ? this.state.tier.c.map(god => {
                      return <God god={god.god.name} class={god.class} />;
                    })
                  : "Empty"}
              </div>
            </div>
          </Row>
          <Row>
            <div className="tiercontainer">
              <div className="tier-label d">D</div>
              <div id="d" className="tier d ">
                {this.state.tier.d
                  ? this.state.tier.d.map(god => {
                      return <God god={god.god.name} class={god.class} />;
                    })
                  : "Empty"}
              </div>
            </div>
          </Row>
          <Row id="gods" className="">
            {this.state.tier.none
              ? this.state.tier.none.map(god => {
                  return (
                    <Col>
                      <God god={god.god.name} class={god.class} />
                    </Col>
                  );
                })
              : "Empty"}
          </Row>
          <div id="blog"></div>
        </div>
      </Container>
    );
  }
}

export default Landing;
