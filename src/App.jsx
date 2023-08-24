import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import FirstSetting from "./components/FirstSetting.jsx";
import Title from "./components/Title.jsx";
import Subjects from "./components/SubjectComponents/Subjects.jsx";
import SubjectDetail from "./components/SubjectComponents/SubjectDetail.jsx";
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Title />} />
        </Routes>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/subjects/*" element={<SubjectDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
