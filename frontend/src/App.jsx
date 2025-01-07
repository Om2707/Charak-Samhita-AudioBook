import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Chapter from './components/Chapter';
import ForgotPassword from './components/ForgotPassword';
import Home from './components/Home';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Shlokas from './components/Shlokas';
import Signup from './components/Signup';
import { AuthProvider, useAuth } from './context/AuthContext';

const AppContent = () => {
  const { logout } = useAuth();  // Now you can safely use the `useAuth` hook

  const handleLogout = () => {
    logout();
    document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = '/';
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books/:bookId/chapters"
          element={
            <ProtectedRoute>
              <Chapter />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books/:bookId/chapters/:chapterId/shlokas"
          element={
            <ProtectedRoute>
              <Shlokas />
            </ProtectedRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />  {/* Render the actual app content here */}
    </AuthProvider>
  );
};

export default App;
