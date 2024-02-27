import { Router } from 'express';
import asyncHandler from 'express-async-handler';
//import Product from '../models/ProductModel.js';
import express from 'express';


import { isAdmin, requireSignIn,isDoctor } from '../middleware/authMiddleware.js';
import { createProductController, 
  deleteProductController, getProductController, getProductQuantities, getSingleProductController, 
  productCategoryController, 
  productCountController, 
  productFiltersController, 
  productListController, 
  productPhotoController, productStockUpdate, relatedProductController, searchProductController, updateProductController,updateProductRating } from '../controllers/productController.js';
import formidable from 'express-formidable';
import route from 'color-convert/route.js';

const router = express.Router();

// Create product
router.post('/create-product', requireSignIn,isAdmin, formidable(),createProductController)

//get products
router.get('/get-product',getProductController)

//get one product
router.get('/get-product/:slug',getSingleProductController)

//get photo
router.get('/product-photo/:pid',productPhotoController)

//delete product
router.delete('/delete-product/:pid',requireSignIn,isAdmin,formidable(),deleteProductController)

//update product
router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController)

//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get('/product-count',productCountController)

//product per page
router.get('/product-list/:page',productListController)

//search product
router.get('/search/:keyword',searchProductController)

//similar product
router.get('/related-product/:pid/:cid',relatedProductController)

//category wise product
router.get('/product-category/:slug',productCategoryController)

// Route to update product rating
router.post('/rate/:productId', requireSignIn,isDoctor,updateProductRating);

router.post('/getQuantities', getProductQuantities);

//update quantity when users buys
router.post('/updateStock',productStockUpdate);

export default router;