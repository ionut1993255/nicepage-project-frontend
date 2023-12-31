import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import AllUsers from "../pages/all-users/AllUsers";
import AddUserForm from "../pages/add-user-form/AddUserForm";
import UpdateUserForm from "../pages/update-user-form/UpdateUserForm";

function MyRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<AllUsers />} />
      <Route path="/add-user" element={<AddUserForm />} />
      <Route path="/update-user/:id/update" element={<UpdateUserForm />} />
    </Routes>
  );
}

export default MyRouter;
