import { lazy, Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const Login = lazy(() => import('./components/Login'));
const Signup = lazy(() => import('./components/Signup'));
const Home = lazy(() => import('./components/Home'));
const Chapter = lazy(() => import('./components/Chapter'));
const Section = lazy(() => import('./components/Section'));
const SectionShlokas = lazy(() => import('./components/SectionShlokas'));
const Shlokas = lazy(() => import('./components/Shlokas'));
const NotFound = lazy(() => import('./components/NotFound')); 

const LoadingSpinner = () => (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-90 z-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);

const AppContent = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = '/';
  };

  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
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
            path="/books/:bookId/chapters/:chapterId/sections"
            element={
              <ProtectedRoute>
                <Section />
              </ProtectedRoute>
            }
          />
          {/* Section Shlokas Route */}
          <Route
            path="/books/:bookId/chapters/:chapterId/sections/:sectionId/shlokas"
            element={
              <ProtectedRoute>
                <SectionShlokas />
              </ProtectedRoute>
            }
          />
          {/* Regular Chapter Shlokas Route */}
          <Route
            path="/books/:bookId/chapters/:chapterId/shlokas"
            element={
              <ProtectedRoute>
                <Shlokas />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;