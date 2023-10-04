const express = require("express");
const userRouter = express.Router();
const { createUser, logUser } = require("../controllers/user");

userRouter.post("/signup", createUser);
userRouter.post("/login", logUser);

module.exports = { userRouter };
