import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const sectionApi = createApi({
  reducerPath: "sectionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
  }),
  endpoints: (builder) => ({
    // Get shlokas not linked to any section for a specific chapter
    getChapterShlokas: builder.query({
      query: ({ bookId, chapterId }) =>
        `/books/${bookId}/chapters/${chapterId}/shlokas/`,
    }),
    // Existing endpoints...
    getSections: builder.query({
      query: ({ bookId, chapterId }) => 
        `/books/${bookId}/chapters/${chapterId}/sections/`,
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
  useGetChapterShlokasQuery,
  useGetSectionsQuery,
  useGetSectionByIdQuery,
  useGetSectionShlokasQuery,
} = sectionApi;
