import React, { useState, useEffect } from 'react';
import './CartPage.css'; // Import CSS for CartPage styling

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(items);
  }, []);

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };
  
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const updateQuantity = (id, action) => {
    const updatedCart = cartItems.map((item) => {
      if (item._id === id) {
        if (action === 'increment') {
          return { ...item, quantity: item.quantity + 1 };
        } else if (action === 'decrement' && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  return (
    <div className='cart-container'>
      <h1 className='cart-header'>Your Cart</h1>
      {cartItems.length > 0 ? (
        <table className='cart-table'>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <button onClick={() => updateQuantity(item._id, 'decrement')}>-</button>
                  {item.quantity}
                  <button onClick={() => updateQuantity(item._id, 'increment')}>+</button>
                </td>
                <td>
                  <button onClick={() => removeItem(item._id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No items in the cart</p>
      )}
      {cartItems.length > 0 && (
        <div className='total'>
          <p>Total: ${calculateTotal().toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default CartPage;
