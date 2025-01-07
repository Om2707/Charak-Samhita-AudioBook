import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = Cookies.get('token'); // Check if the token exists in cookies
    if (!user || !token) {
      setIsChecking(false);
    } else {
      setIsChecking(false);
    }
  }, [user]);

  if (isChecking) {
    return <div>Loading...</div>; // Show a loading screen while checking authentication
  }

  if (!user) {
    return <Navigate to="/" replace />; // Redirect to the login page if not authenticated
  }

  return children; // Render protected children if authenticated
};

export default ProtectedRoute;
