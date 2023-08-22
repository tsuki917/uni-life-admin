import React, { useState } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  getRedirectResult,
  signInWithPopup,
} from "firebase/auth";
import "./fire";
import { useHistory } from "react-router-dom";

export default function Home() {
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
    // リダイレクト(調整中)
    // signInWithRedirect(auth, provider);
    // getRedirectResult(auth)
    //   .then((result) => {
    //     // This gives you a Google Access Token. You can use it to access Google APIs.
    //     const credential = GoogleAuthProvider.credentialFromResult(result);
    //     const token = credential.accessToken;

    //     // The signed-in user info.
    //     const user = result.user;
    //     // IdP data available using getAdditionalUserInfo(result)
    //     if (result.user != null) {
    //       console.log(result.user.email);
    //     }
    //   })
    //   .catch((error) => {
    //     // Handle Errors here.
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // The email of the user's account used.
    //     const email = error.customData.email;
    //     // The AuthCredential type that was used.
    //     const credential = GoogleAuthProvider.credentialFromError(error);
    //     // ...
    //   });

    // ポップアップ
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
      {loginButton}
      <h1>home</h1>
      <h2>{message}</h2>
    </div>
  );
}
