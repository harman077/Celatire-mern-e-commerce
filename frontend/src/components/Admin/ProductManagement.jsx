import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, fetchAdminProducts } from '../../redux/slices/adminProductSlice';

const ProductManagement = () => {
const dispatch= useDispatch();
const {products,loading,error} = useSelector((state)=>state.adminProducts);

useEffect(()=>{
  dispatch(fetchAdminProducts());
},[dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete the product?')) {
      dispatch(deleteProduct(id));
    }
  };
if(loading) return <p>Loading...</p>
if(error) return <p>Error :{error}</p>
  return (
    <div className="container my-4">
      <h2 className="mb-4">Product Management</h2>

      <div className="card">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>SKU</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product._id}>
                      <td>{product.name}</td>
                      <td>${product.price}</td>
                      <td>{product.sku}</td>
                      <td>
                        <Link
                          to={`/admin/products/${product._id}/edit`}
                          className="btn btn-sm btn-primary me-2"
                        >
                          <FaEdit className="me-1" />
                          Edit
                        </Link>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(product._id)}
                        >
                          <FaTrash className="me-1" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-3">
                      No products found.
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

export default ProductManagement;
