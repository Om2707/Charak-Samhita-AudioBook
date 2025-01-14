import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = Cookies.get('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const userData = Cookies.get('user');
            if (userData) {
                setUser(JSON.parse(userData));
            } else {
                setUser(null); 
            }
        }, 1000); 

        return () => clearInterval(interval); 
    }, []);

    const login = (userData) => {
        setUser(userData);
        Cookies.set('user', JSON.stringify(userData), { expires: 7 });
    };

    const logout = () => {
        setUser(null);
        Cookies.remove('token'); 
        Cookies.remove('user');
        Cookies.remove('username');
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
