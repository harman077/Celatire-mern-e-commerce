const express = require("express");
const Checkout = require("../models/Checkout");
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Route: POST /api/checkout
// Desc: Create a new checkout session
// Access: Private
router.post("/", protect, async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body; // Extract shipping and payment details

  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({ message: "No items in checkout" });
  }

  try {
    // Create a new checkout session
    const newCheckout = await Checkout.create({
      user: req.user._id,  // Use _id (case-sensitive)
      checkoutItems: checkoutItems,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
      totalPrice: totalPrice,
      paymentStatus: "pending",  // Default payment status
      isPaid: false,  // Payment status
    });

    console.log(`Checkout created for user: ${req.user._id}`);
    res.status(201).json(newCheckout);

  } catch (error) {
    console.error("Error creating checkout session: ", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route: PUT /api/checkout/:id/pay
// Desc: Update checkout to mark as paid after successful payment
// Access: Private
router.put("/:id/pay", protect, async (req, res) => {
  const { paymentDetails ,paymentStatus} = req.body;

  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }
if(paymentStatus==="paid"){
    checkout.isPaid = true;
    checkout.paymentStatus = paymentStatus;
    checkout.paymentDetails = paymentDetails;
    checkout.paidAt = Date.now(); // Store the date and time of payment

    await checkout.save();

    res.status(200).json({ message: "Payment Successful", checkout });
} else{
    res.status(400).json({message:"Invalid payment Status"})
}

  } catch (error) {
    console.error("Error updating checkout payment status: ", error);
    res.status(500).json({ message: "Server Error" });
  }
});

//route Post /api/checkout/:id/finalize
//desc Finalize checkout and convert to an order after payment confirmaton
//acess private

router.post("/:id/finalize",protect,async(req,res)=>{
try {
    const checkout= await Checkout.findById(req.params.id);

    if(!checkout){
        return res.status(404).json({message:"checkout Not found"})
    }

    if(checkout.isPaid && !checkout.isFinalized){
//create finalOrder based on the checkout details
    const finalOrder=await Order.create({
        user:checkout.user,
   orderItems: checkout.checkoutItems,
    shippingAddress:checkout.shippingAddress,
    paymentMethod:checkout.paymentMethod,
    totalPrice:checkout.totalPrice,
isPaid:true,
paidAt:checkout.paidAt,
isDelivered:false,
paymentStatus:"paid",
paymentDetails:checkout.paymentDetails,
    });
checkout.isFinalized=true;
checkout.finalizedAt=Date.now();
await checkout.save();
//Delete the cart associated with the user
 await Cart.findOneAndDelete({user:checkout.user});
 res.status(201).json(finalOrder);

    }else if(
        checkout.isFinalized
    ){
        res.status(400).json({message:"Checkout already finalized"})
    }else{
        res.status(400).json({message:"Checkout is not paid"})
    }
    
} catch (error) {
    console.error(error);
    res.status(500).json({message:"Server Error"})
    
}
})

module.exports = router;
