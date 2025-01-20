import { Outlet } from "react-router-dom";
import Sidebar, { SidebarProvider } from "../Shared/Sidebar/AdminSidebar";


const AdminPanel = () => {
  return (
    <SidebarProvider>
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-6 p-5 bg-gray-200 dark:bg-gray-900">
        <Outlet />
      </div>
    </div>
    </SidebarProvider>
  );
};

export default AdminPanel;
