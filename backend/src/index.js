const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const hotelRouter = require("./routes/hotel.routes.js");
const userRouter = require("./routes/user.routes.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/v1/hotels", hotelRouter);
app.use("/v1/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
