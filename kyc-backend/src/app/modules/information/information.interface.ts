import { Document, Model } from 'mongoose';

export interface TKYCInformation {
  _id: string;
  userId?: string; // Reference to the user who owns this KYC information
  fullName: string;
  dateOfBirth: Date;
  nationality: string;
  residentialAddress: string;
  contactNumber: string;
  email: string;
  identificationType: string;
  identificationNumber: string;
  issueDate: Date;
  expirationDate: Date;
  signature: string; // This could be a URL or base64-encoded image
  photograph: string; // This could be a URL or base64-encoded image
  occupation: string;
  employer: string;
  tin: string;
  sourceOfFunds: string;
  purposeOfAccount: string;
}

export interface KYCInformationModel extends Model<TKYCInformation> {
  // Add any custom static methods if required
}
