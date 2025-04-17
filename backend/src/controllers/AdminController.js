// controllers/AdminController.js
const UserModel = require("../models/UserModel");

const PostModel = require("../models/PostModel");
const AdoptionModel = require("../models/AdoptionModel");
const CommunityModel = require("../models/CommunityModel");
const PetModel = require("../models/PetModel");


// ========== USERS ==========
const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({ role: { $ne: "admin" } }).select(
      "-password"
    );
    res.status(200).json({ message: "Users fetched", data: users });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete user", error: err.message });
  }
};

// ========== EXPERTS ========


// Function to fetch all users with the role of 'expert'
const getExpertUsers = async (req, res) => {
  try {
    const experts = await UserModel.find({ role: 'Expert' });
    res.status(200).json(
      experts
    ); // Return the experts in the response
  } catch (err) {
    console.error("Error fetching expert users:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Function to delete an expert profile by userId
const deleteExpertProfile = async (req, res) => {
  const { userId } = req.params; // Get userId from the request params
  
  try {
    // Step 1: Check if the user exists and if they are an expert
    const user = await UserModel.findById(userId);
    if (!user || user.role !== 'Expert') {
      return res.status(404).json({ message: 'User not found or not an expert' });
    }

    // Step 2: Delete all posts related to this expert
    await PostModel.deleteMany({ postedBy: userId });

    // Step 3: Delete the expert profile itself
    await UserModel.findByIdAndDelete(userId);

    res.status(200).json({ message: 'Expert profile and associated posts deleted successfully' });
  } catch (err) {
    console.error('Error deleting expert profile:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};







// ========== POSTS ==========
const getAllPost = async (req, res) => {
    try {
      const posts = await PostModel.find()
        .sort({ createdAt: -1 })
        .populate({
          path: "pet",
          select: "petname profilePic owner email",
          populate: {
            path: "owner",
            select: "username profilePic email",
          },
        })
        .populate({
          path: "postedBy",
          select: "username profilePic email",
        })
        .populate({
          path: "comments",
          options: { sort: { createdAt: -1 } },
          populate: {
            path: "user",
            select: "username profilePic",
          },
        });
  
      return res.status(200).json({ posts, success: true });
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ success: false, message: "Error fetching posts" });
    }
  };

  const deletePostById = async (req, res) => {
    try {
      const { postId } = req.params;
  
      // Find the post first to ensure it exists
      const post = await PostModel.findById(postId);
      if (!post) {
        return res.status(404).json({ success: false, message: "Post not found" });
      }
      // Delete the post
      await PostModel.findByIdAndDelete(postId);
  
      return res.status(200).json({ success: true, message: "Post deleted successfully" });
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ success: false, message: "Error deleting post" });
    }
  };

// ========== ADOPTIONS ==========
const getAllAdoptions = async (req, res) => {
  try {
    const pets = await PetModel
      .find({ adoptionStatus: true }) // Only available pets
      .populate("owner", "username profilePic") // Populate owner info
      .sort({ createdAt: -1 }); // Optional: newest first

    res.status(200).json({
      message: "Available pets fetched successfully",
      total: pets.length,
      pets,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching available pets",
      error: error.message,
    });
  }
};

const deleteAdoption = async (req, res) => {
  try {
    const { adoptionId } = req.params;  // Get adoptionId from URL params

    // Step 1: Find the adoption request by adoptionId
    const adoptionRequest = await AdoptionModel.findById(adoptionId);
    if (!adoptionRequest) {
      return res.status(404).json({ message: "Adoption request not found" });
    }

    // Step 2: Find the pet associated with this adoption request
    const pet = await PetModeletModel.findById(adoptionRequest.petId);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    // Step 3: Ensure the pet is currently available for adoption
    if (pet.adoptionStatus === false) {
      return res.status(400).json({
        message: "This pet is already unavailable for adoption",
      });
    }

    // Step 4: Update the pet's adoption status to false (remove from adoption)
    pet.adoptionStatus = false;
    await pet.save();

    // Step 5: Optionally, update the adoption request status if needed (e.g., mark it as removed)
    adoptionRequest.status = "Removed";  // You can set custom status here if needed
    await adoptionRequest.save();

    res.status(200).json({
      message: "Pet removed from adoption list successfully",
      pet,
      adoptionRequest,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error removing pet from adoption list",
      error: error.message,
    });
  }
};

// ========== COMMUNITIES ==========
const getAllCommunity = async (req, res) => {
  try {
    // Fetch all communities, populate posts and members
    const communities = await CommunityModel.find()
      .populate({
        path: 'posts', // Populate posts for each community
        populate: {
          path: 'postedBy', // Populate user details for the posts
          select: 'username profilePic'
        }
      })
      .populate({
        path:'createdBy',
        select:'username profilePic'
      })
      .populate({
        path: 'members', // Populate members for each community
        select: 'username profilePic'
      });

    // Return response with populated community data
    return res.status(200).json({
      message: 'Communities fetched successfully',
      communities,
      success: true,
    });
  } catch (err) {
    // Handle errors
    return res.status(500).json({
      message: 'Error fetching communities',
      error: err.message,
      success: false,
    });
  }
};


const deleteCommunity = async (req, res) => {
  try {
    const userId = req.id;
    const communityId = req.params.id;

    const community = await CommunityModel.findById(communityId);
    if (!community) {
      return res.status(404).json({ message: "Community not found", success: false });
    }

    

    // Delete all posts of that community
    await PostModel.deleteMany({ community: communityId });

    // Delete community
    await CommunityModel.findByIdAndDelete(communityId);

    // Remove community from users' joined list
    await UserModel.updateMany({}, { $pull: { joinedCommunities: communityId } });

    res.status(200).json({ message: "Community deleted successfully", success: true });
  } catch (err) {
    res.status(500).json({ message: "Error deleting community", error: err.message, success: false });
  }
};

const getAdminOverview = async (req, res) => {
  try {
    const [
      totalUsers,
      totalExperts,
      totalPosts,
      totalAvailablePets,  // Count only available pets
      
      totalCommunities,
      totalAdoptionRequests,  // Count total adoption requests
    ] = await Promise.all([
      UserModel.countDocuments({ role: "User" }),  // Counting pet owners
      UserModel.countDocuments({ role: "Expert" }),   // Counting experts
      PostModel.countDocuments(),  // Total posts count

      AdoptionModel.countDocuments(),  // Total adoption requests
      CommunityModel.countDocuments(),  // Count total communities
      AdoptionModel.countDocuments({ status: { $ne: "Rejected" } }),  // Total active adoption requests
    ]);

    res.status(200).json({
      totalUsers,
      totalExperts,
      totalPosts,
      totalAvailablePets,
      
      totalCommunities,
      totalAdoptionRequests,
    });
  } catch (err) {
    console.error("Error fetching admin overview:", err);
    res.status(500).json({ message: "Failed to fetch admin overview", error: err.message });
  }
};


module.exports = {
  getAllUsers,
  deleteUser,
  getAllPost,
  deletePostById,
  getAllAdoptions,
  deleteAdoption,
  getAllCommunity,
  deleteCommunity,
  getAdminOverview,
  getExpertUsers,
  deleteExpertProfile
  
};
