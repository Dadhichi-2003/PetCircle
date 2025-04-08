"use client"

import React from "react"
import { useNavigate } from "react-router-dom"

const PetDetailsCard = ({ pet, adoptionStatus = null, onAdopt = () => {} }) => {
  const navigate = useNavigate()

  if (!pet) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl text-red-500">Pet not found</h2>
        <button
          onClick={() => navigate("/adoption")}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Back to Adoption Page
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/adoption")}
        className="mb-6 flex items-center text-green-600 hover:text-green-800"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Adoption Page
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={pet.profilePic || `/placeholder.svg?height=400&width=600`}
              alt={pet.petname}
              className="w-full h-64 md:h-full object-cover"
            />
          </div>
          <div className="md:w-1/2 p-6">
            <h1 className="text-3xl font-bold text-green-600 mb-2">{pet.petname}</h1>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Species</p>
                <p className="font-medium">{pet.species}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Breed</p>
                <p className="font-medium">{pet.breed}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Age</p>
                <p className="font-medium">{pet.age} years</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Available Since</p>
                <p className="font-medium">{new Date(pet.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            {pet.medicalHistory && pet.medicalHistory.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Medical History</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {pet.medicalHistory.map((record, index) => (
                    <li key={index} className="text-gray-700">
                      {record}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6">
              {adoptionStatus ? (
                <div
                  className={`p-3 rounded-md ${
                    adoptionStatus === "Approved"
                      ? "bg-green-100 text-green-800"
                      : adoptionStatus === "Rejected"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  <p className="font-medium">
                    {adoptionStatus === "Approved"
                      ? "Your adoption request has been approved!"
                      : adoptionStatus === "Rejected"
                      ? "Your adoption request was not approved."
                      : "Your adoption request is pending review."}
                  </p>
                </div>
              ) : (
                <button
                  onClick={onAdopt}
                  className="w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
                >
                  Request Adoption
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PetDetailsCard
