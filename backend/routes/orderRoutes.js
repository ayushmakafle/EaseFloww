
import express from 'express';
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
router.put('/update-delivery/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { isDelivered } = req.body;
    console.log("From here",req.body)
    // Update the delivery status and set deliveredAt if isDelivered is true
    const update = {
      isDelivered,
      DeliveredAt: isDelivered ? new Date(): null,
    };

    const updatedOrder = await OrderModel.findByIdAndUpdate(orderId, update, { new: true });

res.json({ success: true, updatedOrder, deliveredAt: update.DeliveredAt });
  } catch (error) {
    console.error('Error updating delivery status:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error', details: error.message });
  }
});

// Export the router
export default router;