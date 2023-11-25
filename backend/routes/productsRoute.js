import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/ProductModel.js';

const router = Router();

// Get route for all products
router.get('/products', asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}));

// Get route for single product
router.get('/products/:id', asyncHandler(async (req, res) => {
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
}));

export default router;
