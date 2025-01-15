import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { setUser } from '../slices/authSlice';

const schema = z.object({
    username: z.string()
      .min(5, { message: 'Username must be at least 5 characters' })
      .trim()
      .transform(val => val.toLowerCase()),
    password: z.string()
      .min(4, { message: 'Password must be at least 4 characters' })
      .trim(),
});

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [retryCount, setRetryCount] = useState(0);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm({
        resolver: zodResolver(schema),
        mode: 'onSubmit'
    });

    useEffect(() => {
        return () => {
            setLoginError('');
            setIsLoading(false);
            reset();
        };
    }, [reset]);

    const onSubmit = async (data) => {
        if (isLoading || isSubmitting) return;
        if (retryCount >= 5) {
            setLoginError('Too many login attempts. Please try again later.');
            return;
        }

        setIsLoading(true);
        setLoginError('');

        try {
            const response = await fetch(`${import.meta.env.VITE_URL}/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                credentials: 'include',
                timeout: 10000
            });

            const result = await response.json();

            if (response.ok && result.access) {
                Cookies.set('token', result.access, { 
                    expires: 1, 
                    secure: true, 
                    sameSite: 'Strict',
                    path: '/'
                });
                
                Cookies.set('user', JSON.stringify({ 
                    username: data.username 
                }), { 
                    expires: 1, 
                    secure: true, 
                    sameSite: 'Strict',
                    path: '/'
                });

                dispatch(setUser({ username: data.username }));
                login({ username: data.username });
                setRetryCount(0);
                navigate('/home');
            } else {
                setRetryCount(prev => prev + 1);
                if (response.status === 401) {
                    setLoginError('Invalid username or password.');
                } else if (response.status === 429) {
                    setLoginError('Too many login attempts. Please try again later.');
                } else {
                    setLoginError(result.detail || 'Login failed. Please try again.');
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            if (!navigator.onLine) {
                setLoginError('No internet connection. Please check your network.');
            } else if (error.name === 'AbortError') {
                setLoginError('Request timed out. Please try again.');
            } else {
                setLoginError('An unexpected error occurred. Please try again later.');
            }
            setRetryCount(prev => prev + 1);
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <div className="flex-1 flex flex-col items-center justify-center bg-white">
                <img
                    src={`${import.meta.env.BASE_URL}login.jpg`}
                    alt="Charakbook Illustration"
                    className="h-full w-full object-fill"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `${import.meta.env.BASE_URL}fallback-image.jpg`;
                    }}
                />
            </div>
            <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-r from-[#49a1ca] to-zinc-50 p-6 md:p-10">
                <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-sm md:max-w-md lg:max-w-lg">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">
                        Welcome to <span className="text-[#49a1ca]">Charak Samhita</span>
                    </h1>

                    {loginError && (
                        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                            <p className="text-red-700 text-sm" role="alert">
                                {loginError}
                            </p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                {...register('username')}
                                disabled={isLoading}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#49a1ca] focus:border-[#49a1ca] sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                                placeholder="Enter your username"
                                autoComplete="username"
                            />
                            {errors.username && (
                                <p className="text-red-500 text-xs mt-1" role="alert">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    {...register('password')}
                                    disabled={isLoading}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#49a1ca] focus:border-[#49a1ca] sm:text-sm pr-10 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    disabled={isLoading}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center mt-1 text-gray-600 hover:text-gray-800 disabled:text-gray-400"
                                >
                                    {showPassword ? (
                                        <FaEye className="h-5 w-5" aria-label="Hide password" />
                                    ) : (
                                        <FaEyeSlash className="h-5 w-5" aria-label="Show password" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1" role="alert">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading || isSubmitting || retryCount >= 5}
                                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                                    isLoading || isSubmitting || retryCount >= 5
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
                                        Signing in...
                                    </span>
                                ) : (
                                    'Sign In'
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="text-center mt-6">
                        <p className="text-sm">
                            Don't have an account?{' '}
                            <span
                                onClick={() => !isLoading && navigate('/signup')}
                                className={`cursor-pointer font-medium text-[#49a1ca] hover:underline transition-colors ${
                                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
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