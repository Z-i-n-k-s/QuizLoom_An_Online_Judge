
import { Outlet } from 'react-router-dom';

import  { SidebarProvider1 } from '../Shared/Sidebar/StudentSidebar';
import Sidebar1 from '../Shared/Sidebar/StudentSidebar';

const StudentPanel = () => {
  return (
    <SidebarProvider1>
      <div className="min-h-screen bg-gray-200 dark:bg-gray-900">
        <div className="flex">
          {/* Sidebar */}
          <Sidebar1 />
          {/* Main Content */}
          <div className="flex-1 ml-6 p-5">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider1>
  );
}  

export default StudentPanel