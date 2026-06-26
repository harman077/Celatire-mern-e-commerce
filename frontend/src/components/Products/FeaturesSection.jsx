import React from 'react';
import { HiOutlineCreditCard, HiShoppingBag } from 'react-icons/hi';
import { HiArrowPathRoundedSquare } from 'react-icons/hi2';

const FeaturesSection = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row text-center">
          {/* Feature 1 */}
          <div className="col-md-4 mb-4">
            <div className="mb-3 text-dark fs-1">
              <HiShoppingBag />
            </div>
            <h4 className="fw-bold">FREE INTERNATIONAL SHIPPING</h4>
            <p className="text-muted">On all orders over $100.00</p>
          </div>

          {/* Feature 2 */}
          <div className="col-md-4 mb-4">
            <div className="mb-3 text-dark fs-1">
              <HiArrowPathRoundedSquare />
            </div>
            <h4 className="fw-bold">45 DAYS RETURN</h4>
            <p className="text-muted">Money back guarantee</p>
          </div>

          {/* Feature 3 */}
          <div className="col-md-4 mb-4">
            <div className="mb-3 text-dark fs-1">
              <HiOutlineCreditCard />
            </div>
            <h4 className="fw-bold">SECURE CHECKOUT</h4>
            <p className="text-muted">100% secure checkout process</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
