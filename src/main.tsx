import App from "./App";
import ReactDOM from "react-dom/client";
import React from "react";
import "./index.css";
import { Router } from "wouter";
import useLocationHook from "wouter/use-location";
import "vite/modulepreload-polyfill";

const root = document.getElementById("root") as HTMLElement;
ReactDOM.hydrateRoot(
  root,
  <React.StrictMode>
    <Router hook={useLocationHook}>
      <App />
    </Router>
  </React.StrictMode>
);
