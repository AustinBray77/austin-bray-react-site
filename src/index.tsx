import React from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import "./CSS/global.css";
import "./CSS/animations.css";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
