const profileModel = require("../models/ProfileModel");

//add profile
const addprofile = async (req, res) => {
  try {
    const savedProfile = await profileModel.create(req.body);
    res.status(201).json({
      message: "profile created successfully",
      data: savedProfile,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//get all profiles
const getAllProfiles = async (req, res) => {
  try {
    const allProfiles = await profileModel.find();
    res.status(200).json({
      message: "all profiles fetched successfully",
      data: allProfiles,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};







//exports
module.exports = {
  getAllProfiles,
  addprofile,
};
