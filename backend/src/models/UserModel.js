const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
    role: { type: String, enum: ["User", "Admin", "Expert"] ,default:"User" },
    ownername: {
      type: String,
      // required: true,
    },
    profilePic: {
      type: String,
    },
    petData:{type:Schema.Types.ObjectId,ref:"profile"},

    expertise: { type: String, default: null },
    experience: { type: Number, default: null },
    services: { type: [String], default: [] },
    bio: { type: String, default: null },
  },
  {
    timestamps:true
  }
);

module.exports = mongoose.model("User", userSchema);
