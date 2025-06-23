const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const User = require("../models/User");
const verifyToken = require("../middleware/verifyMiddleware");

router.post("/bookingDetails", verifyToken, async (req, res) => {
  const userId = req.user.id;

  const booking = await Booking.create({
    user: userId,
    company: req.body.company,
    from: req.body.from,
    to: req.body.to,
    date: req.body.date,
    time: req.body.time,
  });

  await User.findByIdAndUpdate(userId, {
    $push: { bookings: booking._id },
  });

  res.json({ message: "booking added", booking });
});

router.get("/bookingHistory", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const bookings = await Booking.find({ user: userId });
    res.json(bookings);
  } catch (err) {
    res.status(400).json({ message: "Error : ", err });
  }
});

module.exports = router;
