
import { Outlet } from 'react-router-dom';

import  { SidebarProvider1 } from '../Shared/Sidebar/StudentSidebar';
import Sidebar1 from '../Shared/Sidebar/StudentSidebar';

const StudentPanel = () => {
    return (
        <SidebarProvider1>
        <div className="flex h-screen">
          {/* Sidebar */}
         
    <Sidebar1 />
          {/* Main Content */}
          <div className="flex-1 ml-6 p-5 bg-gray-200 dark:bg-gray-900">
            <Outlet />
          </div>
        </div>
        </SidebarProvider1>
      );
}

export default StudentPanel