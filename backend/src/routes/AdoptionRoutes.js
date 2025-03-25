const routes = require("express").Router()
const AdoptionController = require("../controllers/AdoptionController");
const { isAuthenticated } = require("../middleware/isAuthenticated");


routes.post("/update-adoption",isAuthenticated,AdoptionController.updateAdoptionStatus)
routes.get("/by-adoption-status",isAuthenticated,AdoptionController.getPetsByAdoptionStatus)
routes.post("/request-adoption",isAuthenticated,AdoptionController.requestAdoption)
routes.get("/adoption-requests/:petId",isAuthenticated,AdoptionController.getAdoptionRequestsByPet);
routes.post("/update-status", isAuthenticated, AdoptionController.updateAdoptionRequestStatus);






module.exports= routes


