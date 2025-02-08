import { IoIosArrowRoundForward } from "react-icons/io";
import bg1 from "../../../assets/bannerbg1.jpg";
import bg2 from "../../../assets/bannerbg2.jpg"
//import HeroPng from "../../../assets/hero.png";
import {  motion } from "framer-motion";
import PopularCourses from "./PopularCategories";
import JoinUs from "./JoinUs";
import WhyQL from "./WhyQL";

export const FadeUp = (delay) => {
    return {
      initial: {
        opacity: 0,
        y: 50,
      },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 100,
          duration: 0.5,
          delay: delay,
          ease: "easeInOut",
        },
      },
    };
  };

const LandingPage = () => {
    return (
        <section className="bg-light overflow-hidden relative">
      {/* Hero Content */}

  <div className="container grid grid-cols-1 md:grid-cols-2 mt-10 pl-20 min-h-[80vh] relative">  
    {/* Text Section */}
    <div className="flex flex-col justify-center py-14 md:py-0 relative z-20">
      <div className="text-center md:text-left space-y-10 lg:max-w-[500px]">
        <motion.h1
          variants={FadeUp(0.6)}
          initial="initial"
          animate="animate"
          className="text-3xl lg:text-5xl font-bold !leading-snug"
        >
          World Best Virtual{" "}
          <span className="text-btnbg dark:text-secondary">Learning</span> Network Education
          eLearning
        </motion.h1>
        <motion.div
          variants={FadeUp(0.8)}
          initial="initial"
          animate="animate"
          className="flex justify-center md:justify-start"
        >
          <button className="inline-block bg-btnbg text-white font-semibold rounded-lg hover:bg-secondary duration-200 dark:bg-secondary dark:hover:bg-btnbg shadow-md hover:shadow-lg flex items-center gap-2 group py-2 px-6">
            Get Started
            <IoIosArrowRoundForward className="text-xl group-hover:translate-x-2 group-hover:-rotate-45 duration-300" />
          </button>
        </motion.div>
      </div>
     
    </div>
      {/* Hero Image Section */}
      <div className="relative flex justify-center items-center">
      <motion.img
        src={bg1}
        animate={{ y: [150, 10, 100] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="max-w-sm w-64 rounded-t-[40px] rounded-br-[40px] border-l-[6px] border-b-[6px] border-blue-900 shadow-2xl dark:border-secondary"
      />
      <motion.img
        src={bg2}
        animate={{ x: [0, 100, 0] }}
        transition={{ duration: 5, delay: 1, repeat: Infinity }}
        className="max-w-sm w-64 rounded-t-[40px] rounded-br-[40px] border-l-[6px] border-b-[6px] border-blue-900 shadow-2xl dark:border-secondary"
      />
    </div>

   
  </div>
      
          {/* Popular Courses Section */}
          <div>
            <PopularCourses />
            <WhyQL></WhyQL>
            <JoinUs></JoinUs>
            
          </div>
        </section>
      );
      
};

export default LandingPage;