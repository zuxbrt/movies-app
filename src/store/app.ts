import { createSlice } from "@reduxjs/toolkit";

const initialAppState = {
    currentTab: 'tv',
    searchQuery: null
}

const appSlice = createSlice({
    name: 'app',
    initialState: initialAppState,
    reducers: {
        selectTab(state, action){
            state.currentTab = action.payload;
        },
        setSearchQuery(state, action){
            state.searchQuery = action.payload;
        }
    }
})

export const tabActions = appSlice.actions;

export default appSlice.reducer;