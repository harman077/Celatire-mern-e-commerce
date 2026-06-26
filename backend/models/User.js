const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define your User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim:true,
  },
  email: {
    type: String,
    required: true,
    unique:true,
    trim:true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minLength:6,
  },
   role: {
    type: String,
    enum:["customer","admin"],
    default:"customer",
  },
},
{ timestamps:true});

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Add method to compare password during login
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Create the model
const User = mongoose.model("User", userSchema);

module.exports = User;
