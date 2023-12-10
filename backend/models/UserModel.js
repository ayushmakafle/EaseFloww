import { Schema, model } from 'mongoose';

const userSchema = Schema({
  
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
    address: {
      type: String,
      required: true,
    },

    role: {
      type: Number,
      default: 0,
    },
    isEmailVerified:{
      type: Number,
      default: 0, 
    }
  },
  { timestamps: true }
);
const User = model('User', userSchema);
export default User;
