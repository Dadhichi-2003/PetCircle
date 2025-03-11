const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const mailUtil = require("../utils/MailUtil");
const multer = require("multer");
const jwt = require("jsonwebtoken");

const cloudinaryUtil = require("../utils/CloudinaryUtil");

//storage engine

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

//multer object
const upload = multer({
  storage: storage,
  //file filter:pmg/jpg tec
}).single("image");




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

    const findUserByEmail = await userModel.findOne({ email });
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

    // ✅ Set the cookie before sending response
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
      const suggestedUsers = await userModel.find({ _id: { $ne: req.id } }).select("-password");
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
      const followKrneWala = req.id; // Mari id 
      const jiskoFollowKrunga = req.params.id; // hu jene follow krvano 6u eni id
      if (followKrneWala === jiskoFollowKrunga) {
          return res.status(400).json({
              message: 'You cannot follow/unfollow yourself',
              success: false
          });
      }

      const user = await userModel.findById(followKrneWala);
      const targetUser = await userModel.findById(jiskoFollowKrunga);

      if (!user || !targetUser) {
          return res.status(400).json({
              message: 'User not found',
              success: false
          });
      }
      // mai check krunga ki follow krna hai ya unfollow
      const isFollowing = user.following.includes(jiskoFollowKrunga);
      if (isFollowing) {
          // unfollow logic ayega
          await Promise.all([
              userModel.updateOne({ _id: followKrneWala }, { $pull: { following: jiskoFollowKrunga } }),
              userModel.updateOne({ _id: jiskoFollowKrunga }, { $pull: { followers: followKrneWala } }),
          ])
          return res.status(200).json({ message: 'Unfollowed successfully', success: true });
      } else {
          // follow logic ayega
          await Promise.all([
              userModel.updateOne({ _id: followKrneWala }, { $push: { following: jiskoFollowKrunga } }),
              userModel.updateOne({ _id: jiskoFollowKrunga }, { $push: { followers: followKrneWala } }),
          ])
          return res.status(200).json({ message: 'followed successfully', success: true });
      }
  } catch (error) {
      console.log(error);
  }
}


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
  // addProfileWithFile,
};
