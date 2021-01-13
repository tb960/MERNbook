import React from "react";
import { Link } from "react-router-dom";
import successity from "../../successity.png";

const NavbarLogo = () => {
  return (
    <div className="logo-wrapper">
      <Link to="/">
        <img src={successity} alt="" />
      </Link>
    </div>
  );
};

export default NavbarLogo;