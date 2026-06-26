import React from 'react';
import {
  FaBoxOpen,
  FaClipboardList,
  FaUser,
  FaStore,
} from 'react-icons/fa6';

import { FaSignOutAlt } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { clearCart } from '../../redux/slices/cartSlice';

const AdminSidebar = () => {
  const navigate = useNavigate();
const dispatch=useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    // Handle logout logic here (like clearing auth, etc.)
    navigate('/');
  };

  return (
    <div className="d-flex flex-column justify-content-between h-100">
      <div>
        {/* Brand Logo */}
        <Link to="/admin" className="d-block mb-4 fs-4 fw-bold text-white text-decoration-none">
          Celatire
        </Link>

        <h6 className="text-uppercase text-muted mb-3">Admin Dashboard</h6>

        {/* Sidebar Navigation */}
        <nav className="nav flex-column gap-2">
          {/* admin dashboard link in sidebar */}

          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center gap-2 text-white ${
                isActive ? 'fw-bold text-decoration-underline' : ''
              }`
            }
          >
            <AiOutlineDashboard />
            <span>Admin Dashboard</span>
          </NavLink>
            
            {/* usersLIst */}
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center gap-2 text-white ${
                isActive ? 'fw-bold text-decoration-underline' : ''
              }`
            }
          >
            <FaUser />
            <span>Users</span>
          </NavLink>

         {/* productList */}
          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center gap-2 text-white ${
                isActive ? 'fw-bold text-decoration-underline' : ''
              }`
            }
          >
            <FaBoxOpen />
            <span>Products</span>
          </NavLink>

          {/* orderLIst */}
          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center gap-2 text-white ${
                isActive ? 'fw-bold text-decoration-underline' : ''
              }`
            }
          >
            <FaClipboardList />
            <span>Orders</span>
          </NavLink>

          <NavLink
            to="#"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center gap-2 text-white ${
                isActive ? 'fw-bold text-decoration-underline' : ''
              }`
            }
          >
            <FaStore />
            <span>Shop</span>
          </NavLink>
        </nav>
      </div>

      {/* Logout Button */}
      <div className="mt-4">
        <button
          onClick={handleLogout}
          className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center gap-2"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
