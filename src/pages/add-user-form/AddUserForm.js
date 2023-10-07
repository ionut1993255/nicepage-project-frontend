import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormHeader from "../../components/headers/form-header/FormHeader";
import manImage from "../../images/man-2425121_640.jpg";
import ButtonSubmit from "../../components/buttons/button-submit/ButtonSubmit";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import "./AddUserForm.css";

function AddUserForm() {
  const navigate = useNavigate();

  const [selectedType, setSelectedType] = useState("desktopMode");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileValue, setSelectedFileValue] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    image: "",
    consent: false,
  });

  const handleInput = (e) => {
    e.persist();

    let value = null;
    switch (e.target.type) {
      case "checkbox":
        value = e.target.checked ? 1 : 0;
        break;
      default:
        value = e.target.value;
    }

    setUser({ ...user, [e.target.name]: value });
  };

  const saveUser = (e) => {
    e.preventDefault();

    if (
      user.name === "" ||
      user.email === "" ||
      !selectedFile ||
      !user.consent
    ) {
      alert("Please fill in all fields and accept the Terms of Service!");
      return;
    }

    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("image", selectedFile);
    formData.append("consent", user.consent);

    const config = {
      headers: {
        Accept: "multipart/form-data",
        "Content-type": "multipart/form-data; charset=UTF-8",
      },
    };

    axios
      .post("http://127.0.0.1:8000/api/users/", formData, config)
      .then((res) => {
        alert(res.data.message);
        navigate("/users");
      })
      .catch((err) => console.error("Error:", err.message));
  };

  return (
    <div>
      <FormHeader setSelectedType={setSelectedType} />
      <section>
        <div id="form" className={selectedType}>
          <img src={manImage} alt="man" className="people" />
          <form onSubmit={saveUser}>
            <div className="nameContainer">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={user.name}
                id="name"
                placeholder="Enter your Name"
                onChange={handleInput}
              />
            </div>

            <div className="emailContainer">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                id="email"
                placeholder="Enter a valid email address"
                onChange={handleInput}
              />
            </div>

            <div className="imageContainer">
              <label htmlFor="image">Upload an image</label>
              <input
                type="file"
                name="image"
                value={selectedFileValue}
                id="image"
                accept="image/*"
                onChange={(e) => {
                  setSelectedFileValue(e.target.value);
                  setSelectedFile(e.target.files[0]);
                }}
              />
            </div>

            <div className="consentContainer">
              <input
                type="checkbox"
                name="consent"
                value={user.consent}
                id="consent"
                onChange={handleInput}
              />
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

export default AddUserForm;
