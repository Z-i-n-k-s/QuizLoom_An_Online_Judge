import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";
import Sidebar from "../Pages/Shared/Sidebar/SideBar";

const Main = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-black dark:bg-gray-900 dark:text-white">
      {/* Navbar */}
      <Navbar />

      {/* Main content area */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-1 lg:ml-10 p-4 transition-all duration-300">
          <Outlet />
        </div>
      </div>

      {/* Footer */}
     <div className="ml-10">
     <Footer />
     </div>
    </div>
  );
};

export default Main;
