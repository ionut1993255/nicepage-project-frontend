import React from "react";
import { Link } from "react-router-dom";
import AddUserButton from "../../buttons/add-user-button/AddUserButton";
import "./UsersPageHeader.css";

function UsersPageHeader() {
  return (
    <div className="usersPageHeader">
      <div className="backToHomeBtnContainer">
        <Link to="/">&larr; Home</Link>
      </div>
      <AddUserButton />
      <Link to="/users" className="allUsersBtn">
        All Users &rarr;
      </Link>
    </div>
  );
}

export default UsersPageHeader;
