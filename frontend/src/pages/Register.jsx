import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import registerimg from "../assets/assests 1/register.webp";
import {registerUser} from "../redux/slices/authSlice"
import { useDispatch, useSelector } from "react-redux";
import { mergeCart } from "../redux/slices/cartSlice";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const location=useLocation();
  const {user,guestId}=useSelector((state)=>state.auth);
  const {cart}=useSelector((state)=>state.cart)

  //Get redirect parameter and check if its checkout or something else
  const redirect= new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect=redirect.includes("checkout");

  useEffect( () => {
    if (user) {

      if(cart ?.products.length > 0 && guestId){
        dispatch(mergeCart({guestId,user})).then(()=>{
          navigate(isCheckoutRedirect ? "/checkout" : "/");
        });
      }else{
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  },[user,guestId,cart,navigate,isCheckoutRedirect,dispatch])


  const handleSubmit= (e) => {
    e.preventDefault();
    dispatch(registerUser({name,email,password}));
    
  }


  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light border-bottom border-dark-emphasis">
      <div className="d-flex flex-wrap justify-content-center align-items-center w-100 px-3" style={{ maxWidth: "1200px" }}>
        
        {/* Login Form: Smaller, with margin-end */}
        <div className="bg-white p-5 rounded shadow me-md-4 mb-4" style={{ width: "100%", maxWidth: "400px" }}>
          <h2 className="mb-3 fw-bold">Celatire</h2>
          <p className="text-muted mb-4">Enter your email and password to login</p>

          <form onSubmit={handleSubmit}>

          <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-danger w-100 mb-3">Sign Up</button>

            <div className="text-center">
              <span className="text-muted">Don't have an account? </span>
              <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className="text-decoration-none">Login</Link>
            </div>
          </form>
        </div>

        {/* Image: Larger, with margin-start */}
        <div className="overflow-hidden mb-4" style={{ flex: 1, minWidth: "300px", maxHeight: "600px" }}>
          <img
            src={registerimg}
            alt="Login Visual"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "10px",
            }}
            className="img-fluid shadow"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
