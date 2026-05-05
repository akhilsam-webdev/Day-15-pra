const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: String,
  profileImage: {
    type: String,
    default: "https://cdn-icons-png.freepik.com/512/10337/10337609.png",
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
