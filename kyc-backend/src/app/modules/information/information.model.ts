import { Schema, model, Model } from 'mongoose';

import { TKYCInformation, KYCInformationModel } from './information.interface';

const kycInformationSchema = new Schema<TKYCInformation, KYCInformationModel>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  residentialAddress: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  identificationType: {
    type: String,
    required: true,
  },
  identificationNumber: {
    type: String,
    required: true,
  },
  issueDate: {
    type: Date,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  signature: {
    type: String,
    required: true,
  },
  photograph: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  employer: {
    type: String,
    required: true,
  },
  tin: {
    type: String,
    required: true,
  },
  sourceOfFunds: {
    type: String,
    required: true,
  },
  purposeOfAccount: {
    type: String,
    required: true,
  },
  // Add other fields as needed
});

export const KYCInformation = model<TKYCInformation, KYCInformationModel>(
  'KYCInformation',
  kycInformationSchema,
);
