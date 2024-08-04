import React, {useContext, useState, createContext} from 'react';

//Provide authenticated state and login/logout functions
const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token') !== null);

    const login = (token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
    }

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
