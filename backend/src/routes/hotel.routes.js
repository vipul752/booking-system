const express = require("express");
const {
  createHotel,
  getHotels,
  getHotel,
  updateHotel,
  deleteHotel,
} = require("../controllers/hotel.controllers.js");
const hotelRouter = express.Router();

hotelRouter.post("/", createHotel);
hotelRouter.get("/", getHotels);
hotelRouter.get("/:id", getHotel);
hotelRouter.put("/:id", updateHotel);
hotelRouter.delete("/:id", deleteHotel);

module.exports = hotelRouter;
