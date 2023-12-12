import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import '../styles/UserMenu.css';

const UserMenu = () => {
  return (
    <div className='text-center'>
      <h4>User Dashboard</h4>
      <div className="list-group">
        <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action" activeClassName="active">
          My Profile
        </NavLink>
        <NavLink to="/dashboard/user/order" className="list-group-item list-group-item-action" activeClassName="active">
          My Orders
        </NavLink>
        <NavLink to="/dashboard/user/appointment" className="list-group-item list-group-item-action" activeClassName="active">
          My Appointments
        </NavLink>
      </div>
    </div>
  );
};

export default UserMenu;
