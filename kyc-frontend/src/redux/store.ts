import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseApi } from "./api/baseApi";

const persistConfig = {
  key: "auth",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    // book: bookReducer,
    // sales: salesReducer,
    // cart: cartReducer,

    // [bookApi.reducerPath]: bookApi.reducer,
    // [salesApi.reducerPath]: salesApi.reducer,
    // [cartApi.reducerPath]: cartApi.reducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      baseApi.middleware
      //   bookApi.middleware,
      //   salesApi.middleware,
      //   cartApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
