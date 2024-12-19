import React from "react";
import { useEffect, useState } from "react";
import { GET_API_OPTION } from "../utils/Constant";
import GptSearchCard from "./GptSearchCard";

function MoreLikeThis({ id, mediaType, setIsMoreLikeThis }) {
  const [data, setData] = useState(null);
  const [header, setHeader] = useState("More like this");

  useEffect(() => {
    getSimilarMovieOrTvData();
  }, []);

  useEffect(()=>{
    if (data?.length == 0){
      setIsMoreLikeThis(false);
    }
  }, [data]);

  async function getSimilarMovieOrTvData() {
    if (mediaType == "movie") {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/" +
          id +
          "/similar?language=en-US&page=1",
        GET_API_OPTION
      );
      const resData = await response.json();

      if (resData?.results?.length == 0) {
        getRecommendedMovie();
      } else {
        setData(resData?.results);
      }
    } else {
      const response = await fetch(
        "https://api.themoviedb.org/3/tv/" +
          id +
          "/similar?language=en-US&page=1",
        GET_API_OPTION
      );
      const resData = await response.json();

      if (resData?.results?.length == 0) {
        getRecommendedSeries();
      } else {
        setData(resData?.results);
      }
    }
  }

  async function getRecommendedMovie() {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        id +
        "/recommendations?language=en-US&page=1",
      GET_API_OPTION
    );
    const resData = await response.json();
    setData(resData?.results);
    setHeader("Recommended");
  }

  async function getRecommendedSeries() {
    const response = await fetch(
      "https://api.themoviedb.org/3/tv/" +
        id +
        "/recommendations?language=en-US&page=1",
      GET_API_OPTION
    );
    const resData = await response.json();
    setData(resData?.results);
    setHeader("Recommended");
  }

  if (!data || data?.length == 0) return null;

  return (
    <div className="w-full lg:pt-6 md:pt-4 sm:pt-3 pt-2 lg:pb-10 pb-5 bg-gradient-to-b from-gray-800 via-gray-900 to-[#3b2e2e]">
      <div className="xl:w-[75%] lg:w-[80%] md:w-[90%] w-[96%] mx-auto">
        <div className="w-full">
          <div className="flex gap-1 items-center">
            <div className="w-1 lg:h-[25px] md:h-[22px] sm:h-[20px] h-[18px] bg-yellow-500"></div>
            <span className="lg:text-[25px] md:text-text-[22px] sm:text-xl text-lg font-semibold">{header}</span>
          </div>

          <div className="lg:pt-6 md:pt-4 sm:pt-3 pt-2 grid gap-1 lg:gap-y-6 md:gap-y-5 sm:gap-y-4 gap-y-3 grid-cols-[repeat(auto-fill,minmax(96px,1fr))] xs:grid-cols-[repeat(auto-fill,minmax(120px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(135px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] justify-between w-full">
            {data?.map((item) => {
              if(!item?.poster_path) return null;
              const movieData = {
                posterImage: item?.poster_path,
                backDropImage: item?.backdrop_path,
                title: item?.title || item?.name,
                id: item?.id,
                release_date: item?.release_date,
              };

              return <GptSearchCard key={item?.id} {...movieData} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoreLikeThis;
