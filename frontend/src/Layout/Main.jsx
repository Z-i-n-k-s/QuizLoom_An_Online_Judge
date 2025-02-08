import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";


const Main = () => {
  const location = useLocation();


 
  const noHeader = location.pathname.includes("login") || location.pathname.includes("sign-up");

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-black dark:bg-gray-900 dark:text-white">
    
      {!noHeader && <Navbar />}

      <Outlet />
    </div>
  );
};

export default Main;
