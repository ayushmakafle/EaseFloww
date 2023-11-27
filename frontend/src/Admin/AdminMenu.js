import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const AdminMenu = () => {
  return (
    <div className='text-center'>
      <h4>Admin Panel</h4>
      <div className="list-group">
        <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action" activeClassName="active">
          Create Category
        </NavLink>
        <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action" activeClassName="active">
          Insert Products
        </NavLink>
        <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action" activeClassName="active">
          EaseFlow Users
        </NavLink>
        <NavLink to="/dashboard/admin/doctors" className="list-group-item list-group-item-action" activeClassName="active">
          EaseFlow Doctors
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;
