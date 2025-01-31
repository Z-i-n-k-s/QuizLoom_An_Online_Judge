import { useContext, createContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import {
  faChalkboardTeacher,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { ChevronFirst, ChevronLast } from "lucide-react";
import PropTypes from "prop-types";

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <SidebarContext.Provider value={{ expanded, setExpanded }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}

export default function Sidebar() {
  const { expanded, setExpanded } = useSidebar();

  return (
    <div className="relative">
      {/* Overlay for blurred background */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 transition-opacity duration-300 ${
          expanded
            ? "visible opacity-100 backdrop-blur-sm"
            : "invisible opacity-0 backdrop-blur-0"
        }`}
        onClick={() => setExpanded(false)} // Close sidebar when clicking on the overlay
      ></div>

      <aside
        className={`mt-0 h-screen fixed top-0 left-0 ${
          expanded ? "w-64" : "w-16"
        } bg-white dark:bg-gray-800 dark:text-white border-r shadow-sm transition-width duration-300 z-50`}
      >
        <nav className="h-full flex flex-col">
          <div className="p-4 pb-2 flex justify-between items-center">
            <div
              className={`overflow-hidden transition-all text-xl font-bold ${
                expanded ? "w-auto" : "w-0"
              } whitespace-nowrap`}
            >
              QuizLoom
            </div>
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-3 p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          <ul className="flex-1 px-3 space-y-4">
            <SidebarItem
              icon={<FontAwesomeIcon icon={faClipboard} />}
              text="Dashboard"
              to="dashboard"
            />
            <SidebarItem
              icon={<FontAwesomeIcon icon={faChalkboardTeacher} />}
              text="Teachers"
              to="teachers"
            />
            <SidebarItem
              icon={<FontAwesomeIcon icon={faRightFromBracket} />}
              text="Logout"
              to="admin-logout"
            />
          </ul>
        </nav>
      </aside>
    </div>
  );
}

function SidebarItem({ icon, text, to }) {
  const { expanded, setExpanded } = useSidebar();
  const navigate = useNavigate();
  const location = useLocation();

  // Normalize paths to ensure consistent comparison
  const normalizePath = (path) =>
    path.startsWith("/") ? path : `/admin-panel/${path}`;
  const isActive = normalizePath(location.pathname) === normalizePath(to);

  const handleClick = () => {
    setExpanded(false); // Close the sidebar
    navigate(to); // Navigate to the desired route
  };
  // const currentPath = normalizePath(location.pathname); // Normalize location pathname
  // const targetPath = normalizePath(to); // Normalize "to" path
  // const isActive1 = currentPath === targetPath; // Compare normalized paths
  // console.log("Current Path:", currentPath);
  // console.log("Target Path:", targetPath);
  // console.log("Is Active:", isActive1);

  return (
    <li
      onClick={handleClick}
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-all group ${
        isActive
          ? "bg-gray-800 text-gray-200 dark:bg-gray-700"
          : "text-gray-600 dark:text-gray-300"
      } hover:bg-gray-800 hover:text-gray-200 dark:hover:bg-gray-700`}
    >
      <button className="flex items-center gap-3 w-full text-left">
        <span
          className={`transition-all ${
            isActive ? " bg-gray-800 text-gray-300" : "" // Apply blue color to the icon if active
          }`}
        >
          {icon}
        </span>
        {expanded && (
          <span
            className={`transition-all ml-3 ${
              expanded ? "opacity-100" : "opacity-0"
            }`}
          >
            {text}
          </span>
        )}
        {!expanded && (
          <div
            className={`
          absolute left-full rounded-md px-5 py-2 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
          >
            {text}
          </div>
        )}
      </button>
    </li>
  );
}

SidebarItem.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

SidebarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
