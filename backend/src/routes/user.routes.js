const express = require("express");
const { createUser, getUser } = require("../controllers/user.controllers.js");
const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.get("/:id", getUser);

module.exports = userRouter;
