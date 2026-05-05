const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerController(req, res) {
  const { username, email, password, bio, profileImage } = req.body;
  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (isUserAlreadyExists) {
    return res.status(409).json({
      msg:
        isUserAlreadyExists.email === email
          ? "email address already exists"
          : "username already exists",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
    bio,
    profileImage,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  res.cookie("token", token);

  res.status(201).json({
    msg: "user registered successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

async function loginController(req, res) {
  const { username, email, password } = req.body;
  const user = await userModel.findOne({
    $or: [{ username: username }, { email: email }],
  });
  if (!user) {
    return res.status(404).json({
      msg: "user not exists",
    });
  }

  const correctPassword = await bcrypt.compare(password, user.password);

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token);

  res.status(200).json({
    msg: "user logged in successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

async function getMeController(req, res) {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await userModel.findById(decoded.id);
  res.status(200).json({
    msg: "user token fetched successfully",
    user,
  });
}

module.exports = {
  registerController,
  loginController,
  getMeController,
};
