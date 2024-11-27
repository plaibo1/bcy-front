import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./slices/counterSlice";
import { fakeApi } from "./api/fakeApi";
import { entityApi } from "./api/entityApi";

export const store = configureStore({
  reducer: {
    [counterSlice.reducerPath]: counterSlice.reducer,

    // ------ API ----- //
    [fakeApi.reducerPath]: fakeApi.reducer,
    [entityApi.reducerPath]: entityApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([fakeApi.middleware, entityApi.middleware]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
