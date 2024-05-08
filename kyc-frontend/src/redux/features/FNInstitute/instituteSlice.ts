import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface Institute {
  _id: string;
  registrationNumber: string;
  role: string;
  email: string;
}

interface InstituteState {
  institute: Institute | null;
  token: string | null;
}

const initialState: InstituteState = {
  institute: null,
  token: null,
};

const instituteSlice = createSlice({
  name: "institute",
  initialState,
  reducers: {
    setInstituteData: (state, action: PayloadAction<Institute>) => {
      state.institute = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    resetInstituteData: (state) => {
      state.institute = null;
      state.token = null;
    },
  },
});

export const { setInstituteData, setToken, resetInstituteData } =
  instituteSlice.actions;

export default instituteSlice.reducer;

export const selectInstitute = (state: RootState) => state.institute.institute;
export const selectToken = (state: RootState) => state.institute.token;
