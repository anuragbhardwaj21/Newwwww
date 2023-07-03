import React from "react";
import { Route, Routes } from "react-router-dom";
import AddTask from "./AddTask";
import Homepage from "./Homepage";
import EditPage from "./Editpage";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/edit/:id" element={<EditPage />} />
      <Route path="/add" element={<AddTask />} />
    </Routes>
  );
};

export default MainRoutes;
