import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export type TAddUser = {
  _id: string;
  instituteId: string;
  userId: string;
  verified: boolean;
};

const initialState: TAddUser = {
  _id: "",
  instituteId: "",
  userId: "",
  verified: false,
};

const persistConfig = {
  key: "addUserInstitute",
  storage: storage,
};

const addUserInstituteSlice = createSlice({
  name: "addUserInstitute",
  initialState,
  reducers: {
    setAddUserInstitute: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetAddUserInstitute: () => initialState,
  },
});

export const { setAddUserInstitute, resetAddUserInstitute } =
  addUserInstituteSlice.actions;

const persistedAddUserInstituteReducer = persistReducer(
  persistConfig,
  addUserInstituteSlice.reducer
);

export default persistedAddUserInstituteReducer;
