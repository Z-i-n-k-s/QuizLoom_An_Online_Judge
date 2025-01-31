import { toast, ToastContainer } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../../../api/Api";


const LogOut = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLogout = async () => {
      try {
        setLoading(true); // Show the loader
        const response = await apiClient.logout();

        if (response?.success) {
            console.log("Logout Successful", response);
          toast.success("Logged out successfully",{ position: "top-center" });
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          const errorMessage = response?.message || "Logout failed!";
          toast.error(errorMessage, { position: "top-center" });
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        toast.error(errorMessage, { position: "top-center" });
      } finally {
        setLoading(false); // Hide the loader after the logout process
      }
    };

    handleLogout();
  }, [navigate]);

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
