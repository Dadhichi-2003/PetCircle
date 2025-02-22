import React from 'react'
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const validationSchema = {
    userNameValidator: {
      required: { value: true, message: "*Username is required" },
      minLength: { value: 3, message: "At least 3 characters" },
    },
    emailValidator: {
      required: { value: true, message: "*Email is required" },
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Invalid Email Address",
      },
    },
    mobileNumValidator: {
      required: { value: true, message: "*Contact number is required" },
      pattern: {
        value: /^[6-9]{1}[0-9]{9}$/,
        message: "Contact number is invalid",
      },
    },
    passwordValidator: {
      required: { value: true, message: "*Password is required" },
      minLength: { value: 6, message: "At least 6 characters" },
    },
    confirmPasswordValidator: {
      required: { value: true, message: "*Confirm password is required" },
      validate: (value) => value === watch("password") || "Passwords do not match",
    },
  };

  const submitHandler = (data) => {
    console.log(data);
  };

  return (
    <>
    <Navbar/>
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-semibold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit(submitHandler)}>
          {/* Username */}
          <div className="mb-4">
            <label className="block font-medium">Username</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              {...register("username", validationSchema.userNameValidator)}
            />
            <p className="text-red-500 text-sm">{errors.username?.message}</p>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block font-medium">Email</label>
            <input
              type="email"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              {...register("email", validationSchema.emailValidator)}
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>

          {/* Mobile Number */}
          <div className="mb-4">
            <label className="block font-medium">Mobile Number</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              {...register("mobile", validationSchema.mobileNumValidator)}
            />
            <p className="text-red-500 text-sm">{errors.mobile?.message}</p>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block font-medium">Password</label>
            <input
              type="password"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              {...register("password", validationSchema.passwordValidator)}
            />
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block font-medium">Confirm Password</label>
            <input
              type="password"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              {...register("confirmPassword", validationSchema.confirmPasswordValidator)}
            />
            <p className="text-red-500 text-sm">{errors.confirmPassword?.message}</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gray-800 text-white p-2 rounded-lg hover:bg-gray-700 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
    </>
  );
}

export default SignUp
