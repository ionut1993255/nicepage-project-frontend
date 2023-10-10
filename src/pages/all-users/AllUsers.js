import React, { useEffect, useState } from "react";
import UsersPageHeader from "../../components/headers/users-page-header/UsersPageHeader";
import UpdateUserButton from "../../components/buttons/update-user-button/UpdateUserButton";
import DeleteUserButton from "../../components/buttons/delete-user-button/DeleteUserButton";
import Overlay from "../../components/overlay/Overlay";
import Modal from "../../components/modal/Modal";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import "./AllUsers.css";

function AllUsers() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data.users)) {
          setUserData(data.users);
        } else {
          console.error(
            "Invalid data format. Expected an array but received:",
            data
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function deleteUser(id) {
    axios.delete(`http://127.0.0.1:8000/api/users/${id}/delete`).then((res) => {
      alert(res.data.message);
      hideModalAndOverlay();
    });
  }

  function displayModalAndOverlay(userId) {
    setSelectedUserId(userId);
    setShowOverlay(true);
    setShowModal(true);
  }

  function hideModalAndOverlay() {
    setShowModal(false);
    setShowOverlay(false);
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <div style={{ flex: "1" }}>
        <UsersPageHeader />
        {loading ? (
          <p className="load">Loading...</p>
        ) : (
          <div className="container">
            {userData.length > 0 ? (
              userData.map((user) => (
                <div key={user.id} className="card">
                  <img
                    className="card-background"
                    src={`http://127.0.0.1:8000/storage/${user.image}`}
                    alt="people"
                  />
                  <div className="card-content">
                    <div className="card-content--container">
                      <p className="card-description">
                        Id: <span>{user.id}</span>
                      </p>
                      <p className="card-description">
                        Name: <span>{user.name}</span>
                      </p>
                      <p className="card-description">
                        Email: <span>{user.email}</span>
                      </p>
                      <p className="card-description">
                        Consent:{" "}
                        <span>{user.consent === 1 ? "True" : "False"}</span>
                      </p>
                      <div className="updateDeleteBtnContainer">
                        <UpdateUserButton user={user} />
                        <DeleteUserButton
                          onClick={() => displayModalAndOverlay(user.id)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="noUserFoundMessage">
                No user found! Maybe you would like to add one?
              </p>
            )}
          </div>
        )}
      </div>
      {showOverlay ? <Overlay /> : false}
      {showModal ? (
        <Modal
          onClose={hideModalAndOverlay}
          onClick={() => deleteUser(selectedUserId)}
        />
      ) : (
        false
      )}

      <Footer style={{ marginTop: "auto" }} />
    </div>
  );
}

export default AllUsers;
