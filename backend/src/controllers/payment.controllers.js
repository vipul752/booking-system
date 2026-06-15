const prisma = require("../../db.js");

const makePayment = async (req, res) => {
  try {
    const { bookingId, amount } = req.body;

    const booking = await prisma.bookings.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    const bookingStatus = booking.status;
    if (bookingStatus === "confirmed") {
      return res.status(400).json({ error: "Booking is already confirmed" });
    }

    const existingPayment = await prisma.payments.findFirst({
      where: { bookingId },
    });

    if (existingPayment) {
      return res
        .status(400)
        .json({ error: "Payment already exists for this booking" });
    }

    const payment = await prisma.$transaction(async (prisma) => {
      await prisma.payments.create({
        data: {
          bookingId,
          amount,
          status: "success",
        },
      });

      await prisma.bookings.update({
        where: { id: bookingId },
        data: { status: "confirmed" },
      });
    });

    res
      .status(200)
      .json({ message: "Payment successful, booking confirmed", payment });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to process payment", details: error.message });
  }
};

const getPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await prisma.payments.findUnique({
      where: { id },
    });
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch payment" });
  }
};

const getPaymentsByBookingId = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const payments = await prisma.payments.findMany({
      where: { bookingId },
    });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch payments" });
  }
};

const refundPayment = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await prisma.payments.findUnique({
      where: { id },
    });

    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    if (payment.status !== "success") {
      return res
        .status(400)
        .json({ error: "Only successful payments can be refunded" });
    }

    await prisma.payments.update({
      where: { id },
      data: { status: "refunded" },
    });

    await prisma.bookings.update({
      where: { id: payment.bookingId },
      data: { status: "cancelled" },
    });

    res.status(200).json({ message: "Payment refunded successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to process refund", details: error.message });
  }
};

const testDoublePayment = async (req, res) => {
  try {
    const { bookingId, amount } = req.body;

    const existingPayment = await prisma.payments.findFirst({
      where: { bookingId },
    });

    if (existingPayment) {
      return res
        .status(400)
        .json({ error: "Payment already exists for this booking" });
    }

    const payment = await prisma.payments.create({
      data: {
        bookingId,
        amount,
        status: "success",
      },
    });

    res.status(200).json({ message: "Payment successful", payment });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to process payment", details: error.message });
  }
};

module.exports = {
  makePayment,
  getPayment,
  getPaymentsByBookingId,
  refundPayment,
  testDoublePayment,
};
