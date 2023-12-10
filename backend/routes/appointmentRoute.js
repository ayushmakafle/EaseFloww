import express from "express";
import appointmentController from "../controllers/AppointmentController.js";

import { isDoctor, requireSignIn } from "../middleware/authMiddleware.js";

//router object
const router = express.Router();

//book appointment
router.post('/book-appointment',requireSignIn,appointmentController.bookAppointmentController)

//booking availability
router.post('/booking-availability',requireSignIn,appointmentController.checkAvailabilityController)

//appointment list
router.get('/user-appointments', requireSignIn, appointmentController.userAppointments);

//get appointment for doctor
router.get('/doctor-appointment',requireSignIn,appointmentController.doctorAppointmentController)

//update status
router.post('/update-status',requireSignIn,appointmentController.updateStatusController)

export default router;