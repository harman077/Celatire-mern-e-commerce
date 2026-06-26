const express = require('express');
const User = require("../models/User");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @route   GET /api/admin/users
// @desc    Get all users (admin only)
// @access  Private/Admin
router.get("/", protect, admin, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST /api/admin/users
// @desc    Add a new user (admin only)
// @access  Private/Admin
router.post("/", protect, admin, async (req, res) => {
  const { name, email, password, role } = req.body;
console.log(name, email,password,role);


  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }

  try {
    let existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    const newUser = new User({
      name,
      email,
      password,   // Make sure your User model has pre-save hashing
      role: role || "customer",
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully",newUser });
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});



// @route   PUT /api/admin/users/:id
// @desc    Update user info (admin only) - Name, Email and Role
// @access  Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
    const { name, email, role } = req.body;
  
    try {
      const user = await User.findById(req.params.id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Update fields if provided
      if (name) user.name = name;
      if (email) user.email = email;
      if (role) user.role = role;
  
      const updatedUser = await user.save();
  
      res.json({message:"User updated successfuly",
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      });
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  });
  

  //route Delete /api/admin/users/:id
  //desc Dlte a user
  //access private

  router.delete("/:id", protect, admin, async (req, res) => {

   try {
      const user = await User.findById(req.params.id);
  
      if (user) {
        await user.deleteOne();
        res.json({message:"User deleted successfully"})

      }else{
        res.status(404).json({message:"User not found"})
      }
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Server Error"})
        
    }
})
  


module.exports = router;
