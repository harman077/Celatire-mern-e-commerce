import React from 'react';
import { Link } from 'react-router-dom';

const ProoductGrid = ({ products,loading,error }) => {
  if(loading) {
    return <p className='text-center'>Loading...</p>
  }

  if(error){
    return <P className="text-center">Error:{error}</P>
  }
  return (
    <div className="row g-4">
      {products.map((product, index) => (
        <div key={index} className="col-6 col-md-3">
          <Link to={`/product/${product._id}`} className="text-decoration-none text-dark">
            <div className="card h-100 shadow-sm">
              <img
                src={product.images[0].url}
                alt={product.images[0].alt || product.name}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h6 className="card-title mb-1">{product.name}</h6>
                <p className="card-text fw-semibold mb-0">₹{product.price}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProoductGrid;
