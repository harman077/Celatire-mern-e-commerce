const express = require("express");
const Order = require("../models/Order");
const User = require("../models/User");

const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @route   GET /api/admin/orders
// @desc    Get all orders (admin only)
// @access  Private/Admin
router.get("/", protect, admin, async (req, res) => {
  try {
   const orders = await Order.find({})
  .populate({
    path: "user",
    select: "name email",
    options: { strictPopulate: false }, // This helps with null users
  });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route   PUT /api/admin/orders/:id
// @desc    Update order status (admin only)
// @access  Private/Admin
router.put("/:id", protect, admin, async (req, res) => {

  
    try {
      // Find the order by its ID
      const order = await Order.findById(req.params.id).populate("user","name");

      if(order){
        order.status=req.body.status ||order.status;
        order.isDelivered=req.body.status==="Delivered"? true : order.isDelivered;
        order.deliveredAt=req.body.status==="Delivered" ? Date.now() :order.deliveredAt;

        const updateOrder=await order.save();
        res.json(updateOrder);

      }else{

        res.status(404).json({message:"Order not found"})
      }
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });
  
  // @route   DELETE /api/admin/orders/:id
  // @desc    Delete an order (admin only)
  // @access  Private/Admin
  router.delete("/:id", protect, admin, async (req, res) => {
    try {
      // Find the order by its ID and delete it
      const order = await Order.findByIdAndDelete(req.params.id);
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.json({ message: "Order deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });

module.exports = router;
