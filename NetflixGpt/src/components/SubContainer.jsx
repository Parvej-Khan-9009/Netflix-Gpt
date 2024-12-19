import React from "react";
import { useSelector } from "react-redux";
import Anime from "./Anime";
import KidsShow from "./KidsShow";
import PopulorIndianMovies from "./PopulorIndianMovies";
import PopulorKoreanDrama from "./PopulorKoreanDrama";
import PopulorMovies from "./PopulorMovies";
import PopulorSeries from "./PopulorSeries";
import TrendingMovies from "./TrendingMovies";
import TopRatedMovies from "./topRatedMovies";

function SubContainer() {
  const trailerKey = useSelector((store) => store.movie.mainTrailerKey);
  if(!trailerKey) return null;
  return (
    <div className="w-full lg:pb-12 pb-6"> 
      <PopulorMovies />
      <PopulorSeries/>
      <TrendingMovies/>
      <Anime/>
      <PopulorIndianMovies/>
      <KidsShow/>
      <PopulorKoreanDrama/> 
      <TopRatedMovies/> 
    </div>
  );
}

export default SubContainer;