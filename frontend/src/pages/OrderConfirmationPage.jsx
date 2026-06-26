import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/slices/cartSlice';

const OrderConfirmationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Use Redux state first, fallback to localStorage
  const reduxCheckout = useSelector((state) => state.checkout.checkout);
  const localCheckout = JSON.parse(localStorage.getItem("latestCheckout"));
  const checkout = reduxCheckout && reduxCheckout._id ? reduxCheckout : localCheckout;

  // Clear cart and localStorage only if valid checkout exists
  useEffect(() => {
    if (checkout && checkout._id) {
      dispatch(clearCart());
      localStorage.removeItem("cart");
      localStorage.removeItem("latestCheckout"); // Clear after use
    } else {
      navigate("/my-orders");
    }
  }, [checkout, dispatch, navigate]);

  if (!checkout || !checkout._id) return null;

  const { _id, createdAt, checkoutItems = [], shippingAddress = {} } = checkout;

  const totalPrice = checkoutItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const estimatedDelivery = new Date(createdAt);
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);
  const estimatedDeliveryStr = estimatedDelivery.toDateString();

  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h2 className="text-success fw-bold">Thank you for your order!</h2>
        <p className="text-muted">Your order has been successfully placed.</p>
      </div>

      <div className="row mb-4 g-4">
        <div className="col-md-6">
          <div className="border rounded p-3 shadow-sm h-100">
            <h5 className="mb-3">Order Details</h5>
            <p><strong>Order ID:</strong> {_id}</p>
            <p><strong>Order Date:</strong> {new Date(createdAt).toDateString()}</p>
            <p><strong>Estimated Delivery:</strong> {estimatedDeliveryStr}</p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="border rounded p-3 shadow-sm h-100">
            <h5 className="mb-3">Shipping Address</h5>
            <p className="mb-1">{shippingAddress.address}</p>
            <p className="mb-0">{shippingAddress.city}, {shippingAddress.country}</p>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h5 className="mb-3">Items Ordered</h5>
        {checkoutItems.map((item, index) => (
          <div key={index} className="d-flex flex-wrap align-items-center border rounded p-3 mb-3 shadow-sm">
            <img
              src={item.image}
              alt={item.name}
              className="img-fluid me-3"
              style={{ width: '80px', height: '80px', objectFit: 'cover' }}
            />
            <div>
              <p className="mb-1 fw-semibold">{item.name} — {item.colour}, Size: {item.size}</p>
              <p className="mb-0">Quantity: {item.quantity}</p>
              <p className="mb-0">Price: ${item.price}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-end">
        <h5>Total: <span className="text-primary">${totalPrice}</span></h5>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
