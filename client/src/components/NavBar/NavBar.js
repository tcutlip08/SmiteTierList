import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <Link to="/">
          <b>Home</b>
        </Link>
        <Link to="/about-us">
          <b>About Us</b>
        </Link>
        <Link to="/contact-us">
          <b>Contact Us</b>
        </Link>
      </nav>
    );
  }
}

export default NavBar;
