import React from "react";

const CodingStu = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 mt-10 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          {/* Left Panel: Coding Question */}
          <div className="w-full md:w-1/2 p-6 border-r border-gray-200">
            <h2 className="text-2xl font-bold mb-4">Coding Problem</h2>
            <p className="text-gray-700 mb-4 dark:text-white">
              Write a function that takes two integers as input and returns their sum.
              <br />
              <br />
              <strong>Example:</strong> If the input is <span className="font-mono bg-gray-200 p-1 rounded dark:bg-gray-900">2</span> and{" "}
              <span className="font-mono bg-gray-200 p-1 rounded dark:bg-gray-900">3</span>, the output should be{" "}
              <span className="font-mono bg-gray-200 p-1 rounded">5</span>.
            </p>
            <div className="mb-4">
              <p className="font-semibold">Sample Input:</p>
              <pre className="bg-gray-200 p-2 rounded mt-2 text-sm dark:bg-gray-900">2 3</pre>
            </div>
            <div>
              <p className="font-semibold">Sample Output:</p>
              <pre className="bg-gray-200 p-2 rounded mt-2 text-sm dark:bg-gray-900">5</pre>
            </div>
          </div>

          {/* Right Panel: Code Submission */}
          <div className="w-full md:w-1/2 p-6">
            <h2 className="text-2xl font-bold mb-4">Submit Your Solution</h2>
            <div className="mb-4">
              <label htmlFor="language" className="block text-lg font-semibold mb-2">
                Select Language
              </label>
              <select id="language" className="w-full p-2  rounded dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200">
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
                <option value="c">C</option>
                <option value="ruby">Ruby</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="solution" className="block text-lg font-semibold mb-2">
                Your Code
              </label>
              <textarea
                id="solution"
                rows="10"
                className="w-full p-2 bg-gray-200 dark:bg-gray-900  rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your code here..."
              ></textarea>
            </div>
            <button className="w-full bg-btnbg dark:bg-secondary dark:text-black font-bold text-white p-3 rounded-lg shadow hover:bg-blue-600 transition duration-200">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingStu;
