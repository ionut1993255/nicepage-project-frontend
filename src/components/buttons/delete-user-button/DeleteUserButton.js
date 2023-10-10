import React from "react";
import { Link } from "react-router-dom";
import "./DeleteUserButton.css";

function DeleteUserButton({ onClick }) {
  const handleDeleteClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className="deleteUserBtnContainer">
      <Link to="#" onClick={handleDeleteClick}>
        Delete
      </Link>
    </div>
  );
}

export default DeleteUserButton;
