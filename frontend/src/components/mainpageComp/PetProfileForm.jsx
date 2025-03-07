import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

const PetProfileForm = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {

    
    try {
      const id = localStorage.getItem("id");
      
      data.userdata = id;

      const response = await axios.post("/profile/addpro", data);
      if (response.status === 201) {
        toast.success("Pet Profile Created!", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
          transition: Bounce,
        });
        console.log(response.data)

       
      }

      localStorage.setItem("profilePic",response.data.data.profilePic)
      localStorage.setItem("petId",response.data.data._id)
      setTimeout(()=>{
        navigate("/main/profile")
      },2000)
    } catch (error) {
      toast.error("Error creating profile", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <ToastContainer />
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-2xl">
        <h2 className="text-center text-2xl font-semibold mb-4">Pet Profile</h2>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="mb-4">
            <label className="block font-medium">Pet Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              {...register("petName", { required: "Pet name is required" })}
            />
            <p className="text-red-500 text-sm">{errors.petName?.message}</p>
          </div>

          <div className="mb-4">
            <label className="block font-medium">Pet Type</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              {...register("petType", { required: "Pet type is required" })}
            />
            <p className="text-red-500 text-sm">{errors.petType?.message}</p>
          </div>

          <div className="mb-4">
            <label className="block font-medium">Breed</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              {...register("breed", { required: "Breed is required" })}
            />
            <p className="text-red-500 text-sm">{errors.breed?.message}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Age (years)</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-lg"
                {...register("petAge", { required: "Age is required" })}
              />
              <p className="text-red-500 text-sm">{errors.petAge?.message}</p>
            </div>
            <div>
              <label className="block font-medium">Weight (kg)</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-lg"
                {...register("petWeight", { required: "Weight is required" })}
              />
              <p className="text-red-500 text-sm">{errors.petWeight?.message}</p>
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-medium">Medical History</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg"
              {...register("medicalHistory", { required: "Medical history is required" })}
            ></textarea>
            <p className="text-red-500 text-sm">{errors.medicalHistory?.message}</p>
          </div>

          <div className="mb-4">
            <label className="block font-medium">Profile Picture (URL)</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              {...register("profilePic")}
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-gray-800 text-white p-2 rounded-lg hover:bg-gray-700 transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default PetProfileForm;
