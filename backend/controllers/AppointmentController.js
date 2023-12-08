import userModel from "../models/UserModel.js";
import DoctorModel from "../models/DoctorModel.js";
import AppointmentModel from "../models/AppointmentModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelpers.js";
import JWT from "jsonwebtoken";
import fs from "fs"
import nodemailer from 'nodemailer'

const bookAppointmentController = async (req, res) => {
    try {
        req.body.status = "pending";
        const newAppointment = new AppointmentModel(req.body);
        await newAppointment.save();
        const user = await userModel.findOne({ _id: req.body.userId });
        //send mail here
        res.status(200).send({
            success: true, 
            message: 'appointment booked successfully',
        });
    } catch (error) {
        console.error("Error while booking appointment:", error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while booking appointment",
        });
    }
};



export default {bookAppointmentController}