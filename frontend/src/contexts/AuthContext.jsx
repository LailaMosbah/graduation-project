import { createContext, useState } from "react";
// import * as authService from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // ===== Log in =====
    const login = (credentials) => {
        setUser(credentials)
    }
    /*const login = async (credentials) => {
        const res = await authService.login(credentials);
        setUser(res.data.user);
    };*/


    // ====== Sign up ======
    const signup = (data) => {
        setUser(data)
    }
    /*const signup = async (data) => {
        const res = await authService.signup(data);
        setUser(res.data.user);
    };*/


    // ===== Logout ======
    const logout = () => {
        setUser(null)
    }
    /*const logout = async () => {
        await authService.logout();
        setUser(null);
    };*/

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
