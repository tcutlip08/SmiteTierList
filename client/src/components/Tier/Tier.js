import React from "react";
// import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import God from "../God/God";
import "./Tier.css";

const Tier = props => {
  if (props.tierClass !== "new") {
    return (
      <>
        <Col className={`tier-label ${props.tierClass}`} xs={1}>
          {props.tierLabel}
        </Col>
        <Col className="tier-container">
          <div id={`${props.tierClass}`} className={`tier ${props.tierClass}`}>
            {props.array[0]
              ? props.array.map((god, i) => {
                  return (
                    <God
                      god={god.god.name}
                      class={god.god.class}
                      tier={props.tier}
                      key={i}
                      i={i}
                    />
                  );
                })
              : "Empty"}
          </div>
        </Col>
      </>
    );
  } else {
    return (
      <>
        <Col className={`tier-label ${props.tierClass}`} xs={1}>
          {props.tierLabel}
        </Col>
        <Col className="tier-container">
          <div id={`${props.tierClass}`} className={`tier ${props.tierClass}`}>
            {props.array[0]
              ? props.array.map((god, i) => {
                  return (
                    <God
                      god={god.god.name}
                      class={god.god.class}
                      tier={props.tier}
                      key={i}
                      i={i}
                    />
                  );
                })
              : "Empty"}
          </div>
        </Col>
      </>
    );
  }
};

export default Tier;
