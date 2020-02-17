import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import God from "../../components/God/God";
import "./Landing.css";

class Landing extends Component {
  state = { gods: "" };

  componentDidMount() {
    this.getGods();
  }

  componentDidUpdate() {
    console.log(this.state.gods);
  }

  getGods() {
    axios
      .get("/api/gods")
      .then(res => {
        this.setState({ gods: res.data });
      })
      .catch(err => {
        console.log(err);
      });
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
                  Empty
                </div>
              </div>
              <div id="new-container" className="tiercontainer">
                <div className="tier-label new">New</div>
                <div id="new" className="tier new ">
                  Empty
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <div className="tiercontainer">
              <div className="tier-label splus">S+</div>
              <div id="splus" className="tier splus ">
                Empty
              </div>
            </div>
          </Row>
          <Row>
            <div className="tiercontainer">
              <div className="tier-label s">S</div>
              <div id="s" className="tier s ">
                Empty
              </div>
            </div>
          </Row>
          <Row>
            <div className="tiercontainer">
              <div className="tier-label aplus">A+</div>
              <div id="aplus" className="tier aplus ">
                Empty
              </div>
            </div>
          </Row>
          <Row>
            <div className="tiercontainer">
              <div className="tier-label a">A</div>
              <div id="a" className="tier a ">
                Empty
              </div>
            </div>
          </Row>
          <Row>
            <div className="tiercontainer">
              <div className="tier-label bplus">B+</div>
              <div id="bplus" className="tier bplus ">
                Empty
              </div>
            </div>
          </Row>
          <Row>
            <div className="tiercontainer">
              <div className="tier-label b">B</div>
              <div id="b" className="tier b ">
                Empty
              </div>
            </div>
          </Row>
          <Row>
            <div className="tiercontainer">
              <div className="tier-label c">C</div>
              <div id="c" className="tier c ">
                Empty
              </div>
            </div>
          </Row>
          <Row>
            <div className="tiercontainer">
              <div className="tier-label d">D</div>
              <div id="d" className="tier d ">
                Empty
              </div>
            </div>
          </Row>
          <Row id="gods" className="">
            {this.state.gods[0]
              ? this.state.gods.map(godClass => {
                  return (
                    <div className={godClass.class}>
                      {godClass.name.map(god => {
                        return <God god={god} class={godClass.class} />;
                      })}
                    </div>
                  );
                })
              : "Fuck"}

            <div id="lastupdated">Last Updated: 2019-11-14 10:52:25</div>
          </Row>
          <div id="blog"></div>
        </div>
      </Container>
    );
  }
}

export default Landing;
