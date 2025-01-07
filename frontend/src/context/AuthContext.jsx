import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Check if user is authenticated based on cookie presence
    useEffect(() => {
        const userData = Cookies.get('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    // Detects cookie changes (every second) and updates user state
    useEffect(() => {
        const interval = setInterval(() => {
            const userData = Cookies.get('user');
            if (userData) {
                setUser(JSON.parse(userData));
            } else {
                setUser(null); // Clears user state when the cookie is removed
            }
        }, 1000); // Checks every second for updates

        return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

    const login = (userData) => {
        setUser(userData);
        Cookies.set('user', JSON.stringify(userData), { expires: 7 }); // Ensures user data persists in cookies
    };

    const logout = () => {
        setUser(null);
        Cookies.remove('token'); // Removing token if needed
        Cookies.remove('user'); // Remove user data cookie
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
