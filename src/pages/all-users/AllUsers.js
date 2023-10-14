import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { downloadExcel } from "react-export-table-to-excel";
import UsersPageHeader from "../../components/headers/users-page-header/UsersPageHeader";
import UpdateUserButton from "../../components/buttons/update-user-button/UpdateUserButton";
import DeleteUserButton from "../../components/buttons/delete-user-button/DeleteUserButton";
import Overlay from "../../components/overlay/Overlay";
import Modal from "../../components/modal/Modal";
import Pagination from "../../components/pagination/Pagination";
import Footer from "../../components/footer/Footer";
import "./AllUsers.css";

function AllUsers() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const usersPerPage = 8;

  useEffect(() => {
    fetch(
      `http://127.0.0.1:8000/api/users?page=${currentPage}&perPage=${usersPerPage}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.status === 200 && Array.isArray(data.users.data)) {
          setUserData(data.users.data);
          setTotalPages(data.users.last_page);
        } else {
          console.error(
            "Invalid data format! Expected an array but received:",
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
  }, [currentPage]);

  function deleteUser(id) {
    axios
      .delete(`http://127.0.0.1:8000/api/users/${id}/delete`)
      .then((res) => {
        toast.success(res.data.message);
        hideModalAndOverlay();
      })
      .catch((err) => toast.error(err));
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

  function handleDownloadExcel() {
    if (userData.length === 0) {
      toast.error("No data to export! Please add a user!");
      return;
    }

    axios
      .get("http://127.0.0.1:8000/api/users")
      .then((res) => {
        const allUserData = res.data.users.data;

        if (!Array.isArray(allUserData)) {
          console.error(
            "Invalid data format! Expected an array but received:",
            res.data
          );
          return;
        }

        const header = ["Id", "Name", "Email", "Image", "Consent"];
        const body = allUserData.map((user) => [
          user.id,
          user.name,
          user.email,
          `http://127.0.0.1:8000/storage/${user.image}`,
          user.consent === 1 ? "True" : "False",
        ]);

        downloadExcel({
          fileName: "user_data",
          sheet: "users",
          tablePayload: {
            header,
            body,
          },
        });
        toast.success("Data exported successfully!");
      })
      .catch((error) => {
        console.error("Error fetching all data:", error);
        toast.error("Error exporting data! Please try again!");
      });
  }

  function handlePageChange(newPage) {
    setCurrentPage(newPage);
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <div style={{ flex: "1" }}>
        <UsersPageHeader handleDownloadExcel={handleDownloadExcel} />
        {!loading && !showOverlay && !showModal && userData.length === 0 && (
          <div className="noUserFoundMessageContainer">
            <p className="noUserFoundMessage">
              No user found! Maybe you would like to add one?
            </p>
          </div>
        )}
        {loading ? (
          <p className="load">Loading...</p>
        ) : (
          <div className="container">
            {userData.length > 0
              ? userData.map((user) => (
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
              : null}
          </div>
        )}
      </div>
      {!loading && !showOverlay && !showModal && userData.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      )}

      {showOverlay ? <Overlay /> : null}
      {showModal ? (
        <Modal
          onClose={hideModalAndOverlay}
          onClick={() => deleteUser(selectedUserId)}
        />
      ) : null}

      <Footer style={{ marginTop: "auto" }} />
    </div>
  );
}

export default AllUsers;
