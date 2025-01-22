import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";


const Main = () => {
  const location = useLocation();
  console.log(location);
  const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('sign-up')
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-black dark:bg-gray-900 dark:text-white">
      { noHeaderFooter || <Navbar />}
      <Outlet />
      {noHeaderFooter || <Footer />}
     
    </div>
  );
};

export default Main;
