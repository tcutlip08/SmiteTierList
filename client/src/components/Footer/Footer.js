import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
      <nav className="Footer">
        <Link to="/">
          <b>Home</b>
        </Link>
        <Link to="/main">
          <b>Main</b>
        </Link>
      </nav>
    );
  }
}

export default Footer;
