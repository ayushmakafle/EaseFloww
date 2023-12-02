import { Router } from 'express';
import asyncHandler from 'express-async-handler';
//import Product from '../models/ProductModel.js';
import express from 'express';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
import { createProductController, 
  deleteProductController, getProductController, getSingleProductController, 
  productCategoryController, 
  productCountController, 
  productFiltersController, 
  productListController, 
  productPhotoController, relatedProductController, searchProductController, updateProductController } from '../controllers/productController.js';
import formidable from 'express-formidable';
import route from 'color-convert/route.js';

const router = express.Router();

// Get route for all products
/* router.get('/products', asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
})); */

// Get route for single product
/* router.get('/products/:id', asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
})); */

// Create product
router.post('/create-product', requireSignIn,isAdmin, formidable(),createProductController)
/* (req, res, next) => {
    const form = formidable();
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: err,
          message: 'Error parsing form data',
        });
      }
      req.fields = fields;
      req.files = files;
      next();
    });
  },
  createProductController
); */

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

//categort wise product
router.get('/product-category/:slug',productCategoryController)

export default router;