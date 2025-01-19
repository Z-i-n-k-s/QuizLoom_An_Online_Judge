import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'

import {
 
  RouterProvider,
} from "react-router-dom";
import { router } from "./Routes/Routes";
import { ThemeProvider } from "./Shared/Navbar/ThemeContext";
import { SidebarProvider } from "./Pages/Shared/Sidebar/SideBar";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  {/* <div className="max-w-screen-xlmx-auto">
  <RouterProvider router={router} />
  </div> */}

  <ThemeProvider>
  <SidebarProvider>

        <RouterProvider router={router} />
      </SidebarProvider>
  </ThemeProvider>

  </React.StrictMode>
);
