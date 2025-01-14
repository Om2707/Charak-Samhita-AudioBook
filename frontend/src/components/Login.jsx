import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { setUser } from '../slices/authSlice';

const schema = z.object({
    username: z.string().min(5, { message: 'Username is required' }),
    password: z.string().min(4, { message: 'Password is required' }),
});

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data) => {
        setLoading(true);
        setLoginError('');

        try {
            const response = await fetch('http://127.0.0.1:8000/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok && result.access) {
                Cookies.set('token', result.access, { expires: 1, secure: true, sameSite: 'Strict' });
                Cookies.set('user', JSON.stringify({ username: data.username }), { expires: 1, secure: true, sameSite: 'Strict' });

                dispatch(setUser({ username: data.username }));
                login({ username: data.username });

                navigate('/home');
            } else if (response.status === 401) {
                setLoginError('Invalid username or password.');
            } else {
                setLoginError(result.detail || 'Login failed. Please try again.');
            }
        } catch (error) {
            setLoginError('An unexpected error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex flex-col md:flex-row h-screen ">
            <div className="flex-1 flex flex-col items-center justify-center bg-white">
                <img
                    src="/login.jpg"
                    alt="charakbook Illustration"
                    className="h-full w-full object-fill"
                />
            </div>
            <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-r from-[#49a1ca] to-zinc-50 p-6 md:p-10">
                <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-sm md:max-w-md lg:max-w-lg">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">
                        Welcome to <span className="text-[#49a1ca]">Charak Samhita</span>
                    </h1>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="mb-4">
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                {...register('username')}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#49a1ca] focus:border-[#49a1ca] sm:text-sm"
                                placeholder="Enter your username"
                            />
                            {errors.username && (
                                <p className="text-red-500 text-xs mt-1" aria-live="polite">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    {...register('password')}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#49a1ca] focus:border-[#49a1ca] sm:text-sm pr-10"
                                    placeholder="Enter your password"
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
                                <p className="text-red-500 text-xs mt-1" aria-live="polite">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        {loginError && (
                            <p className="text-red-500 text-sm mb-4" aria-live="assertive">
                                {loginError}
                            </p>
                        )}
                        <div className="mb-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#49a1ca] hover:bg-[#5b8fa7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#49a1ca]"
                            >
                                {loading ? 'Signing In...' : 'Sign In'}
                            </button>
                        </div>
                        {/* <div className="text-center mb-4">
                            <a
                                href="/forgot-password"
                                className="text-sm text-[#49a1ca] hover:underline"
                            >
                                Forgot Password?
                            </a>
                        </div> */}
                    </form>
                    <div className="text-center mt-6">
                        <p className="text-sm">
                            Don't have an account?{' '}
                            <span
                                onClick={() => navigate('/signup')}
                                className="cursor-pointer font-medium text-[#49a1ca] hover:underline transition-colors"
                            >
                                Sign Up
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;