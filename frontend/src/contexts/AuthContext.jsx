import { createContext, useEffect, useState } from "react";
// import * as authService from "../services/authService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // ===== Log in =====
    const login = (credentials) => {
        setUser(credentials)
        localStorage.setItem("user", JSON.stringify(credentials));
    }
    /*const login = async (credentials) => {
        const res = await authService.login(credentials);
        setUser(res.data.user);
    };*/


    // ====== Sign up ======
    const signup = (data) => {
        setUser(data)
        localStorage.setItem("user", JSON.stringify(data));
    }
    /*const signup = async (data) => {
        const res = await authService.signup(data);
        setUser(res.data.user);
    };*/


    // ===== Logout ======
    const logout = () => {
        setUser(null)
        localStorage.removeItem("user");
    }
    /*const logout = async () => {
        await authService.logout();
        setUser(null);
    };*/


    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        }
    }, [user])

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
