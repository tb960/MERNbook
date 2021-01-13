import React from "react";
import { Link } from "react-router-dom";

const NavbarLinks = ({ isLoggedIn, logOut }) => {
  return (
    <div className="nav-links">
      <Link to="/users" className="href__style__remove nav__link">
        Users <i className="fas fa-users"></i>
      </Link>

      <Link to="/topics" className="href__style__remove nav__link">
        Topics <i className="fas fa-comments"></i>
      </Link>

      <Link
        to="/login"
        className="href__style__remove nav__link"
        style={{ display: isLoggedIn ? "none" : "flex" }}
      >
        Log In
      </Link>

      <Link
        to="/register"
        className="href__style__remove nav__link"
        style={{ display: isLoggedIn ? "none" : "flex" }}
      >
        Sign Up
      </Link>

      <Link
        to="/account"
        className="href__style__remove nav__link"
        style={{ display: isLoggedIn ? "flex" : "none" }}
      >
        Account <i className="fas fa-address-card"></i>
      </Link>

      <Link
        to="/dashboard"
        className="href__style__remove nav__link"
        style={{ display: isLoggedIn ? "flex" : "none" }}
      >
        Dashboard <i className="fas fa-user"></i>
      </Link>

      <Link
        to="/add-post"
        className="href__style__remove nav__link"
        style={{ display: isLoggedIn ? "flex" : "none" }}
      >
        Add question <i className="fas fa-edit"></i>
      </Link>

      <Link
        to="/login"
        className="href__style__remove nav__link"
        onClick={() => logOut()}
        style={{ display: isLoggedIn ? "flex" : "none" }}
      >
        Log Out <i className="fas fa-sign-out-alt"></i>
      </Link>
    </div>
  );
};

export default NavbarLinks;