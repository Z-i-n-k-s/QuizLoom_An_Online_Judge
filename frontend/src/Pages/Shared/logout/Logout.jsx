import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import apiClient from "../../../api/Api";
import { setUserDetails } from "../../../store/userSlice";


const LogOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);

  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const handleLogout = async () => {
      if (isLoggingOut) return;

      setIsLoggingOut(true);
      try {
        setLoading(true);
        const response = await apiClient.logout();

        if (response?.success) {
          dispatch(setUserDetails(null));
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");

          toast.success("Logged out successfully");
          
            navigate("/");
          
        } else {
          const errorMessage = response?.message || "Logout failed!";
          toast.error(errorMessage, { position: "top-center" });
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        toast.error(errorMessage, { position: "top-center" });
      } finally {
       
         setLoading(false); 
        
        
      }
    };

    handleLogout();
  }, [navigate, isLoggingOut, dispatch]);

  return (
    <>
    <ToastContainer position="top-center" autoClose={2000} />
      {loading && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-10">
            <div className="loader border-t-4 border-b-4 border-blue-500 w-12 h-12 rounded-full animate-spin"></div>
          </div>
        )}
    </>
  );
};

export default LogOut;
