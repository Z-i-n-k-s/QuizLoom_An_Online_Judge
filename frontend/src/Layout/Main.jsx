import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";


const Main = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-black dark:bg-gray-900 dark:text-white">
      <Navbar />
      <Outlet />
      <Footer />
     
    </div>
  );
};

export default Main;
