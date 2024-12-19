import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieReducer from "./movieSlice";
import searchReducer from "./gptSearchSlice"

const appStore = configureStore(
  {
    reducer: {
        user: userReducer,
        movie: movieReducer,
        gptSearch: searchReducer,
    },
  }
);

export default appStore;