import React, { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import FirstSetting from "./components/FirstSetting.jsx";
import Title from "./components/Title.jsx";
import Subjects from "./components/SubjectComponents/Subjects.jsx";

import SubjectDetail from "./components/SubjectComponents/SubjectDetail.jsx";

import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import "./libs/fire.js";
import Tasks from "./components/tasksComponent/Tasks.jsx";

export default function App() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [message, setMessage] = useState("");
  const mess = "";
  const loginButton = (
    <input
      //className={}
      type="button"
      value="ログイン"
      onClick={() => login()}
    />
  );
  const login = () => {
    // ポップアップによるログイン
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(result.user.email);
        setMessage(
          "ようこそ" +
            result.user.displayName +
            "(" +
            result.user.email +
            ")さん"
        );
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/*" element={<Title loginButton={loginButton} />} />
        </Routes>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/subjects/*" element={<SubjectDetail />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </HashRouter>
    </div>
  );
}
