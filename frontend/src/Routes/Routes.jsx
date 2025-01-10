import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
// import Home from "../Pages/Home/Home";
import Teachers from "../Pages/Admin/Teachers";
import Dashboard from "../Pages/Admin/Dashboard";
import LandingPage from "../Pages/Shared/LandingPage/LandingPage";
import Adminpanel from "../Pages/Admin/AdminPanel";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "admin-panel",
        element: <Adminpanel />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "teachers",
            element: <Teachers />,
          },
        ],
      },
    ],
  },
]);
