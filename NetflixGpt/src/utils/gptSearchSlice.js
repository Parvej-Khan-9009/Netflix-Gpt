import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: 'gptSearch',
    initialState: {
        searchBar: false,
        aiSearchResult: null,
        tmdbMovieResultOfAi: null,
        searchText: "",
        showLoadUi: false,
        showDefaultUi: true,
        showNoResult: false,
    },
    reducers: {
        showSearchBar: (state)=> {
            state.searchBar = true;
        },
        hideSearchBar: (state)=> {
            state.searchBar = false;
        },
        addAiSearchResult: (state, action)=> {
            state.aiSearchResult = action.payload;
        },
        addTmdbMovieResultOfAi: (state, action)=> {
            state.tmdbMovieResultOfAi = action.payload;
        },
        addSearchText: (state, action)=> {
            state.searchText = action.payload;
        },
        setLoadUi: (state, action)=> {
            state.showLoadUi = action.payload;
        },
        setDefaultUi: (state, action)=> {
            state.showDefaultUi = action.payload;
        },
        setNoResult: (state, action)=> {
            state.showNoResult = action.payload;
        },
    }
})

export const { showSearchBar, hideSearchBar, addAiSearchResult, addTmdbMovieResultOfAi, addSearchText, setLoadUi, setDefaultUi, setNoResult } = searchSlice.actions;

export default searchSlice.reducer;