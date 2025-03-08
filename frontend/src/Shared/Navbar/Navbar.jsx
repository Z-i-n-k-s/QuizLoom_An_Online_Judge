import { Link, useLocation } from "react-router-dom";
import { useTheme } from "./ThemeContext";
import ReactSwitch from "react-switch";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  return (
    <div className="navbar bg-white text-black dark:bg-gray-800 dark:text-white fixed top-0 left-0 right-0 z-50 shadow-md flex items-center px-12 py-4">
      {/* Logo (Always Black) - Stays on Left */}
      <Link to="/" className="text-2xl font-bold text-black dark:text-white ml-10">
        QuizLoom
      </Link>

      {/* Navigation Links (Only for Home Page) */}
      {isHomePage && (
        <div className="ml-auto flex items-center space-x-6"> 
          <Link
            to="/"
            className={`${
              location.pathname === "/" ? "text-blue-600 dark:text-secondary" : "text-black dark:text-white"
            }`}
          >
            Home
          </Link>
          <Link
            to="/aboutus"
            className={`${
              location.pathname === "/aboutus" ? "text-blue-600 dark:text-secondary" : "text-black dark:text-white"
            }`}
          >
            About Us
          </Link>
          <Link
            to="/login"
            className="btn bg-btnbg dark:bg-secondary border-none text-white px-4 py-2 rounded-xl"
          >
            Sign In
          </Link>
        </div>
      )}

      {/* Dark Mode Toggle (Always Visible) */}
      <div className="ml-auto">
        <ReactSwitch
          checked={theme === "dark"}
          onChange={toggleTheme}
          offColor="#bbb"
          onColor="#333"
          uncheckedIcon={false}
          checkedIcon={false}
          className="transition-all"
        />
      </div>
    </div>
  );
};

export default Navbar;
