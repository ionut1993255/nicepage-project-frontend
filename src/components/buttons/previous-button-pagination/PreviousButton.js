import React from "react";
import "./PreviousButton.css";

const PreviousButton = ({ onClick, disabled }) => (
  <button onClick={onClick} disabled={disabled} className="previousBtn">
    &#171;
  </button>
);

export default PreviousButton;
