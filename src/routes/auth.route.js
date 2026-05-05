const express = require("express");
// const {
//   registerController,
//   loginController,
//   getMeController,
// } = require("../controllers/auth.controllers");

const authController = require("../controllers/auth.controllers");

const authRouter = express.Router();

authRouter.post("/register", authController.registerController);

authRouter.post("/login", authController.loginController);

authRouter.get("/get-me", authController.getMeController);

module.exports = authRouter;
