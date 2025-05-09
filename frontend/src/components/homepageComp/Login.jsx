import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { LogIn } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/redux/user/authSlice";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

    
    
  const submitHandler = async (data) => {
    try {
      const login = await axios.post("/login", data, { withCredentials: true });
      if (login.status == 200) {
        toast.success("login succesfull !");
        console.log(login.data)
        localStorage.setItem("id", login.data.data._id);
        localStorage.setItem("role", login.data.data.role);
        dispatch(setAuthUser(login.data.data))
       
          
          if(login.data.data.role === 'User'||'Expert'){
            navigate('/main')
          }
        
        if(login.data.data.role === 'Admin'){
          navigate('/admin')
        }
      }
    } catch (error) {
        console.log(error);
        
        toast.error("invalid Credentials !");
      
    }
  };

  const validationSchema = {
    emailValidator: {
      required: { value: true, message: "*Email Field is required" },
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Invalid Email Address",
      },
    },
    passwordValidator: {
      required: { value: true, message: "*Password is required" },
    },
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
            Login
          </h2>

          <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                {...register("email", validationSchema.emailValidator)}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-700 font-medium">
                Password
              </label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                {...register("password", validationSchema.passwordValidator)}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-700 transition"
            >
              Login
            </button>
          </form>
          
          <p className="text-start my-2">
            <Link to="/forgetpassword" className=" text-blue-600 hover:underline   mt-4">
              forget password?
            </Link>
            </p>

          {/* Signup Redirect */}
          <p className="text-start text-gray-600 ">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
