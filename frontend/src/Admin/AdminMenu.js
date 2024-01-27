import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
  return (
    <div className='text-center'>
      <h4 style={{color:'#ef5e99', fontWeight:'bold'}}>Admin Panel</h4>
      <div className="list-group">
        <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action" style={{backgroundColor:'#ef5e99'}}>
          Create Category
        </NavLink>
        <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action" style={{backgroundColor:'#ef5e99'}}>
          Insert Products
        </NavLink>
        <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action" style={{backgroundColor:'#ef5e99'}}>
          Products
        </NavLink>
        <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action" style={{backgroundColor:'#ef5e99'}}>
          EaseFlow Users
        </NavLink>
        <NavLink to="/dashboard/admin/doctors" className="list-group-item list-group-item-action" style={{backgroundColor:'#ef5e99'}}>
          EaseFlow Doctors
        </NavLink>
        <NavLink to="/dashboard/admin/doctorapproval" className="list-group-item list-group-item-action" style={{backgroundColor:'#ef5e99'}}>
          Approve New Doctors
        </NavLink>
        <NavLink to="/dashboard/admin/order" className="list-group-item list-group-item-action" style={{backgroundColor:'#ef5e99'}}>
        EaseFlow Orders  
        </NavLink>
        <NavLink to="/dashboard/admin/appointments" className="list-group-item list-group-item-action" style={{backgroundColor:'#ef5e99'}}>
          Appointments List
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;
