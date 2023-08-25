import React, { useState } from "react";

import "../libs/fire.js";

import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>home</h1>
      <Link to="/setting">setting</Link>
    </div>
  );
}
