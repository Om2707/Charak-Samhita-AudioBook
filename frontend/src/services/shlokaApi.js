import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shlokaApi = createApi({
  reducerPath: "shlokaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
  }),
  endpoints: (builder) => ({
    getShlokas: builder.query({
      query: ({ bookId, chapterId }) => `/books/${bookId}/chapters/${chapterId}/shlokas/`,
    }),
    getShlokaById: builder.query({
      query: ({ bookId, chapterId, shlokaId }) => 
        `/books/${bookId}/chapters/${chapterId}/shlokas/${shlokaId}/`,
    }),
    playAudio: builder.mutation({
      query: ({ bookId, chapterId, shlokaId }) => ({
        url: `/books/${bookId}/chapters/${chapterId}/shlokas/${shlokaId}/play-audio/`,
        method: 'GET',
        responseType: 'blob', // To handle audio streaming
      }),
    }),
  }),
});

export const {
  useGetShlokasQuery,
  useGetShlokaByIdQuery,
  usePlayAudioMutation,
} = shlokaApi;
