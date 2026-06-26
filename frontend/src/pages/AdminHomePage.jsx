import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAdminProducts } from '../redux/slices/adminProductSlice';
import { fetchAllOrders } from '../redux/slices/adminOrderSlice';

const AdminHomePage = () => {
 const dispatch= useDispatch();
 const {products,loading:productsLoading, error:productsError}=useSelector((state)=>state.adminProducts);
 const {orders,totalOrders,totalSales,loading:ordersLoading,error:ordersError}=useSelector((state)=>state.adminOrders);



 useEffect(()=> {
  dispatch(fetchAdminProducts());
  dispatch(fetchAllOrders());
 },[dispatch])

  return (
    <div className="container">
      <h1 className="mb-4">Admin Dashboard</h1>
{productsLoading || ordersLoading ?(
  <p>Loading...</p>
):productsError ? (<p>Error fetching products :{productsError}</p>): ordersError ?(
   (<p>Error fetching orders :{ordersError}</p>)
):(
      
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card text-white bg-success h-100">
            <div className="card-body">
              <h5 className="card-title">Revenue</h5>
              <p className="card-text fs-4">${totalSales.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-white bg-primary h-100">
            <div className="card-body">
              <h5 className="card-title">Total Orders</h5>
              <p className="card-text fs-4">{totalOrders}</p>
              <Link to="/admin/orders" className="btn btn-light btn-sm mt-2">
                Manage Orders
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-white bg-warning h-100">
            <div className="card-body">
              <h5 className="card-title">Total Products</h5>
              <p className="card-text fs-4">{products.length}</p>
              <Link to="/admin/products" className="btn btn-light btn-sm mt-2">
                Manage Products
              </Link>
            </div>
          </div>
        </div>
      </div>
)}
      {/* Recent Orders Section */}
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Recent Orders</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped mb-0">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Order ID</th>
                  <th scope="col">User</th>
                  <th scope="col">Total Price</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.user?.name}</td>
                      <td>${order.totalPrice.toFixed(2)}</td>
                      <td>{order.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No recent orders found.
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

export default AdminHomePage;
