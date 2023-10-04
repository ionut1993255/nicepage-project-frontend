import React, { useState } from "react";
import { Link } from "react-router-dom";
import HomeHeader from "../../components/headers/home-header/HomeHeader";
import manImage from "../../images/man-2425121_640.jpg";
import ButtonSubmit from "../../components/buttons/button-submit/ButtonSubmit";
import Footer from "../../components/footer/Footer";
import "./Form.css";

function Form() {
  const [selectedType, setSelectedType] = useState("desktopMode");

  return (
    <div>
      <HomeHeader setSelectedType={setSelectedType} />
      <section>
        <div id="form" className={selectedType}>
          <img src={manImage} alt="man" className="people" />
          <form action="">
            <div className="nameContainer">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Enter your Name" />
            </div>

            <div className="emailContainer">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter a valid email address"
              />
            </div>

            <div className="imageContainer">
              <label htmlFor="image">Upload an image</label>
              <input type="file" id="image" accept="image/*" />
            </div>

            <div className="consentContainer">
              <input type="checkbox" id="consent" />
              <label htmlFor="consent">
                I accept the <Link to="/">Terms of Service</Link>
              </label>
            </div>
            <ButtonSubmit />
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Form;
