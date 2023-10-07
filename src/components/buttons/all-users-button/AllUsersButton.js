import React from "react";
import { Link } from "react-router-dom";
import "./AllUsersButton.css";

function AllUsersButton() {
  return (
    <div className="allUsersBtnContainer">
      <Link to="/users">See all the users</Link>
    </div>
  );
}

export default AllUsersButton;
