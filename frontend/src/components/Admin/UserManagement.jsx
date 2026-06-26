import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser, deleteUser, fetchUsers, updateUser } from '../../redux/slices/adminSlice';

const UserManagement = () => {
const dispatch=useDispatch();
const navigate=useNavigate();
const {user}=useSelector((state)=>state.auth);
const {users,loading,error}=useSelector((state)=>state.admin);

useEffect(()=>{
  if(user && user.role !=="admin") {
    navigate("/") }
  else {
    dispatch(fetchUsers())
  }
},[user,navigate,dispatch,users])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer', // default role
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(formData));

    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'customer',
    });
  };

  const handleRoleChange = (userId, newRole) => {
    dispatch(updateUser({id:userId,role:newRole}));
    alert("Role Updated Sucessfully")
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(userId));
      alert("Account Deleted Successfully")
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">User Management</h2>
{loading && <p>Loading...</p>}
{error && <p>Error : {error}</p>}
      {/* Add New User Form */}
      <div className="card mb-5">
        <div className="card-header">
          <h5 className="mb-0">Add New User</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter user name"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter user email"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter user password"
                required
                autoComplete="current-password"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="role" className="form-label">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="form-select"
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary">Add User</button>
          </form>
        </div>
      </div>

      {/* User List Table */}
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Existing Users</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table mb-0 table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user?._id}>
                      <td>{user?.name}</td>
                      <td>{user?.email}</td>
                      <td>
                        <select
                          className="form-select form-select-sm"
                          value={user?.role}
                          onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        >
                          <option value="customer">Customer</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          <FaTrash className="me-1" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-3">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
