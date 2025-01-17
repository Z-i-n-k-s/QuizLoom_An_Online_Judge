import { useContext, createContext, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import { faChalkboardUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
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
    <aside
      className={`mt-20 h-screen fixed top-0 left-0 ${expanded ? "w-64" : "w-16"} bg-white dark:bg-gray-800 dark:text-white border-r shadow-sm transition-width duration-300`}
    >
      <nav className="h-full flex flex-col">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`}
            alt="Logo"
          />
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <ul className="flex-1 px-3 space-y-4">
          <SidebarItem
            icon={<FontAwesomeIcon icon={faClipboard} />}
            text="Dashboard"
            to="/dashboard"
          />
          <SidebarItem
            icon={<FontAwesomeIcon icon={faChalkboardUser} />}
            text="Teachers"
            to="/teachers"
          />
          <SidebarItem
            icon={<FontAwesomeIcon icon={faRightFromBracket} />}
            text="Logout"
            to="/logout"
          />
        </ul>
      </nav>
    </aside>
  );
}

function SidebarItem({ icon, text, to }) {
  const { expanded } = useSidebar();

  return (
    <li
      className="relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-gray-800 hover:text-gray-200 text-gray-600 dark:hover:bg-gray-700 dark:text-gray-300"
    >
      <Link to={to} className="flex items-center gap-3 w-full">
        {icon}
        <span
          className={`transition-all ${expanded ? "ml-3 w-52" : "ml-0 w-0 opacity-0"} group-hover:opacity-100`}
        >
          {text}
        </span>
      </Link>
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
