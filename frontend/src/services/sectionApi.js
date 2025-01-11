import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// API for Sections
export const sectionApi = createApi({
  reducerPath: "sectionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api", // Correct backend URL
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