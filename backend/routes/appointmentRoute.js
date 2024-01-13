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

// //get appointment for doctor
// router.get('/doctor-appointments',requireSignIn,appointmentController.doctorAppointments)

//doctor accept and reject appointment
router.put('/accept/:id', requireSignIn, appointmentController.acceptAppointment);
router.put('/reject/:id', requireSignIn,appointmentController.rejectAppointment);

router.get('/doctor-appointments', requireSignIn, appointmentController.adminAppointments);

router.get('/doctor-appointments/:id', requireSignIn, appointmentController.doctorAppointmentsById);



export default router;