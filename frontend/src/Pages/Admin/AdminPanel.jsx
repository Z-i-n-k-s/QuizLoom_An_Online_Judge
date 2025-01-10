import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import { faChalkboardUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Adminpanel = () => {
  return (
    <div className="flex h-screen">
      {/* Side Bar */}
      <div className="w-1/4 bg-white text-gray-800 p-6 fixed h-full shadow-lg dark:bg-gray-800 dark:text-white">
        <h2 className="text-2xl font-bold mb-8 text-center mt-16">Admin Panel</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to={"dashboard"}

                className="flex items-center gap-2 block p-3 text-lg rounded-md hover:bg-gray-700 hover:text-white border-b"
              >
                <FontAwesomeIcon icon={faClipboard} />
                Dashboard
              </Link>
            </li>
            <li>
            <Link
                to={"teachers"}
                className="flex items-center gap-2 block p-3 text-lg rounded-md hover:bg-gray-700 hover:text-white border-b"
              >
                <FontAwesomeIcon icon={faChalkboardUser} />
                Teachers
              </Link>
            </li>
            <li>
              <Link
                to="logout"
                className="flex items-center gap-2 block p-3 text-lg rounded-md hover:bg-gray-700 hover:text-white border-b"
              >
                <FontAwesomeIcon icon={faRightFromBracket} />
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      
      {/* Main Content */}
      <div className="ml-[25%] w-[75%] p-5 bg-gray-200">
        <Outlet />
      </div>
    </div>
  );
};

export default Adminpanel;
