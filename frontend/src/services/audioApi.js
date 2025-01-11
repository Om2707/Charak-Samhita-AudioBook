import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // Ensure this import is correct

export const audioApi = createApi({
  reducerPath: "audioApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api", // Ensure your backend URL is correct
  }),
  endpoints: (builder) => ({
    playAudio: builder.query({
      query: ({ bookId, chapterId, sectionId, shlokaId }) => 
        `books/${bookId}/chapters/${chapterId}/sections/${sectionId}/shlokas/${shlokaId}/play-audio/`, // Correct endpoint path
      transformResponse: (response) => response, // Customize response if necessary
    }),
  }),
});

export const {
  usePlayAudioQuery,
} = audioApi;
