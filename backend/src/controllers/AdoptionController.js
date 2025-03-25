const Adoption = require("../models/AdoptionModel");
const petModel = require("../models/PetModel")

// Update pet adoption status
const updateAdoptionStatus = async (req, res) => {
    try {
        const { petId, adoptionStatus } = req.body;

        // Validate inputs
        if (!petId || adoptionStatus === undefined) {
            return res.status(400).json({ message: "Pet ID and adopted status are required" });
        }

        // Find and update pet
        const updatedPet = await petModel.findByIdAndUpdate(
            petId,
            { adoptionStatus },
            { new: true } // Return updated document
        );

        if (!updatedPet) {
            return res.status(404).json({ message: "Pet not found" });
        }

        res.status(200).json({
            message: `Pet adoption status updated to ${adoptionStatus}`,
            pet: updatedPet
        });

    } catch (error) {
        res.status(500).json({ message: "Error updating adoption status", error: error.message });
    }
};


const getPetsByAdoptionStatus = async (req, res) => {
    try {
        const { adoptionStatus } = req.query; // Query param se adopted status nikalna
        if (adoptionStatus === undefined) {
            return res.status(400).json({ message: "Please provide adopted=true or adopted=false" });
        }

        const isAdopted = adoptionStatus === "true"; // String ko boolean me convert karna
        const pets = await petModel.find({ adoptionStatus: isAdopted });

        res.status(200).json({
            message: `Pets fetched successfully where adopted=${isAdopted}`,
            pets
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching pets", error: error.message });
    }
};

const requestAdoption = async (req, res) => {
    try {
        const { petId, adopterId } = req.body;

        // Check if pet exists
        const pet = await petModel.findById(petId);
        if (!pet) {
            return res.status(404).json({ message: "Pet not found" });
        }

        // Check if pet is already adopted
        if (pet.adoptionStatus) {
            return res.status(400).json({ message: "This pet has already been adopted" });
        }

        // Create a new adoption request
        const adoptionRequest = await Adoption.create({
            petId,
            ownerId: pet.owner,
            adopterId,
            status: "Pending"
        });

        res.status(201).json({
            message: "Adoption request sent successfully",
            adoptionRequest
        });

    } catch (error) {
        res.status(500).json({
            message: "Error sending adoption request",
            error: error.message
        });
    }
};

const getAdoptionRequestsByPet = async (req, res) => {
    try {
        const { petId } = req.params;

        // Fetch all adoption requests related to the pet
        const adoptionRequests = await Adoption.find({ petId }).populate("adopterId", "username profilePic");

        if (!adoptionRequests.length) {
            return res.status(404).json({ message: "No adoption requests found for this pet" });
        }

        res.status(200).json({
            message: "Adoption requests fetched successfully",
            adoptionRequests
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching adoption requests",
            error: error.message
        });
    }
};


const updateAdoptionRequestStatus = async (req, res) => {
    try {
        const { adoptionId, status } = req.body;

        // Validate status
        if (!["Approved", "Rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status. Allowed values: Approved, Rejected" });
        }

        // Find and update adoption request
        const adoptionRequest = await Adoption.findByIdAndUpdate(
            adoptionId,
            { status },
            { new: true }
        );

        if (!adoptionRequest) {
            return res.status(404).json({ message: "Adoption request not found" });
        }

        // If approved, update pet's adoption status
        if (status === "Approved") {
            await petModel.findByIdAndUpdate(adoptionRequest.petId, { adoptionStatus: true });
        }

        res.status(200).json({
            message: "Adoption request status updated successfully",
            adoptionRequest
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating adoption request status",
            error: error.message
        });
    }
};







module.exports={
    updateAdoptionStatus,
    getPetsByAdoptionStatus,
    requestAdoption,
    getAdoptionRequestsByPet,
    updateAdoptionRequestStatus
}