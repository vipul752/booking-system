const express = require("express");
const {
  createRoom,
  getRooms,
  getRoom,
  updateRoom,
  deleteRoom,
  getRoomsByHotel,
} = require("../controllers/room.controllers.js");
const roomRouter = express.Router();

roomRouter.post("/", createRoom);
roomRouter.get("/", getRooms);
roomRouter.get("/:id", getRoom);
roomRouter.get("/hotel/:hotelId", getRoomsByHotel);
roomRouter.put("/:id", updateRoom);
roomRouter.delete("/:id", deleteRoom);

module.exports = roomRouter;
