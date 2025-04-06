const Community = require("../models/CommunityModel");
const UserModel = require("../models/UserModel");
const Post = require("../models/PostModel");
const multer = require("multer");
const cloudinaryUtil = require("../utils/CloudinaryUtil");
const path = require("path");

const storage = multer.diskStorage({
  // destination: "./uploads", // Optional if using Cloudinary
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("poster");
const uploadPost = multer({ storage: storage }).single("media");

const createCommunity = async (req, res) => {

  upload(req,res,async(err)=>{
    if(err){
      res.status(500).json({
        message:'poster not uploading',
        error:err.message
      })
    }
    try {

       //cloudinary uploads of poster 

       let poster = "";
       if(req.file){
        const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
        poster=cloudinaryResponse.secure_url
       }

      const createdBy = req.id;
  
      const { name, description } = req.body;
  
      const community = await Community.create({
        name,
        poster,
        description,
        createdBy,
      });
      await community.populate('members')
      community.members.push(createdBy);
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


    
  })
 
};

const joinCommunity = async (req, res) => {
  try {
    const joinerId = req.id;
    const CommunityId = req.params.id;

    const community = await Community.findById(CommunityId).populate('members');
    if (!community) {
      return res
        .status(404)
        .json({ message: "community not found", success: false });
    }

  
    community.members.push(joinerId);
    await community.save();

    const joinedCommunities = await UserModel.findById(joinerId);

    await joinedCommunities.updateOne({
      $push: { joinedCommunities: CommunityId },
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
    const communities = await Community.find().populate({path:'posts' ,populate:{path:'postedBy', select:'username profilePic'}}).populate({path:"members" , select:"username profilePic"});

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
  uploadPost(req, res, async (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "File upload failed", error: err.message });
    }

    try {
      const communityId = req.params.id; // Community ID
      const createdBy = req.id; //   ID
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
      const createPost = await Post.create({
        pet: null,
        caption,
        media,
        postedBy:createdBy,
        community:communityId
      });

      
      // Add post to community
      await community.updateOne({ $push: { posts: createPost._id } });
      await community.populate({
        path:'posts' ,
        populate:{
          path:'postedBy',
          select:'username profilePic'
        },
        populate:{
          path:'community'
        }
      }) ;

      const post = await Post.findById(createPost._id)
    .populate("postedBy", "username profilePic")
    .populate("community");
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

const getCommunityById = async (req, res) => {
  try {
    const communityId = req.params.id;

    const community = await Community.findById(communityId)
      .populate({
        path: 'members',
        select: 'username profilePic',
      })
      .populate({
        path:'createdBy', 
        select : 'username profilePic'
        
      })
      .populate({
        path: 'posts',
        populate: {
          path: 'postedBy',
          select: 'username profilePic',
        },
      });

    if (!community) {
      return res.status(404).json({
        message: 'Community not found',
        success: false,
      });
    }

    return res.status(200).json({
      message: 'Community fetched successfully',
      community,
      success: true,
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching community',
      error: error.message,
      success: false,
    });
  }
};
const getAllCommunityPosts = async (req, res) => {
  try {
    const userId = req.id;

    const joinedCommunities = await Community.find({ members: userId }).populate({
      path: 'posts',
      match: { pet: null }, // Only community posts
      populate: [
        {
          path: 'postedBy',
          select: 'username profilePic'
        },
        {
          path:'community'
        },
        {
          path: 'comments',
          populate: {
            path: 'user',
            select: 'username profilePic'
          }
        }
      ]
    });

    // Merge all posts
    const posts = joinedCommunities.flatMap(community => community.posts);

    res.status(200).json({ success: true, posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error fetching community posts" });
  }
};
const getPostsByCommunityId = async (req, res) => {
  try {
    const { id } = req.params;

    const community = await Community.findById(id).populate({
      path: 'posts',
      match: { pet: null }, // Only community posts
      populate: [
        {
          path: 'postedBy',
          select: 'username profilePic'
        },
        {
          path:'community'
        },
        {
          path: 'comments',
          populate: {
            path: 'user',
            select: 'username profilePic'
          }
        }
      ]
    });

    if (!community) {
      return res.status(404).json({ success: false, message: 'Community not found' });
    }

    res.status(200).json({ success: true, posts: community.posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error fetching posts by community ID" });
  }
};


const leaveCommunity = async (req, res) => {
  try {
    const userId = req.id;
    const communityId = req.params.id;

    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({ message: "Community not found", success: false });
    }

    // Check if user is a member
    if (!community.members.includes(userId)) {
      return res.status(403).json({ message: "You are not a member of this community", success: false });
    }

    // Remove user from community members
    community.members.pull(userId);

    // Find and delete user's posts in that community
    const userPosts = await Post.find({ community: communityId, postedBy: userId, pet: null });
    const userPostIds = userPosts.map(post => post._id);

    await Post.deleteMany({ _id: { $in: userPostIds } });

    // Remove post references from community
    community.posts = community.posts.filter(postId => !userPostIds.includes(postId.toString()));
    
    await community.save();

    // Remove community from user data
    await UserModel.findByIdAndUpdate(userId, { $pull: { joinedCommunities: communityId } });

    res.status(200).json({ message: "Left community and posts removed", success: true });
  } catch (err) {
    res.status(500).json({ message: "Error leaving community", error: err.message, success: false });
  }
};

const deleteCommunity = async (req, res) => {
  try {
    const userId = req.id;
    const communityId = req.params.id;

    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({ message: "Community not found", success: false });
    }

    if (community.createdBy.toString() !== userId) {
      return res.status(403).json({ message: "Only creator can delete this community", success: false });
    }

    // Delete all posts of that community
    await Post.deleteMany({ community: communityId });

    // Delete community
    await Community.findByIdAndDelete(communityId);

    // Remove community from users' joined list
    await UserModel.updateMany({}, { $pull: { joinedCommunities: communityId } });

    res.status(200).json({ message: "Community deleted successfully", success: true });
  } catch (err) {
    res.status(500).json({ message: "Error deleting community", error: err.message, success: false });
  }
};

const deleteCommunityPost = async (req, res) => {
  try {
    const userId = req.id;
    const { communityId, postId } = req.params;

    const post = await Post.findById(postId);
    const community = await Community.findById(communityId);

    if (!post || !community) {
      return res.status(404).json({ message: "Post or Community not found", success: false });
    }

    if (
      post.postedBy.toString() !== userId &&
      community.createdBy.toString() !== userId
    ) {
      return res.status(403).json({ message: "Unauthorized to delete this post", success: false });
    }

    // Delete post
    await Post.findByIdAndDelete(postId);

    // Remove post reference from community
    community.posts.pull(postId);
    await community.save();

    res.status(200).json({ message: "Post deleted from community", success: true });
  } catch (err) {
    res.status(500).json({ message: "Error deleting post", error: err.message, success: false });
  }
};



module.exports = {
  createCommunity,
  joinCommunity,
  getAllCommunity,
  addCommunityPost,
  getCommunityById,
  getAllCommunityPosts,
  getPostsByCommunityId,
  leaveCommunity,
  deleteCommunity,
  deleteCommunityPost,

};
