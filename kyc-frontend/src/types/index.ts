export type User = {
  _id: string;
  username: string;
  nid: string;
  email: string;
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

//   export type UserWithToken {
//     user: User;
//     token: string;
//   }