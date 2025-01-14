import { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Searchbar from './Searchbar';

const booksKeywords = [
  { name: 'Sutrasthana', path: '/books/1/chapters', icon: 'fa-book' },
  { name: 'Nidanasthana', path: '/books/2/chapters', icon: 'fa-book' },
  { name: 'Vimanasthana', path: '/books/3/chapters', icon: 'fa-book' },
  { name: 'Shareerasthana', path: '/books/4/chapters', icon: 'fa-book' },
  { name: 'Chikitsasthana', path: '/books/5/chapters', icon: 'fa-book' },
  { name: 'Indriyasthana', path: '/books/6/chapters', icon: 'fa-book' },
  { name: 'Kalpasthana', path: '/books/7/chapters', icon: 'fa-book' },
  { name: 'Siddhisthana', path: '/books/8/chapters', icon: 'fa-book' }
];

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    Cookies.remove('session');
    Cookies.remove('token');
    Cookies.remove('username');
    navigate('/');
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isSidebarOpen && !event.target.closest('#sidebar') && !event.target.closest('#sidebarToggle')) {
        setIsSidebarOpen(false);
      }
      if (isProfileOpen && !event.target.closest('#profileMenu') && !event.target.closest('#profileButton')) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isSidebarOpen, isProfileOpen]);

  const handleNavigation = (path) => {
    setIsSidebarOpen(false);
    setIsMobileDropdownOpen(false);
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
      <div
        id="sidebar"
        className={`fixed top-0 left-0 h-full w-64 md:w-72 bg-blue-500 text-white transition-transform transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } z-50 ease-in-out duration-300`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-8">
            <div className="text-2xl font-semibold">Menu</div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <i className="fas fa-times text-2xl"></i>
            </button>
          </div>
          <nav className="flex-grow">
            <ul className="space-y-4">
              <li>
                <button 
                  className="w-full text-left px-2 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                  onClick={() => handleNavigation('/home')}
                >
                  <i className="fas fa-home mr-3"></i>
                  Home
                </button>
              </li>

              <li>
                <button
                  className="w-full text-left px-2 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                  onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                >
                  <i className="fas fa-book mr-3"></i>
                  Books
                  <i className={`fas fa-chevron-${isMobileDropdownOpen ? 'up' : 'down'} ml-2 float-right mt-1`}></i>
                </button>
                
                {isMobileDropdownOpen && (
                  <ul className="mt-2 ml-6 space-y-2">
                    {booksKeywords.map((book) => (
                      <li key={book.path}>
                        <button
                          className="w-full text-left px-2 py-1 text-gray-100 hover:text-white hover:bg-blue-600 rounded transition-colors duration-200"
                          onClick={() => handleNavigation(book.path)}
                        >
                          {book.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>
          </nav>

          <div className="pt-4 border-t border-blue-400">
            <button
              onClick={handleLogout}
              className="w-full text-left px-2 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
            >
              <i className="fas fa-sign-out-alt mr-3"></i>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;