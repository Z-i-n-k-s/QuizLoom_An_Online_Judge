import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import apiClient from "../api/Api";
import Context from "../context";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { setUserDetails } from "../store/userSlice";
import { toast } from "react-toastify";

const Main = () => {
  const [fetching, setFetching] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);
 
  const [redirecting, setRedirecting] = useState(false);

   const loading = fetching || redirecting;

  const fetchUserDetails = async () => {
    try {
      setFetching(true); // Start loading
      const result = await apiClient.getUserById();
    //  console.log("res fetch ",result)
      if (result) {
        dispatch(setUserDetails(result));
      }
     // console.log("User details:", result);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setFetching(false); // End loading after fetching
      
    }
  };

  
  useEffect(() => {
    // Check for persisted auth tokens in localStorage
    const token = localStorage.getItem("access_token");
    const ref_token = localStorage.getItem("refresh_token");
    if (token || ref_token) {
      fetchUserDetails();
    } else {
      setFetching(false);
      navigate("/");
    }
  }, []);

    // Role-based access redirection
    useEffect(() => {
      if (user?.role) {
        let allowedPrefix = "";
        let defaultRedirect = "";
        switch (user.role) {
          case "admin":
            allowedPrefix = "/admin-panel";
            defaultRedirect = "/admin-panel/dashboard";
            break;
          case "teacher":
            allowedPrefix = "/teacher-panel";
            defaultRedirect = "/teacher-panel/teacher-dashboard"; // Adjust if needed
            break;
          case "student":
            allowedPrefix = "/student-panel";
            defaultRedirect = "/student-panel/student-dashboard";
            break;
          default:
            console.error("Invalid role");
        }
        // If the current route is outside the allowed panel, redirect.
        if (!location.pathname.startsWith(allowedPrefix)) {
          setRedirecting(true);
          toast.success(`Welcome to ${user.role.toLowerCase()} panel`);
          setTimeout(() => {
            navigate(defaultRedirect);
            setRedirecting(false);
          }, 1000);
        }
      }
    }, [user, location.pathname, navigate]);

  const noHeader = location.pathname.includes("login") || location.pathname.includes("sign-up");

  // Render a full-screen loading indicator while waiting for user details.
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-200">Loading...</p>
      </div>
    );
  }

  return (
    <Context.Provider value={{ fetchUserDetails }}>
      <div className="min-h-screen flex flex-col bg-gray-100 text-black dark:bg-gray-900 dark:text-white">
        {!noHeader && <Navbar />}
        <Outlet />
      </div>
    </Context.Provider>
  );
};

export default Main;
