import React from "react";
import { BrowserRouter } from "react-router-dom";
import Home from "./component/Home.jsx";
const App = () => {
  return (
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
};

export default App;
