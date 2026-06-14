const prisma = require("../../db.js");

const createRoom = async (req, res) => {
  try {
    const { hotelId, roomNumber, type, price } = req.body;

    if (!hotelId || !roomNumber || !type || !price) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existingRoom = await prisma.rooms.findFirst({
      where: { hotelId, roomNumber },
    });
    if (existingRoom) {
      return res
        .status(400)
        .json({ error: "Room number already exists for this hotel" });
    }
    const room = await prisma.rooms.create({
      data: { hotelId, roomNumber, type, price },
    });
    res.status(201).json(room);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create room", details: error.message });
  }
};

const getRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await prisma.rooms.findUnique({
      where: { id },
    });
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch room" });
  }
};

const getRooms = async (req, res) => {
  try {
    const rooms = await prisma.rooms.findMany();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
};

const getRoomsByHotel = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const rooms = await prisma.rooms.findMany({
      where: { hotelId },
    });
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch rooms for hotel" });
  }
};

const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const { hotelId, roomNumber, type, price } = req.body;
    const room = await prisma.rooms.update({
      where: { id },
      data: { hotelId, roomNumber, type, price },
    });
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ error: "Failed to update room" });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.rooms.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete room" });
  }
};

module.exports = {
  createRoom,
  getRoom,
  getRooms,
  getRoomsByHotel,
  updateRoom,
  deleteRoom,
};
