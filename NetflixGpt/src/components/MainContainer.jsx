import React, { useEffect, useRef, useState } from "react";
import { GET_API_OPTION } from "../utils/Constant";
import MovieCards from "./MovieCards";
import { useDispatch, useSelector } from "react-redux";
import { addMainTrailerKey, addNowPlayingMovie } from "../utils/movieSlice";
import ContentLoadingShimmerUi from "./ContentLoadingShimmerUi";
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";

function MainContainer() {
  const dispatch = useDispatch();
  const [isMuted, setIsMuted] = useState(true);
  const nowPlayingMovieData = useSelector((store) => store.movie.nowPlayingMovie);
  const trailerKey = useSelector((store) => store.movie.mainTrailerKey);
  const playerRef = useRef(null);

  useEffect(() => {
    getNowPlaying();
  }, []);

  useEffect(() => { 
    if (nowPlayingMovieData) {
      getTrailerKey();
    }
  }, [nowPlayingMovieData]);

  if (nowPlayingMovieData == null || trailerKey == null)
    return <ContentLoadingShimmerUi />;

  async function getTrailerKey() {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        nowPlayingMovieData?.[4]?.id +
        "/videos?language=en-US",
      GET_API_OPTION
    );
    const resKey = await res.json();
    const filterTrailerData = resKey?.results.filter(
      (item) => item?.type === "Trailer"
    );
    dispatch(addMainTrailerKey(filterTrailerData?.[2]?.key))
  }

  // Load YouTube IFrame API script
  const scriptTag = document.createElement("script");
  scriptTag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);

  // Initialize YouTube Player when API is ready
  window.onYouTubeIframeAPIReady = () => {
    playerRef.current = new window.YT.Player("youtube-player", {
      videoId: trailerKey,
      playerVars: {
        autoplay: 1,
        mute: 1,
        loop: 1,
        playlist: trailerKey,
        controls: 1,
      },
    });
  };

  async function getNowPlaying() {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?&page=1",
      GET_API_OPTION
    );
    const data = await response.json();
    dispatch(addNowPlayingMovie(data.results));
  }

  const toggleSound = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
      } else {
        playerRef.current.mute();
      }
      setIsMuted(!isMuted);
    }
  };
    
  return (
    <div className="relative w-full lg:h-screen">
      <div className="relative lg:h-screen lg:w-full w-screen aspect-video">
        <div className="relative lg:mt-0 md:mt-[62px] sm:mt-[58px] mt-[47px] w-full lg:h-screen lg:overflow-hidden">
          <div
            id="youtube-player"
            className="absolute xl:top-[-20px] lg:w-[1520px] lg:h-[855px] w-full h-full aspect-video shadow-xl border border-gray-800 mx-auto"
          ></div> 

          <div className="absolute left-0 lg:top-0 top-0 gredient_video lg:w-screen lg:h-[118%] w-full h-full aspect-video">
            <div className="xl:pl-[66px] lg:pl-[49px] md:pl-[47px] sm:pl-2 pl-1 sm:text-xl lg:pt-[220px] md:pt-32 sm:pt-16 pt-[70px]">
              <div className="xl:w-[30%] lg:w-[40%] md:w-[45%] sm:w-[50%] w-[50%]">
                <h1 className="text-shadow md:text-[22px] sm:text-xl xs:text-lg text-sm text-ellipsis overflow-hidden line-clamp-1 font-semibold pb-1">
                  {nowPlayingMovieData?.[4]?.title}
                </h1>
                <div className="sm:block hidden pb-4">
                  <h1 className=" text-shadow lg:text-lg text-base lg:leading-6 leading-5 text-ellipsis overflow-hidden line-clamp-5">
                    {nowPlayingMovieData?.[4]?.overview}
                  </h1>
                </div>
                
              </div>
              <div className="flex justify-between items-center">
                <a
                  className="hover:bg-[#d2d2d2] bg-white rounded-md"
                  href={
                    "browse/movieOrTv/" +
                    "movie" +
                    "/" +
                    nowPlayingMovieData?.[4]?.id
                  }
                >
                  <button className="lg:py-2 py-[6px] lg:w-24 sm:w-[90px] xs:w-[80px] w-[67px] lg:text-lg sm:text-base xs:text-sm text-xs font-bold rounded-md hover:bg-[#d2d2d2] bg-white text-black">
                    More info
                  </button>
                </a>

                <div
                  onClick={toggleSound}
                  className="lg:mr-24 sm:mr-12 xs:mr-6 mr-2 lg:h-12 xs:h-10 h-8 lg:w-12 xs:w-10 w-8 rounded-full flex items-center justify-center bg-[#1A1A1A] hover:bg-[#2C2C2C] cursor-pointer"
                >
                  {isMuted ? (
                    <HiMiniSpeakerXMark className="lg:h-[29px] md:h-[25px] xs:h-[22px] h-[18px] lg:w-[29px] md:w-[25px] xs:w-[22px] w-[18px]" />
                  ) : (
                    <HiMiniSpeakerWave className="lg:h-[29px] md:h-[25px] xs:h-[22px] h-[18px] lg:w-[29px] md:w-[25px] xs:w-[22px] w-[18px]" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full absolute lg:bottom-[-70px] bottom-[-80px] ">
          <MovieCards
            movieInfo={nowPlayingMovieData}
            category={"Now Playing Movies"}
          />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
