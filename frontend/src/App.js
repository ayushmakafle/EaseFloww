// import './App.css';
// import { Container } from 'react-bootstrap';
// import 'react-calendar/dist/Calendar.css';

// // import Footer from './components/Footer';
// // import Navbar from './components/Navbar';
// import HomepageScreen from './screens/HomepageScreen';
// import LogSymptoms from './screens/LogSymptoms';

// import EcomHeader from './components/EcomHeader'; 
// import EcomHomeScreen from './screens/EcomHomeScreen';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import ProductScreen from './screens/ProductScreen';
// import ProductDetails from './screens/ProductDetails';
// import LoginPage from './screens/Auth/LoginPage';
// import SignUpPage from './screens/Auth/SignUpPage';
// import GynecologistLoginPage from './screens/GynecologistLoginPage';
// import GynecologistSignUpPage from './screens/GynecologistSignUpPage';
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
//               <Route path="/GynecologistLogin" Component={GynecologistLoginPage} exact/>
//               <Route path="/GynecologistSignUp" Component={GynecologistSignUpPage} exact/>
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
// import Navbar from './components/Navbar';
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
import GynecologistLoginPage from './screens/GynecologistLoginPage';
import GynecologistSignUpPage from './screens/GynecologistSignUpPage';
//import Cart from './screens/Cart'; 
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './screens/ForgotPassword';
import UserDashboard from './user/UserDashboard';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './components/Admin/AdminDashboard';
import CreateCategory from './components/Admin/CreateCategory';
import CreateProduct from './components/Admin/CreateProduct';
import EaseFlowUsers from './components/Admin/EaseFlowUsers';
import EaseFlowDoctors from './components/Admin/EaseFlowDoctors';
import Orders from './user/Orders';
import Profile from './user/Profile';
import Appointments from './user/Appointments';

function App() {

  return (
    <Router>
      <main className='m-0 w-100' style={{ height: "95vh" }}>
        <Routes>
          <Route path="/" element={<HomepageScreen />} />
          <Route path="/log-symptoms" element={<LogSymptoms />} />

          <Route path='/dashboard/cart' element={<CartPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/ecommerce" element={<EcomHomeScreen />} />

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
            <Route path ='admin/users' element={<EaseFlowUsers/>}/>
            <Route path ='admin/doctors' element={<EaseFlowDoctors/>}/>
          </Route>


          <Route path="/GynecologistLogin" element={<GynecologistLoginPage />} />
          <Route path="/GynecologistSignUp" element={<GynecologistSignUpPage />} />
          
        </Routes>
        <ToastContainer />
      </main>
    </Router>
  );
}

export default App;
