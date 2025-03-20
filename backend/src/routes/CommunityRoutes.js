const routes = require("express").Router()
const CommunityController = require("../controllers/CommunityController");
const { isAuthenticated } = require("../middleware/isAuthenticated");

routes.post("/createcommunity",isAuthenticated,CommunityController.createCommunity);
routes.post("/joincommunity/:id",isAuthenticated,CommunityController.joinCommunity);
routes.get("/getallcommunities",CommunityController.getAllCommunity);
routes.post("/addcommunitypost/:id",isAuthenticated,CommunityController.addCommunityPost);




module.exports= routes