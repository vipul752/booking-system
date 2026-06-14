const prisma = require("../../db.js");

const createHotel = async (req, res) => {
  try {
    const { name, location, description } = req.body;
    const hotel = await prisma.hotels.create({
      data: { name, location, description },
    });
    res.status(201).json(hotel);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create hotel", details: error.message });
  }
};

const updateHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, description } = req.body;
    const hotel = await prisma.hotels.update({
      where: { id },
      data: { name, location, description },
    });
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ error: "Failed to update hotel" });
  }
};

const deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.hotels.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete hotel" });
  }
};

const getHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await prisma.hotels.findUnique({
      where: { id },
    });
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotel" });
  }
};

const getHotels = async (req, res) => {
  try {
    const hotels = await prisma.hotels.findMany();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotels" });
  }
};

module.exports = { createHotel, updateHotel, deleteHotel, getHotel, getHotels };
