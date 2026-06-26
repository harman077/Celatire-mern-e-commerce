import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa6';
import AdminSidebar from './AdminSidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="d-flex">
      {/* Toggle Button (only visible on small screens) */}
      <button
        className="btn btn-dark position-fixed top-0 start-0 m-2 d-md-none z-3"
        onClick={toggleSidebar}
      >
        <FaBars size={20} />
      </button>

      {/* Sidebar */}
      <div
        className={`bg-dark text-white position-fixed top-0 start-0 h-100 p-3 ${isSidebarOpen ? 'd-block' : 'd-none'} d-md-block`}
        style={{ width: '250px', zIndex: 1040 }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4 d-md-none">
          <h5 className="mb-0">Admin Dashboard</h5>
          <button className="btn btn-outline-light" onClick={toggleSidebar}>
            ✕
          </button>
        </div>

        <AdminSidebar />
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-md-none"
          onClick={toggleSidebar}
          style={{ zIndex: 1030 }}
        />
      )}

      {/* Main Content Area */}
      <div
        className="flex-grow-1 p-4"
        style={{ marginLeft: window.innerWidth >= 768 ? '250px' : '0' }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
