import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductDetails, updateProduct } from '../../redux/slices/productsSlice';
import axios from 'axios';

const EditProductPage = () => {

  const dispatch =useDispatch();
  const navigate =useNavigate();
  const {id} =useParams();
  const {selectedProduct,loading,error}=useSelector((state)=>state.products);

  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: 0,
    countInStock: 0,
    sku: '',
    category: '',
    brand: '',
    sizes: [],
    colors: [],
    collections: '',
    material: '',
    gender: '',
    images: [],
  });

  const [uploading,setUploading]=useState(false); //image uploading state 
useEffect(()=>{
  if(id) {
    dispatch(fetchProductDetails(id))
  }
},[dispatch,id])

useEffect(()=>{
  if(selectedProduct) {
    setProductData(selectedProduct)
}
},[selectedProduct])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData= new FormData();
    formData.append("image",file);
   
    try {
      setUploading(true);
      const {data} =await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`,formData,
        {
          headers:{"Content-Type":"multipart/form-data"}
        }
       );

       setProductData((prevData)=>({
        ...prevData,
        images:[...prevData.images,{url:data.url,altText:""}]
       }));
       setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
      
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     console.log("Submitting product data:", productData); // 👈 Add this line
    dispatch(updateProduct({id,productData}));
    navigate("/admin/products")
  };


  if(loading) return <p>Loading...</p>
  if(error) return <p>Error : {error}</p>
  return (
    <div className="container my-5" style={{ maxWidth: '800px' }}>
      <div className="card shadow p-4">
        <h2 className="mb-4 text-center">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          {/* Section: Basic Info */}
          <h5 className="mb-3">Basic Information</h5>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="name" className="form-label">Product Name</label>
              <input type="text" name="name" value={productData.name} onChange={handleChange} className="form-control" required />
            </div>
            <div className="col-md-6">
              <label htmlFor="sku" className="form-label">SKU</label>
              <input type="text" name="sku" value={productData.sku} onChange={handleChange} className="form-control" />
            </div>
            <div className="col-12">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea name="description" value={productData.description} onChange={handleChange} rows={3} className="form-control" required />
            </div>
          </div>

          {/* Section: Inventory & Pricing */}
          <h5 className="mt-4 mb-3">Inventory & Pricing</h5>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="price" className="form-label">Price</label>
              <input type="number" name="price" value={productData.price} onChange={handleChange} className="form-control" required />
            </div>
            <div className="col-md-6">
              <label htmlFor="countInStock" className="form-label">Count In Stock</label>
              <input type="number" name="countInStock" value={productData.countInStock} onChange={handleChange} className="form-control" required />
            </div>
          </div>

          {/* Section: Attributes */}
          <h5 className="mt-4 mb-3">Attributes</h5>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="sizes" className="form-label">Sizes (comma-separated)</label>
              <input type="text" name="sizes" value={productData.sizes.join(', ')} onChange={(e) => setProductData({ ...productData, sizes: e.target.value.split(',').map(s => s.trim()) })} className="form-control" />
            </div>
            <div className="col-md-6">
              <label htmlFor="colors" className="form-label">Colors (comma-separated)</label>
              <input type="text" name="colors" value={productData.colors.join(', ')} onChange={(e) => setProductData({ ...productData, colors: e.target.value.split(',').map(c => c.trim()) })} className="form-control" />
            </div>

            <div className="col-md-4">
              <label htmlFor="category" className="form-label">Category</label>
              <input type="text" name="category" value={productData.category} onChange={handleChange} className="form-control" />
            </div>
            <div className="col-md-4">
              <label htmlFor="brand" className="form-label">Brand</label>
              <input type="text" name="brand" value={productData.brand} onChange={handleChange} className="form-control" />
            </div>
            <div className="col-md-4">
              <label htmlFor="collections" className="form-label">Collections</label>
              <input type="text" name="collections" value={productData.collections} onChange={handleChange} className="form-control" />
            </div>

            <div className="col-md-6">
              <label htmlFor="material" className="form-label">Material</label>
              <input type="text" name="material" value={productData.material} onChange={handleChange} className="form-control" />
            </div>
            <div className="col-md-6">
              <label htmlFor="gender" className="form-label">Gender</label>
              <select name="gender" value={productData.gender} onChange={handleChange} className="form-select">
                <option value="">Select Gender</option>
                <option value="unisex">Unisex</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          {/* Section: Images */}
          <h5 className="mt-4 mb-3">Product Images</h5>
          <div className="mb-3">
            <input type="file" onChange={handleImageUpload} className="form-control" />
            {uploading  &&  <p>Uploading Image...</p>}
          </div>
          <div className="row g-2">
            {productData.images.map((image, index) => (
              <div className="col-4 col-md-3" key={index}>
                <img src={image.url} alt={image.altText} className="img-thumbnail" />
              </div>
            ))}
          </div>

          {/* Submit */}
          <div className="mt-4 text-end">
            <button type="submit" className="btn btn-primary px-4">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductPage;
