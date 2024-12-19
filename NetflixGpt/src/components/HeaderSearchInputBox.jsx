import React from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAiSearchResult, addSearchText, addTmdbMovieResultOfAi, setDefaultUi, setLoadUi, setNoResult } from "../utils/gptSearchSlice";
import { IoSearch } from "react-icons/io5";
import { GoogleGenerativeAI } from "@google/generative-ai";

function HeaderSearchInputBox() {
  const searchInput = useRef(null);
  const dispatch = useDispatch()
  const [inputText, setInputText] = useState("");
  const sessionSearchTextRecord  = sessionStorage.getItem("sessionSearchTxtForHearderSearch");

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const chatSession = model.startChat({
    generationConfig,
    history: [
    ],
  });

  const { searchText } = useSelector((store) => store.gptSearch);

  function clearSearchPage(){
    dispatch(addAiSearchResult(null));
    dispatch(addTmdbMovieResultOfAi(null));
    dispatch(setDefaultUi(true));
    dispatch(setNoResult(false));
    dispatch(addSearchText(""));
  }

  useEffect(()=>{
    if(sessionSearchTextRecord == null){
      if(inputText?.length == 0){
        clearSearchPage();
      }
    }
    
  }, [inputText])

  useEffect(()=>{
    if(searchText){
      setInputText(searchText);
    }    

    sessionStorage.removeItem("sessionSearchTxtForHearderSearch");
  }, []);

  async function handleSearch(e) {
    e.preventDefault();
    if (searchInput.current.value.length == 0) return null;

    dispatch(setDefaultUi(false));
    dispatch(setLoadUi(true));
    dispatch(setNoResult(false));
    dispatch(addSearchText(searchInput.current.value));
    dispatch(addAiSearchResult(null));
    dispatch(addTmdbMovieResultOfAi(null));

    const gptQuery =
      "Act as movie or series recommendation system and suggest me some movies or series name for the query : " +
      searchInput.current.value +
      ".as result only give me up to 10 movies or series name whith their exact release year and separate each movie with coma like example: Padosan (1968), Angoor (1982), Money Heist (2017), Chashme Buddoor (1981) . note:-if the query only asks for the name of a specific movie or series,then provide then provide that as well And if no result related to the query is found then return a message as result that 'no data found'. please give me result exact like example.";

    const chatCompletion = await chatSession.sendMessage(gptQuery);
    const gptResult = chatCompletion.response.text()
    
    const filteredGptResult = gptResult?.split(",").map((item) => item.trim());

    console.log(filteredGptResult);
    dispatch(addAiSearchResult(filteredGptResult));
  }

  return (
    <>
      <form
        className="flex w-full relative lg:gap-4 xs:gap-2 gap-1 items-center"
        onSubmit={(e) => handleSearch(e)}
      >
        <input
          ref={searchInput}
          type="text"
          value={inputText}
          placeholder="Explore movies with AI—start typing..."
          className="w-full py-1 sm:pl-10 pl-6 pr-4 md:text-base xs:text-sm text-xs bg-gray-800 text-white rounded-sm border border-gray-600 shadow-md focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
          onChange={(e) => setInputText(e.target.value)}
        />
        <IoSearch className="absolute sm:top-[22%] xs:top-[22%] top-[20%] sm:left-3 left-[5px] sm:w-5 sm:h-5 w-[18px] h-[18px]" />
        <div
          onClick={handleSearch}
          className="md:w-[115px] sm:w-[105px] xs:w-[110px] w-[100px] md:text-base xs:text-sm text-xs rounded-full xs:font-semibold font-semibold text-white text-center py-[3px] bg-gradient-to-b from-[rgb(255,56,212)] via-[rgb(99,56,255)] to-[rgb(56,202,255)] transition-all duration-100 transform hover:scale-110 hover:from-[rgb(56,202,255)] hover:via-[rgb(99,56,255)] hover:to-[rgb(255,56,212)] cursor-pointer "
        >
          Gpt Search
        </div>
      </form>
    </>
  );
}

export default HeaderSearchInputBox;
