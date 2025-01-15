import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; 

export const audioApi = createApi({
  reducerPath: "audioApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api", 
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
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
