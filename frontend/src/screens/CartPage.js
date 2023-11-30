import React from "react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import MainNavbar from "../components/Navbar";
import EcomHeader from "../components/EcomHeader";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  // Total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price * item.numberOfItems;
      });
      return total.toLocaleString("ne-NP", {
        style: "currency",
        currency: "NPR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Delete item
  const removeCartItem = (productId) => {
    try {
      let updatedCart = cart.filter((item) => item._id !== productId);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.log(error);
    }
  };

  // Update quantity
  const updateQuantity = (productId, action) => {
    const updatedCart = cart.map((item) => {
      if (item._id === productId) {
        if (action === 'increment') {
          return { ...item, numberOfItems: item.numberOfItems + 1 };
        } else if (action === 'decrement' && item.numberOfItems > 1) {
          return { ...item, numberOfItems: item.numberOfItems - 1 };
        }
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <>
      <MainNavbar />
      <EcomHeader />

      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center bg-light p-2 mb-1">
            {`Hello ${auth?.token && auth?.user?.username}`}
          </h1>
          <h4 className="text-center">
            {cart?.length
              ? `You Have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout"
              }`
              : " Your Cart Is Empty"}
          </h4>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          <table className="table table-bordered m-3">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart?.map((p) => (
                <tr key={p._id}>
                  <td>
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      width="100px"
                      height="100px"
                    />
                  </td>
                  <td>{p.name}</td>
                  <td>NPR {p.price} /-</td>
                  <td>
                    <button onClick={() => updateQuantity(p._id, 'decrement')}>-</button>
                    {p.numberOfItems}
                    <button onClick={() => updateQuantity(p._id, 'increment')}>+</button>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-md-4 text-center">
          <h2>Cart Summary</h2>
          <p>Total | Checkout | Payment</p>
          <hr />
          <h4>Total : {totalPrice()} </h4>


           {/*  {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please Login to checkout
                  </button>
                )}
              </div>
            )} */}
          </div>
        </div>
    </>
  );
};

export default CartPage;