import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./slices/counterSlice";
import { fakeApi } from "./api/fakeApi";
import { entityApi } from "./api/entityApi";
import { entityFieldsApi } from "./api/entityFieldsApi";
import { businessObjectApi } from "./api/businessObjectApi";
import { clientsApi } from "./api/clientsApi";
import { activeBackdoorsApi } from "./api/activeBackdoorsApi";
import { backdoorLeadApi } from "./api/backdoorLeadApi";
import { orderApi } from "./api/orderApi";

export const store = configureStore({
  reducer: {
    [counterSlice.reducerPath]: counterSlice.reducer,

    // ------ API ----- //
    [fakeApi.reducerPath]: fakeApi.reducer,
    [entityApi.reducerPath]: entityApi.reducer,
    [entityFieldsApi.reducerPath]: entityFieldsApi.reducer,
    [businessObjectApi.reducerPath]: businessObjectApi.reducer,
    [clientsApi.reducerPath]: clientsApi.reducer,
    [activeBackdoorsApi.reducerPath]: activeBackdoorsApi.reducer,
    [backdoorLeadApi.reducerPath]: backdoorLeadApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      fakeApi.middleware,
      entityApi.middleware,
      entityFieldsApi.middleware,
      businessObjectApi.middleware,
      clientsApi.middleware,
      activeBackdoorsApi.middleware,
      backdoorLeadApi.middleware,
      orderApi.middleware,
    ]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
