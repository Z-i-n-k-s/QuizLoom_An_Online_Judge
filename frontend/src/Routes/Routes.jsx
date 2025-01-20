import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
// import Home from "../Pages/Home/Home";
import Teachers from "../Pages/Admin/Teachers";
import Dashboard from "../Pages/Admin/Dashboard";
import LandingPage from "../Pages/Shared/LandingPage/LandingPage";
import Adminpanel from "../Pages/Admin/AdminPanel";
import SignUp from "../Pages/Shared/signUp/SignUp";

import LogIn from "../Pages/Shared/login/logIn";
import StudentPanel from "../Pages/Student/StudentPanel";

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
        path: "login",
        element : <LogIn />
    },
    {
        path: "sign-up",
        element: <SignUp />
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
      {
        path: "student-panel",
        element: <StudentPanel />,
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
