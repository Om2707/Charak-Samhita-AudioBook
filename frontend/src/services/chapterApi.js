import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chapterApi = createApi({
  reducerPath: "chapterApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
  }),
  endpoints: (builder) => ({
    getChapters: builder.query({
      query: (bookId) => `/books/${bookId}/chapters/`,
    }),
  }),
});

export const { useGetChaptersQuery } = chapterApi;
