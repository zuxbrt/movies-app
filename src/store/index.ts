import { configureStore } from '@reduxjs/toolkit';

import appStateReducer from './app';

const store = configureStore({
    reducer: {
        app: appStateReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>

export default store;