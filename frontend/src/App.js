import './App.css';
import { Container } from 'react-bootstrap';
import 'react-calendar/dist/Calendar.css';

// import Footer from './components/Footer';
// import Navbar from './components/Navbar';
import HomepageScreen from './screens/HomepageScreen';
import LogSymptoms from './screens/LogSymptoms';

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
import ForgetPasswordPage from './screens/ForgetPasswordPage';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  <LogSymptoms/>
  return (
    <Router>
      <main className='m-0 w-100' style={{height:"95vh"}}>
          <Routes>
             <Route path="/" Component={HomepageScreen} exact/>
             <Route path="/log-symptoms" Component={LogSymptoms}exact/>

              <Route path="/ecommerce" Component={EcomHomeScreen} exact/>
              <Route path="/login" Component={LoginPage} exact/>
              <Route path="/signup" Component={SignUpPage} exact/>
              <Route path="/GynecologistLogin" Component={GynecologistLoginPage} exact/>
              <Route path="/GynecologistSignUp" Component={GynecologistSignUpPage} exact/>
              <Route path="/ForgetPassword" Component={ForgetPasswordPage} exact/>
             <Route path='/product/:id' Component={ProductDetails}/>
              {/* <Route path='/cart' Component={Cart} exact/> */}
          </Routes>
          <ToastContainer />
      </main>
      {/* <LogSymptoms/> */}

    </Router>
  );
}
{/* <Footer /> */}

export default App;