const petModel = require("../models/PetModel")
const multer = require("multer");
const cloudinaryUtil = require("../utils/CloudinaryUtil");
const userModel = require("../models/UserModel")


const storage = multer.diskStorage({
    // destination: "./uploads", // Optional if using Cloudinary
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

  const editPetProfile = async (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ message: "File upload failed", error: err.message });
      }
  
      try {
        const petId = req.params.id;
        const pet = await petModel.findById(petId);
  
        if (!pet) {
          return res.status(404).json({ message: "Pet not found" });
        }
  
        let profilePic = pet.profilePic; // ✅ पहले से मौजूद इमेज डिफ़ॉल्ट रखी
  
        if (req.file) {
          const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
          profilePic = cloudinaryResponse.secure_url;
        }
  
        const { petname, species, breed, age, medicalHistory } = req.body;
  
        // ✅ अब इमेज तभी अपडेट होगी जब नई इमेज दी जाएगी
        if (req.file) {
          pet.profilePic = profilePic;
        }
  
        if (petname) pet.petname = petname;
        if (species) pet.species = species;
        if (breed) pet.breed = breed;
        if (age) pet.age = age;
        if (medicalHistory) pet.medicalHistory = medicalHistory;
  
        await pet.save();
  
        res.status(200).json({
          message: "Pet profile updated successfully",
          pet,
        });
      } catch (error) {
        res.status(500).json({ message: "Error updating profile", error: error.message });
      }
    });
  };
  

  const deletePetProfile = async (req, res) => {
    try {
      const { petId } = req.params;
  
      // Check if pet exists
      const pet = await petModel.findById(petId);
      if (!pet) {
        return res.status(404).json({ message: "Pet not found" });
      }
  
      // Remove pet reference from owner's pet list
      await userModel.findByIdAndUpdate(
        pet.owner,
        { $pull: { pets: petId } },
        { new: true }
      );
  
      // Delete pet from database
      await petModel.findByIdAndDelete(petId);
  
      res.status(200).json({
        message: "Pet profile deleted successfully",
        petId,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error deleting pet profile",
        error: error.message,
      });
    }
  };
  
  const getPetProfileById = async (req, res) => {
    try {
      const { petId } = req.params;
  
      // Find pet by ID and populate owner details
      const pet = await petModel.findById(petId).populate("owner", "username profilePic").populate("posts");
  
      if (!pet) {
        return res.status(404).json({ message: "Pet not found" });
      }
  
      res.status(200).json({
        message: "Pet profile fetched successfully",
        pet,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error fetching pet profile",
        error: error.message,
      });
    }
  };
  
 
  
  




  

module.exports={
    addPetProfile,
    editPetProfile,
    getAllpets,
    deletePetProfile,
    getPetProfileById

}
