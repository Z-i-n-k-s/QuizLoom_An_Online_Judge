import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import {
  RouterProvider,
} from "react-router-dom";
import { router } from "./Routes/Routes";
import { ThemeProvider } from "./Shared/Navbar/ThemeContext"; // Your theme context
import { AuthProvider } from "./Shared/AuthContext/AuthContext";
 // Import the AuthProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   <AuthProvider>
      <ThemeProvider> 
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
