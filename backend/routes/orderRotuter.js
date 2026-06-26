const express= require("express");
const Order=require("../models/Order");
const {protect}=require("../middleware/authMiddleware");
const router =express.Router();

//route get /api/orders/my-orders
//desc get logged-in user's orders
//access private

router.get("/my-orders",protect,async(req,res)=>{
    try {
        //find orders for the authenticated user

        const orders= await Order.find({user:req.user._id}).sort({
            createdAt:-1
        });//sort by status (code:number):response,record<string,
        res.json(orders)
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server Error"});
        
    }
});

// route GET /api/orders/:id
// desc Get order details by ID 
// access Private
router.get("/:id", protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate(
            "user",
            "name email"
        );

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        
        // Ensure user can only access their own orders
        if (order.user._id.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized to view this order" });
        }
       //return full order details
       res.json(order);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});


module.exports=router;