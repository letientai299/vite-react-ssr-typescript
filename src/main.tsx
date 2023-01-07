import App from "./App";
import ReactDOM from "react-dom/client";
import React from "react";
import "./index.css";

const root = document.getElementById("root") as HTMLElement;
ReactDOM.hydrateRoot(
  root,
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
