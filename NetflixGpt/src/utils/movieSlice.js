import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    mainTrailerKey: null,
    nowPlayingMovie: null,
    populorMovie: null,
    trendingMovie: null,
    topRatedMovie: null,
    populorIndianMovies: null,
    populorKoreanDrama: null,
    kidsShow: null,
    anime: null,
  },
  reducers: {
    addNowPlayingMovie: (state, action) => {
      state.nowPlayingMovie = action.payload;
    },
    addPopulorMovie: (state, action) => {
      state.populorMovie = action.payload;
    },
    addTrendingMovie: (state, action) => {
      state.trendingMovie = action.payload;
    },
    addTopRatedMovie: (state, action) => {
      state.topRatedMovie = action.payload;
    },
    addPopulorIndianMovies: (state, action) => {
      state.populorIndianMovies = action.payload;
    },
    addPopulorKoreanDrama: (state, action) => {
      state.populorKoreanDrama = action.payload;
    },
    addKidsShow: (state, action) => {
      state.kidsShow = action.payload;
    },
    addAnime: (state, action) => {
      state.anime = action.payload;
    },
    addMainTrailerKey: (state, action) => {
      state.mainTrailerKey = action.payload;
    },
  },
}); 

export const {
  addNowPlayingMovie,
  addPopulorMovie,
  addTrendingMovie,
  addTopRatedMovie,
  addPopulorIndianMovies,
  addPopulorKoreanDrama,
  addKidsShow,
  addAnime,
  addMainTrailerKey
} = movieSlice.actions;

export default movieSlice.reducer;
