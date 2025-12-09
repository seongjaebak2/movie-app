import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css"; // Tailwind 사용시 tailwind 포함, 아니면 일반 CSS

const root = createRoot(document.getElementById("root"));
root.render(<App />);
