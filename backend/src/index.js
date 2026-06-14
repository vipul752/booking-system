const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const hotelRouter = require("./routes/hotel.routes.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/v1/hotels", hotelRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
