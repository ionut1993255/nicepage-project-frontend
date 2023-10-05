import React, { useEffect, useState } from "react";
import UsersPageHeader from "../../components/headers/users-page-header/UsersPageHeader";
import "./User.css";

function User() {
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
    <div>
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
                    <p className="card-description">Id: {user.id}</p>
                    <p className="card-description">Name: {user.name}</p>
                    <p className="card-description">Email: {user.email}</p>
                    <p className="card-description">
                      Consent: {user.consent === 1 ? "True" : "False"}
                    </p>
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
  );
}

export default User;
