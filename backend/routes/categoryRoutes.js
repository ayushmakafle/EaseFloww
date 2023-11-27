import express from 'express'
import { requireSignIn,isAdmin } from "../middleware/authMiddleware.js";
import { createCategoryController,getAllCategory,singleCategoryController,updateCategoryController,deleteCategoryController } from '../controllers/categoryController.js';

const router = express.Router()

//routes
router.post('/create-category',requireSignIn,isAdmin,createCategoryController)

//update category
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController)

//get all category
router.get('/get-category',getAllCategory)

//single category
router.get('/single-category/:slug',singleCategoryController)

//delete category
router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController)

export default router