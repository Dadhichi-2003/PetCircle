const routes = require("express").Router()
const postController = require("../controllers/PostController")

routes.post("/addpost",postController.addNewPost);
routes.get("/allpost",postController.getAllPost);


module.exports= routes