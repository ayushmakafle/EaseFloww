import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    certificatePhoto: {
      data: Buffer,
      contentType: String,
    },
    address: {
      type: String,
      required: true,
    },
    hospitalOrClinic: {
      type: String,
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    role: {
      type: Number,
      default: 2,
    },
  },
  { timestamps: true }
);

export default mongoose.model('doctors', doctorSchema);
