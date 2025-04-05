const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const mailUtil = require("../utils/MailUtil");
const multer = require("multer");
const jwt = require("jsonwebtoken");

const cloudinaryUtil = require("../utils/CloudinaryUtil");
const UserModel = require("../models/UserModel");

const dotenv = require("dotenv")
dotenv.config({});


//storage engine

const storage = multer.diskStorage({
  
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

//multer object
const upload = multer({
  storage: storage,
  //file filter:pmg/jpg tec
}).single("profilePic");

const upadateProfileOfOwner = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: "File upload failed", error: err.message });
    }

    try {
      // ✅ Check existing profile before modifying
      const userId = req.params.id;
      const profile = await UserModel.findById(userId).populate("pets");

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
    const user = await userModel.findById(req.params.id).populate("pets");
 
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





// const addProfileWithFile = async (req, res) => {
//     upload(req, res, async (err) => {
//       if (err) {
//         res.status(500).json({
//           message: err.message,
//         });
//       } else {
//         // database data store
//         //cloundinary

//         const cloundinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
//         console.log(cloundinaryResponse);
//         console.log(req.body);

//         //store data in database
//         req.body.profilePic = cloundinaryResponse.secure_url
//         const savedProfile = await userModel.create(req.body);

//         res.status(200).json({
//           message: "profile saved successfully",
//           data: savedProfile
//         });
//       }
//     });
//   };

module.exports = {
  signUpUser,
  loginUser,
  getAllUser,
  getProfileById,
  logout,
  getSuggestedUsers,
  followOrUnfollow,
  upadateProfileOfOwner,
  forgotPassword,
  resetpassword
  // addProfileWithFile,
};
