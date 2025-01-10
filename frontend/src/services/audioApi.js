import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const audioApi = createApi({
  reducerPath: "audioApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/",
  }),
  endpoints: (builder) => ({

    playAudio: builder.query({
      query: ({ bookId, chapterId, shlokaId }) =>
        `books/${bookId}/chapters/${chapterId}/shlokas/${shlokaId}/play-audio/`,
      transformResponse: (response) => response, // You can customize this if necessary
    }),
  }),
});

export const {
  usePlayAudioQuery,
} = audioApi;
