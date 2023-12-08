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
import { createOrder, getUserOrders } from '../controllers/orderController.js';
import { requireSignIn } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use((req, res, next) => {
  console.log('Received Order Request:', req.body);
  next();
});

// Order creation
router.post('/create-orders', requireSignIn, createOrder);

// User route to get their order details
router.get('/orders', requireSignIn, getUserOrders);

// Export the router
export default router;
