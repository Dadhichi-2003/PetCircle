const routes = require("express").Router();
const profileController = require("../controllers/ProfileController");

routes.post("/addpro", profileController.addprofile);
routes.get("/profiles", profileController.getAllProfiles);
routes.get("/profile/:id", profileController.getPetProfileById);

module.exports = routes;
