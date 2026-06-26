const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Helper function to get a cart by userId or guestId
const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  }
  return null;
};

// Route: POST /api/cart
// Desc: Add a product to the cart for a guest or logged-in user
// Access: Public

router.post("/", async (req, res) => {
  const { userId, guestId, productId, size, color, quantity } = req.body;

  try {
    // Fetch the product to get details
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find the cart
    let cart = await getCart(userId, guestId);

    // Prepare product to add
    const productToAdd = {
      productId,
      name: product.name,
      image: product.images[0]?.url || "",
      price: product.price,
      size,
      color,
      quantity,
    };

    if (cart) {
      // If cart exists, update it
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
      );

      if (productIndex > -1) {
        // If product exists in cart (with same size/color), update quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        // If product not in cart, add it
        cart.products.push(productToAdd);
      }

      // Recalculate the totalPrice
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await cart.save();
      return res.status(200).json(cart);

    } else {
      // If no cart exists, create a new one
      const newCart = await Cart.create({
        user: userId || undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [productToAdd],
        totalPrice: productToAdd.price * productToAdd.quantity,
      });

      return res.status(201).json(newCart);
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});
// Route: PUT /api/cart
// Desc: Update product quantity in the cart for a guest or logged-in user
// Access: Public

router.put("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    // Find the cart for the given userId or guestId
    let cart = await getCart(userId, guestId);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the product in the cart
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Update the product quantity
    cart.products[productIndex].quantity = quantity;

    // Recalculate the total price
    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    // Save the updated cart
    await cart.save();
    res.status(200).json(cart);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route: DELETE /api/cart
// Desc: Remove a product from the cart
// Access: Public

router.delete("/", async (req, res) => {
  const { productId, size, color, guestId, userId } = req.body;

  try {
    // Find the cart for the given userId or guestId
    let cart = await getCart(userId, guestId);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the product in the cart
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Remove the product from the cart
    cart.products.splice(productIndex, 1);

    // Recalculate the total price
    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    // Save the updated cart
    await cart.save();
    res.status(200).json(cart);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route: GET /api/cart
// Desc: Get the cart for the logged-in user or guest
// Access: Public

router.get("/", async (req, res) => {
  const { guestId, userId } = req.query;

  try {
    // Find the cart for the given userId or guestId
    let cart = await getCart(userId, guestId);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Return the cart details
    res.status(200).json(cart);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route: POST /api/cart/merge
// Desc: Merge guest cart into user cart on login
// Access: Private (requires authentication)

router.post("/merge", protect, async (req, res) => {
  const { guestId } = req.body;


  try {
    // Find the guest cart
    let guestCart = await Cart.findOne({ guestId });
    let userCart = await Cart.findOne({ user: req.user._id });

    if (guestCart) {
      if (guestCart.products.length === 0) {
        return res.status(404).json({ message: "Guest cart not found" });

      }

      if (userCart) {
        //merge guest cart into user cart
        guestCart.products.forEach((guestItem) => {
          const productIndex = userCart.products.findIndex((item) =>
            item.productId.toString() === guestItem.productId.toString() &&
            item.size === guestItem.size &&
            item.color === guestItem.color
          );

          if (productIndex > -1) {
            // If the product already exists in the user's cart, update the quantity
            userCart.products[productIndex].quantity += guestItem.quantity;
          } else {
            // otherwise,add the guest item to the cart
            userCart.products.push(guestItem);
          }
        });


        // Recalculate the total price
        userCart.totalPrice = userCart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );

        // Save the merged cart
        await userCart.save();

        // Delete the guest cart after merging

        try {

          await Cart.findOneAndDelete({ guestId });
        } catch (error) {

          console.error("Error deleting guest cart:",error);
          
        }

// Return the merged cart
res.status(200).json(userCart);
      } else {
        //if the user has no existing cart,assign the guest cart to the user
        guestCart.user=req.user._id;
        guestCart.guestId=undefined;
        await guestCart.save();

        res.status(200).json(guestCart);
      }
     } else{
      if(userCart) {

                  //guest cart has already been merged,return user cart

        return res.status(200).json(userCart);

      }
               return   res.status(404).json({message:"Guest cart not found"})

        }
      
} catch (err) {
  console.error(err);
  res.status(500).json({ message: "Server Error" });
}
  });


module.exports = router;
