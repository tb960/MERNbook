import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../actions/authActions/logOut";
import NavbarLinks from "./navbar/NavbarLinks";
import NavbarLogo from "./navbar/NavbarLogo";

const Navbar = ({ logOut, auth: { isLoggedIn } }) => {
  let [isSidebar, setSidebar] = useState(false);
  return (
    <nav className="main__nav">
      <NavbarLogo />

      <NavbarLinks logOut={logOut} isLoggedIn={isLoggedIn} />

      <div className="hamburger-wrapper">
        <i
          className="fas fa-bars hamburger-bar"
          onClick={() => setSidebar(true)}
        ></i>
      </div>

      <div
        className="sidebar-wrapper"
        style={{
          transition: "width .4s ease-in-out",
          width: isSidebar ? "103vw" : "0vw",
          zIndex: isSidebar ? "3" : "1",
        }}
      >
        <div className="close-sidebar-wrapper">
          <i
            onClick={() => setSidebar(false)}
            className="fas fa-times close-sidebar-icon"
          ></i>
        </div>
        <div className="sidebar-links">
          <Link
            className="sidebar-link"
            style={{ display: isSidebar ? "block" : "none" }}
            to="/users"
            onClick={() => setSidebar(false)}
          >
            Users
          </Link>

          <Link
            className="sidebar-link"
            to="/topics"
            style={{ display: isSidebar ? "block" : "none" }}
            onClick={() => setSidebar(false)}
          >
            Topics
          </Link>

          <Link
            className="sidebar-link"
            to="/add-post"
            style={{ display: isSidebar && isLoggedIn ? "block" : "none" }}
            onClick={() => setSidebar(false)}
          >
            Add question
          </Link>

          <Link
            className="sidebar-link"
            to="/account"
            onClick={() => setSidebar(false)}
            style={{ display: isSidebar && isLoggedIn ? "block" : "none" }}
          >
            Account
          </Link>

          <Link
            className="sidebar-link"
            to="/dashboard"
            onClick={() => setSidebar(false)}
            style={{ display: isSidebar && isLoggedIn ? "block" : "none" }}
          >
            Dashboard
          </Link>

          <Link
            className="sidebar-link"
            to="/login"
            onClick={() => {
              logOut();
              setSidebar(false);
            }}
            style={{ display: isSidebar && isLoggedIn ? "block" : "none" }}
          >
            Log Out
          </Link>

          <Link
            className="sidebar-link"
            to="/login"
            onClick={() => setSidebar(false)}
            style={{ display: isSidebar && !isLoggedIn ? "block" : "none" }}
          >
            Log In
          </Link>

          <Link
            className="sidebar-link"
            to="/register"
            onClick={() => setSidebar(false)}
            style={{ display: isSidebar && !isLoggedIn ? "block" : "none" }}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logOut })(Navbar);
