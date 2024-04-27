import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import customerReducer from "./features/Customer/customerSlice";
import instituteReducer from "./features/FNInstitute/instituteSlice";
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
import { customerApi } from "./features/Customer/customerApi";
import { instituteApi } from "./features/FNInstitute/instituteApi";

const persistConfig = {
  key: "auth",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    customer: customerReducer,
    institute: instituteReducer,
    // cart: cartReducer,

    [customerApi.reducerPath]: customerApi.reducer,
    [instituteApi.reducerPath]: instituteApi.reducer,
    // [cartApi.reducerPath]: cartApi.reducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      baseApi.middleware,
      customerApi.middleware,
      instituteApi.middleware
      //   cartApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
