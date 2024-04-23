import "./App.css";
import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Routers from "./routes";

import { useLocalStorage } from "@uidotdev/usehooks";

function App() {
  const [token, setToken] = useLocalStorage("CRM_TOKEN", "");
  console.log("TOKEN", token);

  return (
    <BrowserRouter>
      <Routers token={token} setToken={setToken} />
    </BrowserRouter>
  );
}

export default App;
