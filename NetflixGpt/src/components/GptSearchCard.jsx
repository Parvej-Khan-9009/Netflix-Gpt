import React from "react";
import { noMovieImage, TMDB_IMAGE_ORIGIN } from "../utils/Constant";

function GptSearchCard({
  posterImage,
  backDropImage,
  title,
  id,
  release_date,
}) {
  const availableImage = posterImage ? posterImage : backDropImage;
  const mediaType = release_date ? "movie" : "series";

  return (
    <a
      href={"/browse/movieOrTv/" + mediaType + "/" + id}
      className="relative w-full max-w-[96px] xs:max-w-[120px] sm:max-w-[135px] md:max-w-[150px] lg:max-w-[180px] h-[140px] xs:h-[180px] sm:h-[195px] md:h-[220px] lg:h-[260px] rounded-md shrink-0 transform md:hover:scale-105 transition-transform"
    >
      {!posterImage && (
        <div className="gradient_Moviecard absolute top-0 w-full h-full rounded-md px-2 pb-2 flex items-end">
          <h1 className="line-clamp-2 text-shadow text-sm sm:text-base font-medium leading-5">
            {title}
          </h1>
        </div>
      )}
      <img
        className="w-full h-full rounded-md"
        src={availableImage ? TMDB_IMAGE_ORIGIN + availableImage : noMovieImage}
        alt={title}
      />
    </a>
  );
}

export default GptSearchCard;
