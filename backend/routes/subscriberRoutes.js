const express = require("express");
const router = express.Router();

const Subscriber = require("../models/Subscriber");

// @route   POST api/subscribe
// @desc    Handle newsletter subscription
// @access  Public
router.post("/subscribe", async (req, res) => {
  const { email } = req.body; // ✅ extract email first

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Check if email already exists
    let subscriber = await Subscriber.findOne({ email });
    if (subscriber) {
      return res.status(400).json({ msg: "Email already subscribed" });
    }

    // Create new subscriber
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    res.status(201).json({ msg: "Successfully subscribed to the newsletter" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
