const routes = require("express").Router()
const MessageController = require("../controllers/MessageController");
const { isAuthenticated } = require("../middleware/isAuthenticated");

routes.post("/message/:id",isAuthenticated,MessageController.sendMessage);
routes.get("/message/:id",isAuthenticated,MessageController.getMessage);



module.exports= routes