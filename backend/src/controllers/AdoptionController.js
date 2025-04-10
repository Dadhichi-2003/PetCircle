const Adoption = require("../models/AdoptionModel");
const petModel = require("../models/PetModel");

// Update pet adoption status
const updateAdoptionStatus = async (req, res) => {
  try {
    const { petId, adoptionStatus } = req.body;

    // Validate inputs
    if (!petId || adoptionStatus === undefined) {
      return res
        .status(400)
        .json({ message: "Pet ID and adopted status are required" });
    }

    //  Check if any request is already approved
    const approvedRequest = await Adoption.findOne({
      petId,
      status: "Approved",
    });
    if (approvedRequest && adoptionStatus === true) {
      return res
        .status(400)
        .json({
          message: "Cannot make pet available again. It's already adopted.",
        });
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
      pet: updatedPet,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error updating adoption status",
        error: error.message,
      });
  }
};

const getPetsByAdoptionStatus = async (req, res) => {
  try {
    const { adoptionStatus } = req.query; // Query param se adopted status nikalna
    if (adoptionStatus === undefined) {
      return res
        .status(400)
        .json({ message: "Please provide adopted=true or adopted=false" });
    }

    const isAdopted = adoptionStatus === "true"; // String ko boolean me convert karna
    const pets = await petModel.find({ adoptionStatus: isAdopted });

    res.status(200).json({
      message: `Pets fetched successfully where adopted=${isAdopted}`,
      pets,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching pets", error: error.message });
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
    if (!pet.adoptionStatus) {
      return res
        .status(400)
        .json({ message: "This pet is not available for adoption" });
    }

    // Check if an adoption request already exists
    const existingRequest = await Adoption.findOne({ petId, adopterId });
    if (existingRequest) {
      return res
        .status(400)
        .json({ message: "You have already sent a request for this pet" });
    }

    // Create a new adoption request
    const adoptionRequest = await Adoption.create({
      petId,
      ownerId: pet.owner,
      adopterId,
      status: "Pending",
    });

    await adoptionRequest.populate("petId");
    await adoptionRequest.populate("ownerId");
    await adoptionRequest.populate("adopterId");

    res.status(201).json({
      message: "Adoption request sent successfully",
      adoptionRequest,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error sending adoption request",
      error: error.message,
    });
  }
};

const getAdoptionRequestsByPet = async (req, res) => {
  try {
    const { petId } = req.params;

    // Fetch all adoption requests related to the pet
    const adoptionRequests = await Adoption.find({ petId }).populate(
      "adopterId",
      "username profilePic"
    );

    if (!adoptionRequests.length) {
      return res
        .status(404)
        .json({ message: "No adoption requests found for this pet" });
    }

    res.status(200).json({
      message: "Adoption requests fetched successfully",
      adoptionRequests,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching adoption requests",
      error: error.message,
    });
  }
};

const updateAdoptionRequestStatus = async (req, res) => {
  try {
    const { adoptionReqId, status } = req.body;

    // Validate status
    if (!["Approved", "Rejected"].includes(status)) {
      return res
        .status(400)
        .json({
          message: "Invalid status. Allowed values: Approved, Rejected",
        });
    }

    // Find and update adoption request
    const adoptionRequest = await Adoption.findByIdAndUpdate(
      adoptionReqId,
      { status },
      { new: true }
    );

    if (!adoptionRequest) {
      return res.status(404).json({ message: "Adoption request not found" });
    }

    // If approved, update pet's adoption status
    if (status === "Approved") {
      await petModel.findByIdAndUpdate(adoptionRequest.petId, {
        adoptionStatus: false,
      });
    }

    res.status(200).json({
      message: "Adoption request status updated successfully",
      adoptionRequest,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating adoption request status",
      error: error.message,
    });
  }
};

const getMyAdoptionRequests = async (req, res) => {
  try {
    const { adopterId } = req.params;

    const requests = await Adoption.find({ adopterId })
      .populate("petId")
      .populate("ownerId", "username profilePic")
      .populate("adopterId", "username profilePic");

    res.status(200).json({
      message: "Your adoption requests",
      requests,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch your adoption requests",
      error: error.message,
    });
  }
};

const cancelAdoptionRequest = async (req, res) => {
  try {
    const { adoptionId } = req.params;

    const request = await Adoption.findById(adoptionId);
    if (!request) {
      return res.status(404).json({ message: "Adoption request not found" });
    }

    if (request.status !== "Pending") {
      return res
        .status(400)
        .json({ message: "Only pending requests can be canceled" });
    }

    await Adoption.findByIdAndDelete(adoptionId);

    res.status(200).json({ message: "Adoption request canceled successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error canceling request", error: error.message });
  }
};

const getAdoptionRequestsForMyPets = async (req, res) => {
  try {
    const { ownerId } = req.params;

    // Step 1: Find all pets owned by this user
    const myPets = await petModel.find({ owner: ownerId }, "_id");

    if (myPets.length === 0) {
      return res
        .status(200)
        .json({ message: "You have no pets", requestsByPet: [] });
    }

    const petIds = myPets.map((pet) => pet._id);

    // Step 2: Find all adoption requests for these pets
    const adoptionRequests = await Adoption.find({ petId: { $in: petIds } })
      .populate("petId", "petname species breed age profilePic medicalHistory")
      .populate("adopterId", "username profilePic");

    res.status(200).json({
      message: "Adoption requests for your pets",
      requestsByPet: adoptionRequests,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching adoption requests",
      error: error.message,
    });
  }
};

module.exports = {
  updateAdoptionStatus,
  getPetsByAdoptionStatus,
  requestAdoption,
  getAdoptionRequestsByPet,
  updateAdoptionRequestStatus,
  getMyAdoptionRequests,
  cancelAdoptionRequest,
  getAdoptionRequestsForMyPets,
};
