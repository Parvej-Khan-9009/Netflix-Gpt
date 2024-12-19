import React from "react";
import { useEffect } from "react";
import { GET_API_OPTION } from "../utils/Constant";
import { useDispatch, useSelector } from "react-redux";
import MovieCards from "./MovieCards";
import { addAnime} from "../utils/movieSlice";

function Anime() {
    const dispatch = useDispatch();
    const data = useSelector((store) => store.movie.anime);
  
    useEffect(() => {
      getAnime();
    }, []);
  
    if (!data) return null;
 
    async function getAnime() {
      const res = await fetch("https://api.themoviedb.org/3/discover/movie?with_genres=16&with_original_language=ja&language=en&sort_by=popularity.desc&certification_country=US&certification.lte=R&page=2", GET_API_OPTION);
      const data = await res.json();
      dispatch(addAnime(data.results));
    }

    return (
      <div className="lg:pt-14 md:pt-[25px] sm:pt-[20px] pt-[15px]">
        <MovieCards movieInfo={data} category="Populor Anime" />
      </div>
    );
}

export default Anime