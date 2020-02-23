import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import God from "../God/God";
import "./Tier.css";

const Tier = props => {
  return (
    <>
      <Col className="tiercontainer" xs={props.width}>
        <div className={`tier-label ${props.tier}`}>{props.tier}</div>
        <div id={`${props.tier}`} className={`tier ${props.tier}`}>
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
