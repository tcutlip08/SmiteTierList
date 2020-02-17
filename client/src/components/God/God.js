import React from "react";

const God = props => {
  return (
    <>
      <span id={`${props.god}-container`}>
        <img
          src={`http://www.smitetierlist.com/gods/${props.god
            .toLowerCase()
            .split(" ")
            .join("")}.jpg`}
          id={`${props.god}`}
          className="godimage tooltipstered"
          data-name={props.god}
          data-className={props.class}
          alt={props.god}
        />
      </span>
    </>
  );
};

export default God;
