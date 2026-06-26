import React, { useState } from 'react';
import { HiOutlineUser, HiOutlineShoppingBag, HiOutlineChevronDown } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import CartDrawer from '../Layout/CartDrawer';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { clearCart } from '../../redux/slices/cartSlice';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const dispatch=useDispatch()
  const navigate=useNavigate()
  const { cart } = useSelector((state) => state.cart);
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return null;

  const cartItemCount =
    cart?.products?.reduce((total, product) => total + product.quantity, 0) || 0;

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };


  //logout account

  const handleLogout=()=>{
    dispatch(logout())
     dispatch(clearCart());
    navigate("/login")
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top border-bottom">
        <div className="container py-2">
          {/* Logo */}
          <Link className="navbar-brand fw-bold fs-3 text-dark" to="/">
            Celatire
          </Link>

          {/* Mobile toggle */}
          <button
            className="navbar-toggler border-0 shadow-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Nav Links + Search + Actions */}
          <div className="collapse navbar-collapse" id="navbarNav">
            {/* Center nav links */}
            <ul className="navbar-nav mx-auto text-center gap-lg-2 mx-auto">
               <li className="nav-item">
                <Link className="nav-link fw-semibold text-dark" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-semibold text-dark" to="/collections/all?gender=Men">
                  Men
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-semibold text-dark" to="/collections/all?gender=Women">
                  Women
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-semibold text-dark" to="/collections/all?category=Top Wear">
                  Top Wear
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-semibold text-dark" to="/collections/all?category=Bottom Wear">
                  Bottom Wear
                </Link>
              </li>
            </ul>

            {/* Right Side */}
            <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-3 mt-3 mt-lg-0">
              {/* Search */}
              <div className="d-none d-lg-block" style={{ minWidth: '260px' }}>
                <SearchBar />
              </div>

              {/* Mobile Search */}
              <div className="d-lg-none">
                <SearchBar />
              </div>

              {/* Account Dropdown */}
              <div className="dropdown">
                <button
                  className="btn btn-light border rounded-pill px-3 py-2 d-flex align-items-center gap-2 fw-semibold"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <HiOutlineUser size={20} />
                  <span>
                    {user
                      ? user?.role === 'admin'
                        ? 'Admin'
                        : 'Account'
                      : 'Login'}
                  </span>
                  <HiOutlineChevronDown size={16} />
                </button>

                <ul className="dropdown-menu dropdown-menu-end shadow border-0 rounded-3 mt-2 p-2">
                  {!user ? (
                    <>
                      <li>
                        <Link className="dropdown-item rounded-2 py-2" to="/login">
                          Login
                        </Link>
                      </li>
                      {/* optional future signup */}
                      {/* <li>
                        <Link className="dropdown-item rounded-2 py-2" to="/register">
                          Create Account
                        </Link>
                      </li> */}
                    </>
                  ) : (
                    <>
                      {user?.role === 'admin' && (
                        <li>
                          <Link className="dropdown-item rounded-2 py-2 fw-semibold" to="/admin">
                            Admin Dashboard
                          </Link>
                        </li>
                      )}

                      <li>
                        <Link className="dropdown-item rounded-2 py-2" to="/profile">
                          My Profile
                        </Link>
                      </li>

                      <li>
                        <Link className="dropdown-item rounded-2 py-2" to="/my-orders">
                          My Orders
                        </Link>
                      </li>

                      <li><hr className="dropdown-divider my-2" /></li>

                      <li>
                        <button className="dropdown-item rounded-2 py-2 text-danger" onClick={handleLogout}>
                          Logout
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              {/* Cart */}
              <button
                onClick={toggleCartDrawer}
                className="btn position-relative p-0 border-0 bg-transparent"
                aria-label="Open cart"
              >
                <HiOutlineShoppingBag size={25} className="text-dark" />
                {cartItemCount > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark"
                    style={{ fontSize: '0.7rem' }}
                  >
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />
    </>
  );
};

export default Navbar;