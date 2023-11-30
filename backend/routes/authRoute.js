import express from "express";
import authController from "../controllers/authController.js";

//import {registerController, loginController} from "../controllers/authController.js";
import { requireSignIn,isAdmin } from "../middleware/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post('/register', authController.registerController);

//LOGIN || POST
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
export default router;