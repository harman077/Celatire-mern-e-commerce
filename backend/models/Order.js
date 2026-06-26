const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: {
    type: String,
    required: true, // Product name
  },
  image: {
    type: String,
    required: true, // Image URL of the product
  },
  price: {
    type: Number,
    required: true, // Price of the product at the time of the order
  },
  quantity: {
    type: Number,
    required: true, // Quantity of the product in the order
    min: [1, "Quantity must be at least 1"], // Validation to ensure quantity is a positive number
  },
  size:  String,
  color: String,
}, { _id: false }
); // Use _id: false to avoid creating a separate document ID for each order item

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Refers to the user who placed the order
    },
    orderItems: [orderItemSchema], // An array of items in the order
    shippingAddress: {
      address: {
        type: String,
        required: true, // Shipping address of the customer
      },
      city: { type: String,
         required: true },
      postalcode: { type: String,
         required: true },
      country: { type: String,
         required: true },
    },
    paymentMethod: {
      type: String,
      required: true, // The payment method used for the order (e.g., Credit Card, PayPal)
    },
    totalPrice: {
      type: Number,
      required: true, // Total price for the order, including shipping and tax
    },
    isPaid: {
      type: Boolean,
      required: false,
      default: false, // Whether the order has been paid
    },
    paidAt: {
      type: Date, // When the payment was made
    },
    paymentDetails: {
      type: mongoose.Schema.Types.Mixed, // Store payment-related details (e.g., transaction ID, PayPal response)
    },
    isDelivered: {
      type: Boolean,
      default: false, // Whether the order has been delivered
    },
    deliveredAt: {
      type: Date, // When the order was delivered
    },
    paymentStatus: {
      type: String,
      default: "pending", // Status of the order (processing, shipped, delivered, etc.)
    },
    status:{
        type:String,
        enum:["Processing","Shipped","Delivered","Cancelled"],
        default:"Processing"

    }
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model("Order", orderSchema);
