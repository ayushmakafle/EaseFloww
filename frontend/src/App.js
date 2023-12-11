// import './App.css';
// import { Container } from 'react-bootstrap';
// import 'react-calendar/dist/Calendar.css';

// // import Footer from './components/Footer';
// import Navbar from './components/Navbar';
// import HomepageScreen from './screens/HomepageScreen';
// import LogSymptoms from './screens/LogSymptoms';

// import EcomHeader from './components/EcomHeader'; 
// import EcomHomeScreen from './screens/EcomHomeScreen';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import ProductScreen from './screens/ProductScreen';
// import ProductDetails from './screens/ProductDetails';
// import LoginPage from './screens/Auth/LoginPage';
// import SignUpPage from './screens/Auth/SignUpPage';
// import DoctorLoginPage from './screens/DoctorLoginPage';
// import DoctorSignUpPage from './screens/DoctorSignUpPage';
// //import Cart from './screens/Cart'; 
// //import ForgtPasswordPage from './screens/ForgetPasswordPage';
// import { ToastContainer } from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";
// import Dashboard from './user/Dashboard';
// import PrivateRoute from './components/Routes/Private';
// import ForgotPassword from './screens/ForgotPassword';


// function App() {
//   <LogSymptoms/>
//   return (
//     <Router>
//       <main className='m-0 w-100' style={{height:"95vh"}}>
//           <Routes>
//              <Route path="/" Component={HomepageScreen} exact/>
//              <Route path="/log-symptoms" Component={LogSymptoms}exact/>
//              <Route path ='/dashboard' Component={PrivateRoute}>
//                 <Route path='' Component={Dashboard} />
//              </Route>

//               <Route path="/ecommerce" Component={EcomHomeScreen} exact/>
//               <Route path="/login" Component={LoginPage} exact/>
//               <Route path="/forgot-password" Component={ForgotPassword} exact/>

//               <Route path="/signup" Component={SignUpPage} exact/>
//               <Route path="/DoctorLogin" Component={DoctorLoginPage} exact/>
//               <Route path="/DoctorSignUp" Component={DoctorSignUpPage} exact/>
//               {/*<Route path="/ForgetPassword" Component={ForgetPasswordPage} exact/>*/}
//              <Route path='/product/:id' Component={ProductDetails}/>
//               {/* <Route path='/cart' Component={Cart} exact/> */}
//           </Routes>
//           <ToastContainer />
//       </main>
//       {/* <LogSymptoms/> */}

//     </Router>
//   );
// }
// {/* <Footer /> */}

// export default App;


import './App.css';
import 'react-calendar/dist/Calendar.css';

// import Footer from './components/Footer';
//import Navbar from './components/Navbar';
// import HomepageScreen from './screens/HomepageScreen';
import CartPage from './screens/CartPage'; 
// import EcomHeader from './components/EcomHeader'; 
import EcomHomeScreen from './screens/EcomHomeScreen';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import ProductDetails from './screens/ProductDetails';
import LoginPage from './screens/Auth/LoginPage';
import SignUpPage from './screens/Auth/SignUpPage';
import DoctorLoginPage from './screens/DoctorLoginPage';
import DoctorSignUpPage from './screens/DoctorSignUpPage';

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
import DoctorAppointments from './Doctor/DoctorAppointments';
import DoctorRateProducts from './Doctor/DoctorRateProducts';
function App() {

  return (
    <Router>
      <main className='m-0 w-100' style={{ height: "95vh" }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/homepage" element={<HomeScreenPage/>} />
          <Route path='/cart' element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />

          <Route path ='/payment' element={<PaymentComponent/>} />
          <Route path ='/paysuccess' element={<SuccessPage />}/>
        {/* <Route path="/dashboard/user/orders" component={Orders} /> */}

          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/ecommerce" element={<EcomHomeScreen />} />
          <Route path ='/search' element={<Search />} />
          <Route path ='/categories' element={<Categories/>}/>
          <Route path ='/category/:slug' element={<CategoryProduct/>}/>

          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
          <Route path="/signup" element={<SignUpPage />} />          
          <Route path ='/dashboard' element={<PrivateRoute />}>
            <Route path ='user' element={<UserDashboard/>}/>
            {/* <Route path ='user/orders' element={<Orders/>}/> */}
            <Route path ='user/profile' element={<Profile/>}/>
            <Route path='user/order' element={<MyOrders/>}/>
            <Route path ='user/appointment' element={<UserAppointments/>}/>
          </Route>

          <Route path='/dashboard' element={<AdminRoute />}>
            <Route path ='admin' element={<AdminDashboard/>}/>
            <Route path ='admin/create-category' element={<CreateCategory/>}/>
            <Route path ='admin/create-product' element={<CreateProduct/>}/>
            <Route path ='admin/product/:slug' element={<UpdateProduct/>}/>
            <Route path ='admin/products' element={<Products/>}/>
            <Route path ='admin/users' element={<EaseFlowUsers/>}/>
            <Route path='admin/order' element={<EaseFlowOrders/>}/>


            <Route path ='admin/doctors' element={<EaseFlowDoctors/>}/>
            <Route path ='admin/doctorapproval' element={<ApproveDoctors/>}/>
            <Route path ='admin/appointments' element={<AdminAppointments />}/>
          </Route>

          <Route path='/dashboard' element={<DoctorRoute />}>
            <Route path='doctor' element={<DoctorDashboard />} />
            <Route path = 'doctor/doctor-profile' element={<DoctorProfile />} />
            <Route path = 'doctor/doctor-appointments' element={<DoctorAppointments />} />
            <Route path = 'doctor/doctor-rate-products' element={<DoctorRateProducts />} />
          </Route>

          <Route path="/doctor-login" element={<DoctorLoginPage />} />
          <Route path="/doctorsignup" element={<DoctorSignUpPage />} />
          
          <Route path="/appointment-homepage" element={<AppointmentHomePage />} />
          <Route path='/all-doctors' element={<AllDoctors />}/>
          <Route path = "/book-appointment/:doctorId" element={<BookingPage />} />


          <Route path="/learn-more/0" element={<LearnMorePage0 />} />
          <Route path="/learn-more/1" element={<LearnMorePage1 />} />
          <Route path="/learn-more/2" element={<LearnMorePage2 />} />
          <Route path="/learn-more/3" element={<LearnMorePage3 />} />
          <Route path="/learn-more/4" element={<LearnMorePage4 />} />
          <Route path="/learn-more/5" element={<LearnMorePage5 />} />
          <Route path="/learn-more/6" element={<LearnMorePage6 />} />
        </Routes>
        <ToastContainer />
      </main>
    </Router>
  );
}

export default App;
