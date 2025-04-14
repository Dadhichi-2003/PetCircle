const routes = require("express").Router()
const userController = require("../controllers/UserController");
const { isAuthenticated } = require("../middleware/isAuthenticated");

routes.post("/signup",userController.signUpUser);
routes.post("/login",userController.loginUser);
routes.get("/users",userController.getAllUser);
routes.get("/user/getAllexpert",isAuthenticated,userController.getAllExperts);
routes.get("/user/:id",isAuthenticated,userController.getProfileById);
routes.get("/logout",userController.logout);
routes.get("/suggested",isAuthenticated,userController.getSuggestedUsers);
routes.post("/followorunfollow/:id",isAuthenticated,userController.followOrUnfollow);
routes.put("/upadateownerprofile/:id",isAuthenticated,userController.upadateProfileOfOwner);
routes.put("/upadateownerprofile/:id",isAuthenticated,userController.upadateProfileOfOwner);
routes.post("/user/forgotpassword",userController.forgotPassword);
routes.post("/user/resetpassword",userController.resetpassword);

// routes.post("/addprofile",userController.addProfileWithFile);

module.exports= routes