import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import God from "../God/God";
import "./Tier.css";

const Tier = props => {
  return (
    <>
      <Col className={`tier-label ${props.tierClass}`} xs={1}>
        {props.tierLabel}
      </Col>
      <Col className="tier-container" xs={props.width - 2}>
        <div id={`${props.tierClass}`} className={`tier ${props.tierClass}`}>
          {props.array[0]
            ? props.array.map((god, i) => {
                return (
                  <God
                    god={god.god.name}
                    class={god.god.class}
                    tier={props.tier}
                    i={i}
                  />
                );
              })
            : "Empty"}
        </div>
      </Col>
    </>
  );
};

export default Tier;
