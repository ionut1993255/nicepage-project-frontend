import React from "react";
import { Routes, Route } from "react-router-dom";
import Form from "../pages/form/Form";
import User from "../pages/user/User";

function MyRouter() {
  return (
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/users" element={<User />} />
    </Routes>
  );
}

export default MyRouter;
