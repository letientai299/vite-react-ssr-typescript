import App from "./App";
import React from "react";
import "./index.css";
import {hydrateRoot} from "react-dom/client";
import Html from "./Html";

hydrateRoot(
  document,
  <React.StrictMode>
    <Html>
        <App />
    </Html>
  </React.StrictMode>
);
