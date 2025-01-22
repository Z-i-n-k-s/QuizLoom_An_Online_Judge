import { RiCodeSSlashLine } from "react-icons/ri";
import { SiTensorflow } from "react-icons/si";
import { FaDatabase } from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";
import { SiCloudflare } from "react-icons/si";
import { FaRobot } from "react-icons/fa";
import { motion } from "framer-motion";

// Updated Course Data
const Courses = [
  {
    id: 1,
    title: "Web Development",
    tag: "HTML, CSS, JavaScript",
    icon: <RiCodeSSlashLine />,
    delay: 0.2,
  },
  {
    id: 2,
    title: "Machine Learning",
    tag: "Python, TensorFlow, AI",
    icon: <SiTensorflow />,
    delay: 0.3,
  },
  {
    id: 3,
    title: "Data Structures",
    tag: "Algorithms, Problem Solving",
    icon: <FaDatabase />,
    delay: 0.4,
  },
  {
    id: 4,
    title: "Cybersecurity",
    tag: "Ethical Hacking, Security",
    icon: <MdOutlineSecurity />,
    delay: 0.5,
  },
  {
    id: 5,
    title: "Cloud Computing",
    tag: "AWS, Azure, Google Cloud",
    icon: <SiCloudflare />,
    delay: 0.6,
  },
  {
    id: 6,
    title: "Artificial Intelligence",
    tag: "AI Models, Robotics",
    icon: <FaRobot />,
    delay: 0.7,
  },
];

// Animation Variant
const SlideLeft = (delay) => ({
  initial: {
    opacity: 0,
    x: 50,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      delay: delay,
      ease: "easeInOut",
    },
  },
});

const PopularCourses = () => {
  return (
    <section className="bg-white dark:bg-gray-800">
      <div className="container mx-auto pb-14 pt-16 text-center">
       {/* Section Title */}
<h1 className="text-4xl font-bold pb-10 border-b-2 border-secondary inline-block py-4 mb-8 dark:text-secondary">
 --- Popular Categories ---
</h1>


        {/* Course Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 ">
          {Courses.map((course) => (
           <motion.div
           key={course.id}
           variants={SlideLeft(course.delay)}
           initial="initial"
           whileInView="animate"
           viewport={{ once: true }}
           className="bg-gray-100 rounded-2xl flex flex-col gap-4 items-center justify-center p-4 py-7 hover:bg-gray-300 hover:scale-110 duration-300  dark:bg-gray-600 dark:hover:shadow-xl dark:hover:shadow-gray-500"
         >
           {/* Icon */}
           <div className="text-4xl text-secondary mb-4">{course.icon}</div>
         
           {/* Title */}
           <h1 className="text-lg font-semibold text-center">{course.title}</h1>
         
           {/* Tag */}
           <p className="text-sm text-gray-600 text-center dark:text-gray-200">{course.tag}</p>
         </motion.div>
         
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;
