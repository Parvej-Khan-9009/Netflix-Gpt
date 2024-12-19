import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_API_OPTION } from "../utils/Constant"
import { useEffect } from "react";
import { addPopulorMovie } from "../utils/movieSlice";
import MovieCards from "./MovieCards";

function PopulorMovies() {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.movie.populorMovie);

  useEffect(()=>{
    getPopulorMovies();
  }, []);  

  if(!data) return null;
  
  async function getPopulorMovies() {
    const res = await fetch('https://api.themoviedb.org/3/discover/movie?language=en-US&page=3&region=IN&with_genres=28|12|35|18&without_genres=16&sort_by=popularity.desc', GET_API_OPTION);
    const data = await res.json();
    dispatch(addPopulorMovie(data.results));
  }

  return (
    <div className="lg:pt-[130px] md:pt-[106px] sm:pt-[101px] pt-[96px]">
      <MovieCards movieInfo={data} category="Populor Hollywood Movies" />
    </div>
  )
}

export default PopulorMovies