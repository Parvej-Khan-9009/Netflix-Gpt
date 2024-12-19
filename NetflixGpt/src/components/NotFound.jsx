import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 p-4">
      <h1 className="lg:text-6xl md:text-5xl sm:text-4xl text-3xl font-bold mb-4">
        404
      </h1>
      <p className="lg:text-lg md:text-base sm:text-sm text-xs text-gray-400 mb-6 text-center">
        Page Not Found
      </p>
      <Link
        to="/"
        className="lg:px-6 lg:py-3 md:px-5 md:py-2 sm:px-4 sm:py-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 lg:text-lg md:text-base sm:text-sm text-xs font-medium"
      >
        Go to Home
      </Link>
    </div>
  );
}

export default NotFound;
