import React from "react";
import SearchShimmerLoadCard from "./SearchShimmerLoadCard";

function SearchShimmerUi() {
  return (
    <div className="xl:w-[63%] lg:w-[70%] md:w-[80%] sm:w-[85%] xs:w-[95%] w-[98%] mx-auto pt-2">
      <div className="grid gap-1 lg:gap-y-6 md:gap-y-5 sm:gap-y-4 gap-y-3 grid-cols-[repeat(auto-fill,minmax(96px,1fr))] xs:grid-cols-[repeat(auto-fill,minmax(120px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(135px,1fr))] md:grid-cols-4 justify-between w-full">
        <SearchShimmerLoadCard/>
        <SearchShimmerLoadCard/>
        <SearchShimmerLoadCard/>
        <SearchShimmerLoadCard/>
        <SearchShimmerLoadCard/>
        <SearchShimmerLoadCard/>
        <SearchShimmerLoadCard/>
        <SearchShimmerLoadCard/>
      </div>
    </div>
  );
}

export default SearchShimmerUi;
