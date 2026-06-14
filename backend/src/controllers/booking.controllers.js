const prisma = require("../../db.js");

const createBooking = async (req, res) => {
  try {
    const { userId, roomId, startDate, endDate } = req.body;

    if (!userId || !roomId || !startDate || !endDate) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    //check room exist
    const room = await prisma.rooms.findUnique({
      where: { id: roomId },
    });

    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    //check overlapping booking

    const overlappingBooking = await prisma.bookings.findFirst({
      where: {
        roomId,
        OR: [
          {
            startDate: { lte: new Date(endDate) },
            endDate: { gte: new Date(startDate) },
          },
        ],
      },
    });

    if (overlappingBooking) {
      return res
        .status(400)
        .json({ error: "Room is already booked for the selected dates" });
    }

    const booking = await prisma.bookings.create({
      data: {
        userId,
        roomId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });
    res.status(201).json({
      status: "pending",
      expireAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
      booking,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create booking", details: error.message });
  }
};

const getBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await prisma.bookings.findUnique({
      where: { id },
    });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch booking" });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await prisma.bookings.findMany({
      where: { userId },
    });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user bookings" });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.bookings.delete({
      where: { id },
    });
    res.status(204).json({
      msg: "Booking cancelled",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to cancel booking" });
  }
};

const confirmBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const existingBooking = await prisma.bookings.findUnique({
      where: { id },
    });

    if (!existingBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    const booking = await prisma.bookings.update({
      where: { id },
      data: { status: "confirmed" },
    });
    res.status(200).json({ booking, msg: "Booking confirmed successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Failed to confirm booking",
      errorDetails: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getBooking,
  getUserBookings,
  cancelBooking,
  confirmBooking,
};
