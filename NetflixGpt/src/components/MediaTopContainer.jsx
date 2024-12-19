import React from "react";
import { useEffect, useRef, useState } from "react";
import { GET_API_OPTION, TMDB_IMAGE_ORIGIN } from "../utils/Constant";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { HiMiniSpeakerXMark, HiMiniSpeakerWave } from "react-icons/hi2";

function MediaTopContainer({ backdropImage, mediaType, id }) {
  const playerRef = useRef(null); 
  const [isMuted, setIsMuted] = useState(true); 
  const [youtubeKey, setYoutubeKey] = useState(null);

  useEffect(() => {
    getYoutubeKey();
  }, []);

  async function getYoutubeKey() {
    if (mediaType === "movie") {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
        GET_API_OPTION
      );
      const keyData = await res.json();

      const filterTrailerData = keyData?.results.filter(
        (item) => item?.type === "Trailer"
      );
      setYoutubeKey(filterTrailerData);
    } else {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`,
        GET_API_OPTION
      );
      const keyData = await res.json();
      
      const filterTrailerData = keyData?.results.filter(
        (item) => item?.type === "Trailer"
      );
      setYoutubeKey(filterTrailerData);
    }
  }  

  if (youtubeKey == null) return null;

  // Load YouTube IFrame API script
  const scriptTag = document.createElement("script");
  scriptTag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);

  // Initialize YouTube Player when API is ready
  window.onYouTubeIframeAPIReady = () => {
    playerRef.current = new window.YT.Player("youtube-player", {
      videoId: youtubeKey?.[0]?.key,
      playerVars: {
        autoplay: 1,
        mute: 1,
        loop: 1,
        playlist: youtubeKey?.[0]?.key,
        controls: 1,
      },
      events: {
        onError: (e)=>{
          setYoutubeKey([]);
        },
      },
    });
  };

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
    <>
      {youtubeKey?.length !== 0 ? (
        <div className="lg:w-[75%] md:w-[74%] sm:w-[73%] w-full relative">
          <div
            id="youtube-player"
            className="w-full h-full max-w-[1280px] max-h-[720px] aspect-video rounded-lg overflow-hidden shadow-xl border border-gray-800 mx-auto"
          ></div>
          <div className="absolute top-0 left-0 xs:pl-3 pl-2 lg:pb-[23px] xs:pb-[10px] pb-[25px] flex items-end justify-start w-full lg:h-[90%] h-[72%]">
            <div
              onClick={toggleSound}
              className="lg:h-11 xs:h-10 h-8 lg:w-11 xs:w-10 w-8 rounded-full flex items-center justify-center bg-[#1A1A1A] hover:bg-[#2C2C2C] cursor-pointer"
            >
              {isMuted ? (
                <HiMiniSpeakerXMark className="lg:h-[26px] xs:h-[22px] h-[18px] lg:w-[26px] xs:w-[22px] w-[18px]" />
              ) : (
                <HiMiniSpeakerWave className="lg:h-[26px] xs:h-[22px] h-[18px] lg:w-[26px] xs:w-[22px] w-[18px]" />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full lg:w-[75%]  md:w-[74%] sm:w-[73%] rounded-lg overflow-hidden shadow-xl border border-gray-800 bg-[rgb(49,49,49)]">
          <div className="w-full h-full max-w-[1280px] max-h-[720px] aspect-video flex gap-2 items-center justify-center">
            {backdropImage ? (
              <img
                className="w-full h-full object-cover rounded-lg"
                src={TMDB_IMAGE_ORIGIN + backdropImage}
              />  
            ) : (
              <>
                <AiOutlineExclamationCircle className="lg:h-14 md:h-12 sm:h-10 h-8 lg:w-14 md:w-12 sm:w-10 w-8 " />
                <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-xl text-gray-300 font-semibold">
                  Trailer Not Available
                </h1>
              </>
            )}
          </div>
        </div>
      )}
      
    </>
  );
}

export default MediaTopContainer;