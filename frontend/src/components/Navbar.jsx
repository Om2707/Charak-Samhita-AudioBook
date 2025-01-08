// Navbar.jsx
import { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Searchbar from './Searchbar';
import { redirectionKeywords } from './keywords';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    Cookies.remove('session');
    Cookies.remove('token');
    navigate('/');
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isSidebarOpen && !event.target.closest('#sidebar') && !event.target.closest('#sidebarToggle')) {
        setIsSidebarOpen(false);
      }
      if (isDropdownOpen && !event.target.closest('#dropdown') && !event.target.closest('#dropdownToggle')) {
        setIsDropdownOpen(false);
      }
      if (isMobileDropdownOpen && !event.target.closest('#mobileDropdown') && !event.target.closest('#mobileDropdownToggle')) {
        setIsMobileDropdownOpen(false);
      }
      if (isProfileOpen && !event.target.closest('#profileMenu') && !event.target.closest('#profileButton')) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isSidebarOpen, isDropdownOpen, isMobileDropdownOpen, isProfileOpen]);

  const handleNavigation = (path) => {
    setIsSidebarOpen(false);
    navigate(path);
  };

  return (
    <>
      <header className="bg-blue-500 text-white py-2 lg:py-2">
        <div className="container mx-auto flex justify-between items-center px-4 sm:px-2 space-x-6 lg:space-x-12">
          <div className="flex items-center space-x-6 lg:space-x-12">
            <div
              className="text-xl sm:text-xl lg:text-3xl font-bold font-Playfair cursor-pointer"
              onClick={() => handleNavigation('/home')}
            >
              Charak-Samhita
            </div>
          </div>

          <Searchbar />

          <div className="hidden md:block relative">
            <div
              id="profileButton"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md cursor-pointer"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <i className="fas fa-user text-black text-xl"></i>
            </div>
            {isProfileOpen && (
              <div
                id="profileMenu"
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-50"
              >
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-3 text-gray-800 hover:bg-red-500 hover:text-white transition-colors duration-200 ease-in-out font-medium text-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <button
            id="sidebarToggle"
            className="text-white md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <i className="fas fa-bars text-3xl sm:text-2xl"></i>
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <div
        id="sidebar"
        className={`fixed top-0 left-0 h-full w-64 md:w-72 bg-blue-500 text-white transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} z-50 ease-in-out duration-300`}
        style={{ height: '100vh' }}
      >
        <div className="p-6">
          <div className="text-3xl font-semibold mb-4">Menu</div>
          <ul>
            <li className="py-2 sm:py-1">
              <button className="text-lg sm:text-sm" onClick={() => handleNavigation('/')}>Home</button>
            </li>
            <li className="py-2 sm:py-1">
              <button className="text-lg sm:text-sm" onClick={() => handleNavigation('/profile')}>Profile</button>
            </li>
            <li className="py-2 sm:py-1" id="mobileDropdownToggle">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
              >
                <span className="text-lg sm:text-sm">Books</span>
                <i className={`fas fa-chevron-${isMobileDropdownOpen ? 'up' : 'down'} ml-2`}></i>
              </div>
              {isMobileDropdownOpen && (
                <ul id="mobileDropdown" className="ml-4 mt-2 space-y-1">
                  {redirectionKeywords.slice(0, 8).map((item) => (
                    <li key={item.path} className="py-2 sm:py-1">
                      <Link
                        to={item.path}
                        className="text-lg sm:text-sm"
                        onClick={() => handleNavigation(item.path)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li className="py-2 sm:py-1">
              <button className="text-lg sm:text-sm" onClick={() => handleNavigation('/about')}>About Us</button>
            </li>
            <li className="py-2 sm:py-1">
              <button className="text-lg sm:text-sm" onClick={() => handleNavigation('/contact')}>Contact</button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;