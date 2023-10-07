import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./FormHeader.css";

function FormHeader({ setSelectedType }) {
  const [activeButton, setActiveButton] = useState("desktopMode");

  const handleButtonClick = (styleType) => {
    setActiveButton(styleType);
    setSelectedType(styleType);
  };

  return (
    <header>
      <Link to="/users" className="usersPage">
        &larr; All Users
      </Link>

      <div className="previewResponsiveContainerBtns">
        <Link
          to="#"
          className={`btn previewDesktopBtn ${
            activeButton === "desktopMode" ? "active" : ""
          }`}
        >
          <img
            src="//csite.nicepage.com/Images/Site/responsive-desktop.png"
            alt="desktop"
            onClick={() => handleButtonClick("desktopMode")}
          />
        </Link>

        <Link
          to="#"
          className={`btn previewLaptopBtn ${
            activeButton === "laptopMode" ? "active" : ""
          }`}
        >
          <img
            src="//csite.nicepage.com/Images/Site/responsive-laptop.png"
            alt="laptop"
            onClick={() => handleButtonClick("laptopMode")}
          />
        </Link>

        <Link
          to="#"
          className={`btn previewTabletBtn ${
            activeButton === "tabletMode" ? "active" : ""
          }`}
        >
          <img
            src="//csite.nicepage.com/Images/Site/responsive-tablet.png"
            alt="tablet"
            onClick={() => handleButtonClick("tabletMode")}
          />
        </Link>

        <Link
          to="#"
          className={`btn previewPhoneHorizontalBtn ${
            activeButton === "horizontalPhoneMode" ? "active" : ""
          }`}
        >
          <img
            src="//csite.nicepage.com/Images/Site/responsive-phone-horizontal.png"
            alt="horizontal"
            onClick={() => handleButtonClick("horizontalPhoneMode")}
          />
        </Link>

        <Link
          to="#"
          className={`btn previewPhoneBtn ${
            activeButton === "phoneMode" ? "active" : ""
          }`}
        >
          <img
            src="//csite.nicepage.com/Images/Site/responsive-phone.png"
            alt="phone"
            onClick={() => handleButtonClick("phoneMode")}
          />
        </Link>
      </div>

      <Link to="/" className="homePage">
        Home &rarr;
      </Link>
    </header>
  );
}

export default FormHeader;
