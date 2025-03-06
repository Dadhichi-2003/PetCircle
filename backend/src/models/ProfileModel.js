const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    petName: { type: String, required: true },
    petType: { type: String, required: true },
    breed: { type: String, required: true },
    petAge: { type: Number, required: true },
    petWeight: { type: Number, required: true },
    medicalHistory: { type: String, required: true },
    profilePic: { type: String, default: null },
    userdata:{type:mongoose.Schema.Types.ObjectId ,ref:"User"}
  },
  { timestamps: true }
);

module.exports = mongoose.model("profile", profileSchema);
