import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAiSearchResult, addSearchText, addTmdbMovieResultOfAi, setDefaultUi, setLoadUi, setNoResult } from "../utils/gptSearchSlice";
import { GET_API_OPTION } from "../utils/Constant";
import GptSearchCard from "./GptSearchCard";
import SearchShimmerUi from "./SearchShimmerUi";

function SearchPage() {
  const dispatch = useDispatch();
  let { showDefaultUi, showLoadUi, aiSearchResult, tmdbMovieResultOfAi, searchText, showNoResult } = useSelector((store) => store.gptSearch);

  const sessionTmdbRecord  = JSON.parse(sessionStorage.getItem("sessionTmdbResultData"));
  const sessionAiSearchRecord  = JSON.parse(sessionStorage.getItem("sessionAiSearchResult"));
  const sessionSearchTextRecord  = sessionStorage.getItem("sessionSearchTxtForSearchPage");
  
  useEffect(()=>{
    if(sessionTmdbRecord){
      dispatch(addTmdbMovieResultOfAi(sessionTmdbRecord))  
     }
     if(sessionAiSearchRecord){
       dispatch(addAiSearchResult(sessionAiSearchRecord));   
     }
     if(sessionSearchTextRecord){
       dispatch(addSearchText(sessionSearchTextRecord));
     }

    sessionStorage.removeItem("sessionTmdbResultData");
    sessionStorage.removeItem("sessionAiSearchResult");
    sessionStorage.removeItem("sessionSearchTxtForSearchPage");
  },[])

  useEffect(() => {
    if (aiSearchResult) {
      getMovieFromTmdb();
    }
  }, [aiSearchResult]);

  useEffect(() => {
    if(tmdbMovieResultOfAi){
      const availableMovie = tmdbMovieResultOfAi?.some((movie)=>{
        return movie.length != 0;
      });
      
      if(availableMovie){
        dispatch(setNoResult(false));
        dispatch(setDefaultUi(false));
      } else {
        dispatch(addAiSearchResult(null));
        dispatch(addTmdbMovieResultOfAi(null));
        dispatch(setNoResult(true));
      }
    }
  }, [tmdbMovieResultOfAi]);

  async function getMovieFromTmdb() {
    const movieResultPromiseArray = aiSearchResult?.map((movieDetail) => {
      const parts = movieDetail?.split(" (");
      const movieName = parts[0];
      const movieYear = parts[1]?.replace(")", "");
      return searchMovieTMDB(movieName, movieYear);
    });

    const FinalSearchedResult = await Promise.all(movieResultPromiseArray);

    console.log(FinalSearchedResult);
        
    dispatch(addTmdbMovieResultOfAi(FinalSearchedResult));
    dispatch(setLoadUi(false));
  }

  async function searchMovieTMDB(movieName, movieYear) {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/multi?language=en-US&query=" +
        movieName +
        "&page=1&include_adult=false&year=" +
        movieYear,
      GET_API_OPTION
    );
    const json = await data.json();

    return json.results;
  }

  return (
    <div className="w-full lg:pt-24 md:pt-[130px] sm:pt-[120px] xs:pt-[110px] pt-[95px] pb-16">
      {showDefaultUi && (
        <h1 className="mx-auto xl:w-[57%] lg:w-[70%] md:w-[80%] sm:w-[85%] xs:w-[95%] w-[98%] xl:text-[30px] lg:text-[26px] md:text-[22px] xs:text-lg text-base xs:font-medium font-medium xl:leading-[35px] lg:leading-[30px] md:leading-[27px] leading-[21px]">
          Discover movies like never before! Use our AI assistant to get
          personalized results for your next favorite film.
      </h1>
      )}
  
      {tmdbMovieResultOfAi && (
        <div className="xl:w-[63%] lg:w-[70%] md:w-[80%] sm:w-[85%] xs:w-[95%] w-[98%] mx-auto">
          <h1 className="text-shadow lg:text-2xl sm:text-xl xs:text-lg text-base font-medium xs:leading-[auto] leading-[20px]">
            Search results for : {searchText}
          </h1>
          <div className="lg:pt-5 sm:pt-3 pt-[10px] grid gap-1 lg:gap-y-6 md:gap-y-5 sm:gap-y-4 gap-y-3 grid-cols-[repeat(auto-fill,minmax(96px,1fr))] xs:grid-cols-[repeat(auto-fill,minmax(120px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(135px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] justify-between w-full">
            {tmdbMovieResultOfAi?.map((movieResult, index) => {
              if (movieResult?.length == 0) return null;

              const splitMovieDetail = aiSearchResult[index]?.split(" (");
              const extractMovieName = splitMovieDetail[0];
              const extractReleaseYear = splitMovieDetail[1]?.replace(")", "");
              
              const filterMovie = movieResult?.find((movie)=>{
                if(movie?.media_type == "movie"){
                  return movie?.release_date?.includes(extractReleaseYear) && movie?.title?.includes(extractMovieName);
                }
                else {
                  return movie?.first_air_date?.includes(extractReleaseYear) && movie?.name?.includes(extractMovieName);
                }
              })

              if (!filterMovie) return null;
 
              const movieData = {
                posterImage: filterMovie?.poster_path,
                backDropImage: filterMovie?.backdrop_path,
                title: filterMovie?.title || filterMovie?.name,
                id: filterMovie?.id,
                release_date: filterMovie?.release_date,
              };
              
              return <GptSearchCard key={index} {...movieData} />;
            })}
          </div> 
        </div>
      )}

      {showLoadUi && <SearchShimmerUi />}

      {showNoResult && (
        <h1 className="h-[70lvh] flex justify-center items-center lg:text-3xl xs:text-2xl text-xl  font-medium">
          No result Found ...
        </h1>
      )}
    </div>
  );
}
 
export default SearchPage;