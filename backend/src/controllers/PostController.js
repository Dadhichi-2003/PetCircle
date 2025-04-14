const Post = require("../models/PostModel");
const userModel = require("../models/UserModel");
const Comment = require("../models/CommentModel");
// const cloudinaryUtil = require("../utils/CloudinaryUtil");
const multer = require("multer");

const cloudinaryUtil = require("../utils/CloudinaryUtil");
const PostModel = require("../models/PostModel");
const PetModel = require("../models/PetModel");
const { io, getReceiverSocketId } = require("../socket/socket");




const storage = multer.diskStorage({
  // destination: "./uploads", // Optional if using Cloudinary
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
        pet: req.body.petId,
        caption: req.body.caption,
        media: mediaUrls, // Store as an array of images
      };

      const addPost = await PostModel.create(postData);
      // const populatedPost = await PostModel.findById(addPost._id).populate("pet");

      await addPost.populate("pet")

      await PetModel.findByIdAndUpdate(
        req.body.petId,
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
      .populate({ path: "pet", select: "petname profilePic owner", populate: {
        path: "owner", 
        select: "username profilePic", 
      }, })
      .populate({
        path:'postedBy',
        select:'username profilePic'
      })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: {
          path: "user",
          select: "username profilePic",
        },
      });
    return res.status(200).json({ posts, success: true });
  } catch (error) {
    console.log(error);
  }
};


//single pet ki posts deikhane ke liye
const getPetPost = async (req, res) => {
  try {
    const petId = req.params.id;
    const posts = await Post.find({ pet: petId })
      .sort({ createdAt: -1 })
      .populate({ path: "pet", select: " petname profilePic owner" })
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



const likePost = async (req, res) => {
  try {
    const likeKrneWalaUserKiId = req.id;
    const postId = req.params.id;
   
    const post = await Post.findByIdAndUpdate(
      postId,
      { $addToSet: { likes: likeKrneWalaUserKiId } }, // Add user ID to likes array
      { new: true } // Returns the updated document
    ).populate('pet','owner');

     // implement socket io for real time notification
     const user = await userModel.findById(likeKrneWalaUserKiId).select('username profilePic');
         
     const postOwnerId = post?.pet?.owner.toString();
     console.log(postOwnerId)
     if(postOwnerId !== likeKrneWalaUserKiId){
         // emit a notification event
         const notification = {
             type:'like',
             userId:likeKrneWalaUserKiId,
             userDetails:user,
             postId,
             message:'Your post was liked'
         }
         const postOwnerSocketId = getReceiverSocketId(postOwnerId);
         io.to(postOwnerSocketId).emit('notification', notification);
     }
    
    return res.status(200).json({ message: "Post liked", success: true ,post});
  } catch (error) {
    console.log(error);
  }
};

const dislikePost = async (req, res) => {
  try {
    const UserId = req.id; //jo person dislike krne vala he uski id ayegi
    const postId = req.params.id;
    const post = await Post.findById(postId).populate('pet','owner');
    if (!post)
      return res
        .status(404)
        .json({ message: "Post not found", success: false });

    await post.updateOne({ $pull: { likes: UserId } });
    await post.save();

     // implement socket io for real time notification
     const user = await userModel.findById(UserId).select('username profilePic');
         
     const postOwnerId = post.pet?.owner.toString();
     if(postOwnerId !== UserId){
         // emit a notification event
         const notification = {
             type:'dislike',
             userId:UserId,
             userDetails:user,
             postId,
             message:'Your post was liked'
         }
         const postOwnerSocketId = getReceiverSocketId(postOwnerId);
         io.to(postOwnerSocketId).emit('notification', notification);
     }
    

    return res.status(200).json({ message: "Post disliked", success: true });
  } catch (error) {
    console.log(error);
  }
};

const addComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const UserId  = req.id;  // jo comment krega uski id ayegi
    const { content } = req.body;

    if (!content)
      return res
        .status(400)
        .json({ message: "Text is required", success: false });

    const comment = await Comment.create({
      user: UserId,
      post: postId,
      content:content
    });

    await comment.populate({
      path: "user",
      select: "username profilePic",
    });
    await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });

    return res
      .status(201)
      .json({ message: "Comment Added", comment, success: true });
  } catch (error) {
    console.log(error);
  }
};

const deleteComment = async(req,res)=>{

  try{
    const commentId= req.params.id
    const delCom = await Comment.findByIdAndDelete(commentId)
    return res.status(200).json({
      message:"comment deleted succesfully",
      delCom
    })

  }catch(err){

    res.status(404).json({
      message:"comment not found",
      error:err
    })
  }
  

}

const getCommentsOfPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await Comment.find({ post: postId }).populate(
      "user",
      "username profilePic"
    );

    return res.status(200).json({ success: true, comments });
  } catch (error) {
    console.log(error);
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const petId = req.id; //pet id jiski post post delete krni he

    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ message: "Post not found", success: false });


    // if (post.author.toString() !== authorId)
    //   return res.status(403).json({ message: "Unauthorized" }); //sir ne puvanu kevi rite krvu?

    await Post.findByIdAndDelete(postId);
    await PetModel.findByIdAndUpdate( petId , { $pull: { posts: postId } });
    await Comment.deleteMany({ post: postId });

    return res.status(200).json({ success: true, message: "Post deleted" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addNewPost,
  getAllPost,
  getPetPost,
  likePost,
  dislikePost,
  addComment,
  getCommentsOfPost,
  deletePost,
  deleteComment
};
