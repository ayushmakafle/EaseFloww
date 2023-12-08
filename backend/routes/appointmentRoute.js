import express from "express";
import appointmentController from "../controllers/AppointmentController.js";

import { requireSignIn } from "../middleware/authMiddleware.js";

//router object
const router = express.Router();

//book appointment
router.post('/book-appointment',requireSignIn,appointmentController.bookAppointmentController)



export default router;