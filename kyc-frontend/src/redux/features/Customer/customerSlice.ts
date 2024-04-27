/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

type Customer = {
  _id: string;
  username: string;
  nid: string;
  email: string;
  password: string;
  role: string;
  fullName: string;
  dateOfBirth: string;
  nationality: string;
  residentialAddress: string;
  contactNumber: string;
  identificationType: string;
  identificationNumber: string;
  issueDate: string;
  expirationDate: string;
  signature: string;
  photograph: string;
  occupation: string;
  employer: string;
  tin: string;
  sourceOfFunds: string;
  purposeOfAccount: string;
};

const initialState: Customer = {
  _id: "",
  username: "",
  nid: "",
  email: "",
  password: "",
  role: "",
  fullName: "",
  dateOfBirth: "",
  nationality: "",
  residentialAddress: "",
  contactNumber: "",
  identificationType: "",
  identificationNumber: "",
  issueDate: "",
  expirationDate: "",
  signature: "",
  photograph: "",
  occupation: "",
  employer: "",
  tin: "",
  sourceOfFunds: "",
  purposeOfAccount: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomerData: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetCustomerData: () => initialState,
  },
});

export const { setCustomerData, resetCustomerData } = customerSlice.actions;

export default customerSlice.reducer;
