import React from 'react';
import { Link } from 'react-router-dom';
import featured from "../../assets/assests 1/featured.webp";

const FeaturedCollection = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row align-items-center">
          {/* Left content */}
          <div className="col-md-6 mb-4 mb-md-0">
            <h2 className="fw-bold">Comfort and Style</h2>
            <h4 className="text-muted mb-3">Made for your everyday life</h4>
            <p className="mb-4">
              Discover high-quality, comfortable clothing that effortlessly blends fashion and function.
              Designed to make you look and feel great every day.
            </p>
            <Link to="/collections/all" className="btn btn-dark">
              Shop Now
            </Link>
          </div>

          {/* Right content */}
          <div className="col-md-6 text-center">
            <img
              src={featured}
              alt="Featured Collection"
              className="img-fluid rounded shadow"
              style={{ objectFit: 'cover', maxHeight: '400px', width: '100%' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
