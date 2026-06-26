import React, { useEffect, useRef, useState } from 'react';
import { FaFilter } from 'react-icons/fa6';
import FilterSidebar from '../components/Products/FilterSidebar';
import SortOptions from '../components/Products/SortOptions';
import ProoductGrid from "../components/Products/ProoductGrid";
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../redux/slices/productsSlice';

const CollectionPage = () => {
  const {collection}=useParams();
  const [searchParams] =useSearchParams();
  const dispatch=useDispatch();
  const {products,loading,error}=useSelector((state)=>state.products);
const queryParams=Object.fromEntries([...searchParams]);

  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(()=>{
    dispatch(fetchProductsByFilters({collection,...queryParams}))
  },[dispatch,collection,searchParams,queryParams]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <div className="container py-4">
      {/* Mobile Filter Button */}
      <div className="d-lg-none mb-3">
        <button className="btn btn-outline-dark" onClick={toggleSidebar}>
          <FaFilter /> Filter
        </button>
      </div>

      {/* Mobile Sidebar (Overlay) */}
      {isSidebarOpen && (
        <div
          ref={sidebarRef}
          className="position-fixed top-0 start-0 bg-white shadow p-3 h-100 overflow-auto"
          style={{ width: '250px', zIndex: 1050 }}
        >
          <button
            className="btn btn-sm btn-outline-secondary mb-3"
            onClick={toggleSidebar}
          >
            Close
          </button>
          <FilterSidebar />
        </div>
      )}

      {/* Main Layout: Sidebar + Content */}
      <div className="row">
        {/* Desktop Sidebar */}
        <div className="col-lg-3 d-none d-lg-block">
          <FilterSidebar />
        </div>

        {/* Main Content */}
        <div className="col-lg-9">
          <h2 className="fw-bold mb-3">All Collection</h2>

          <SortOptions />

          <ProoductGrid products={products} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
