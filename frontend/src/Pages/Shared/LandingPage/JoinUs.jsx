import {  FaUserPlus } from "react-icons/fa";
import BgImage from "../../../assets/bg.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const bgStyle = {
  backgroundImage: `url(${BgImage})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const JoinUs = () => {
  return (
    <section className="bg-[#f7f7f7]">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        style={bgStyle}
        className="container py-24 md:py-48"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex flex-col justify-center"
        >
          <div className="text-center space-y-4 lg:max-w-[430px] mx-auto">
            <h1 className="text-4xl font-bold !leading-snug dark:text-black">
              Join the Community of 450K+ Students
            </h1>
            <p className="dark:text-gray-700">
              Become part of an engaging community and enhance your learning experience with us.
            </p>
            <Link
              to="/login"
              className="btn bg-btnbg text-white hover:bg-secondary border-none dark:bg-secondary dark:hover:bg-btnbg !mt-8 inline-flex items-center gap-4 group"
            >
              Join Us
              <FaUserPlus className="group-hover:animate-bounce group-hover:text-lg duration-200" />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default JoinUs;
