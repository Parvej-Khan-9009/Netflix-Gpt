import React from "react";
import { GET_API_OPTION } from "../utils/Constant";
import { useEffect, useState } from "react";
import MovieCards from "./MovieCards";

function PopulorSeries() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getPopulorSeries();
  }, []);

  if (!data) return null;
  async function getPopulorSeries() {
    const res = await fetch(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US",
      GET_API_OPTION
    );
    const resData = await res.json();
    setData(resData?.results);
  }

  return (
    <div className="lg:pt-14 md:pt-[25px] sm:pt-[20px] pt-[15px]">
      <MovieCards movieInfo={data} category="Trending Series" />
    </div>
  );
}

export default PopulorSeries;
