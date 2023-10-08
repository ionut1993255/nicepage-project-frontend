import React from "react";
import { Link } from "react-router-dom";
import "./DeleteUserButton.css";

function DeleteUserButton() {
  return (
    <div className="deleteUserBtnContainer">
      <Link to="#">Delete</Link>
    </div>
  );
}

export default DeleteUserButton;
