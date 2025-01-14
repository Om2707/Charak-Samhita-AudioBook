import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const schema = z.object({
  email: z.string().email("This is not a valid email"),
  password: z.string().min(2, { message: "Password is required" }),
});

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    navigate("/");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
   
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex-1 flex flex-col items-center justify-center bg-white">
        <img
          src="/login.jpg"
          alt="eSharirbook Illustration"
          className="h-full w-full object-fill"
        />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-r from-[#49a1ca] to-zinc-50 p-6 md:p-10">
        <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-sm md:max-w-md lg:max-w-lg">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Forgot Password?
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="text"
                {...register("email")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#49a1ca] focus:border-[#49a1ca] sm:text-sm"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Create Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#49a1ca] focus:border-[#49a1ca] sm:text-sm pr-10"
                  placeholder="Enter new password"
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
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#49a1ca] hover:bg-[#5b8fa7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#49a1ca]"
              >
                Change Password
              </button>
            </div>
          </form>
          <div className="text-center mt-6">
            <p className="text-sm">
              New to eSharirbook?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="cursor-pointer font-medium text-[#49a1ca] hover:underline transition-colors"
              >
                Sign Up
              </span>
            </p>
            <p className="text-sm mt-2">
              Already a user?{" "}
              <span
                onClick={() => navigate("/")}
                className="cursor-pointer font-medium text-[#49a1ca] hover:underline transition-colors"
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