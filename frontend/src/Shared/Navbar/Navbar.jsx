import { Link } from "react-router-dom";
import { useTheme } from "./ThemeContext";
import ReactSwitch from "react-switch"; // Import ReactSwitch

const Navbar = () => {
  const { theme, toggleTheme } = useTheme(); // Access theme and toggleTheme from context

  return (
    <div className="navbar bg-white text-black dark:bg-gray-800 dark:text-white fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="flex-1">
        <a className="p-4 text-black dark:text-white text-2xl font-bold ml-12">QuizLoom</a>
      </div>

      <div className="m-5">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/aboutus" className="hover:underline">
              About Us
            </Link>
          </li>
          <li>
            <Link to={"/admin-panel/dashboard"} className="hover:underline">
              Admin
            </Link>
          </li>
          <li>
            <Link to={"/student-panel/student-dashboard"} className="hover:underline">
              Student
            </Link>
          </li>
          <li>
            <Link to={"/teacher-panel/teacher-dashboard"} className="hover:underline">
              Teacher
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex-none gap-6 items-center">
        {/* Use ReactSwitch to toggle dark/light mode */}
        <ReactSwitch
          checked={theme === "dark"} 
          onChange={toggleTheme} 
          offColor="#bbb" 
          onColor="#333" 
          uncheckedIcon={false} 
          checkedIcon={false} 
          className="transition-all"
        />
        <div className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              alt="User Avatar"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
      
            <Link to={"/login"} className="hover:underline btn">
              SignIn
            </Link>
        
      </div>
    </div>
  );
};

export default Navbar;