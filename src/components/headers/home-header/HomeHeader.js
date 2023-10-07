import React from "react";
import { Link } from "react-router-dom";
import "./HomeHeader.css";

function HomeHeader() {
  return (
    <header>
      <div className="homePageHeader">
        <Link to="/" className="logo">
          <img
            src="https://csite.nicepage.com/Images/logo-w.png"
            alt="nicepage-logo"
          />
        </Link>
        <div className="homePageBtnHeaderContainer">
          <Link to="/">Home</Link>
          <Link to="/users">Users</Link>
        </div>
      </div>
    </header>
  );
}

export default HomeHeader;
