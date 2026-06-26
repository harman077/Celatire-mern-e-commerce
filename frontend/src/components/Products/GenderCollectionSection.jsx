import React from 'react'
import womenCollectionImage from "../../assets/assests 1/womens-collection.webp"
import menCollectionImage from "../../assets/assests 1/mens-collection.webp"
import { Link } from 'react-router-dom'

const GenderCollectionSection = () => {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row g-4">
          
          {/* Women's Collection */}
          <div className="col-md-6">
            <div className="position-relative text-center">
              <div className="ratio ratio-4x3 rounded overflow-hidden">
                <img
                  src={womenCollectionImage}
                  alt="Women's collection"
                  className="w-100 h-100 object-fit-cover"
                />
              </div>
              <div className="position-absolute top-50 start-50 translate-middle text-white">
                <h2 className="fw-bold mb-3">Women's Collection</h2>
                <Link to="/collections/all?gender=Women" className="btn btn-light">Shop Now</Link>
              </div>
            </div>
          </div>

          {/* Men's Collection */}
          <div className="col-md-6">
            <div className="position-relative text-center">
              <div className="ratio ratio-4x3 rounded overflow-hidden">
                <img
                  src={menCollectionImage}
                  alt="Men's collection"
                  className="w-100 h-100 object-fit :cover"
                />
              </div>
              <div className="position-absolute top-50 start-50 translate-middle text-white">
                <h2 className="fw-bold mb-3">Men's Collection</h2>
                <Link to="/collections/all?gender=Men" className="btn btn-light">Shop Now</Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default GenderCollectionSection
