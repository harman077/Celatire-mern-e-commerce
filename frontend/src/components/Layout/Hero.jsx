import React from 'react';
import heroimg from '../../assets/assests 1/heroshoppy.jpg';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
<section className="position-relative w-100">
  <div className="ratio ratio-16x9 ratio-md-21x9">
    <img
      src={heroimg}
      alt="Hero Section"
      className="img-fluid w-100 h-100 object-fit-cover"
    />
  </div>
  <div className="position-absolute top-50 start-50 translate-middle text-white text-center">
    <h1>Welcome to Celatire</h1>
    <Link to="" className="btn btn-primary mt-3">Shop Now</Link>
  </div>
</section>

  );
};

export default Hero;
