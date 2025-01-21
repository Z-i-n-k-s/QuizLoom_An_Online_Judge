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
import StudentDashboard from "../Pages/Student/StudentDashboard";
import MyCourses from "../Pages/Student/MyCourses";
import Results from "../Pages/Student/Results";
import Exams from "../Pages/Student/Exams";
import Announcements from "../Pages/Student/Announcements";
import TeacherPanel from "../Pages/Teacher/TeacherPanel";
import Students from "../Pages/Teacher/Students";
import Courses from "../Pages/Teacher/Courses";
import TeacherExams from "../Pages/Teacher/TeacherExams";
import TeacherResult from "../Pages/Teacher/TeacherResult";
import TeacherAnnouncement from "../Pages/Teacher/TeacherAnnouncement";

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
        element: <LogIn />
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
            path: "student-dashboard",
            element: <StudentDashboard />,
          },
          {
            path: "my-courses",
            element: <MyCourses />,
          },
          {
            path: "exams",
            element: <Exams />,
          },
          {
            path: "results",
            element: <Results />,
          },
          {
            path: "announcements",
            element: <Announcements />,
          },
        ],
      },
      {
        path: "teacher-panel",
        element: <TeacherPanel />,
        children: [
          {
            path: "teacher-dashboard",
            element: <StudentDashboard />,
          },
          {
            path: "students",
            element: <Students />,
          },
          {
            path: "teachers-courses",
            element: <Courses />,
          },
          {
            path: "teachers-exams",
            element: <TeacherExams />,
          },
          {
            path: "teachers-results",
            element: <TeacherResult />,
          },
          {
            path: "teachers-announcements",
            element: <TeacherAnnouncement />,
          },
        ],
      },
    ],
  },
]);
