import { Outlet } from "react-router-dom";
import Sidebar, { SidebarProvider } from "../Shared/Sidebar/AdminSidebar";


const AdminPanel = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-200 dark:bg-gray-900">
        <div className="flex">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div className="flex-1 ml-6 p-5">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};


export default AdminPanel;
