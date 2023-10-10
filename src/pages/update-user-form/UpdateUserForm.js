import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import FormHeader from "../../components/headers/form-header/FormHeader";
import manImage from "../../images/people.jpg";
import UpdateUserButtonForm from "../../components/buttons/update-user-button-form/UpdateUserButtonForm";
import Footer from "../../components/footer/Footer";
import "./UpdateUserForm.css";

function UpdateUserForm() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [selectedType, setSelectedType] = useState("desktopMode");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileValue, setSelectedFileValue] = useState("");
  const [isNewFileSelected, setIsNewFileSelected] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    image: "",
    consent: 0,
  });

  const getImageWidth = () => {
    const smallScreenMaxWidth = 1549;

    const screenWidth =
      window.innerWidth || document.documentElement.clientWidth;

    if (screenWidth <= smallScreenMaxWidth) {
      return 364;
    }
    return 450.63;
  };

  const imageWidth = getImageWidth();

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

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/users/${id}`)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => toast.error(err.response.data.message));
  }, [id]);

  const saveUser = (e) => {
    e.preventDefault();

    if (user.name === "" || user.email === "" || !selectedFile) {
      toast.error("Please fill in all fields and accept the Terms of Service!");
      return;
    }

    const formData = new FormData();
    formData.append("_method", "PUT");
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
      .post(`http://127.0.0.1:8000/api/users/${id}/update`, formData, config)
      .then((res) => {
        toast.success(res.data.message);
        navigate("/users");
      })
      .catch((err) => {
        switch (err.response.data.status) {
          case 400:
            toast.error(err.response.data.errors);
            break;
          default:
            toast.error(err);
        }
      });
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
              <div className="imgBackendContainer">
                {isNewFileSelected ? (
                  <img
                    src={selectedFileValue && URL.createObjectURL(selectedFile)}
                    alt="people"
                    className="imgBackend"
                    style={{ width: `${imageWidth}px`, objectFit: "cover" }}
                    height={400}
                  />
                ) : user.image ? (
                  <img
                    src={
                      user.image
                        ? `http://127.0.0.1:8000/storage/${user.image}`
                        : ""
                    }
                    alt="people"
                    className="imgBackend"
                    style={{ width: `${imageWidth}px`, objectFit: "cover" }}
                    height={400}
                  />
                ) : null}
                <input
                  type="file"
                  name="image"
                  value={selectedFileValue}
                  id="image"
                  accept="image/*"
                  onChange={(e) => {
                    setSelectedFileValue(e.target.value);
                    setSelectedFile(e.target.files[0]);
                    setIsNewFileSelected(true);
                  }}
                />
              </div>
            </div>

            <div className="consentContainer">
              <input
                type="checkbox"
                name="consent"
                checked={user.consent}
                id="consent"
                onChange={handleInput}
              />
              <label htmlFor="consent">
                I accept the <Link to="#">Terms of Service</Link>
              </label>
            </div>
            <UpdateUserButtonForm />
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default UpdateUserForm;
