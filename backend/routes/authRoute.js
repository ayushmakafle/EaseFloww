import express from "express";
import authController from "../controllers/authController.js";
import formidable from 'express-formidable';


//import {registerController, loginController} from "../controllers/authController.js";
import { requireSignIn,isAdmin } from "../middleware/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post('/register', authController.registerController);

//LOGIN
router.post("/login", authController.loginController);

//forgot password
router.post('/forgot-password',authController.forgotPasswordController)

//protected route user auth
router.get('/user-auth',requireSignIn, (req,res) => {
    res.status(200).send({ok:true})
})

//protected route admin auth
router.get('/admin-auth',requireSignIn,isAdmin, (req,res) => {
    res.status(200).send({ok:true})
})

//update profie
router.put('/profile',requireSignIn,authController.updateProfileController)

//doctor signup route
router.post('/doctorsignup', formidable(), authController.registerDoctorController);

//doctor unapproved
router.get('/unapproved-doctors', requireSignIn, isAdmin, authController.getUnapprovedDoctorsController)

//get doctor certificate photo
router.get('/unapproved-photo/:did', authController.certificatePhotoController);

// Route for approving a doctor
router.put('/approve-doctor/:did', authController.approveDoctorController);

// Route for denying and removing a doctor
router.delete('/deny-doctor/:did', authController.denyDoctorController);

// Route for checking doctor approval
//router.post('/check-doctor-approval', authController.checkDoctorApprovalController);

//doctor login route
router.post('/doctor-login',authController.doctorLoginController);


export default router;