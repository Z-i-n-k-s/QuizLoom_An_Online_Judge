import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import apiClient from "../api/Api";
import Context from "../context";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { setUserDetails } from "../store/userSlice";

const Main = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);

  // Loading state for fetching user details
  const [loading, setLoading] = useState(true);

  const fetchUserDetails = async () => {
    try {
      setLoading(true); // Start loading
      const result = await apiClient.getUserById();
    //  console.log("res fetch ",result)
      if (result) {
        dispatch(setUserDetails(result));
      }
     // console.log("User details:", result);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false); // End loading after fetching
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

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
