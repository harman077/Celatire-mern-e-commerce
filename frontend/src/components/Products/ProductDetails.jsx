import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';
import ProoductGrid from './ProoductGrid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails, fetchSimilarProducts } from '../../redux/slices/productsSlice';
import { addToCart } from '../../redux/slices/cartSlice';


      
  // Add more products later

const ProductDetails = ({productId}) => {
  const { id } = useParams();
  const dispatch=useDispatch();
  const{selectedProduct,loading,error,similarProducts}=useSelector((state)=>state.products);
  const {user,guestId}=useSelector((state)=>state.auth)
  

  const [mainImage, setMainImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const productFetchId=productId || id;

  useEffect(()=>{
    if(productFetchId){
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts({id:productFetchId}))
    }
  },[dispatch,productFetchId]);
  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  const increaseQty = () => setQuantity(prev => prev + 1);
  const decreaseQty = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select a color and a size.",{duration:1000,});
      return;
    }
    

    setIsAdded(true);
   dispatch(
    addToCart({
      productId:productFetchId,
      quantity,
      size:selectedSize,
      color:selectedColor,
      guestId,
      userId: user ?._id,
    })
   )
   .then(()=>{
    toast.success("Product added to the cart !",{duration:1000,});
   })
   .finally(()=>{
    setIsAdded(false)
   });
  };

  if(loading) {
    return <p className='text-center'>Loading...</p>

  }

  if(error) {
    <p className='text-center'>Error:{error}</p>
  }
  if (!selectedProduct) {
    return (
      <div className="text-center mt-5">
        <h4>Product not found</h4>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {selectedProduct && (
      <div className="row justify-content-center">
        <div className="col-lg-10 bg-white p-4 rounded shadow-sm">
          <div className="row">
            {/* Left thumbnails (desktop) */}
            <div className="col-md-2 d-none d-md-flex flex-column gap-3 overflow-auto" style={{ maxHeight: '500px' }}>
              {selectedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.atText || `Thumbnail ${index}`}
                  className={`img-thumbnail ${mainImage === image.url ? "border-black" : "border-emphasis-dark"}`}
                  style={{ width: '60px', height: '60px', objectFit: 'cover', cursor: 'pointer' }}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="col-md-6 text-center mb-4 mb-md-0">
              <img
                src={mainImage}
                alt="Main Product"
                className="img-fluid rounded"
              />
            </div>

            {/* Product Info */}
            <div className="col-md-4">
              <h3>{selectedProduct.name}</h3>
              <p className="text-muted">{selectedProduct.description}</p>
              <p className="mb-1"><strong>Brand:</strong> {selectedProduct.brand}</p>
              <p className="mb-1"><strong>Material:</strong> {selectedProduct.material}</p>

              {/* Colors */}
              <div className="mb-3">
                <strong>Colors:</strong>
                <ul className="list-inline mt-2">
                  {selectedProduct.colors.map((color, i) => (
                    <li
                      key={i}
                      className={`list-inline-item badge px-3 py-2 me-2 ${selectedColor === color ? 'bg-dark' : 'bg-secondary'}`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sizes */}
              <div className="mb-3">
                <strong>Sizes:</strong>
                <div className="mt-2 d-flex gap-2">
                  {selectedProduct.sizes.map((size, i) => (
                    <button
                      key={i}
                      className={`btn btn-sm ${selectedSize === size ? 'btn-dark' : 'btn-outline-dark'}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-4">
                <strong>Quantity:</strong>
                <div className="d-flex align-items-center gap-2 mt-2">
                  <button className="btn btn-outline-secondary btn-sm" onClick={decreaseQty}>-</button>
                  <span className="px-3">{quantity}</span>
                  <button className="btn btn-outline-secondary btn-sm" onClick={increaseQty}>+</button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="mt-3">
                <button
                  className="btn btn-primary w-100"
                  disabled={isAdded}
                  onClick={handleAddToCart}
                >
                  {isAdded ? "Added to Cart" : "Add to Cart"}
                </button>
              </div>

              {/* Price */}
              <div className="d-flex align-items-center gap-2 mt-4">
                <h4 className="text-danger mb-0">₹{selectedProduct.price}</h4>
                <del className="text-muted">₹{selectedProduct.ogprice}</del>
              </div>
            </div>
          </div>

          {/* Mobile thumbnails */}
          <div className="d-md-none mt-4 d-flex justify-content-center gap-3 flex-wrap">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.atText || `Thumbnail ${index}`}
                className={`img-thumbnail ${mainImage === image.url ? "border-black" : "border-emphasis-dark"}`}
                style={{ width: '60px', height: '60px', objectFit: 'cover', cursor: 'pointer' }}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>
        </div>
        <div className="mt-5">
  <h2 className="mb-4 text-center fw-bold">You May Also Like</h2>
  <ProoductGrid products ={similarProducts} loading={loading} error={error}/>
</div>

      </div>
      )}
    </div>
  );
};

export default ProductDetails;
