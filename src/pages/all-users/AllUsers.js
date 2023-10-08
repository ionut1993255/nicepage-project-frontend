import React, { useEffect, useState } from "react";
import UsersPageHeader from "../../components/headers/users-page-header/UsersPageHeader";
import UpdateUserButton from "../../components/buttons/update-user-button/UpdateUserButton";
import DeleteUserButton from "../../components/buttons/delete-user-button/DeleteUserButton";
import Footer from "../../components/footer/Footer";
import "./AllUsers.css";

function AllUsers() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

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
                        <DeleteUserButton />
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
      <Footer style={{ marginTop: "auto" }} />
    </div>
  );
}

export default AllUsers;
