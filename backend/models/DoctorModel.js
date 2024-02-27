import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    username: {
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
    experience: {
      type: Number,
      required: true
    },
    feesPerConsultation: {
      type: Number,
      required: true,
    }, 
    officeHoursStart: {
      type: String,
      required: true,
    },
    officeHoursEnd: {
      type: String,
      required: true,
    },
    officeDays: {
      type: [String], 
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    emailverified:{
      type: Boolean,
      default:false,
    },
    
    role: {
      type: Number,
      default: 2,
    },
  },
  { timestamps: true }
);

export default mongoose.model('doctors', doctorSchema);
