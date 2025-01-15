import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import axios from "axios";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const schema = z
  .object({
    username: z.string()
      .min(5, { message: "Username must be at least 5 characters long." })
      .trim()
      .transform(val => val.toLowerCase()),
    email: z.string()
      .email("Please enter a valid email.")
      .trim()
      .toLowerCase(),
    password: z.string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and Confirm Password do not match.",
    path: ["confirmPassword"],
  });

function Signup() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange'
  });

  useEffect(() => {
    return () => {
      setErrorMessage({});
      setIsLoading(false);
      reset();
    };
  }, [reset]);

  const onSubmit = async (data) => {
    if (isLoading || isSubmitting) return;
    
    setIsLoading(true);
    setErrorMessage({});
    
    try {
      await axios.post(`${import.meta.env.VITE_URL}/signup/`, {
        username: data.username,
        password: data.password,
        email: data.email,
      }, {
        timeout: 10000 
      });
      navigate("/");
    } catch (error) {
      if (!error.response) {
        setErrorMessage({ 
          general: "Network error. Please check your connection and try again." 
        });
      } else if (error.code === 'ECONNABORTED') {
        setErrorMessage({ 
          general: "Request timed out. Please try again." 
        });
      } else {
        const serverErrors = error.response?.data || { 
          general: "Signup failed. Please try again later." 
        };
        setErrorMessage(serverErrors);
      }
    } finally {
      setIsLoading(false);
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
        <img 
          src={`${import.meta.env.BASE_URL}login.jpg`}
          alt="Ayurvedic Audiobook Illustration" 
          className="h-full w-full object-fill"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `${import.meta.env.BASE_URL}fallback-image.jpg`;
          }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-r from-[#49a1ca] to-zinc-50 p-6 md:p-10">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Create your Account
          </h1>

          {errorMessage.general && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
              <p className="text-red-700 text-sm">{errorMessage.general}</p>
            </div>
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
                disabled={isLoading}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#49a1ca] focus:border-[#49a1ca] sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                disabled={isLoading}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#49a1ca] focus:border-[#49a1ca] sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                  disabled={isLoading}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#49a1ca] focus:border-[#49a1ca] sm:text-sm pr-10 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Enter your Password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  disabled={isLoading}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center mt-1 text-gray-600 hover:text-gray-800 disabled:text-gray-400"
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
                  disabled={isLoading}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#49a1ca] focus:border-[#49a1ca] sm:text-sm pr-10 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Confirm your Password"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  disabled={isLoading}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center mt-1 text-gray-600 hover:text-gray-800 disabled:text-gray-400"
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
                disabled={isLoading || isSubmitting}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isLoading || isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#49a1ca] hover:bg-[#5b8fa7]'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#49a1ca]`}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing up...
                  </span>
                ) : (
                  'Sign up'
                )}
              </button>
            </div>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm">
              Already have an account?{" "}
              <span
                onClick={() => !isLoading && navigate("/")}
                className={`text-[#49a1ca] cursor-pointer hover:underline font-semibold ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
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