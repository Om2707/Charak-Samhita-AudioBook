import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const audioApi = createApi({
  reducerPath: "audioApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/",
  }),
  endpoints: (builder) => ({
    // Endpoint to play the original audio
    playAudio: builder.query({
      query: ({ bookId, chapterId, shlokaId }) =>
        `books/${bookId}/chapters/${chapterId}/shlokas/${shlokaId}/play-audio/`,
      transformResponse: (response) => response, // You can customize this if necessary
    }),
    // Endpoint to play the English translation audio
    playEnglishAudio: builder.query({
      query: ({ bookId, chapterId, shlokaId }) =>
        `books/${bookId}/chapters/${chapterId}/shlokas/${shlokaId}/play-english-audio/`,
      transformResponse: (response) => response, // Customize if needed
    }),
    // Endpoint to play the Hindi translation audio
    playHindiAudio: builder.query({
      query: ({ bookId, chapterId, shlokaId }) =>
        `books/${bookId}/chapters/${chapterId}/shlokas/${shlokaId}/play-hindi-audio/`,
      transformResponse: (response) => response, // Customize if needed
    }),
  }),
});

// Export hooks to use the endpoints in your components
export const {
  usePlayAudioQuery,
  usePlayEnglishAudioQuery,
  usePlayHindiAudioQuery,
} = audioApi;
