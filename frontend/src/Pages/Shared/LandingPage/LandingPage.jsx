import bgImage from "../../../assets/Bg1.jpg";

const cardsData = [
    {
        id: 1,
        title: "Success Stories",
        description: "Discover how our platform has helped students achieve their educational goals.",
        image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    },
    {
        id: 2,
        title: "Top Courses",
        description: "Explore the most popular and in-demand courses that are making a difference.",
        image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    },
    {
        id: 3,
        title: "Track Your Progress",
        description: "Monitor your learning progress and track how you're improving over time.",
        image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    },
];

const popularCourses = [
    {
        id: 1,
        title: "Machine Learning Basics",
        description: "Understand the core concepts of machine learning and AI.",
        image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    },
    {
        id: 2,
        title: "Data Structures and Algorithms",
        description: "Learn how to solve problems efficiently with DSA.",
        image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    },
];

const CardSection = () => {
    return (
        <div className="py-12  bg-gray-50 text-black dark:bg-gray-800 dark:text-white shadow-md">
            <div className="flex items-center justify-center mb-8">
                <div className="pb-6 w-full border-t border-gray-400 relative">
                    <h1 className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50 dark:bg-gray-800 px-4 text-2xl font-bold">
                        Why QuizLoom?
                    </h1>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
                {cardsData.map((card) => (
                    <div
                        key={card.id}
                        className="card shadow-xl transform transition-transform duration-300 hover:scale-105 rounded-xl overflow-hidden bg-white dark:bg-gray-700"
                    >
                        <div
                            className="relative w-full h-48"
                            style={{
                                backgroundImage: `url(${card.image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        ></div>
                        <div className="card-body flex flex-col justify-center items-center text-center">
                            <h2 className="card-title text-2xl font-bold text-black dark:text-white">
                                {card.title}
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300">{card.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const PopularCourses = () => {
    return (
        <div className="bg-gray-50 text-black dark:bg-gray-800 dark:text-white py-12">
            <div className="flex items-center justify-center mb-6">
                <div className="w-full border-t border-gray-400 relative pb-6">
                    <h1 className=" absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50 dark:bg-gray-800 px-4 text-2xl font-bold">
                        Our Popular Courses
                    </h1>
                </div>
            </div>
            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 ">
                {popularCourses.map((course) => (
                    <div
                        key={course.id}
                        className="card shadow-xl bg-white dark:bg-gray-700"
                    >
                        <figure>
                            <img
                                src={course.image}
                                alt={course.title}
                                className="w-full h-48 object-cover"
                            />
                        </figure>
                        <div className="card-body ">
                            <h2 className="card-title text-lg font-bold text-black dark:text-white">
                                {course.title}
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300">{course.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center items-center mt-8 ">
    <button className="btn bg-gray-800 text-white dark:bg-gray-200 dark:text-black">
        Explore All
    </button>
</div>

        </div>
    );
};

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 text-black">
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="hero-overlay bg-opacity-20"></div>
                <div className="hero-content text-center">
                    <div className="max-w-xl">
                        <h1 className="mb-3 text-4xl font-bold border-b-4 border-gray-800 pb-2">
                            World Best Virtual Learning Network Education eLearning
                        </h1>
                        <p className="mb-5 text-xl">
                            Learn from the comfort of your home with our state-of-the-art eLearning platform,
                            designed for both students and professionals to achieve their goals effectively.
                        </p>
                        <button className="btn bg-gray-800 text-white mt-8">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
            <CardSection />
            <PopularCourses />
        </div>
    );
};

export default LandingPage;
