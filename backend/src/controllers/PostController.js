const Post = require("../models/PostModel");
const userModel = require("../models/UserModel");
const Comment = require("../models/CommentModel");
// const cloudinaryUtil = require("../utils/CloudinaryUtil");
const multer = require("multer");

const cloudinaryUtil = require("../utils/CloudinaryUtil");
const PostModel = require("../models/PostModel");
const PetModel = require("../models/PetModel");



const storage = multer.diskStorage({
  destination: "./uploads", // Optional if using Cloudinary
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).array("media",5);

const addNewPost = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "File upload failed", error: err.message });
    }

    try {
      let mediaUrls = []; // Array to store uploaded image URLs
      if (req.files && req.files.length > 0) { //agar array use krte he upload krte time to file ki jagah files ayega 

         // Loop through all uploaded files and upload to Cloudinary
         for (const file of req.files) {
          const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(file);
          mediaUrls.push(cloudinaryResponse.secure_url);
        }


      }

      //creating post object

      const postData = {
        pet: req.body.pet,
        caption: req.body.caption,
        media: mediaUrls, // Store as an array of images
      };

      const addPost = await PostModel.create(postData);
      await addPost.populate("pet");

      await PetModel.findByIdAndUpdate(
        req.body.pet,
        { $push: { posts: addPost._id } },
        { new: true }
      );

      res.status(201).json({
        message: " post created successfully",
        data: addPost,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error creating post",
        error: error.message,
      });
    }
  });
};

const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({ path: "pet", select: "petname profilePic" })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: {
          path: "user",
          select: "username profilePicture",
        },
      });
    return res.status(200).json({ posts, success: true });
  } catch (error) {
    console.log(error);
  }
};


//--------------------------------------------------- ahiyathi krvanu 6 -------------------------------------------------------------------

const getUserPost = async (req, res) => {
  try {
    const authorId = req.id;
    const posts = await Post.find({ author: authorId })
      .sort({ createdAt: -1 })
      .populate({ path: "author", select: "username profilePicture" })
      .populate({
        path: "Comment",
        sort: { createdAt: -1 },
        populate: {
          path: "author",
          select: "username profilePicture",
        },
      });
    return res.status(200).json({ posts, success: true });
  } catch (error) {
    console.log(error);
  }
};

const likePost = async (req, res) => {
  try {
    const likeKrneWalaUserKiId = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ message: "Post not found", success: false });

    await post.updateOne({ $addToSet: { likes: likeKrneWalaUserKiId } });
    await post.save();

    return res.status(200).json({ message: "Post liked", success: true });
  } catch (error) {
    console.log(error);
  }
};

const dislikePost = async (req, res) => {
  try {
    const likeKrneWalaUserKiId = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ message: "Post not found", success: false });

    await post.updateOne({ $pull: { likes: likeKrneWalaUserKiId } });
    await post.save();

    return res.status(200).json({ message: "Post disliked", success: true });
  } catch (error) {
    console.log(error);
  }
};

const addComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const commentKrneWalaUserKiId = req.id;
    const { text } = req.body;

    if (!text)
      return res
        .status(400)
        .json({ message: "Text is required", success: false });

    const comment = await Comment.create({
      text,
      author: commentKrneWalaUserKiId,
      post: postId,
    });

    await comment.populate({
      path: "author",
      select: "username profilePicture",
    });
    await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });

    return res
      .status(201)
      .json({ message: "Comment Added", comment, success: true });
  } catch (error) {
    console.log(error);
  }
};

const getCommentsOfPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await Comment.find({ post: postId }).populate(
      "author",
      "username profilePicture"
    );

    return res.status(200).json({ success: true, comments });
  } catch (error) {
    console.log(error);
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const authorId = req.id;

    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ message: "Post not found", success: false });
    if (post.author.toString() !== authorId)
      return res.status(403).json({ message: "Unauthorized" });

    await Post.findByIdAndDelete(postId);
    await userModel.findByIdAndUpdate(authorId, { $pull: { posts: postId } });
    await Comment.deleteMany({ post: postId });

    return res.status(200).json({ success: true, message: "Post deleted" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addNewPost,
  getAllPost,
  getUserPost,
  likePost,
  dislikePost,
  addComment,
  getCommentsOfPost,
  deletePost,
};
