import React from "react";

function SearchShimmerLoadCard() {
  return (
    <div className="w-full max-w-[96px] gap-2 xs:max-w-[120px] sm:max-w-[135px] md:max-w-[150px] lg:max-w-[180px] h-[140px] xs:h-[180px] sm:h-[195px] md:h-[220px] lg:h-[300px] rounded-md shrink-0  animate-pulse flex flex-col items-center">
      <div className="w-full h-[88%] bg-gray-600 rounded-md"></div>
      <div className=" w-[85%] h-[7%] bg-gray-600 rounded"></div>
      <div className="w-[70%] h-[5%] bg-gray-600 rounded"></div>
    </div>
  );
}

export default SearchShimmerLoadCard;
