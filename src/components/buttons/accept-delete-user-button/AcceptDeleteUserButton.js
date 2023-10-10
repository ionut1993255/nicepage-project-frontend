import React from "react";
import { Link } from "react-router-dom";
import "./AcceptDeleteUserButton.css";

function AcceptDeleteUserButton({ onClick }) {
  return (
    <div className="acceptDeleteUserBtnContainer">
      <Link to="/users" onClick={onClick}>
        Delete
      </Link>
    </div>
  );
}

export default AcceptDeleteUserButton;
