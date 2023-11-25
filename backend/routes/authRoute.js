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

//test routes
router.get("/test",requireSignIn, isAdmin, authController.testController);

export default router;