
import { Outlet } from 'react-router-dom';
import Sidebar2, { SidebarProvider2 } from '../Shared/Sidebar/TeacherSidebar';

const TeacherPanel = () => {
   return (
  <SidebarProvider2>
    <div className="min-h-screen bg-gray-200 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <Sidebar2 />
      {/* Main Content */}
      <div className="flex-1 ml-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  </SidebarProvider2>
);

}

export default TeacherPanel