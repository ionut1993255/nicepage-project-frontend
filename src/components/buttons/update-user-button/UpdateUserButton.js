import React from "react";
import { Link } from "react-router-dom";
import "./UpdateUserButton.css";

function UpdateUserButton(props) {
  const id = props.user?.id;

  if (id === undefined) {
    return null;
  }

  return (
    <div className="updateUserBtnContainer">
      <Link to={`/update-user/${id}/update`}>Edit</Link>
    </div>
  );
}

export default UpdateUserButton;
