import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const sectionApi = createApi({
  reducerPath: "sectionApi",
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
    getSections: builder.query({
      query: ({ bookId, chapterId }) => `/books/${bookId}/chapters/${chapterId}/sections/`,
    }),
    getSectionById: builder.query({
      query: ({ bookId, chapterId, sectionId }) => 
        `/books/${bookId}/chapters/${chapterId}/sections/${sectionId}/`,
    }),
    getSectionShlokas: builder.query({
      query: ({ bookId, chapterId, sectionId }) => 
        `/books/${bookId}/chapters/${chapterId}/sections/${sectionId}/shlokas/`,
    }),
  }),
});

export const {
  useGetSectionsQuery,
  useGetSectionByIdQuery,
  useGetSectionShlokasQuery,
} = sectionApi;