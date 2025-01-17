import { Outlet } from "react-router-dom";
import Sidebar from "../Shared/Sidebar/SideBar";


const AdminPanel = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-6 p-5 bg-gray-200 dark:bg-gray-900">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
