import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideSearchBar, setDefaultUi, setNoResult, showSearchBar} from "../utils/gptSearchSlice";
import SearchPage from "./SearchPage";

function GptSearch() {
  const dispatch = useDispatch();
  const { searchText, aiSearchResult, tmdbMovieResultOfAi } = useSelector(store => store.gptSearch)

  window.addEventListener("beforeunload", ()=>{
    sessionStorage.setItem("sessionSearchTxtForHearderSearch", searchText);
    sessionStorage.setItem("sessionSearchTxtForSearchPage", searchText);
    sessionStorage.setItem("sessionAiSearchResult", JSON.stringify(aiSearchResult));
    sessionStorage.setItem("sessionTmdbResultData", JSON.stringify(tmdbMovieResultOfAi));
  })

  useEffect(() => {
    dispatch(showSearchBar());

    return () => {
      sessionStorage.setItem("sessionSearchTxtForHearderSearch", searchText);
      // sessionStorage.setItem("sessionSearchTxtForSearchPage", searchText);
      // sessionStorage.setItem("sessionAiSearchResult", JSON.stringify(aiSearchResult));
      // sessionStorage.setItem("sessionTmdbResultData", JSON.stringify(tmdbMovieResultOfAi));
      dispatch(hideSearchBar());
    };
  }, []);

  return ( 
    <>
      <SearchPage/>
    </>
  )
}

export default GptSearch;
