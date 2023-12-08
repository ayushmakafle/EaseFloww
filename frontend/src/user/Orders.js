// import React from 'react';
// import { useCart } from '../context/cart';
// import MainNavbar from '../components/Navbar';

// const OrderConfirmation = () => {
//   const [cart] = useCart(); // Assuming you have a context for the cart data

//   // You can get order details from an API or any other source
//   const orderDetails = {
//     orderId: '123456',
//     orderDate: new Date().toLocaleDateString(),
//     orderStatus: 'Confirmed',
//     products: cart || [],
//   };

//   // Calculate total price
//   const totalPrice = orderDetails.products.reduce((total, product) => {
//     return total + product.price * product.numberOfItems;
//   }, 0);

//   return (
//     <>
//       <MainNavbar />
//       <div className="container mt-5">
//         <div className="card">
//           <div className="card-header bg-primary text-white text-center">
//             <h2 className="mb-0">Order Confirmation</h2>
//           </div>
//           <div className="card-body">
//             <div className="row">
//               <div className="col-md-12">
//                 <h4 className="mb-3">Order Details</h4>
//                 <div className="mb-3">
//                   <strong>Order Number/ID:</strong> {orderDetails.orderId}
//                 </div>
//                 <div className="mb-3">
//                   <strong>Order Date:</strong> {orderDetails.orderDate}
//                 </div>
//                 <div>
//                   <strong>Order Status:</strong> {orderDetails.orderStatus}
//                 </div>
//               </div>
//             </div>

//             <div className="row mt-4">
//               <div className="col-md-12">
//                 <h4 className="mb-3 text-center">Product Details</h4>
//                 <div className="table-responsive">
//                   <table className="table table-bordered table-hover">
//                     <thead className="thead-dark">
//                       <tr>
//                         <th>Image</th>
//                         <th>Product Name</th>
//                         <th>Quantity</th>
//                         <th>Price</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {orderDetails.products.map((product) => (
//                         <tr key={product._id}>
//                           <td>
//                             <img
//                               src={`/api/v1/product/product-photo/${product._id}`}
//                               alt={product.name}
//                               width="80"
//                               height="80"
//                               className="img-fluid rounded"
//                             />
//                           </td>
//                           <td>{product.name}</td>
//                           <td>{product.numberOfItems}</td>
//                           <td>NPR {product.price * product.numberOfItems} /-</td>
//                         </tr>
//                       ))}
//                       <tr>
//                         <td colSpan="3" className="text-right">
//                           <strong>Total Price:</strong>
//                         </td>
//                         <td>
//                           <strong>NPR {totalPrice.toFixed(2)} /-</strong>
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default OrderConfirmation;
import React, { useState, useEffect } from 'react';
import MainNavbar from '../components/Navbar';
import axios from 'axios';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from the server when the component mounts
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // Fetch orders specific to the logged-in user
      const response = await axios.get('/api/v1/orders/user-orders'); // Use the correct API endpoint
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <>
      <MainNavbar />
      <div className="container mt-5">
        <div className="card">
          <div className="card-header bg-primary text-white text-center">
            <h2 className="mb-0">My Orders</h2>
          </div>
          <div className="card-body">
            {orders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              orders.map((order) => (
                <div key={order._id} className="mb-4">
                  <h4>Order Details</h4>
                  <div className="mb-3">
                    <strong>User:</strong> {order.User}
                  </div>
                  <div className="mb-3">
                    <strong>Order Items:</strong>
                    <table className="table table-bordered table-hover">
                      <thead className="thead-dark">
                        <tr>
                          <th>Product Name</th>
                          <th>Quantity</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.orderItems.map((item) => (
                          <tr key={item.Product}>
                            <td>{item.name}</td>
                            <td>{item.qyt}</td>
                            <td>NPR {item.price.toFixed(2)} /-</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mb-3">
                    <strong>Total Price:</strong> NPR {order.totalPrice.toFixed(2)} /-
                  </div>
                  <div className="mb-3">
                    <strong>Is Paid:</strong> {order.isPaid ? 'Yes' : 'No'}
                  </div>
                  {order.isPaid && (
                    <div className="mb-3">
                      <strong>Paid At:</strong> {new Date(order.paidAt).toLocaleString()}
                    </div>
                  )}
                  <div className="mb-3">
                    <strong>Is Delivered:</strong> {order.isDelivered ? 'Yes' : 'No'}
                  </div>
                  {order.isDelivered && (
                    <div className="mb-3">
                      <strong>Delivered At:</strong> {new Date(order.DeliveredAt).toLocaleString()}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyOrders;
