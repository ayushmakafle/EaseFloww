
import OrderModel from '../models/OrderModel.js';
import UserModel from '../models/UserModel.js';

export async function createOrder(req, res) {
  try {
    console.log('Received Order Request:', req.body);

    const { User, orderItems, totalPrice, paymentResult } = req.body;

    // Validate orderItems
    if (!Array.isArray(orderItems) || orderItems.length === 0) {
      return res.status(400).json({ error: 'orderItems must be a non-empty array' });
    }

    const processedOrderItems = orderItems.map(item => ({
      Product: item._id,
      qyt: item.numberOfItems,
      price: item.price,
      name: item.name,
    }));

    const order = new OrderModel({
      User: User,
      orderItems: processedOrderItems,
      totalPrice: totalPrice,
      paymentResult: paymentResult,
      isPaid: true,
      paidAt: new Date(),
      isDelivered: false,
      DeliveredAt: null,
    });

    const savedOrder = await order.save();

    console.log('Order Created Successfully:', savedOrder);

    // Update the user's order history
    await UserModel.findByIdAndUpdate(
      User,
      { $push: { orders: savedOrder._id } },
      { new: true },
    );

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}


export async function getUserOrders(req, res) {
  try {
    const userId = req.user._id; // Assuming you have middleware to extract the user ID from the request

    // Fetch orders for the logged-in user
    const orders = await OrderModel.find({ User: userId }).populate('orderItems.Product', 'name price');

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error', details: error.message });
  }
}