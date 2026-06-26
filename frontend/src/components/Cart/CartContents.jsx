import React from 'react';
import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '../../redux/slices/cartSlice';

const CartContents = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  //Handle adding or substracting to the cart
  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;

    if (newQuantity >= 1) {
      dispatch(updateCartItemQuantity({
        productId,
        quantity: newQuantity,
        guestId, userId,
        size,
        color
      })
      );
    }
  };

  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(removeFromCart({ productId, size, guestId, userId, color }))
  }
  return (
    <div>
      {
        cart.products.map((product, index) => (
          <div key={index} className='d-flex py-3 border-bottom border-dark-subtle'>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
              className='rounded'
            />
            <div className='ms-3 flex-grow-1'>
              <h6 className='mb-1'>{product.name}</h6>
              <p className='mb-1 text-muted small'>
                Size: {product.size} | Color: {product.color}
              </p>
              <p className='mb-0 fw-semibold'>${product.price.toLocaleString()}</p>

              <div className='d-flex align-items-center justify-content-between mt-2'>
                <div className='d-flex align-items-center'>
                  <button onClick={() => handleAddToCart(
                    product.productId,
                    -1,
                    product.quantity,
                    product.size,
                    product.color)} className='border rounded px-2 py-1'>-</button>
                  <span className='mx-3'>{product.quantity}</span>
                  <button
                  onClick={() => handleAddToCart(product.productId, 1, product.quantity, product.size, product.color)}  className='border rounded px-2 py-1'>+</button>
                </div>
                <button onClick={()=>handleRemoveFromCart(
                   product.productId,
                    product.size,
                    product.color)} className='bg-transparent border-0'>
                  <RiDeleteBin3Line size={20} className="text-danger" />
                </button>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default CartContents;
