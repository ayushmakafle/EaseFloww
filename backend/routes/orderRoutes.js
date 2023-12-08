// // Import necessary modules and dependencies
// import express from 'express'
// import { createOrder } from '../controllers/orderController.js';
// const router = express.Router()
// //order creation
// router.post('/create-orders', (req, res) => {
//   // Log the request body
//   console.log('Received Order Request:', req.body);
//   // Call the orderController to create the order
//   createOrder(req, res);
// });
// // Export the router
// export default router;


// Import necessary modules and dependencies
// Import necessary modules and dependencies
import express from 'express';
import User from '../models/UserModel.js'; // Add this line to import the User model


import { createOrder, getUserOrders } from '../controllers/orderController.js';
import { requireSignIn } from '../middleware/authMiddleware.js';
import OrderModel from '../models/OrderModel.js';

const router = express.Router();

router.use((req, res, next) => {
  console.log('Received Order Request:', req.body);
  next();
});

// Order creation
router.post('/create-orders', requireSignIn, createOrder);

// User route to get their order details
router.get('/orders', requireSignIn, getUserOrders);

// Get all orders with successful payments
router.get('/all-orders', async (req, res) => {
  try {
    const orders = await OrderModel.find({ isPaid: true }).populate({
      path: 'User',
      select: 'username email', // select the fields you want to populate
    });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Export the router
export default router;
