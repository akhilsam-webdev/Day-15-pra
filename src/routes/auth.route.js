const express = require("express");
const {
  registerController,
  loginController,
  getMeController,
} = require("../controllers/auth.controllers");

const authRouter = express.Router();

authRouter.post("/register", registerController);

authRouter.post("/login", loginController);

authRouter.get("/get-me", getMeController);

module.exports = authRouter;
