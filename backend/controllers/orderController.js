import OrderModel from '../models/OrderModel.js';

export async function createOrder(req, res) {
  try {
    console.log('Received Order Request:', req.body);

    const { User, orderItems, totalPrice, paymentResult } = req.body;

    // Validate orderItems
    if (!Array.isArray(orderItems) || orderItems.length === 0) {
      return res.status(400).json({ error: 'orderItems must be a non-empty array' });
    }

    const processedOrderItems = orderItems.map(item => ({
      Product: item._id, // Assuming _id is the reference to the product
      qyt: item.numberOfItems,
      price: item.price,
      name: item.name,
    }));

    const order = new OrderModel({
      User: User, // Extract user from the request body
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

    res.status(201).json(savedOrder);
  } catch (error) {
  console.error('Error creating order:', error);
  res.status(500).json({ error: 'Internal Server Error', details: error.message });
}

  }