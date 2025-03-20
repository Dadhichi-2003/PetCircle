const Community = require("../models/CommunityModel");
const UserModel = require("../models/UserModel");
const Post = require("../models/PostModel");
const multer = require("multer");
const cloudinaryUtil = require("../utils/CloudinaryUtil");

const storage = multer.diskStorage({
  destination: "./uploads", // Optional if using Cloudinary
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("media");

const createCommunity = async (req, res) => {
  try {
    const createdBy = req.id;

    const { name, description } = req.body;

    const community = await Community.create({
      name,
      description,
      createdBy,
    });

    await community.updateOne({ $push: { members: createdBy } });
    await community.save();

    return res.status(201).json({
      message: "community created",
      community,
    });
  } catch (err) {
    res.status(500).json({
      message: "not created",
      error: err.message,
    });
  }
};

const joinCommunity = async (req, res) => {
  try {
    const joinerId = req.id;
    const CommunityId = req.params.id;

    const community = await Community.findById(CommunityId);
    if (!community) {
      return res
        .status(404)
        .json({ message: "community not found", success: false });
    }

    await community.updateOne({ $push: { members: joinerId } }).populate("members");
    
    await community.save();

    const joinedCommunities = await UserModel.findById(joinerId);

    await joinedCommunities.updateOne({
      $push: { joinedCommunities: joinerId },
    });
    res.status(200).json({
      message: "community joined succesfully",
      community,
    });

  
  } catch (err) {
    res.status(500).json({
      message: "user cannot join community",
      error: err.message,
    });
  }
};

const getAllCommunity = async (req, res) => {
  try {
    const communities = await Community.find().populate("posts").populate({path:"members" , select:"usernae proilePic"});

    return res.status(200).json({
      message: "Communities fetched",
      communities,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Communities not fetched...",
      error: err.message,
    });
  }
};

const addCommunityPost = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "File upload failed", error: err.message });
    }

    try {
      const communityId = req.params.id; // Community ID
      const createdBy = req.id; // User ID
      const { caption} = req.body;
      let media = "";
      // Upload file to Cloudinary

      if (req.file) {
        const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
        media = cloudinaryResponse.secure_url;
      }

      // Check if the community exists
      const community = await Community.findById(communityId);
      console.log(community);
      if (!community) {
        return res
          .status(404)
          .json({ message: "Community not found", success: false });
      }

      // Check if the user is a member of the community
      if (!community.members.includes(createdBy)) {
        return res
          .status(403)
          .json({ message: "Only community members can post", success: false });
      }

      // Create the post
      const post = await Post.create({
        pet: null,
        caption,
        media,
        createdBy,
      });

      // Add post to community
      await community.updateOne({ $push: { posts: post._id } });
      await community.populate("posts")
      return res.status(201).json({
        message: "Post added to community successfully",
        post,
        success: true,
      });
    } catch (err) {
      res.status(500).json({
        message: "Failed to add post to community",
        error: err.message,
      });
    }
  });
};

module.exports = {
  createCommunity,
  joinCommunity,
  getAllCommunity,
  addCommunityPost,
};
