
import { useEffect, useState } from 'react'
import Hero from '../components/Layout/Hero'
import FeaturedCollection from '../components/Products/FeaturedCollection'
import FeaturesSection from '../components/Products/FeaturesSection'
import GenderCollectionSection from '../components/Products/GenderCollectionSection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductDetails from '../components/Products/ProductDetails'
import ProoductGrid from '../components/Products/ProoductGrid'
import {useDispatch, useSelector} from 'react-redux'
import { fetchProductsByFilters } from '../redux/slices/productsSlice'
import axios from 'axios'

const Home = () => {
  const dispatch= useDispatch();
const {products,loading,error}=useSelector((state)=>state.products);
const[bestSellerProduct,setBestSellerProduct]=useState(null);
useEffect(()=>{
  // fetch products for a specific collection
  dispatch(fetchProductsByFilters({
    gender:"Women",
    category:"Bottom Wear",
    limit:8,
  })
);
// fetch best seller product
const fetchBestSeller=async()=>{
  try {
    const response=await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
    );
    setBestSellerProduct(response.data)
  } catch (error) {
    console.error(error);
    
  }
};
fetchBestSeller();

},[dispatch])
  return (
    <div>
        <Hero />
        <GenderCollectionSection />
        <NewArrivals />

        {/* Best seller  */}

        <h2 className="mb-4 text-center fw-bold">Best Seller</h2>
        {bestSellerProduct ? (<ProductDetails productId={bestSellerProduct._id} />) : (
          <p className='text-center'>Loading best seller product...</p>
        )}

<div className="container my-5">
  <h2 className="text-center fw-bold mb-4">Top Wears for Women</h2>
  <ProoductGrid products={products} loading={loading} error={error} />
</div>

      <FeaturedCollection />
      <FeaturesSection />
    </div>
  )
}

export default Home