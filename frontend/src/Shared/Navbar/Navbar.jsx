import { Link, useLocation } from "react-router-dom";
import { useTheme } from "./ThemeContext";
import ReactSwitch from "react-switch";
import { useAuth } from "../AuthContext/AuthContext";



const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth(); // Access user data
  const location = useLocation();
 ;
  const isHomePage = location.pathname === "/"; // Check if current page is Home
  
  return (
    <div className="navbar bg-white text-black dark:bg-gray-800 dark:text-white fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="flex-1">
        <a className="p-4 text-black dark:text-white text-2xl font-bold ml-12">QuizLoom</a>
      </div>

      <div className="flex-none gap-6 items-center">
        {/* Show  About Us links only when logged out and on the Home page */}
        {!user && isHomePage && (
          <ul className="flex space-x-4">
            
            <li>
              <Link to="/aboutus" className="hover:underline">
                About Us
              </Link>
              <Link to={"/login"} className="hover:underline btn">
            Sign In
          </Link>
            </li>
          </ul>
        )}
       
        {/* Dark Mode Toggle */}
        <ReactSwitch
          checked={theme === "dark"}
          onChange={toggleTheme}
          offColor="#bbb"
          onColor="#333"
          uncheckedIcon={false}
          checkedIcon={false}
          className="transition-all"
        />

        
         {/* User Profile Avatar */}
         
      </div>
    </div>
  );
};

export default Navbar;
