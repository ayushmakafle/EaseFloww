import userModel from "../models/UserModel.js";
import DoctorModel from "../models/DoctorModel.js";
import AppointmentModel from "../models/AppointmentModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelpers.js";
import JWT from "jsonwebtoken";
import fs from "fs"
import nodemailer from 'nodemailer'
import moment from 'moment'

const bookAppointmentController = async (req, res) => {
    try {
        req.body.date = moment(req.body.date,'DD-MM-YYYY').toISOString()
        req.body.time = moment(req.body.time,'HH:mm').toISOString()
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

//booking availability
const bookingAvailabilityController = async(req,res) => {
    try{
        const date = moment(req.body.date,'DD-MM-YYYY').toISOString()
        const fromTime =moment(req.body.time,'HH:mm').subtract(1,'hours').toISOString()
        const toTime = moment(req.body.time,'HH:mm').add(1,'hours').toISOString()
        const doctorId = req.body.doctorId;
        const appointments = await AppointmentModel.find({
            doctorId,
            date,
            time: {
                $gte: fromTime,
                $lte: toTime,
            },
        });
        if (appointments.length > 0) {
            return res.status(200).send({
                message: "Appointments not available at this time",
                success: true,
            });
        } else {
            return res.status(200).send({
            success: true,
            message: "Appointments available",
        });
    }
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'error in checking availability'
        })
    }
}

//get all appointment in admin
const userAppointmentsController = async (req, res) => {
  try {
    const appointments = await AppointmentModel.find({
      userId: req.body.userId,
    });
    res.status(200).send({
      success: true,
      message: "Users Appointments fetched Successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In User Fetching Appointments",
    });
  }
};

//get appointment for doctor
const doctorAppointmentController = async (req, res) => {
  try {
    const doctor = await DoctorModel.findOne({ userId: req.body.userId });
    const appointments = await AppointmentModel.find({
      doctorID: doctor._id,
    });
    res.status(200).send({
      success: true,
      message: "Doctor Appointments fetched successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Doc Appointments",
    });
  }
};

//update status
const updateStatusController = async(req,res) => {
    try{
        const {appointmentsId,status}=req.body
        const appointments = await AppointmentModel.findByIdAndUpdate(appointmentsId,{status})
        //mail
        res.status(200).send({
            success:true,
            message:'Appointment Status Updated'
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'error in update status'
        })
    }
}


export default {bookAppointmentController,
    bookingAvailabilityController,
    userAppointmentsController,
    doctorAppointmentController,
    updateStatusController
}