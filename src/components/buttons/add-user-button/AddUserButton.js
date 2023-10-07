import React from "react";
import { Link } from "react-router-dom";
import "./AddUserButton.css";

function AddUserButton() {
  return (
    <div className="addUserBtnContainer">
      <Link to="/add-user">Add User</Link>
    </div>
  );
}

export default AddUserButton;
