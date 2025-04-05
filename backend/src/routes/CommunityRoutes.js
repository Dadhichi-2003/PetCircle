const routes = require("express").Router()
const CommunityController = require("../controllers/CommunityController");
const { isAuthenticated } = require("../middleware/isAuthenticated");

routes.post("/createcommunity",isAuthenticated,CommunityController.createCommunity);
routes.post("/joincommunity/:id",isAuthenticated,CommunityController.joinCommunity);
routes.get("/getallcommunities",isAuthenticated,CommunityController.getAllCommunity);
routes.post("/addcommunitypost/:id",isAuthenticated,CommunityController.addCommunityPost);
routes.get("/community/:id",isAuthenticated,CommunityController.getCommunityById);




module.exports= routes