import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home.jsx";
import FirstSetting from "./component/FirstSetting.jsx";
import Title from "./component/Title.jsx";
export default function App() {
  return (
    <div>
      <Title />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/setting" element={<FirstSetting />} className="" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
