import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Student } from "./pages/Student";
import { AddStudent } from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Student />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/edit-student/:id" element={<EditStudent />} />
      </Routes>
    </Router>
  );
}

export default App;
