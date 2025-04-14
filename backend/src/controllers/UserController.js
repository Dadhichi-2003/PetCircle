const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const mailUtil = require("../utils/MailUtil");
const multer = require("multer");
const jwt = require("jsonwebtoken");

const cloudinaryUtil = require("../utils/CloudinaryUtil");
const PostModel = require("../models/PostModel");


const dotenv = require("dotenv")
dotenv.config({});


//storage engine

const storage = multer.diskStorage({
  
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

//multer object
const upload = multer({ storage: storage }).fields([
  { name: "profilePic", maxCount: 1 },
  { name: "media", maxCount: 1 },
]);

const upadateProfileOfOwner = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: "File upload failed", error: err.message });
    }

    try {
      // ✅ Check existing profile before modifying
      const userId = req.params.id;
      const profile = await userModel.findById(userId);

      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      let profilePic = profile.profilePic; // ✅ Default to existing image

      if (req.file) {
        const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
        profilePic = cloudinaryResponse.secure_url;
      }

      const { username, bio, location, expertise, experience, services, contact } = req.body;

      if (req.file) {
        profile.profilePic = profilePic;
      }

      if (username) profile.username = username;
      if (location) profile.location = location;
      if (bio) profile.bio = bio;
      if (expertise) profile.expertise = expertise;
      if (experience) profile.experience = experience;
      if (services) profile.services = services;
      if (contact) profile.contact = contact;

      await profile.save();

      return res.status(200).json({
        message: "Profile updated successfully",
        profile,
      });
    } catch (err) {
      res.status(500).json({
        message: "Profile not updated",
        error: err.message,
      });
    }
  });
};


// const editOwnerProfile = async(req,res)=>{

//   upload(req, res, async (err) => {
//     if (err) {
//       return res.status(500).json({ message: "File upload failed", error: err.message });
//     }

//     try {
//       // Upload file to Cloudinary 
//       let profilePic= "";
//       if (req.file) {
//         const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
//         profilePic = cloudinaryResponse.secure_url;
//       }
//       const userId = req.params.id
//       const profile= await UserModel.findById(userId);
//               if (!profile) {
//                 return res.status(404).json({ message: "Profile not found" });
//               }

//       if(profile){
//         profile.profilePic = profilePic
//       }
      
//       profile.save()
        
//       return res.status(200).json({
//         message:"profile Pic updated succesfully",
//         profilePic
//       })
//     }catch(err){

//       res.status(500).json({
//         message:"profile pic not updated",
//         error:err.message
//       })
//     }



// }

// )}


const signUpUser = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashedPassword;

    const user = await userModel.create(req.body);
    await mailUtil.sendingMail(
      user.email,
      "Welcome to petcircle",
      "find your partner , share memories with us ,spread love."
    );
    res.status(201).json({
      message: "User registered",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      message: "user not registered",
      error: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUserByEmail = await userModel.findOne({ email }).populate("pets");
    if (!findUserByEmail) {
      return res.status(404).json({ message: "Email not found" });
    }

    const isMatch = bcrypt.compareSync(password, findUserByEmail.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: findUserByEmail._id },  // ✅ Correct user ID reference
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    // Set the cookie before sending response
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(200).json({
      message: `Welcome back ${findUserByEmail.username}`,
      success: true,
      data: findUserByEmail,
    });

  } catch (err) {
    return res.status(500).json({
      message: "Login failed",
      error: err.message,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const allUser = await userModel.find();

    res.status(200).json({
      message: "users fetched successfull",
      allUser,
    });
  } catch (err) {
    res.status(404).json({
      message: "users not found",
    });
  }
};

const logout = async (req, res) => {
    try {
      return res.cookie("token", "", { maxAge: 0 }).json({
        message: "logged out succesfully",
        success: true,
      });
    } catch (err) {
      res.status(500).json({
        message: "logout nahi hora",
        error: err.message,
      });
    }
  };

const getProfileById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).populate("pets").populate('posts');
 
    res.status(200).json({
      message: "user fetched...",
      user,
    });
  } catch (err) {
    res.status(404).json({
      message: "user not found",
    });
  }
};




const getSuggestedUsers = async (req, res) => {
  try {
      const suggestedUsers = await userModel.find({ _id: { $ne: req.id } }).select("-password").populate("pets");
      if (!suggestedUsers) {
          return res.status(400).json({
              message: 'Currently do not have any users',
          })
      };
      return res.status(200).json({
          success: true,
          users: suggestedUsers
      })
  } catch (error) {
      console.log(error);
  }
};



const followOrUnfollow = async (req, res) => {
    try {
        const followKrneWala = req.id; // Requesting user
        const jiskoFollowKrunga = req.params.id; // Target user

        if (followKrneWala === jiskoFollowKrunga) {
            return res.status(400).json({
                message: 'You cannot follow/unfollow yourself',
                success: false
            });
        }

        const user = await userModel.findById(followKrneWala);
        const targetUser = await userModel.findById(jiskoFollowKrunga);

        if (!user || !targetUser) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            });
        }

        const isFollowing = user.following.includes(jiskoFollowKrunga);

        if (isFollowing) {
            // Unfollow logic
            await Promise.all([
                userModel.updateOne({ _id: followKrneWala }, { $pull: { following: jiskoFollowKrunga } }),
                userModel.updateOne({ _id: jiskoFollowKrunga }, { $pull: { followers: followKrneWala } }),
            ]);

            return res.status(200).json({ message: 'Unfollowed successfully', success: true });
        } else {
            // Follow logic
            await Promise.all([
                userModel.updateOne({ _id: followKrneWala }, { $addToSet: { following: jiskoFollowKrunga } }),
                userModel.updateOne({ _id: jiskoFollowKrunga }, { $addToSet: { followers: followKrneWala } }),
            ]);

            return res.status(200).json({ message: 'Followed successfully', success: true });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong', success: false });
    }
};

module.exports = followOrUnfollow;

const forgotPassword = async (req, res) => {
  const email = req.body.email;
  const foundUser = await userModel.findOne({ email: email });

  if (foundUser) {
    const token = jwt.sign(foundUser.toObject(), process.env.SECRET_KEY);
    console.log(token);
    const url = `http://localhost:5173/resetpass/${token}`;
    const mailContent = `<html>
                          <a href ="${url}">rest password</a>
                          </html>`;
    //email...
    await mailUtil.sendingMail(foundUser.email, "reset password", mailContent);
    res.json({
      message: "reset password link sent to mail.",
    });
  } else {
    res.json({
      message: "user not found register first..",
    });
  }
};

const resetpassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ message: "Token and password are required" });
    }

    // Decode user from token
    const userFromToken = jwt.verify(token, process.env.SECRET_KEY);
    if (!userFromToken || !userFromToken._id) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // Password encrypt
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Update user password in DB
    const updatedUser = await userModel.findByIdAndUpdate(userFromToken._id, {
      password: hashedPassword,
    }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Error in resetpassword:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllExperts = async (req, res) => {
  try {
    const experts = await userModel.find({ role: "Expert" }).select("-password");

    console.log(experts); // Check the experts that were fetched

    if (experts.length === 0) {
      return res.status(404).json({
        message: "No experts found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Experts fetched successfully",
      success: true,
      data: experts,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch experts",
      error: err.message,
    });
  }
};

const addExpertPost = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: "File upload failed", error: err.message });
    }

    try {
      const expertId = req.id; // middleware se aaraha
      const expert = await userModel.findById(expertId);

      if (!expert || expert.role !== "Expert") {
        return res.status(403).json({ message: "Only experts can create posts" });
      }

      let mediaUrl = "";

      if (req.files && req.files.media && req.files.media.length > 0) {
        const file = req.files.media[0];
        const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(file);
        mediaUrl = cloudinaryResponse.secure_url;
      }

      const { caption } = req.body;

      const newPost = await PostModel.create({
        caption,
        media: mediaUrl,
        postedBy: expertId,
      
      });


       // Push the new post into the expert's 'posts' array
       expert.posts.push(newPost._id);
       await expert.save();
 

      return res.status(201).json({
        message: "Post created successfully",
        post: newPost,
      });

    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong",
        error: error.message,
      });
    }
  });
};

const getAllExpertPosts = async (req, res) => {
  try {
    // Find all users who are experts
  
    const experts = await userModel
  .find({ role: "Expert" })
  .populate({
    path: "posts", // populate posts
    populate: {
      path: "postedBy", // populate postedBy inside each post
      select: "username profilePic", // select only username and profilePic
    },
  })

    if (!experts || experts.length === 0) {
      return res.status(404).json({ message: "No experts found or no posts by experts" });
    }

    // Gather all posts from all experts
    const allExpertPosts = experts.flatMap(expert => expert.posts);

    return res.status(200).json({
      message: "All expert posts fetched successfully",
      posts: allExpertPosts,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
};




module.exports = {
  signUpUser,
  loginUser,
  getAllUser,
  getAllExperts,
  getProfileById,
  logout,
  getSuggestedUsers,
  followOrUnfollow,
  upadateProfileOfOwner,
  forgotPassword,
  resetpassword,
  addExpertPost,
  getAllExpertPosts
 
  // addProfileWithFile,
};
