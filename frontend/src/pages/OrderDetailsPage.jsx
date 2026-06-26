import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchOrderDetails } from '../redux/slices/orderSlice';

const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orderDetails, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id]);

  if (error) {
    return <p className="text-center py-5">Error: {error}</p>;
  }

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary mb-3" role="status" />
        <p>Loading order details...</p>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="text-center py-5">
        <h5 className="text-danger">No order details found.</h5>
      </div>
    );
  }

  // Calculate the total price of all items in the order
  const totalPrice = orderDetails.orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container my-5">
      <h3 className="mb-4 text-center text-success">Order Details</h3>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="border p-3 rounded shadow-sm h-100">
            <h5>Order Info</h5>
            <p><strong>Order ID:</strong> {orderDetails._id}</p>
            <p><strong>Date:</strong> {new Date(orderDetails.createdAt).toDateString()}</p>
            <p><strong>Payment:</strong> {orderDetails.paymentMethod}</p>
            <p>
              <strong>Status:</strong>{' '}
              {orderDetails.isPaid ? (
                <span className="badge bg-success">Paid</span>
              ) : (
                <span className="badge bg-warning text-dark">Pending</span>
              )}
            </p>
            <p>
              <strong>Delivery:</strong>{' '}
              {orderDetails.isDelivered ? (
                <span className="badge bg-success">Delivered</span>
              ) : (
                <span className="badge bg-secondary">Not Delivered</span>
              )}
            </p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="border p-3 rounded shadow-sm h-100">
            <h5>Shipping Details</h5>
            <p><strong>Method:</strong> {orderDetails.shippingMethod}</p>
            <p><strong>City:</strong> {orderDetails.shippingAddress.city}</p>
            <p><strong>Country:</strong> {orderDetails.shippingAddress.country}</p>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h5 className="mb-3">Ordered Items</h5>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.orderItems.map((item, index) => (
              <tr key={index} className="bg-light">
                <td>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="img-fluid"
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  />
                </td>
                <td>
                  <Link to={`/product/${item.productId}`} className="text-decoration-none">
                    {item.name}
                  </Link>
                </td>
                <td>{item.quantity}</td>
                <td>${item.price}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-end mt-4">
        <h5>Total: <span className="text-primary">${totalPrice.toFixed(2)}</span></h5>
      </div>

      {/* Back to My Orders */}
      <div className="mt-4">
        <Link to="/my-orders" className="btn btn-outline-primary">
          ← Back to My Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
