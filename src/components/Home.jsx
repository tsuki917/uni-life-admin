
import React, { useState } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  getRedirectResult,
  signInWithPopup,
} from "firebase/auth";
import "../libs/fire.js";
import { useHistory } from "react-router-dom";

import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>home</h1>
      <Link to="/setting">setting</Link>
    </div>
  );
}
