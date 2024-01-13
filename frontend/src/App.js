import './App.css';
import 'react-calendar/dist/Calendar.css';
import CartPage from './screens/CartPage'; 
import EcomHomeScreen from './screens/EcomHomeScreen';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductDetails from './screens/ProductDetails';
import LoginPage from './screens/Auth/LoginPage';
import SignUpPage from './screens/Auth/SignUpPage';
import DoctorLoginPage from './screens/DoctorLoginPage';
import DoctorSignUpPage from './screens/DoctorSignUpPage';
import Lottie from 'lottie-react';
import animationData from './components/robott.json';

//import Cart from './screens/Cart'; 
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from './components/Routes/Private';
// import ForgotPassword from './screens/ForgotPassword';
import UserDashboard from './user/UserDashboard';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './Admin/AdminDashboard';
import CreateCategory from './Admin/CreateCategory';
import CreateProduct from './Admin/CreateProduct';
import EaseFlowUsers from './Admin/EaseFlowUsers';
import Appointments from "./Admin/Appointments";

 import AdminAppointments from './Admin/Appointments';
// import Orders from './user/Orders';
import EaseFlowOrders from './Admin/EaseFlowOrders';
import MyOrders from './user/MyOrders';
import Profile from './user/Profile';
import UserAppointments from './user/UserAppointments';
import Products from './Admin/Products';
import UpdateProduct from './Admin/UpdateProduct';
import Search from './screens/Search';
import Categories from './screens/Categories';
import CategoryProduct from './screens/CategoryProduct';
import CheckoutPage from './screens/CheckoutPage';
import HomeScreenPage from './screens/HomeScreenPage';
import LandingPage from './screens/LandingPage';
import SuccessPage from './components/Success';
import PaymentComponent from './components/Payment';
import ApproveDoctors from './Admin/ApproveDoctor';
// import EmailVerified from './user/EmailVerified';
import DoctorRoute from './components/Routes/DoctorRoute';
import DoctorDashboard from './Doctor/DoctorDashboard';
import DoctorProfile from './Doctor/DoctorProfile';
import EaseFlowDoctors from './Admin/EaseFlowDoctors';
import AppointmentHomePage from './screens/AppointmentHomePage';
import AllDoctors from './screens/AllDoctors';
import BookingPage from './screens/BookingPage';
import LearnMorePage0 from './screens/LearnMorePage0';
import LearnMorePage1 from './screens/LearnMorePage1';
import LearnMorePage2 from './screens/LearnMorePage2';
import LearnMorePage3 from './screens/LearnMorePage3';
import LearnMorePage4 from './screens/LearnMorePage4';
import LearnMorePage5 from './screens/LearnMorePage5';
import LearnMorePage6 from './screens/LearnMorePage6';
import WhyShopHere from './screens/WhyShopHere';

import DoctorAppointments from './Doctor/DoctorAppointments';
import DoctorRateProducts from './Doctor/DoctorRateProducts';
import EmailVerified from './user/EmailVerified';
import DoctorUpdateSchedule from './Doctor/DoctorUpdateSchedule';
import ChatWindow from './components/chatbot/ChatWindow';
import ChatInput from './components/chatbot/ChatInput';
import { useState } from 'react';
import MainNavbar from './components/Navbar';
import WithLayout from './components/hoc/hoc';
import { useAuth } from './context/auth';
import { useChatbot } from './hooks/useChatbot';
import { useChat } from './context/chat';


function App() {

  const {clearChatHistory,handleChatSendMessage,handleChatToggle,chatMessages,chatVisible} = useChat()
  const auth = useAuth()
  console.log(auth)

  return (
    <Router>
      <main className='m-0 w-100' style={{ height: "95vh" }}>

        <Routes>
          <Route path="/" element={WithLayout(LandingPage)} />
          <Route path="/homepage" element={WithLayout(HomeScreenPage)} />
          <Route path='/cart' element={WithLayout(CartPage)} />
          <Route path="/checkout" element={WithLayout(CheckoutPage)} />

          <Route path ='/payment' element={WithLayout(PaymentComponent)} />
          <Route path ='/paysuccess' element={WithLayout(SuccessPage)}/>
        {/* <Route path="/dashboard/user/orders" component={Orders} /> */}

          <Route path="/product/:slug" element={WithLayout(ProductDetails)} />
          <Route path="/ecommerce" element={WithLayout(EcomHomeScreen)} />
          <Route path ='/search' element={WithLayout(Search)} />
          <Route path ='/categories' element={WithLayout(Categories)}/>
          <Route path ='/category/:slug' element={WithLayout(CategoryProduct)}/>

          <Route path="/login" element={<LoginPage />} />
          <Route path='/verified-email' element={<EmailVerified/>}/>
          {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
          <Route path="/signup" element={<SignUpPage />} />          
          
          <Route path ='/dashboard' element={<PrivateRoute />}>
            <Route path ='user' element={WithLayout(UserDashboard)}/>
            {/* <Route path ='user/orders' element={<Orders/>}/> */}
            <Route path ='user/profile' element={WithLayout(Profile)}/>
            <Route path='user/order' element={WithLayout(MyOrders)}/>
            <Route path ='user/appointment' element={WithLayout(UserAppointments)}/>
          </Route>

          <Route path='/dashboard' element={<AdminRoute />}>
            <Route path ='admin' element={WithLayout(AdminDashboard)}/>
            <Route path ='admin/create-category' element={WithLayout(CreateCategory)}/>
            <Route path ='admin/create-product' element={WithLayout(CreateProduct)}/>
            <Route path ='admin/product/:slug' element={WithLayout(UpdateProduct)}/>
            <Route path ='admin/products' element={WithLayout(Products)}/>
            <Route path ='admin/users' element={WithLayout(EaseFlowUsers)}/>
            <Route path='admin/order' element={WithLayout(EaseFlowOrders)}/>
            <Route path='admin/appointments' element={WithLayout(Appointments)}/>
            <Route path ='admin/doctors' element={WithLayout(EaseFlowDoctors)}/>
            <Route path ='admin/doctorapproval' element={WithLayout(ApproveDoctors)}/>
            <Route path ='admin/appointments' element={WithLayout(AdminAppointments)}/>
          </Route>

          <Route path='/dashboard' element={<DoctorRoute />}>
            <Route path='doctor' element={<DoctorDashboard />} />
            <Route path = 'doctor/doctor-profile' element={<DoctorProfile />} />
            <Route path = 'doctor/doctor-appointments' element={<DoctorAppointments />} />
            <Route path = 'doctor/doctor-rate-products' element={<DoctorRateProducts />} />
            <Route path =  'doctor/update-schedule' element={<DoctorUpdateSchedule />} />
          </Route>

          <Route path="/doctor-login" element={<DoctorLoginPage />} />
          <Route path="/doctorsignup" element={<DoctorSignUpPage />} />
          
          <Route path="/appointment-homepage" element={WithLayout(AppointmentHomePage)} />
          <Route path='/all-doctors' element={WithLayout(AllDoctors)}/>
          <Route path = "/book-appointment/:doctorId" element={WithLayout(BookingPage)} />


          <Route path="/learn-more/0" element={WithLayout(LearnMorePage0)} />
          <Route path="/learn-more/1" element={WithLayout(LearnMorePage1)} />
          <Route path="/learn-more/2" element={WithLayout(LearnMorePage2)} />
          <Route path="/learn-more/3" element={WithLayout(LearnMorePage3)} />
          <Route path="/learn-more/4" element={WithLayout(LearnMorePage4)} />
          <Route path="/learn-more/5" element={WithLayout(LearnMorePage5)} />
          <Route path="/learn-more/6" element={WithLayout(LearnMorePage6)} />


          <Route path="/whyshophere" element={WithLayout(WhyShopHere)} />
          
        </Routes>


       {/* Chat toggle button at the bottom right */}
       {auth[0]?.user?.role === 0 &&
        <button
          className="btn btn-transparent chat-toggle-button"
          onClick={handleChatToggle}
          style={{
            position: 'fixed',
            bottom: '10px',
            right: '10px',
            zIndex: 999, // Make sure it's above other elements
            width: '250px', // Set your desired width
            height: '250px', 
          }}
        >
      <Lottie
            animationData={animationData}
            className="lottie-animation-home cursor-pointer"
/>
          {/* <i className="fa-regular fa-comments"></i> */}
        </button>
        }

        {/* Chatbot components */}
        {chatVisible && (
          <div
            className="chat-window-container"
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1000, // Make sure it's above the button
              width: '75%', // Set the width to 50%
              maxWidth: '500px', // Set a maximum width if needed
            }}
          >
            <button
  className="close-chat-button"
  onClick={() => {
    handleChatToggle();
    clearChatHistory(); // Clear chat history when closing
  }}
  style={{
    position: 'absolute',
    top: '10px',
    right: '10px',
    borderRadius: '50%', // Set border-radius to 50% for a circle
    backgroundColor: '#ffafc7', // Set pink background color
    padding: '5px', // Adjust padding as needed
    cursor: 'pointer',
  }}
>
  <i className="fa-solid fa-circle-xmark"></i>
</button>

            <ChatWindow messages={chatMessages} />
            <ChatInput onSendMessage={handleChatSendMessage} />
            
          </div>
          
        )}

        <ToastContainer />
      </main>
    </Router>
  );
}

export default App;
