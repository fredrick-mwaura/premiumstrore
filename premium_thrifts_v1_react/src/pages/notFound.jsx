import React from "react";
import { useNavigate } from "react-router-dom";

export default function Not_Found() {
  const navigate = useNavigate();
  const Home = () => navigate("/");

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen text-center md:text-left px-6">
      {/* Text Content */}
      <div className="max-w-md">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-2">
          We couldn’t find the page you are looking for.
        </p>
        <p className="text-gray-600 mb-4">
          But we have millions more shopping items for you to browse!
        </p>
        <button
          onClick={Home}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-all"
        >
          Go to Homepage
        </button>
      </div>

      {/* Image */}
      <img
        src="/site-assets/not_found.svg"
        alt="Not Found"
        className="w-full md:w-1/2 max-w-sm mt-6 md:mt-0"
      />
    </div>
  );
}
