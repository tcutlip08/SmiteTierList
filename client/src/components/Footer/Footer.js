import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const NavBar = props => {
  useEffect(() => {
    console.log("Inside useEffect");
    console.log(props);
  });
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary ">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <Link
          to="/"
          className="navbar-brand"
          style={{ color: "white", fontFamily: "Nova Round" }}
        >
          <img
            src={Logo}
            style={{ maxHeight: "2em", paddingRight: "1em" }}
            alt="Tesla Owner's App Logo"
          />
          Tesla Owner's Dashboard
        </Link>
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0"></ul>
        <div className="form-inline my-2 my-lg-0">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <Link to="/new-car" className="nav-link">
                Add New Car <span className="sr-only">(current)</span>
              </Link>
            </li>
            {props.isAuthed ? (
              <li className="nav-item active">
                <Link
                  to="/auth"
                  className="nav-link"
                  onClick={() => {
                    props.setIsAuthed(false);
                  }}
                >
                  Log Out <span className="sr-only">(current)</span>
                </Link>
              </li>
            ) : (
              <li className="nav-item active">
                <Link to="/auth" className="nav-link">
                  Sign In <span className="sr-only">(current)</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
