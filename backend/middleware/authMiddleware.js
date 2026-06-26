const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");
dotenv.config();

// Middleware to protect routes
const protect = async (req, res, next) => {

  let token;
 
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      
      token = req.headers.authorization.split(" ")[1]; // Get token
        
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Verify token

      req.user = await User.findById(decoded.user.id).select("-password"); // Attach user to req

      next(); // Proceed to next middleware/route
    } catch (err) {
      console.error("Token verification failed:", err.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }
};

//midleware to checj if the user is admin 

const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next()
  } else {
    res.status(403).json({ message: "Not authorized as an admin" })
  }
}

module.exports = {
  protect,
  admin,
};
