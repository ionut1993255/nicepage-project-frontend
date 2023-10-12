import React from "react";
import "./NextButton.css";

const NextButton = ({ onClick, disabled }) => (
  <button onClick={onClick} disabled={disabled} className="nextBtn">
    &#187;
  </button>
);

export default NextButton;
