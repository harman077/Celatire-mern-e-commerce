import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPhoneAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5 mt-3">
      <div className="container">
        <div className="row">
          
          {/* Newsletter */}
          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <h5 className="mb-3">Newsletter</h5>
            <p>Subscribe to get the latest updates and offers.</p>
            <form>
              <div className="input-group">
                <input type="email" className="form-control" placeholder="Email address" />
                <button className="btn btn-primary" type="submit">Subscribe</button>
              </div>
            </form>
          </div>

          {/* Shop */}
          <div className="col-6 col-md-6 col-lg-3 mb-4">
            <h5 className="mb-3">Shop</h5>
            <ul className="list-unstyled">
              <li><Link to="/shop/men" className="text-light text-decoration-none">Men</Link></li>
              <li><Link to="/shop/women" className="text-light text-decoration-none">Women</Link></li>
             
            </ul>
          </div>

          {/* Support */}
          <div className="col-6 col-md-6 col-lg-3 mb-4">
            <h5 className="mb-3">Support</h5>
            <ul className="list-unstyled">
              <li><Link to="#" className="text-light text-decoration-none">Contact Us</Link></li>
              <li><Link to="#" className="text-light text-decoration-none">FAQs</Link></li>
              <li><Link to="#" className="text-light text-decoration-none">Returns</Link></li>
              <li><Link to="#" className="text-light text-decoration-none">Shipping Info</Link></li>
            </ul>
          </div>

          {/* Follow Us & Call Us */}
          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <h5 className="mb-3">Follow Us</h5>

            {/* Call Us */}
            <div className="mb-3 d-flex align-items-center">
              <FaPhoneAlt className="me-2" />
              <span>
                Call us: <a href="tel:+1234567890" className="text-light text-decoration-none">+91 9888369563</a>
              </span>
            </div>

            {/* Social Icons */}
            <div className="d-flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-light fs-5"><FaFacebookF /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-light fs-5"><FaTwitter /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-light fs-5"><FaInstagram /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-light fs-5"><FaYoutube /></a>
            </div>
          </div>

        </div>

        <div className="text-center mt-4 pt-3 border-top border-secondary">
          <small>&copy; {new Date().getFullYear()} Your Store. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
