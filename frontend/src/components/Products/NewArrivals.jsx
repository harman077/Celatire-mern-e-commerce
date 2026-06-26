import React, { useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const [newArrivals, setNewArrivals] = useState([]);
  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`);
        setNewArrivals(response.data)
      } catch (error) {
        console.error(error);

      }
    };
    fetchNewArrivals()
  }, [])

  const handleScroll = () => {
    const el = scrollRef.current;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  const scrollBy = (distance) => {
    scrollRef.current.scrollBy({ left: distance, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    handleScroll(); // initial check
    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [newArrivals]);

  return (
    <section className="container py-5">
      <div className="text-center mb-4">
        <h2>Explore New Arrivals</h2>
        <p className="text-muted">
          Discover the latest styles off the runway, freshly curated for you to stay ahead of the fashion curve.
        </p>
      </div>

      <div className="position-relative">
        {/* Left scroll button */}
        <button
          className="btn btn-light shadow position-absolute top-50 start-0 translate-middle-y z-1"
          onClick={() => scrollBy(-300)}
          disabled={!canScrollLeft}
          style={{ borderRadius: '50%' }}
        >
          <FiChevronLeft size={24} />
        </button>

        {/* Right scroll button */}
        <button
          className="btn btn-light shadow position-absolute top-50 end-0 translate-middle-y z-1"
          onClick={() => scrollBy(300)}
          disabled={!canScrollRight}
          style={{ borderRadius: '50%' }}
        >
          <FiChevronRight size={24} />
        </button>

        {/* Scrollable card list */}
        <div
          ref={scrollRef}
          className="d-flex flex-nowrap overflow-auto gap-3 px-4"
          style={{ scrollBehavior: 'smooth' }}
        >
          {newArrivals.map(product => (

            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="d-block text-decoration-none text-dark"
            >
              <div
                className="card flex-shrink-0"
                style={{ width: '250px', minWidth: '200px' }}
              >
                <img
                  src={product.images[0]?.url}
                  alt={product.images[0]?.altText || product.name}
                  className="card-img-top"
                />
                <div className="card-body">

                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">${product.price}</p>

                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
