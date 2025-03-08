import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
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
import ViewCourse from "../Pages/Teacher/viewCourse/ViewCourse"; // Import ViewCourse component
import TeacherExams from "../Pages/Teacher/TeacherExams";
import TeacherResult from "../Pages/Teacher/TeacherResult";

import AboutUs from "../Pages/Shared/aboutUs/AboutUs";
import LogOut from "../Pages/Shared/logout/Logout";
import TeacherDashboard from "../Pages/Teacher/TeacherDashboard";
import QuizUpload from "../Pages/Teacher/viewCourse/QuizUpload";

import ViewCourseStu from "../Pages/Student/viewCourse/ViewCourseStu";
import TextQuizStu from "../Pages/Student/viewCourse/TextQuizStu";
import TextUpload from "../Pages/Teacher/viewCourse/TextUpload";

import TeacherAnnouncements from "../Pages/Teacher/TeacherAnnouncements";
import CodeUpload from "../Pages/Teacher/viewCourse/CodeUpload";



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
        path: "aboutus",
        element: <AboutUs />,
      },
      {
        path: "login",
        element: <LogIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
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
          {
            path: "admin-logout",
            element: <LogOut/>,
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
            path:'view-courses-stu/:id',
            element:<ViewCourseStu></ViewCourseStu>
          },
          {

            path:'text-quiz-stu/:id',
            element: <TextQuizStu></TextQuizStu>
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
          {
            path: "student-logout",
            element: <LogOut/>,
          },
        ],
      },
      {
        path: "teacher-panel",
        element: <TeacherPanel />,
        children: [
          {
            path: "teacher-dashboard",
            element: <TeacherDashboard />,
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
            path: "teachers-courses/:id", 
            element: <ViewCourse />,
          },
          {
            path: "teachers-exams",
            element: <TeacherExams />,
          },
          {
            path: "teachers-quizupload",
            element: <QuizUpload></QuizUpload>
          },
          {
            path: "teacher-textupload",
            element: <TextUpload />,
          },
          {
            path: "teacher-codeupload",
            element: <CodeUpload></CodeUpload>
          },
          {
            path: "teachers-results",
            element: <TeacherResult />,
          },
          {
            path: "teachers-announcements",
            element: <TeacherAnnouncements />,
          },
          {
            path: "teacher-logout",
            element: <LogOut/>,
          },
        ],
      },
    ],
  },
]);
