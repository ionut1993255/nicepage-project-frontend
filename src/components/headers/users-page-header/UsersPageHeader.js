import React from "react";
import { Link } from "react-router-dom";
import AddUserButton from "../../buttons/add-user-button/AddUserButton";
import ExportButton from "../../buttons/export-button/ExportButton";
import "./UsersPageHeader.css";

function UsersPageHeader({ handleDownloadExcel }) {
  return (
    <div className="usersPageHeader">
      <div className="backToHomeBtnContainer">
        <Link to="/">&larr; Home</Link>
      </div>
      <AddUserButton />
      <ExportButton onClick={handleDownloadExcel} />
    </div>
  );
}

export default UsersPageHeader;
