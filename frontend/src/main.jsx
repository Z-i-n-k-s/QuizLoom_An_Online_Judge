import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import {
  RouterProvider,
} from "react-router-dom";
import { router } from "./Routes/Routes";
import { ThemeProvider } from "./Shared/Navbar/ThemeContext"; // Your theme context
import { Provider } from "react-redux";
import { store } from "./store/store";

 // Import the AuthProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <Provider store={store}>
      <ThemeProvider> 
        <RouterProvider router={router} />
      </ThemeProvider>
</Provider>
  </React.StrictMode>
);
