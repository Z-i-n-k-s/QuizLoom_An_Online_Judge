import React from "react";
import { motion } from "framer-motion";
import Student from "../../../assets/student.jpg";
import AboutUs5 from "../../../assets/About Us5.webp";
import AboutUs4 from "../../../assets/AboutUs4.jpg";
import Teacher from "../../../assets/tchr.webp";

const slideInFromLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
};

const slideInFromRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
};

const AboutUs = () => {
  return (
    <div className="w-full   ">
      {/* Hero Section */}
      <div
        className="w-full h-[40vh] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${AboutUs5})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white px-10">
          <motion.h1
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            About Us
          </motion.h1>
          <motion.p
            className="text-lg text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Welcome to Quizloom, the ultimate platform for enhancing classroom
            learning through fun, interactive and engaging quizzes!
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container dark::bg-black dark::text-white mx-auto py-14 px-6">
        <motion.h1
          className="py-8 text-3xl font-semibold text-center "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Preparing Students to Achieve Success
        </motion.h1>

        {/* Section 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2  dark::bg-black dark::text-white items-center gap-10 py-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInFromLeft}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-2xl font-semibold  mb-4">
              Developing Confident and Successful Learners
            </h2>
            <p className=" leading-relaxed">
              Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
              suscipit laboriosam, nisi ut al. Ut enim ad minima veniam, quis nostrum
              exercitationem ullam corporis suscipit laboriosam, nisi ut al.
            </p>
          </motion.div>
          <motion.div
            className="flex justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInFromRight}
            transition={{ duration: 0.7 }}
          >
            <img
              src={AboutUs4}
              alt="Student"
              className="max-w-full rounded-lg shadow-lg"
            />
          </motion.div>
        </div>

        {/* Section 2 */}
        <div className="grid grid-cols-1 dark::bg-black dark::text-white sm:grid-cols-2 items-center gap-10 py-10">
          <motion.div
            className="flex justify-center order-last sm:order-first"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInFromLeft}
            transition={{ duration: 0.7 }}
          >
            <img
              src={Student}
              alt="Student"
              className="max-w-full rounded-lg shadow-lg"
            />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInFromRight}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-2xl font-semibold  mb-4">
              Enjoy Learning with a Unique Classroom Experience
            </h2>
            <p className=" leading-relaxed">
              Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
              suscipit laboriosam, nisi ut al. Ut enim ad minima veniam, quis nostrum
              exercitationem ullam corporis suscipit laboriosam, nisi ut al.
            </p>
          </motion.div>
        </div>

        {/* Section 3 */}
        <div className="grid grid-cols-1 dark::bg-black dark::text-white sm:grid-cols-2 items-center gap-10 py-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInFromLeft}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-2xl font-semibold  mb-4">
              Passionate Teachers That Make a Difference
            </h2>
            <p className=" leading-relaxed">
              Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
              suscipit laboriosam, nisi ut al. Ut enim ad minima veniam, quis nostrum
              exercitationem ullam corporis suscipit laboriosam, nisi ut al.
            </p>
          </motion.div>
          <motion.div
            className="flex justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInFromRight}
            transition={{ duration: 0.7 }}
          >
            <img
              src={Teacher}
              alt="Teacher"
              className="max-w-full rounded-lg shadow-lg"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};


export default AboutUs;

