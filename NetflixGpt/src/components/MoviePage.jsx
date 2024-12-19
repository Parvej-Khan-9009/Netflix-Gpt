import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { IoIosTimer } from "react-icons/io";
import MediaTopContainer from "./MediaTopContainer";
import MoreLikeThis from "./MoreLikeThis";
import { noMovieImage, TMDB_IMAGE_ORIGIN } from "../utils/Constant";
import { PiDotOutlineFill } from "react-icons/pi";

function MoviePage({ mediaData, mediaType }) {
  const [isMoreLikeThis, setIsMoreLikeThis] = useState(true);

  let about = mediaData?.overview;
  let overview = "";
  if (about) {
    if (about?.length <= 211) {
      overview = about;
    } else {
      let subString = about?.slice(0, 211);
      let remainingString = about?.slice(211);
      const dotIndex = remainingString?.indexOf(".");
      overview = subString + remainingString?.slice(0, dotIndex + 1);
    }
  }

  return (
    <div className="w-full">
      <div
        className={`w-full ${
          !isMoreLikeThis && "h-screen"
        } lg:pb-4 pb-3 bg-gradient-to-b from-gray-800 via-gray-900 to-[#3b2e2e]`}
      >
        <div className="md:pt-[75px] sm:pt-[70px] pt-[55px] xl:w-[75%] lg:w-[80%] md:w-[90%] w-[96%] mx-auto ">
          <div className="sm:flex items-center justify-between">
            <h1 className="xl:w-[68%] lg:w-[62%] sm:w-[55%] w-full lg:leading-[40px] md:leading-[35px] xs:leading-[26px] leading-[22px] xl:text-[34px] lg:text-[28px] md:text-[26px] sm:text-[22px] xs:text-[20px] text-[18px] font-semibold pr-5">
              {mediaData?.title || mediaData?.name}
            </h1>
            <div className="flex sm:items-start items-center xl:gap-5 xs:gap-3 gap-[2px] sm:pt-0 pt-1">
              {mediaData?.vote_average != 0 && (
                <div className="relative xs:block flex items-center gap-[2px]">
                  <h3 className="sm:block hidden font-semibold md:text-base sm:text-sm text-xs text-center px-[9px]">
                    RATING
                  </h3>
                  <div className="sm:absolute lg:top-[81%] sm:top-[90%] top-[80%] left-[-2%] flex items-center xs:gap-1 gap-[2px]">
                    <FaStar className="text-yellow-400 sm:h-5 sm:w-5 w-[14px] h-[14px]" />
                    <span className="md:text-base sm:text-sm text-xs">
                      <span className="lg:text-xl sm:text-lg text-sm font-semibold">
                        {mediaData?.vote_average?.toFixed(1)}/
                      </span>
                      10
                    </span>
                  </div>
                  <PiDotOutlineFill className="xs:hidden" />
                </div>
              )}

              {mediaData?.runtime && (
                <div className="relative  xs:block flex items-center gap-[2px]">
                  <h3 className="sm:block hidden font-semibold md:text-base sm:text-sm text-xs text-center">
                    RUNTIME
                  </h3>
                  <div className="flex items-center sm:gap-1 gap-[1px] justify-center">
                    <IoIosTimer className="sm:h-5 sm:w-5 w-4 h-4" />
                    <span className="font-medium md:text-base sm:text-sm text-xs">{`${Math.floor(
                      mediaData?.runtime / 60
                    )}h ${mediaData?.runtime % 60}m`}</span>
                  </div>
                  {mediaData?.release_date && (
                    <PiDotOutlineFill className="xs:hidden" />
                  )}
                </div>
              )}
              {mediaType == "series" && (
                <div className="relative xs:block flex items-center gap-[2px]">
                  <h3 className="sm:block hidden font-semibold md:text-base sm:text-sm text-xs text-center">
                    TV
                  </h3>
                  <span className="flex justify-center font-medium md:text-base sm:text-sm text-xs">
                    SERIES
                  </span>
                  {mediaData?.first_air_date && (
                    <PiDotOutlineFill className="xs:hidden" />
                  )}
                </div>
              )}
              {mediaData?.release_date && (
                <div>
                  <h3 className="sm:block hidden font-semibold md:text-base sm:text-sm text-xs text-center">
                    RELEASE DATE
                  </h3>
                  <span className="flex justify-center font-medium md:text-base sm:text-sm text-xs">
                    {mediaData?.release_date}
                  </span>
                </div>
              )}
              {mediaData?.first_air_date && (
                <div>
                  <h3 className="sm:block hidden font-semibold md:text-base sm:text-sm text-xs text-center">
                    RELEASE DATE
                  </h3>
                  <span className="flex justify-center font-medium md:text-base sm:text-sm text-xs">
                    {mediaData?.first_air_date}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="w-full md:pt-2 pt-[6px] sm:flex gap-1 justify-between">
            <div className="lg:w-[25%] md:w-[26%] w-[27%] sm:block hidden">
              <img
                className="w-full h-full max-w-[390px] max-h-[720px] rounded-md"
                src={
                  mediaData?.poster_path
                    ? TMDB_IMAGE_ORIGIN + mediaData?.poster_path
                    : noMovieImage
                }
              />
            </div>
            <MediaTopContainer
              mediaType={mediaType}
              id={mediaData?.id}
              backdropImage={mediaData?.backdrop_path}
            />
          </div>

          <div className="w-full sm:block flex xs:gap-3 gap-[6px]">
            <div className=" sm:hidden block pt-2">
              <img
                className="xs:h-[150px] xs:w-[100px] w-[83px] h-[125px] rounded-md"
                src={
                  mediaData?.poster_path
                    ? TMDB_IMAGE_ORIGIN + mediaData?.poster_path
                    : noMovieImage
                }
              />
            </div>

            <div className="sm:w-full xs:w-[68%] w-[70%] pr-1">
              {mediaData?.number_of_seasons && (
                <div className="xs:flex hidden md:gap-4 gap-2 md:pt-2 pt-2 items-center">
                  <div className="md:text-lg sm:text-base xs:text-sm text-xs font-semibold">
                    <span>Total Season - </span>
                    <span>{mediaData?.number_of_seasons}</span>
                  </div>
                  <div className="xs:block hidden w-[3px] md:h-[18px] h-[13px] rounded-full bg-white"></div>
                  <div className="md:text-lg sm:text-base xs:text-sm text-xs font-semibold">
                    <span>Total Episode - </span>
                    <span>{mediaData?.number_of_episodes}</span>
                  </div>
                </div>
              )}

              {mediaData?.genres?.length != 0 && (
                <div className="w-full xs:flex hidden lg:pt-2 sm:pt-1 pt-2 items-center md:text-lg sm:text-base text-sm font-semibold">
                  {mediaData?.genres?.map((item, index) => {
                    if (index > 2) return null;
                    let show = true;
                    if (index + 1 == mediaData?.genres?.length || index == 2) {
                      show = false;
                    }
                    return (
                      <React.Fragment key={index}>
                        <div>{item?.name}</div>
                        {show && <PiDotOutlineFill />}
                      </React.Fragment>
                    );
                  })}
                </div>
              )}

              <div
                className={
                  overview
                    ? "md:pt-[2px] pt-2 md:text-base sm:text-sm xs:text-xs text-[12px] text-justify xs:leading-[auto] leading-[15px]"
                    : "pt-2 md:text-base sm:text-sm xs:text-xs text-xs"
                }
              >
                <p>{overview ? overview : "Overview Not Avalable..."}</p>
              </div>
            </div>
          </div>

          {mediaData?.genres?.length != 0 && (
            <div className="w-full xs:hidden pt-1 flex gap-[2px] items-center text-sm font-semibold ">
              {mediaData?.genres?.map((item, index) => {
                if (index > 2) return null;
                let show = true;
                if (index + 1 == mediaData?.genres?.length || index == 2) {
                  show = false;
                }
                return (
                  <React.Fragment key={index}>
                    <div>{item?.name}</div>
                    {show && <PiDotOutlineFill />}
                  </React.Fragment>
                );
              })}
            </div>
          )}

          {mediaData?.number_of_seasons && (
            <div className="xs:hidden flex gap-2 pt-1 items-center">
              <div className="text-sm font-semibold">
                <span>Total Season : </span>
                <span>{mediaData?.number_of_seasons}</span>
              </div>
              <div className="w-[2px] h-[15px] rounded-full bg-white"></div>
              <div className="text-sm font-semibold">
                <span>Total Episode : </span>
                <span>{mediaData?.number_of_episodes}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <MoreLikeThis
        id={mediaData?.id}
        mediaType={mediaType}
        setIsMoreLikeThis={setIsMoreLikeThis}
      />
    </div>
  );
}

export default MoviePage;
