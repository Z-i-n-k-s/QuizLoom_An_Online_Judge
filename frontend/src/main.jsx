import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';

import {
  RouterProvider,
} from "react-router-dom";

import { router } from "./Routes/Routes";
import { ThemeProvider } from "./Shared/Navbar/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  

  <ThemeProvider>
        <RouterProvider router={router} />
  </ThemeProvider>

  </React.StrictMode>
);
