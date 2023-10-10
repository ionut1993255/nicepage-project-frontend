import React from "react";
import { Link } from "react-router-dom";
import "./DenyDeleteUserButton.css";

function DenyDeleteUserButton({ onClick }) {
  return (
    <div className="denyDeleteUserBtnContainer">
      <Link to="/users" onClick={onClick}>
        Cancel
      </Link>
    </div>
  );
}

export default DenyDeleteUserButton;
