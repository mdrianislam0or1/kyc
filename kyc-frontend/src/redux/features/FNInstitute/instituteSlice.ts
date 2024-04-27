/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

export type TInstitute = {
  _id: string;
  name: string;
  registrationNumber: string;
  email: string;
  password: string;
  role: string;
  fullName: string;
  address: string;
  contactNumber: string;
  website: string;
  financialLicense: string;
};

const initialState: TInstitute = {
  _id: "",
  name: "",
  registrationNumber: "",
  email: "",
  password: "",
  role: "",
  fullName: "",
  address: "",
  contactNumber: "",
  website: "",
  financialLicense: "",
};

const instituteSlice = createSlice({
  name: "institute",
  initialState,
  reducers: {
    setInstituteData: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetInstituteData: () => initialState,
  },
});

export const { setInstituteData, resetInstituteData } = instituteSlice.actions;

export default instituteSlice.reducer;
