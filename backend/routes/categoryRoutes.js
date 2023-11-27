import express from 'express'
import { requireSignIn,isAdmin } from "../middleware/authMiddleware.js";
import { createCategoryController,updateCategoryController } from '../controllers/categoryController.js';

const router = express.Router()

//routes
router.post('/create-category',requireSignIn,isAdmin,createCategoryController)

//update category
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController)

export default router