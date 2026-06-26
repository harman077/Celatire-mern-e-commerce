import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllOrders, updateOrderStatus } from '../../redux/slices/adminOrderSlice';

const OrderManagement = () => {
 const dispatch=useDispatch();
 const navigate = useNavigate();

 const {user} = useSelector((state)=>state.auth);
 const {orders,loading,error}= useSelector((state)=>state.adminOrders);

 useEffect(()=>{
  if(!user || user.role !== "admin") {
    navigate("/")
  } else {
    dispatch(fetchAllOrders());
  }
 },[dispatch,user,navigate])

 const handleStatusChange = (orderId, newStatus) => {
  const order = orders.find(order => order._id === orderId);
  if (order && order.status !== newStatus) {
    dispatch(updateOrderStatus({ id: orderId, status: newStatus }));

    alert("Order Status changed Successfully...")
  }
};



  if (loading) return <p className='text-center'>Loading...</p>
  if (error)  return <p className="text-center">Error: {error.message || error}</p>;


  return (
    <div className="container mt-4">
      <h2 className="mb-4">Order Management</h2>

      {orders.length === 0 ? (
        <p className="text-muted">No orders to display.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>#{order._id}</td>
                  <td>{order.user?.name || 'Unknown User'}</td>

                  <td>${order.totalPrice.toFixed(2)}</td>
                  <td>
                    <select
                      className="form-select"
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleStatusChange(order._id, "Delivered")}
                    >
                      Mark as Delivered
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
