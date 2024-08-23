import { configureStore } from '@reduxjs/toolkit';
import { api } from './Helper/Apis/UseMutate';


const store = configureStore({
  reducer: {
    // Add the generated reducer as a top-level slice
    [api.reducerPath]: api.reducer,
  },
  // Add the api middleware to enable features like caching, invalidation, and polling
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
