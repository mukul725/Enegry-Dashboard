import { createContext } from "react";
import axios from "axios";
import { useState } from "react";

const AuthContext = createContext();

const API_URL = "http://127.0.0.1:8000/api";

const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("access") || null;
  });

  const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/token/`, {
      username,
      password,
    });
    const { access, refresh, user: userData } = response.data;
    setToken(access);
    setUserInfo(userData);
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
    localStorage.setItem("user", JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setToken(null);
    setUserInfo(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ userInfo, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
