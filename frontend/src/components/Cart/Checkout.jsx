import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaypalButton from './paypalButton';
import { useDispatch, useSelector } from 'react-redux';
import { createCheckout } from '../../redux/slices/checkoutSlice';
import axios from 'axios';


const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cart, loading, error } = useSelector((state) => state.cart);
    const { error: checkoutError } = useSelector((state) => state.checkout);

    const { user } = useSelector((state) => state.auth);


    const [checkoutId, setCheckoutId] = useState(null);
    const [shippingAddress, setShippingAddress] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalcode: "",
        country: "",
        phone: "",
        
    });

    // ensure cart is loaded before proceeding
    useEffect(() => {
        if (!cart || !cart.products || cart.products.length === 0) {
            navigate("/");

        }
    }, [cart, navigate])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShippingAddress({ ...shippingAddress, [name]: value });
    };

    const handleCreateCheckout = async(e) => {
        e.preventDefault();
        if (cart && cart.products.length > 0) {
            const res = await dispatch(createCheckout({
                checkoutItems: cart.products,
                shippingAddress,
                paymentMethod: "Paypal",
                totalPrice: cart.totalPrice,
            })
            );

            if (res.payload && res.payload._id) {
                setCheckoutId(res.payload._id); //set checkout ID if checkout was successful

            }
        }
    };

    const handlePaymentSuccess = async (details) => {
        try {
             await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`
                , { paymentStatus: "paid", paymentDetails: details },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    }
                }
            );
                await handleFinalizeCheckout(checkoutId); //Finalize checkout if payment is successful
            
        } catch (error) {
            console.error(error);

        }

    };

    const handleFinalizeCheckout = async (checkoutId) => {

        try {
             await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            );
           navigate("/order-confirmation");
        } catch (error) {
            console.error(error);

        }
    };

    if (loading) return <p className='text-center'>Loading cart...</p>;
    if (error) return <p className='text-center'>Error:{error}</p>;
    if (!cart || !cart.products || cart.products.length === 0) {
        return <p className='text-center'>Your cart is empty</p>
    }

    return (
        <div className="container py-5">
            {checkoutError && <div className="alert alert-danger">{checkoutError}</div>}

            <div className="row">
                {/* Left: Shipping Form or Payment */}
                <div className="col-md-7">
                    {!checkoutId ? (
                        <>
                            <h4>Shipping Address</h4>
                            <form onSubmit={handleCreateCheckout}>
                                <div className="row g-3">
                                    <div className="col-12">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="form-control"
                                            value={user ? user.email : ""}
                                            disabled
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            name="firstName"
                                            className="form-control"
                                            placeholder="First Name"
                                            value={shippingAddress.firstName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            name="lastName"
                                            className="form-control"
                                            placeholder="Last Name"
                                            value={shippingAddress.lastName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-12">
                                        <input
                                            type="text"
                                            name="address"
                                            className="form-control"
                                            placeholder="Address"
                                            value={shippingAddress.address}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            name="city"
                                            className="form-control"
                                            placeholder="City"
                                            value={shippingAddress.city}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            name="postalcode"
                                            className="form-control"
                                            placeholder="Postal Code"
                                            value={shippingAddress.postalcode}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            name="country"
                                            className="form-control"
                                            placeholder="Country"
                                            value={shippingAddress.country}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type="tel"
                                            name="phone"
                                            className="form-control"
                                            placeholder="Phone"
                                            value={shippingAddress.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-12 mt-3">
                                        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                            {loading ? "Processing" : "Continue to Payment"}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </>
                    ) : (
                        <div className="text-center border p-4 rounded bg-light">
                            <h5>Pay with PayPal</h5>

                            <PaypalButton amount={cart.totalPrice}
                                onSuccess={handlePaymentSuccess}
                                onError={(err) => alert("Payment Failed .Try Again", err)} />


                        </div>
                    )}
                </div>

                {/* Right: Order Summary */}
                <div className="col-md-5">
                    <h4>Order Summary</h4>
                    <ul className="list-group mb-3">
                        {cart.products.map((item, index) => (
                            <li
                                key={index}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <div>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        style={{ width: 50, height: 50, objectFit: "cover" }}
                                        className="me-2 rounded"
                                    />
                                    <strong>{item.name}</strong> <br />
                                    <small>{item.color} / {item.Size}</small>
                                </div>
                                <span>${item.price}</span>
                            </li>
                        ))}
                        <li className="list-group-item d-flex justify-content-between">
                            <strong>Total</strong>
                            <strong>${cart.totalPrice}</strong>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
