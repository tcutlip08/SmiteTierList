import React from "react";
import "./God.css";

const God = props => {
  return (
    <>
      {/* <div className={`god-card ${props.class}`}> */}
      <img
        src={`http://www.smitetierlist.com/gods/${props.god
          .toLowerCase()
          .split(" ")
          .join("")}.jpg`}
        className={`god-card ${props.class}`}
        data-name={props.god}
        data-class={props.class}
        data-tier={props.tier}
        data-index={props.i}
        key={props.i}
        title={props.god}
        alt={props.god}
      />
      {/* </div> */}
    </>
  );
};

export default God;
