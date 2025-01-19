import { Link } from "react-router-dom";
import { useTheme } from "./ThemeContext";
import ReactSwitch from "react-switch"; 
import { ChevronLast, ChevronFirst } from "lucide-react";
import { useSidebar } from "../../Pages/Shared/Sidebar/SideBar";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme(); 
  const { expanded, setExpanded } = useSidebar(); 

  return (
    <div className="navbar bg-white text-black dark:bg-gray-800 dark:text-white fixed top-0 left-0 right-0 z-50 shadow-md flex justify-between items-center p-4">
  <div>
    <button
      onClick={() => setExpanded(!expanded)}
      className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
    >
      {expanded ? <ChevronFirst /> : <ChevronLast />}
    </button>
    <span className="text-2xl font-bold ml-10">QuizLoom</span>
  </div>


      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <ReactSwitch
          checked={theme === "dark"}
          onChange={toggleTheme}
          offColor="#bbb"
          onColor="#333"
          uncheckedIcon={false}
          checkedIcon={false}
          className="transition-all"
        />

        {/* Navigation Links */}
        <div className="flex gap-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/admin-panel/dashboard" className="hover:underline">
            Admin
          </Link>
          <Link to="/login" className="hover:underline">
            SignIn
          </Link>
          <Link to="/sign-up" className="hover:underline">
            SignUp
          </Link>
        </div>

        {/* User Avatar */}
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            alt="User Avatar"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
