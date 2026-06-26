import  { useEffect } from "react";
import MyOrders from "./MyOrders"; // Adjust the path as needed
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice";
import { logout } from "../redux/slices/authSlice";

const Profile = () => {
  const {user} =useSelector((state)=>state.auth);
  const navigate=useNavigate();
  const dispatch=useDispatch();

  useEffect(()=>{
    if(!user){
      navigate("/login")
    }
  },[user,navigate]);

  const handleLogout = () => {
    // Add your logout logic here
    dispatch(logout());
    dispatch(clearCart());
    navigate("/login");
  };

  return (
    <div className="container-fluid py-4 text-center">
      <div className="row">
        {/* Left: Sidebar */}
        <div className="col-md-3 mb-4 mb-md-0">
          <div className="bg-white p-4 shadow rounded text-center">
            <h5 className="mb-3">{user ?.name}</h5>
            <p className="text-muted small mb-3">{user?.email}</p>

            <button className="btn btn-outline-danger w-100" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {/* Right: Main Content */}
        <div className="col-md-9">
          <div className="bg-white p-4 shadow rounded">
            <MyOrders />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
