import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("This is not a valid email"),
  password: z.string().min(2, { message: "Password is required" }),
});

export default function ForgotPassword() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    navigate("/login");
  };
   
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex-1 flex flex-col items-center justify-center bg-white">
        <img
          src="src\Images\Login.png"
          alt="eSharirbook Illustration"
          className="h-full w-full object-fill"
        />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center bg-white p-6 md:p-10">
        {" "}
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Forgot Password?
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-xs md:max-w-sm"
        >
          <div className="mb-4">
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Create password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Change Password
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="mt-4 text-sm">
            New to eSharirbook?{" "}
            <a
              onClick={() => {
                navigate("/signup");
              }}
              className="text-teal-500 cursor-pointer hover:underline"
            >
              Create Account
            </a>
          </p>
          <p className="mt-4 text-sm">
            Already a user?{" "}
            <a
              onClick={() => {
                navigate("/login");
              }}
              className="text-teal-500 cursor-pointer hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
