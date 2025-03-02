const routes = require("express").Router()
const userController = require("../controllers/UserController")

routes.post("/signup",userController.signUpUser);
routes.post("/login",userController.loginUser);
routes.get("/users",userController.getAllUser);

module.exports= routes