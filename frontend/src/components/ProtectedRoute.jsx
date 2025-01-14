import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = Cookies.get('token'); 
    if (!user || !token) {
      setIsChecking(false);
    } else {
      setIsChecking(false);
    }
  }, [user]);

  if (isChecking) {
    return <div>Loading...</div>; 
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children; 
};

export default ProtectedRoute;
