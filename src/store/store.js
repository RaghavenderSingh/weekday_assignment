import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { jobsApi } from '../api/jobsApi'; // We'll create this file in the next step

const store = configureStore({
  reducer: {
    [jobsApi.reducerPath]: jobsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobsApi.middleware),
});

setupListeners(store.dispatch);
export default store;