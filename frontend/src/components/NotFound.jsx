import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate('/');
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Main Heading */}
      <h1 className="text-5xl font-bold text-gray-800 mb-4 animate-bounce">
        Page Not Found
      </h1>
      {/* Subheading */}
      <p className="text-gray-600 text-lg mb-6 animate-fade-in">
        The page you are looking for does not exist.
      </p>
      {/* Go to Login Button */}
      <button
        onClick={handleGoToLogin}
        className="px-6 py-3 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600 transition duration-300 transform hover:scale-105"
      >
        Go to Login
      </button>
    </div>
  );
};

export default NotFound;
