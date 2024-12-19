import React from 'react'

function NoMovieOrSeriesData() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-300 px-4 sm:px-6 lg:px-8">
          <div className="md:mb-6 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 sm:h-24 sm:w-24 lg:h-28 lg:w-28 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.172 9.172a4 4 0 105.656 5.656M12 6v.01M6 12h.01m11.89 0h.01M12 18v.01M18 12h.01M12 6a9 9 0 110 12 9 9 0 010-12z"
              />
            </svg>
          </div>
    
          <h1 className="text-lg sm:text-3xl lg:text-4xl font-bold text-red-400 md:mb-4 mb-2 text-center">
            No Movie or Series Data Found
          </h1>
    
          <p className="text-base sm:text-lg lg:text-xl text-gray-400 mb-6 text-center max-w-xl">
            It seems we couldn’t find any movie or series data at the moment. Please
            try again later.
          </p>
        </div>
      );
}

export default NoMovieOrSeriesData