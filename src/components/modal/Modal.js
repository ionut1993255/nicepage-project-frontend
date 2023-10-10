import React from "react";
import DenyDeleteUserButton from "../buttons/deny-delete-user-button/DenyDeleteUserButton";
import AcceptDeleteUserButton from "../buttons/accept-delete-user-button/AcceptDeleteUserButton";
import "./Modal.css";

function Modal({ onClose, onClick }) {
  return (
    <div className="modal">
      <p>Are you sure you want to delete this user?</p>
      <hr />
      <div className="acceptDenyBtnContainer">
        <DenyDeleteUserButton onClick={onClose} />
        <AcceptDeleteUserButton onClick={onClick} />
      </div>
    </div>
  );
}

export default Modal;
