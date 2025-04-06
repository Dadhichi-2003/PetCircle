const routes = require("express").Router()
const CommunityController = require("../controllers/CommunityController");
const { isAuthenticated } = require("../middleware/isAuthenticated");

routes.post("/createcommunity",isAuthenticated,CommunityController.createCommunity);
routes.post("/joincommunity/:id",isAuthenticated,CommunityController.joinCommunity);
routes.get("/getallcommunities",isAuthenticated,CommunityController.getAllCommunity);
routes.post("/addcommunitypost/:id",isAuthenticated,CommunityController.addCommunityPost);
routes.get("/community/:id",isAuthenticated,CommunityController.getCommunityById);
routes.get("/all-community-posts", isAuthenticated,CommunityController.getAllCommunityPosts);
routes.get("/:id/posts", isAuthenticated,CommunityController.getPostsByCommunityId);
routes.post('/leave/:id', isAuthenticated, CommunityController.leaveCommunity);
routes.delete('/delete/:id', isAuthenticated, CommunityController.deleteCommunity);
routes.delete('/:communityId/post/:postId', isAuthenticated, CommunityController.deleteCommunityPost);


module.exports= routes