const express = require("express");
const {
  makePayment,
  getPayment,
  getPaymentsByBookingId,
  refundPayment,
  testDoublePayment,
} = require("../controllers/payment.controllers.js");
const paymentRouter = express.Router();

paymentRouter.post("/", makePayment);
paymentRouter.get("/:id", getPayment);
paymentRouter.get("/booking/:bookingId", getPaymentsByBookingId);
paymentRouter.post("/:id/refund", refundPayment);
paymentRouter.post("/test-double-payment", testDoublePayment);

module.exports = paymentRouter;
