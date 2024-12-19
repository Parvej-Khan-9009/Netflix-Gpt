import React, { useRef } from "react";
import { RiArrowLeftWideFill, RiArrowRightWideFill } from "react-icons/ri";
import { TMDB_IMAGE_ORIGIN } from "../utils/Constant";
import { noMovieImage } from "../utils/Constant";

function MovieCards({ movieInfo, category }) {
  const slider = useRef(null);

  function nextSlide() {
    slider.current.scrollLeft += 695;
  }
  function prevSlide() {
    slider.current.scrollLeft -= 695;
  }

  return (
    <div>
      <h1 className="xl:pl-[66px] lg:pl-[49px] md:pl-[47px pl-2 text-shadow md:text-xl sm:text-lg xs:text-base text-sm font-bold">
        {category}
      </h1>
      <div className="flex gap-2 lg:pt-4 xs:pt-3 pt-2">
        <div
          className="group md:flex hidden lg:h-[134px] h-[120px] w-[200px]  items-center justify-center bg-[#202020] hover:bg-[#181818] cursor-pointer rounded-md"
          onClick={prevSlide}
        >
          <RiArrowLeftWideFill className="h-10 w-10 group-hover:text-slate-400 group-hover:scale-125 duration-100 transform transition-all" />
        </div>

        <div
          className="md:px-0 px-2 flex sm:gap-2 gap-1 overflow-x-scroll scroll-smooth no-scrollBar"
          ref={slider}
        >
          {movieInfo?.map((item) => {
            const movieImage = item.backdrop_path ? item.backdrop_path : item.poster_path;
            const mediaType = item?.release_date ? "movie" : "series";
            return (
              <a
                href={"browse/movieOrTv/" + mediaType + "/" + item?.id}
                key={item?.id}
                className="relative shrink-0 transform md:hover:scale-95 transition-transform"
              >
                <div className="gredient_Moviecard absolute top-0 lg:w-[224px] lg:h-[134px] sm:w-[200px] sm:h-[120px] xs:w-[180px] xs:h-[105px] w-[140px] h-[90px] rounded-sm px-1 pb-1 flex items-end">
                  <h1 className="line-clamp text-shadow lg:text-lg sm:text-base xs:text-sm text-xs font-medium leading-5">
                    {item?.title || item?.name}
                  </h1>
                </div>
                <img
                  className="lg:w-[224px] lg:h-[134px] sm:w-[200px] sm:h-[120px] xs:w-[180px] xs:h-[105px] w-[140px] h-[90px] rounded-sm"
                  src={
                    movieImage ? TMDB_IMAGE_ORIGIN + movieImage : noMovieImage
                  }
                />
              </a>
            );
          })}
        </div>

        <div
          className="group md:flex hidden lg:h-[134px] h-[120px] w-[200px] items-center justify-center bg-[#202020] hover:bg-[#181818] cursor-pointer rounded-md"
          onClick={nextSlide}
        >
          <RiArrowRightWideFill className="h-10 w-10 group-hover:text-slate-400 group-hover:scale-125 duration-100 transform transition-all" />
        </div>
      </div>
    </div>
  );
}

export default MovieCards;
