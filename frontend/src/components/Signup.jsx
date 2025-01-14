import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const schema = z
  .object({
    username: z.string().min(5, { message: "Username must be at least 5 characters long." }),
    email: z.string().email("Please enter a valid email."),
    password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and Confirm Password do not match.",
    path: ["confirmPassword"],
  });

function Signup() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await axios.post("http://127.0.0.1:8000/signup/", {
        username: data.username,
        password: data.password,
        email: data.email,
      });
      navigate("/");
    } catch (error) {
      const serverErrors = error.response?.data || { general: "Signup failed. Please try again later." };
      setErrorMessage(serverErrors);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex-1 flex items-center justify-center bg-white">
        <img src="/login.jpg" alt="Ayurvedic Audiobook Illustration" className="h-full w-full object-fill" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-r from-[#49a1ca] to-zinc-50 p-6 md:p-10">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Create your Account
          </h1>

          {errorMessage.general && (
            <p className="text-red-500 text-sm text-center mb-4">{errorMessage.general}</p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                type="text"
                {...register("username")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#49a1ca] focus:border-[#49a1ca] sm:text-sm"
                placeholder="Enter your username"
              />
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
              {errorMessage.username && <p className="text-red-500 text-xs mt-1">{errorMessage.username[0]}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#49a1ca] focus:border-[#49a1ca] sm:text-sm"
                placeholder="Enter your Email"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              {errorMessage.email && <p className="text-red-500 text-xs mt-1">{errorMessage.email[0]}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#49a1ca] focus:border-[#49a1ca] sm:text-sm pr-10"
                  placeholder="Enter your Password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center mt-1 text-gray-600 hover:text-gray-800"
                >
                  {showPassword ? (
                    <FaEye className="h-5 w-5" />
                  ) : (
                    <FaEyeSlash className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#49a1ca] focus:border-[#49a1ca] sm:text-sm pr-10"
                  placeholder="Confirm your Password"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center mt-1 text-gray-600 hover:text-gray-800"
                >
                  {showConfirmPassword ? (
                    <FaEye className="h-5 w-5" />
                  ) : (
                    <FaEyeSlash className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#49a1ca] hover:bg-[#5b8fa7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#49a1ca]"
              >
                Sign up
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/")}
                className="text-[#49a1ca] cursor-pointer hover:underline font-semibold"
              >
                Sign In
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;