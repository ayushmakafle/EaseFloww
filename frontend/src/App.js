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
import { Container } from 'react-bootstrap';
import 'react-calendar/dist/Calendar.css';

// import Footer from './components/Footer';
//import Navbar from './components/Navbar';
import HomepageScreen from './screens/HomepageScreen';
import LogSymptoms from './screens/LogSymptoms';
import CartPage from './screens/CartPage'; 
import EcomHeader from './components/EcomHeader'; 
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
import ForgotPassword from './screens/ForgotPassword';
import UserDashboard from './user/UserDashboard';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './Admin/AdminDashboard';
import CreateCategory from './Admin/CreateCategory';
import CreateProduct from './Admin/CreateProduct';
import EaseFlowUsers from './Admin/EaseFlowUsers';
import Orders from './user/Orders';
import Profile from './user/Profile';
import Appointments from './user/Appointments';
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
import EmailVerified from './user/EmailVerified';

function App() {

  return (
    <Router>
      <main className='m-0 w-100' style={{ height: "95vh" }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/homepage" element={<HomeScreenPage/>} />
          <Route path="/log-symptoms" element={<LogSymptoms />} />

          <Route path='/cart' element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path ='/payment' element={<PaymentComponent/>} />
          <Route path ='/paysuccess' element={<SuccessPage />}/>

          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/ecommerce" element={<EcomHomeScreen />} />
          <Route path ='/search' element={<Search />} />
          <Route path ='/categories' element={<Categories/>}/>
          <Route path ='/category/:slug' element={<CategoryProduct/>}/>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/signup" element={<SignUpPage />} />
          
          <Route path ='/dashboard' element={<PrivateRoute />}>
            <Route path ='user' element={<UserDashboard/>}/>
            <Route path ='user/orders' element={<Orders/>}/>
            <Route path ='user/profile' element={<Profile/>}/>
            <Route path ='user/appointments' element={<Appointments/>}/>
          </Route>

          <Route path='/dashboard' element={<AdminRoute />}>
            <Route path ='admin' element={<AdminDashboard/>}/>
            <Route path ='admin/create-category' element={<CreateCategory/>}/>
            <Route path ='admin/create-product' element={<CreateProduct/>}/>
            <Route path ='admin/product/:slug' element={<UpdateProduct/>}/>
            <Route path ='admin/products' element={<Products/>}/>
            <Route path ='admin/users' element={<EaseFlowUsers/>}/>
            <Route path ='admin/doctorapproval' element={<ApproveDoctors/>}/>
          </Route>

          <Route path = '/verified-email' element={<EmailVerified/>}/>

          <Route path="/doctor-login" element={<DoctorLoginPage />} />
          <Route path="/doctorsignup" element={<DoctorSignUpPage />} />
          
        </Routes>
        <ToastContainer />
      </main>
    </Router>
  );
}

export default App;
