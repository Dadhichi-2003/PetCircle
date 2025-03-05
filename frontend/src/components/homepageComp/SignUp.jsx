import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios"
import { Bounce, toast, ToastContainer } from "react-toastify"
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [role, setRole] = useState("User"); // Default role is User
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const validationSchema = {
    userNameValidator: { required: "Username is required", minLength: { value: 3, message: "At least 3 characters" } },
    emailValidator: {
      required: "Email is required",
      pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid Email Address" },
    },
    mobileNumValidator: {
      required: "Contact number is required",
      pattern: { value: /^[6-9]{1}[0-9]{9}$/, message: "Invalid Contact Number" },
    },
    passwordValidator: { required: "Password is required", minLength: { value: 6, message: "At least 6 characters" } },
    confirmPasswordValidator: {
      required: "Confirm password is required",
      validate: (value) => value === watch("password") || "Passwords do not match",
    },
  };

  const submitHandler = async(data) => {
    console.log(data)
    try{
      const user = await axios.post("/signup",data)
      console.log(user.data)
    if(user.status===201){
    
      toast.success('User Registered!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
      
        setTimeout(()=>{
          navigate('/login')
        },3000)
      
    }
    }catch(err){
      if(err.status===500){
        toast.error('email or username already exist', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
          });
      }
      }
    }

  

  return (
    <>
      <Navbar />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 pt-10">
        <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-2xl">
          <h2 className="text-center text-2xl font-semibold mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit(submitHandler)}>
            {/* Role Selection */}
            <div className="mb-4">
              <label className="block font-medium">Sign up as:</label>
              <select
                {...register("role")}
                onChange={(e) => setRole(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <option value="User">User</option>
                <option value="Expert">Expert or Trainer</option>
              </select>
            </div>

            {/* Common Fields (Compact Layout) */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">Username</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  {...register("username", validationSchema.userNameValidator)}
                />
                <p className="text-red-500 text-sm">{errors.username?.message}</p>
              </div>

              <div>
                <label className="block font-medium">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  {...register("email", validationSchema.emailValidator)}
                />
                <p className="text-red-500 text-sm">{errors.email?.message}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block font-medium">Mobile Number</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  {...register("mobile", validationSchema.mobileNumValidator)}
                />
                <p className="text-red-500 text-sm">{errors.mobile?.message}</p>
              </div>

              <div>
                <label className="block font-medium">Password</label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  {...register("password", validationSchema.passwordValidator)}
                />
                <p className="text-red-500 text-sm">{errors.password?.message}</p>
              </div>
            </div>

            <div className="mt-4">
              <label className="block font-medium">Confirm Password</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded-lg"
                {...register("confirmPassword", validationSchema.confirmPasswordValidator)}
              />
              <p className="text-red-500 text-sm">{errors.confirmPassword?.message}</p>
            </div>

            {/* Expert Fields (Appears Only If Expert is Selected) */}
            {role === "Expert" && (
              <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-300">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Expert Details</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium">Expertise Area</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      {...register("expertise", { required: "Expertise is required" })}
                    />
                    <p className="text-red-500 text-sm">{errors.expertise?.message}</p>
                  </div>

                  <div>
                    <label className="block font-medium">Years of Experience</label>
                    <input
                      type="number"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      {...register("experience", { required: "Experience is required" })}
                    />
                    <p className="text-red-500 text-sm">{errors.experience?.message}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block font-medium">Services Offered</label>
                  <select
                    multiple
                    className="block w-full p-2 border border-gray-300 rounded"
                    {...register("services")}
                  >
                    <option value="Training">Training</option>
                    <option value="Health Consultation">Health Consultation</option>
                    <option value="Nutrition Advice">Nutrition Advice</option>
                  </select>
                </div>

                <div className="mt-4">
                  <label className="block font-medium">Short Bio</label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    {...register("bio", { required: "Bio is required" })}
                  />
                  <p className="text-red-500 text-sm">{errors.bio?.message}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-4 bg-gray-800 text-white p-2 rounded-lg hover:bg-gray-700 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;



