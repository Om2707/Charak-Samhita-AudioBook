import { configureStore } from "@reduxjs/toolkit";
import { audioApi } from "../services/audioApi";
import { booksApi } from "../services/booksApi";
import { chapterApi } from "../services/chapterApi";
import { sectionApi } from '../services/sectionApi';
import { shlokaApi } from "../services/shlokaApi";
import authReducer from "../slices/authSlice"; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    [chapterApi.reducerPath]: chapterApi.reducer,
    [sectionApi.reducerPath]: sectionApi.reducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [shlokaApi.reducerPath]: shlokaApi.reducer,
    [audioApi.reducerPath]: audioApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(chapterApi.middleware)
      .concat(sectionApi.middleware)
      .concat(booksApi.middleware)
      .concat(shlokaApi.middleware)
      .concat(audioApi.middleware),
});

export default store;