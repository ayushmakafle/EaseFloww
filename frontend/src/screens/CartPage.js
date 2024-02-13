import React from "react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
// import MainNavbar from "../components/Navbar";
import EcomHeader from "../components/EcomHeader";
import './CartPage.css'; 

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
      {/* <MainNavbar /> */}
      <EcomHeader />

      <div>
        <div className="row">
          <div className="col-md-12 animation-cart">
            <h2 className="text-center p-2 mb-1 mt-1" style={{ fontFamily: 'sans-serif' , color:'#de5d83'}}>
              {`Hello ${auth?.token && auth?.user?.username}!`}
            </h2>
            <h4 className="text-center" style={{ fontFamily: 'Raleway, sans-serif', color:'#f38dbc' }}>
              {cart?.length
                ? `You Have ${
                    cart.length
                  } items in your cart ${auth?.token ? "" : "please login to checkout"}`
                : " Your Cart Is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="animation-cart text-center">
            <div className="mx-auto" style={{ width: '80%' }}>

            <table className="table table-bordered mx-5 text-center">
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
                        className="img-fluid"
                      />
                    </td>
                    <td>{p.name}</td>
                    <td>NPR {p.price} /-</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => updateQuantity(p._id, "decrement")}
                        >
                          -
                        </button>
                        <span className="mx-2">{p.numberOfItems}</span>
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => updateQuantity(p._id, "increment")}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>
                      <button
                        className="btn-remove"
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
          </div>

          <div className="text-center animation-cart">
            <h2 className="mb-4" style={{fontFamily:'sans-serif',color:'#de5d83'}}>Cart Summary</h2>
            <hr className="mb-4" />
            <h4 className="mb-2">
              Total : {" "}
              <span style={{color:'#ef5e99',fontWeight:'bold'}}>{totalPrice()} /-</span>
            </h4>

            {auth?.user?.address ? (
              <>
                <div className="mb-4">
                  <h4 className="mb-2">Current Address : {" "}
                  <span style={{color:'#ef5e99',fontWeight:'bold'}}>{auth?.user?.address}</span></h4>
                  <button
                    className="btn-updateadd m-2"
                    onClick={() => navigate("/dashboard/user/profile")}
                    style={{ marginRight: '15px',padding: '10px', textAlign: 'center' }}
                  >
                    Update Address
                  </button>
                  <button
                    className="btn-checkout"
                    onClick={() => navigate("/checkout")}
                    style={{ padding: '10px', textAlign: 'center' }}
                  >
                    Checkout
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-4">
                {auth?.token ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                    style={{ marginRight: '15px',padding: '10px', textAlign: 'center' ,backgroundColor:'#ef5e99'}}
                  >
                    Please Login to Checkout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
