import React ,{useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useCart } from '../context/cart';
// import MainNavbar from '../components/Navbar';
import EcomHeader from '../components/EcomHeader';
import axios from 'axios';
import '../styles/CheckoutPage.css';
import { toast } from 'react-toastify';

const CheckoutPage = () => {
  const navigate = useNavigate()
  const [cart] = useCart();

  // Calculate total bill
  const calculateTotal = () => {
    let total = 0;
    cart?.forEach((item) => {
      total += item.price * item.numberOfItems;
    });
        console.log(total)
        console.log(typeof total)

    return total;
  };

  //khalti
  const [paymentData, setPaymentData] = useState({
    return_url: 'http://localhost:3000/payment/',
    website_url: 'http://localhost:3000/',
    amount: calculateTotal()*100,
    purchase_order_id: Math.random().toString(36).substring(2, 9),
    purchase_order_name: 'test',
    customer_info: {
     name: '',
      email: '',
      phone: '',
    },
  });

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // If the field is 'amount', parse the value to a number
    const newValue = name === 'amount' ? parseFloat(value) : value;
    setPaymentData((prevData) => ({
      ...prevData,
      customer_info: {
        ...prevData.customer_info,
        [name]: newValue,
      },
    }));
  };

   const handleKhaltiButtonClick = () => {
    // Generate a random purchase order ID
    const randomOrderId = Math.floor(Math.random() * 100).toString();
    
    // Set the random purchase order ID
    setPaymentData((prevData) => ({
      ...prevData,
      purchase_order_id: randomOrderId,
    }));
    
    const backendEndpoint = 'http://localhost:8080/khalti-payment';

    axios.post(backendEndpoint, paymentData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        console.log('Payment successful:', response.data);
        
        // Extract the payment URL from the response
        const paymentUrl = response.data.payment_url;
        // Redirect the user to the payment URL
        window.location.href = paymentUrl;

        // Update product quantities after successful payment
        //updateProductQuantities();
      })
      .catch(error => {
        console.error('Error sending payment data:', error);
        toast.error(error);
      });
  };
  const goBack = () => {
    navigate(-1); // Navigate back
  };
  return (
    <>
    {/* <MainNavbar /> */}
    <EcomHeader />
    <button className="back-button" onClick={goBack}>
          <span role="img" aria-label="Back Arrow" className="pink-arrow" style={{ color: '#f38dbc' }}>❮❮</span>
        </button>
     <div className="checkout-container">
        <div className="row">
          <div className="col-md-9">
            <table className="table text-center">      
        <thead>
          <tr>
            <th style={{color:'#de5d83'}}>Item Name</th>
            <th style={{color:'#de5d83'}}>Number of Items</th>
            <th style={{color:'#de5d83'}}>Price per Item</th>
            <th style={{color:'#de5d83'}}>Item Total</th>
          </tr>
        </thead>
        <tbody>
          {cart?.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.numberOfItems}</td>
              <td>NPR {item.price} /-</td>
              <td>NPR {item.price * item.numberOfItems} /-</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
       <div className="col-md-3">
        <h3 className='mt-4 mx-4 text-center' style={{fontFamily:'sans-serif',color:'#de5d83'}}> Grand Total: </h3>
        <h4 className='font-weight-bold text-center' style={{fontFamily:'sans-serif',color:'#ef5e99'}}> NPR <span>{calculateTotal()}/-</span></h4>
        </div>
      <h4 style={{fontFamily:'sans-serif',color:'#de5d83'}} className='mb-1 text-center'>
        Please enter your details to proceed with payment</h4>
      
      <form className='text-center' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  
      <input
        type="text"
        name="name"
        placeholder='Enter your name'
        value={paymentData.customer_info.name}
        onChange={handleInputChange}
        style={{ border:'1px solid pink',width: '40%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box', borderRadius: '12px', boxShadow: '0 0 5px 0 #ff69b4', }} 
      />
      <input
        type="tel"
        name="phone"
        placeholder='Enter your contact number'
        value={paymentData.customer_info.phone}
        onChange={handleInputChange}
        style={{ border:'1px solid pink',width: '40%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box', borderRadius: '12px', boxShadow: '0 0 5px 0 #ff69b4', }} 
      />
      <input
        type="email"
        name="email"
        placeholder='Enter your email'
        value={paymentData.customer_info.email}
        onChange={handleInputChange}
        style={{ border:'1px solid pink',width: '40%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box', borderRadius: '12px', boxShadow: '0 0 5px 0 #ff69b4', }} 
      />
 
    </form>
    
      <div className='payment-options text-center'>
        <button className='btn-paykhalti'  onClick={handleKhaltiButtonClick}>Pay with Khalti</button>
      </div>
    </div>
    </div>

    </>
  );
};

export default CheckoutPage;
