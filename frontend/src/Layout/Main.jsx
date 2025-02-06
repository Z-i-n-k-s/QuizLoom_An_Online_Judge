import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";
import { useAuth } from "../Shared/AuthContext/AuthContext"; // Adjust path if necessary

 // Adjust the path according to your file structure


const Main = () => {
  const location = useLocation();
  const { user } = useAuth(); // Access user data from AuthContext

 // console.log(location); // Debugging purposes

  // Check if the current path includes login or sign-up
  const noHeaderFooter = location.pathname.includes("login") || location.pathname.includes("sign-up");

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-black dark:bg-gray-900 dark:text-white">
       {/* Toast Container for notifications */}
       
      {/* Show Navbar unless on login or sign-up pages */}
      {noHeaderFooter || <Navbar />}

      <Outlet />

      {/* Show Footer only if the user is not logged in and not on login/sign-up pages */}
      {noHeaderFooter || !user ? <Footer /> : null}
    </div>
  );
};

export default Main;
