// Import necessary modules and dependencies
import express from 'express'
import { createOrder } from '../controllers/orderController.js';

const router = express.Router()


//order creation
router.post('/create-orders', (req, res) => {
  // Log the request body
  console.log('Received Order Request:', req.body);

  // Call the orderController to create the order
  createOrder(req, res);
});

// Export the router
export default router;
