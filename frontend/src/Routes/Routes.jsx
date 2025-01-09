import {
    createBrowserRouter,
    
  } from "react-router-dom";
import Main from "../Layout/Main";
// import Home from "../Pages/Home/Home";
import Teachers from "../Pages/Admin/Teachers";
import Dashboard from "../Pages/Admin/Dashboard";
import LandingPage from "../Pages/Shared/LandingPage/LandingPage";

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
              path: "/teachers",
              element: <Teachers />,
          },
          {
              path: "/dashboard",
              element: <Dashboard />,
          },
      ],
  },
]);
