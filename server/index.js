const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Booking = require("./models/Booking");
const User = require("./models/User");
require("dotenv").config();

const PORT = 4000;
const bookingDetails = require("./data/bookingDetails.json");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/booking", (req, res) => {
  res.json(bookingDetails);
});

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => {
    console.log("Connected to MongoDB");
    console.log("Connected DB:", mongoose.connection.name);
  })
  .catch((err) => console.log(err));

async function reset() {
  await Booking.deleteMany({});
  await User.deleteMany({});
}
reset();
const authRoutes = require("./routes/Authentication");
app.use("/api/booking", authRoutes);

const bookRoutes = require("./routes/BookingRoute");
app.use("/api/booking/", bookRoutes);

app.listen(PORT, () => {
  console.log(`The network is on localhost::/${PORT}`);
});
