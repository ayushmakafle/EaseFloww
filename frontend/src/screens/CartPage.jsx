import React from 'react';

const CartPage = () => {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  return (
    <div>
      <h1>Cart hooooo</h1>
      <div>
        {cartItems.length > 0 ? (
          cartItems.map((cartItem) => (
            <div key={cartItem.id}>
              <p>{cartItem.name}</p>
              <p>Quantity: {cartItem.quantity}</p>
              <p>Price: ${cartItem.price}</p>
              {/* Display other item details */}
            </div>
          ))
        ) : (
          <p>No items in the cart</p>
        )}
      </div>
      {/* Add total amount/payment details here */}
    </div>
  );
};

export default CartPage;
