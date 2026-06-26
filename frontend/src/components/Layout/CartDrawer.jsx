import React from 'react';

import { IoMdClose } from "react-icons/io";
import CartContents from '../Cart/CartContents';
import { useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';

const CartDrawer = ({drawerOpen,toggleCartDrawer}) => {
const navigate =useNavigate()
const {user,guestId}=useSelector((state)=>state.auth);
const{cart}=useSelector((state)=>state.cart);
const userId=user ? user._id : null;
  const handleCheckout= ()=>{
    toggleCartDrawer()
    if(!user){
      navigate("/login?redirect=checkout")
    }else{
      navigate("/checkout")
    }
    
  };
 
  return (
    <div className={`cart-drawer position-fixed top-0 end-0  h-100  shadow-lg transition-all d-flex flex-column zindex-1050  ${drawerOpen ? "translate-x-0" :"translate-x-full"}`}>

        {/* close button  */}
      <div className="d-flex justify-content-end p-3 " >
    <button onClick={toggleCartDrawer} className='bg-light border-0 text-dark'>
        <IoMdClose />
    </button>
      </div>

{/* cart contents with scrollable area  */}
<div className='flex-grow-1 p-2 overflow-y-auto'>
<h2 className='mb-3 p-3 fw-semibold'>Your Cart</h2>

{cart && cart?.products?.length > 0 ? (
  <CartContents cart={cart} userId={userId} guestId={guestId} />
) : (
  <p>Your cart is empty.</p>
)}


</div>

{/* checkout button fixed at the bottom  */}
<div className='p-3 bg-white position-sticky bottom-0'>

  {cart && cart?.products?.length> 0 &&(
    <>

<button onClick={handleCheckout} className='cart-drawer btn btn-dark w-100 py-2 fw-semibold rounded-lg' role='button'>Checkout</button>
    <p className='mt-1 text-sm-center fs-6'>
        Shipping,taxes and discount codes calculated at checkout.
    </p>
    
    </>
  )}
</div>
    </div>
  );
};

export default CartDrawer;
