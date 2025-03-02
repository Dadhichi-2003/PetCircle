const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true },
  role: { type: String, enum: ["User", "Expert"], default: "User" }, 

  expertise: { type: String, default: null },
  experience: { type: Number, default: null },
  services: { type: [String], default: [] },
  bio: { type: String, default: null },
});

module.exports = mongoose.model("User", userSchema);



