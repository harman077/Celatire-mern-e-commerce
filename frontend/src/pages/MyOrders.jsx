import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserOrders } from '../redux/slices/orderSlice';

const MyOrders = () => {

  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  useEffect(() => {
    dispatch(fetchUserOrders())
  }, [dispatch])

  const handleRowClick = (orderId) => {
    Navigate(`/order/${orderId}`)
  }

  if (loading) return <p className='text-center'>Loading...</p>
  if (error) return <p className='text-center'>Error:{error}</p>
  return (
    <div className="container my-4">
      <h2 className="mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <div className="alert alert-info">You have no orders.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Product</th>
                <th>Order ID</th>
                <th>Date</th>
                <th>Location</th>
                <th>Total Price</th>
                <th>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}
                  onClick={() => {
                    handleRowClick(order._id)
                  }
                  }>
                  <td className="d-flex align-items-center gap-2">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                      className="rounded"
                    />
                    {order.orderItems[0].name}
                  </td>
                 


                  <td>{order._id}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>

                  <td>{order.shippingAddress.city}, {order.shippingAddress.country}</td>
                  <td>${order.totalPrice}</td>
                  <td className='text-center'>
                    <span className={`badge ${order.isPaid ? 'bg-success' : 'bg-warning text-dark'}`}>
                      {order.isPaid ? 'Paid' : 'Pending'}
                    </span>
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

export default MyOrders;
