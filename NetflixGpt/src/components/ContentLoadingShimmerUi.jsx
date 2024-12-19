import React from "react";

function ContentLoadingShimmerUi() {
  return (
    <div className="xl:w-[65%] lg:w-[90%] sm:w-[85%] w-[97%] mx-auto pt-16 flex flex-col items-center xs:gap-6 gap-3 lg:pb-4 pb-2">
      <div className="w-full lg:min-h-[400px] md:min-h-[350px] sm:min-h-[300px] xs:min-h-[270px] min-h-[200px] bg-gray-600 animate-pulse rounded-lg"></div>

      <div className="w-full flex flex-col gap-4">
        <div className="w-[60%] xs:h-5 h-4 bg-gray-600 animate-pulse rounded-md"></div>
        <div className="w-full xs:h-5 h-4 bg-gray-600 animate-pulse rounded-md"></div>
        <div className="w-[25%] sm:h-6 xs:h-5 h-4 bg-gray-600 animate-pulse rounded-md"></div>
      </div>

      <div className="w-full grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 xs:gap-2 gap-4">
        {Array(6).fill("").map((_, index) => (       
            <div
              key={index}
              className="lg:h-[125px] lg:w-full md:h-[130px] xs:h-[100px] xs:w-full h-[140px] w-[96px] bg-gray-600 animate-pulse rounded-lg"
            ></div>
          ))}
      </div>
    </div>
  );
}

export default ContentLoadingShimmerUi;
