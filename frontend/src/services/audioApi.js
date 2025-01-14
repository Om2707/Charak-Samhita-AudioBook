import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; 

export const audioApi = createApi({
  reducerPath: "audioApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api", 
  }),
  endpoints: (builder) => ({
    playAudio: builder.query({
      query: ({ bookId, chapterId, sectionId, shlokaId }) => 
        `books/${bookId}/chapters/${chapterId}/sections/${sectionId}/shlokas/${shlokaId}/play-audio/`,
      transformResponse: (response) => response, 
    }),
  }),
});

export const {
  usePlayAudioQuery,
} = audioApi;
