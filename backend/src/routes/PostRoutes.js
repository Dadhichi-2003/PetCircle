const routes = require("express").Router()
const postController = require("../controllers/PostController");
const { isAuthenticated } = require("../middleware/isAuthenticated");

routes.post("/addpost",postController.addNewPost);
routes.get("/allpost",postController.getAllPost);
routes.get("/petpost/:id",postController.getPetPost);
routes.post("/petpost/:id/like",isAuthenticated,postController.likePost);
routes.post("/petpost/:id/dislike", isAuthenticated, postController.dislikePost);
routes.post("/petpost/:id/addcomment", isAuthenticated, postController.addComment);
routes.get("/petpost/:id/getcommentsofpost", isAuthenticated, postController.getCommentsOfPost);
routes.post("/petpost/:id/deletepost", isAuthenticated, postController.deletePost);
routes.post("/petpost/:id/deletecomment", isAuthenticated, postController.deleteComment);


module.exports= routes