// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");

// Users
router.get("/users", AdminController.getAllUsers);
router.delete("/user/:id", AdminController.deleteUser);

//Experts
router.get("/experts", AdminController.getExpertUsers);

router.delete("/expert/:userId", AdminController.deleteExpertProfile);

// Posts
router.get("/posts", AdminController.getAllPost);
router.delete("/post/:postId", AdminController.deletePostById);

// Adoptions
router.get("/adoptions", AdminController.getAllAdoptions);
router.delete("/adoption/:adoptionId", AdminController.deleteAdoption);

// Communities
router.get("/communities", AdminController.getAllCommunity);
router.delete("/community/:id", AdminController.deleteCommunity);

router.get("/overview", AdminController.getAdminOverview);

module.exports = router;
