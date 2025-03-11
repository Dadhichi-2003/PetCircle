const routes = require("express").Router()
const petController = require("../controllers/PetController")

routes.post("/addpet",petController.addPetProfile)
routes.put("/editprofile", petController.editProfile);
routes.get("/allpets",petController.getAllpets)

module.exports= routes