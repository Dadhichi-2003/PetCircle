const petModel = require("../models/PetModel")
const multer = require("multer");
const cloudinaryUtil = require("../utils/CloudinaryUtil");
const userModel = require("../models/UserModel")


const storage = multer.diskStorage({
    destination: "./uploads", // Optional if using Cloudinary
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage: storage }).single("profilePic");
  

const addPetProfile = async (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ message: "File upload failed", error: err.message });
      }
  
      try {
        // Upload file to Cloudinary 
        let profilePicUrl = "";
        if (req.file) {
          const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
          profilePicUrl = cloudinaryResponse.secure_url;
        }
  
        // Create pet object
        const petData = {
          owner: req.body.owner,
          petname: req.body.petname,
          species: req.body.species,
          breed: req.body.breed,
          age: req.body.age,
          medicalHistory: req.body.medicalHistory,
          profilePic: profilePicUrl,
          adopted:req.body.adopted,
          posts:req.body.posts
        };
  
        const newPet = await petModel.create(petData);
        await newPet.populate("owner") // populate ni agal await joeye

        await userModel.findByIdAndUpdate(
          req.body.owner,
          { $push: { pets: newPet._id } },
          { new: true }
        );
       
  
        res.status(201).json({
          message: "Pet profile created successfully",
          data: newPet
        });
  
      } catch (error) {
        res.status(500).json({
          message: "Error creating pet profile",
          error: error.message
        });
      }
    });
  };
  

  const getAllpets =async(req,res)=>{
    try{

        const pets = await petModel.find()
        return res.status(200).json({
            message:"pets fetched..",
            pets
        })
    }catch(err){
        res.status(404).json({
            message:"pets not found",
            error:err.message
        })
    }
  }

  const editProfile = async (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ message: "File upload failed", error: err.message });
      }
  
      try {
        const { petId, petName, species, breed, age, gender, medicalHistory, userId, username, bio, location } = req.body;
  
        // Check if Pet exists
        const pet = await petModel.findById(petId);
        if (!pet) {
          return res.status(404).json({ message: "Pet not found" });
        }
  
        // Check if User exists
        const user = await userModel.findById(userId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
  
        // Update pet details if provided
        if (petName) pet.petName = petName;
        if (species) pet.species = species;
        if (breed) pet.breed = breed;
        if (age) pet.age = age;
        if (gender) pet.gender = gender;
        if (medicalHistory) pet.medicalHistory = medicalHistory;
  
        // Update user details if provided
        if (username) user.username = username;
        if (bio) user.bio = bio;
        if (location) user.location = location;
  

        //
        // Handle profile picture update (if provided)
        if (req.file) {
          const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
          pet.profilePic = cloudinaryResponse.secure_url;
        }
  
        // Save changes
        await pet.save();
        await user.save();
  
        res.status(200).json({
          message: "Profile updated successfully",
          pet,
          user
        });
  
      } catch (error) {
        res.status(500).json({ message: "Error updating profile", error: error.message });
      }
    });
  };
  

module.exports={
    addPetProfile,
    editProfile,
    getAllpets,
}
