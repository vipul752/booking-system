const express = require("express");
const {
  createBooking,
  getBooking,
  getUserBookings,
  cancelBooking,
  confirmBooking,
} = require("../controllers/booking.controllers.js");
const bookingRouter = express.Router();

bookingRouter.post("/", createBooking);
bookingRouter.get("/user/:userId", getUserBookings);
bookingRouter.get("/:id", getBooking);
bookingRouter.delete("/:id/cancel", cancelBooking);
bookingRouter.put("/:id/confirm", confirmBooking);

module.exports = bookingRouter;
