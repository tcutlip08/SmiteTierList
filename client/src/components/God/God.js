import React from "react";
import gods from "../../assets/img/Gods";
import "./God.css";

const God = (props) => {
  return (
    <>
      {/* <img
        src={`http://www.smitetierlist.com/gods/${
          props.god ? props.god.toLowerCase().split(" ").join("") : ""
        }.jpg`}
        className={`god-card ${props.class}`}
        data-name={props.god}
        data-class={props.class}
        data-tier={props.tier}
        data-index={props.i}
        key={props.i}
        title={props.god}
        alt={props.god}
      /> */}
      <div
        className={`god-card ${props.class}`}
        data-name={props.god}
        data-class={props.class}
        data-tier={props.tier}
        data-index={props.i}
        key={props.i}
        title={props.god}
        alt={props.god}
      >
        {props.god}
      </div>
    </>
  );
};

export default God;
