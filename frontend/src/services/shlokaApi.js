import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shlokaApi = createApi({
  reducerPath: "shlokaApi",
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
    getShlokas: builder.query({
      query: ({ bookId, chapterId }) => `/books/${bookId}/chapters/${chapterId}/shlokas/`,
    }),
    getShlokaById: builder.query({
      query: ({ bookId, chapterId, shlokaId }) => 
        `/books/${bookId}/chapters/${chapterId}/shlokas/${shlokaId}/`,
    }),
    playAudio: builder.mutation({
      query: ({ bookId, chapterId, sectionId, shlokaId }) => {
        const url = sectionId
          ? `/books/${bookId}/chapters/${chapterId}/sections/${sectionId}/shlokas/${shlokaId}/play-audio/`
          : `/books/${bookId}/chapters/${chapterId}/shlokas/${shlokaId}/play-audio/`;
        
        return {
          url,
          method: 'GET',
          responseType: 'blob',
        };
      },
    }),
  }),
});

export const {
  useGetShlokasQuery,
  useGetShlokaByIdQuery,
  usePlayAudioMutation,
} = shlokaApi;
