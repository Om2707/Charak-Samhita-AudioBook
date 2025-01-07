
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shlokApi = createApi({
  reducerPath: 'shlokApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://your-api-base-url.com' }),
  endpoints: (builder) => ({
    getShloks: builder.query({
      query: () => '/shloks', // API endpoint for fetching shloks
    }),
  }),
});

export const { useGetShloksQuery } = shlokApi;
