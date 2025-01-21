import { useState } from "react";
import bgImage1 from "../../../assets/login.webp";
import { Link } from "react-router-dom";
import apiClient from "../../../api/Api";

const LogIn = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  console.log(data);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiClient.login({
        email: data.email,
        password: data.password,
      });

      console.log("login Successful", response);
    } catch (error) {
      console.error("Error during login", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage1})` }}
      >
        <div className="bg-black bg-opacity-50 h-full flex flex-col justify-center items-center text-white px-10">
          <h1 className="text-4xl font-bold mb-4">Welcome Back To QuizLoom!</h1>
          <p className="text-lg text-center">
            Sign in to access your lessons, assignments, and track your progress
            effortlessly.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white dark:bg-gray-900">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
          Sign In
        </h2>
        <form className="w-3/4 max-w-sm" onSubmit={handleSubmit}>
          {[
            {
              name: "email",
              type: "email",
              placeholder: "Enter your email",
              label: "Email",
            },
            {
              name: "password",
              type: "password",
              placeholder: "Enter your password",
              label: "Password",
            },
          ].map(({ name, type, placeholder, label }) => (
            <div className="mb-4" key={name}>
              <label
                className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                htmlFor={name}
              >
                {label}
              </label>
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={data[name]}
                onChange={handleOnChange}
                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-green-300 bg-gray-200 text-black dark:bg-gray-800 dark:text-white"
              />
            </div>
          ))}
          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="w-full bg-blue-800 text-white font-bold py-2 px-4 rounded hover:bg-blue-800 focus:outline-none focus:ring focus:ring-green-300"
            >
              Sign in
            </button>
          </div>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">
            Don’t have an account?{" "}
            <Link to={"/sign-up"} className="text-blue-800 hover:underline">
              SignUp
            </Link>
          </div>
          <div className="flex items-center mb-4">
            <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
            <span className="px-2 text-sm text-gray-500 dark:text-gray-400">
              OR
            </span>
            <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
          </div>
          <button
            type="button"
            className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring focus:ring-green-300"
          >
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
