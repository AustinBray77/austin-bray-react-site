import React from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import "./global.css";
import "./animations.css";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
