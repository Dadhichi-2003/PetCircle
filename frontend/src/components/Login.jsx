import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";


const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitHandler = (data) => {
    console.log(data);
  };

  const validationSchema = {
    emailValidator: {
      required: { value: true, message: "*Email Field is required" },
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Invalid Email Address"
      }
    },
    passwordValidator: {
      required: { value: true, message: "*Password is required" }
    }
  };

  return (
    <>
    <Navbar/>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
              {...register("email", validationSchema.emailValidator)}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
              {...register("password", validationSchema.passwordValidator)}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Login Button */}
          <button type="submit" className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-700 transition">
            Login
          </button>
        </form>

        {/* Signup Redirect */}
        <p className="text-center text-gray-600 mt-4">
          Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Signup</Link>
        </p>
      </div>
    </div>
    </>
  );
};

export default Login;
