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

        const inputDate = req.body.date;
        const inputStartTime = req.body.startTime;
        const inputEndTime = req.body.endTime;

        // Format the date, start time, and end time correctly
        const formattedStartDate = moment(`${inputDate} ${inputStartTime}`, 'DD-MM-YYYY HH:mm')
        const formattedEndDate = moment(`${inputDate} ${inputEndTime}`, 'DD-MM-YYYY HH:mm')

        const newAppointment = new AppointmentModel({
            ...req.body,
            startTime: formattedStartDate,
            endTime: formattedEndDate,
            status: "pending",
             doctorInfo: JSON.stringify(req.body.doctorInfo), // Convert object to string
      userInfo: JSON.stringify(req.body.userInfo),
        });

        await newAppointment.save();
        
       const doctorID = req.body.doctorID;
const doctor = await DoctorModel.findById(doctorID);

if (!doctor) {
    throw new Error('Doctor not found');
}

const { email } = doctor;
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port:587,
            secure:false,
            requireTLS:true, 
            auth: {
                user: 'easeflow2023@gmail.com', 
                pass: `${process.env.SMTP_PASSWORD}`
            }
        });
        const mailOptions = {
            from:'easeflow2023@gmail.com',
            to:email,
            subject:"New appointment request",
            html:`<p> Hi ${req.body.doctorInfo},
                you have a new appointment request from ${req.body.userInfo}. 
                Visit your dashboard to process it.` 
        }
        transporter.sendMail(mailOptions, function(error,info){
        if(error){
            console.log(error)
        }
        else{
            console.log('appointment request email has been sent ',info.response)
        }
        })

        res.status(200).send({
            success: true, 
            message: 'Appointment booked successfully',
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

const checkAvailabilityController = async (req, res) => {
    try {
        const inputDate = req.body.date;
        const inputStartTime = req.body.startTime;
        const inputEndTime = req.body.endTime;

        const formattedStartDate = moment(`${inputDate} ${inputStartTime}`, 'DD-MM-YYYY HH:mm');
        const formattedEndDate = moment(`${inputDate} ${inputEndTime}`, 'DD-MM-YYYY HH:mm');

        // Check if there are any overlapping appointments
        const overlappingAppointments = await AppointmentModel.find({
            doctorID: req.body.doctorID,
            date: inputDate,
            $or: [
                {
                    startTime: { $lt: formattedEndDate },
                    endTime: { $gt: formattedStartDate }
                },
                {
                    startTime: { $gte: formattedStartDate, $lt: formattedEndDate },
                },
                {
                    endTime: { $gt: formattedStartDate, $lte: formattedEndDate },
                }
            ]
        });

        if (overlappingAppointments.length > 0) {
            // Appointments exist within the specified range
            res.status(200).send({
                success: false,
                message: 'Appointment slot not available',
            });
        } else {
            // No overlapping appointments, slot is available
            res.status(200).send({
                success: true,
                message: 'Appointment slot available',
            });
        }
    } catch (error) {
        console.error("Error while checking availability:", error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while checking availability",
        });
    }
};


//booking availability
/* const bookingAvailabilityController = async(req,res) => {
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
} */

// Controller to fetch user appointments
const userAppointments = async (req, res) => {
  try {
    // Extract user ID from the authenticated user's token
    const userId = req.user._id; // Assuming you have stored user ID in req.auth

    // Fetch appointments for the specified user ID
    const appointments = await AppointmentModel.find({
      userID: userId,
    });

    res.status(200).send({
      success: true,
      message: "User's Appointments fetched successfully",
      data: appointments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in fetching user appointments",
    });
  }
};

//get appointment for doctor
const doctorAppointments = async (req, res) => {
  try {
    // Extract doctor ID from the authenticated doctor's token
    const doctorId = req.user._id; // Assuming you have stored doctor ID in req.doctor

    // Fetch appointments for the specified doctor ID
    const appointments = await AppointmentModel.find({
      doctorID: doctorId,
    });

    res.status(200).send({
      success: true,
      message: "Doctor's Appointments fetched successfully",
      data: appointments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in fetching doctor appointments",
    });
  }
};

// Controller to accept an appointment
const acceptAppointment = async (req, res) => {
  try {
    const appointment = await AppointmentModel.findById(req.params.id);
    await AppointmentModel.findByIdAndUpdate(req.params.id, { status: 'accepted' });
       console.log("Appointment ID:", req.params.id);
    console.log("Appointment User ID:", appointment.userID);

    // Fetch user's email
    const user = await userModel.findById(appointment.userID);
       console.log("User Object:", user);
    const { email } = user;

    // Send email to user
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port:587,
      secure:false,
      requireTLS:true, 
      auth: {
        user: 'easeflow2023@gmail.com', 
        pass: `${process.env.SMTP_PASSWORD}`
      }
    });
    const mailOptions = {
      from:'easeflow2023@gmail.com',
      to: email,
      subject: "Appointment Accepted",
      html: `<p> Hi ${user.username}, Your appointment has been accepted by the doctor. </p>` 
    }
    transporter.sendMail(mailOptions, function(error,info){
      if(error){
        console.log(error)
      }
      else{
        console.log('Appointment acceptance email has been sent ',info.response)
      }
    })

    res.status(200).send({
      success: true,
      message: "Appointment accepted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in accepting appointment",
    });
  }
};

// Controller to reject an appointment
const rejectAppointment = async (req, res) => {
  try {
    const appointment = await AppointmentModel.findById(req.params.id);
    if (!appointment) {
      return res.status(404).send({
        success: false,
        message: "Appointment not found",
      });
    }

    const user = await userModel.findById(appointment.userID);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port:587,
      secure:false,
      requireTLS:true, 
      auth: {
        user: 'easeflow2023@gmail.com', 
        pass: `${process.env.SMTP_PASSWORD}`
      }
    });

    const mailOptions = {
      from:'easeflow2023@gmail.com',
      to: user.email,
      subject: "Appointment Rejected",
      html: `<p> Hi ${user.username}, your appointment has been rejected. Please book another slot.</p>` 
    }

    transporter.sendMail(mailOptions, function(error,info){
      if(error){
        console.log(error)
      }
      else{
        console.log('Appointment rejection email has been sent ',info.response)
      }
    });

    await AppointmentModel.findByIdAndUpdate(req.params.id, { status: 'rejected' });

    res.status(200).send({
      success: true,
      message: "Appointment rejected successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in rejecting appointment",
    });
  }
};

/* //update status
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
 */

export default {bookAppointmentController,
    checkAvailabilityController,
    userAppointments,
    doctorAppointments,
    acceptAppointment,
    rejectAppointment
}