import React from "react";
import "./ExportButton.css";

function ExportButton({ onClick }) {
  return <button onClick={onClick}>Export Data &#10515;</button>;
}

export default ExportButton;
