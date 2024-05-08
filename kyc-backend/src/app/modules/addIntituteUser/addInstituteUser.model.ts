import { Schema, model } from 'mongoose';

const instituteUserSchema = new Schema({
  instituteId: {
    type: Schema.Types.ObjectId,
    ref: 'FinancialInstitute',
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

export default model('InstituteUser', instituteUserSchema);
