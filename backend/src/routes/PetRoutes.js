const routes = require("express").Router()
const petController = require("../controllers/PetController")

routes.post("/addpet",petController.addPetProfile)
routes.put("/editpetprofile/:id", petController.editPetProfile);
routes.get("/allpets",petController.getAllpets)
routes.delete("/deletepet/:petId",petController.deletePetProfile)
routes.get("/petprofile/:petId",petController.getPetProfileById)


module.exports= routes