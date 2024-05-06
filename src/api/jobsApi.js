// api/jobsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const jobsApi = createApi({
  reducerPath: 'jobsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.weekday.technology/' }),
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: (filterParams) => ({
        url: 'adhoc/getSampleJdJSON',
        method: 'POST',
        body: filterParams,
      }),
    }),
  }),
});

export const { useGetJobsQuery } = jobsApi;