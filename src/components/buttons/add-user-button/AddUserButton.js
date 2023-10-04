import React from "react";
import { Link } from "react-router-dom";
import "./AddUserButton.css";

function AddUserButton() {
  return (
    <div className="addUserBtnContainer">
      <Link to="/">Add User</Link>
    </div>
  );
}

export default AddUserButton;
