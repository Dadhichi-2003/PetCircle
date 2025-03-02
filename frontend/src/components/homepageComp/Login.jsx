import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { LogIn } from "lucide-react";
import { toast, ToastContainer, Zoom } from "react-toastify";
import axios from "axios";


const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const submitHandler = async (data) => {

    const login = await axios.post("/login", data)
    if (login.status == 200) {
      toast.success('login succesfull !', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Zoom,
      
      });

      setTimeout(()=>{
        navigate('/main')
      },3000)

      
    }
    else {
      toast.error('Invalid credentials,try again !', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Zoom,
      });
    }
    
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
        transition={Zoom}
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
        transition={Zoom}
      />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl">
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
