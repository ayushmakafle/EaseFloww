import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import '../styles/UserMenu.css';
import Lottie from 'lottie-react';
import animation from './userdashboard.json';


const UserMenu = () => {
  return (
    <div className='text-center'>
      <h4 style={{fontFamily: 'Poppins, sans-serif',color:'#ef5e99',fontWeight:'600'}}>User Dashboard</h4>
      <div className="list-group">
        <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action"  style={{backgroundColor:'#ef5e99', border: '1px solid #FFC0CB',color:'white'}}>
          My Profile
        </NavLink>
        <NavLink to="/dashboard/user/order" className="list-group-item list-group-item-action"  style={{backgroundColor:'#ef5e99', border: '1px solid #FFC0CB',color:'white'}}>
          My Orders
        </NavLink>
        <NavLink to="/dashboard/user/appointment" className="list-group-item list-group-item-action"  style={{backgroundColor:'#ef5e99', border: '1px solid #FFC0CB',color:'white'}}>
          My Appointments
        </NavLink>
         <div>
            <Lottie
              animationData={animation}
              className="lottie-animation-home cursor-pointer m-4"
              style={{ width: '200px', height: '200px' }} 
            />
          </div>
      </div>
    </div>
  );
};

export default UserMenu;
