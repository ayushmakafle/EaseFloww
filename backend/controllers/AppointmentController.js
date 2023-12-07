import userModel from "../models/UserModel.js";
import DoctorModel from "../models/DoctorModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelpers.js";
import JWT from "jsonwebtoken";
import UserModel from "../models/UserModel.js";
import fs from "fs"
import nodemailer from 'nodemailer'

//book appointment
const bookAppointmentController = () => {}


export default {bookAppointmentController}