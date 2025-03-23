import { createContext, useState, useEffect } from "react";
import axios from "../utils/axiosConfig";
import Cookies from "js-cookie"; // ✅ Import Cookies

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const token = Cookies.get("auth_token"); // ✅ Get token from cookies

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  const login = async (email, password, navigate) => {
    try {
      const response = await axios.post("/login", { email, password });

      // ✅ Store token in cookies
      Cookies.set("auth_token", response.data.token, { expires: 1, secure: true, sameSite: "Strict" });

      // ✅ Set user details from response (NO NEED to call `/user`)
      setUser(response.data.user); 
      setIsAuthenticated(true);

      navigate("/admin/settings");
    } catch (error) {
      console.error("Login failed", error);
      alert("Invalid credentials");
    }
  };

  const logout = async (navigate) => {
    try {
      await axios.post("/logout", {}, { headers: { Authorization: `Bearer ${Cookies.get("auth_token")}` } });
  
      // ✅ Remove token from cookies
      Cookies.remove("auth_token", { path: "/" });
  
      setIsAuthenticated(false);
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, logout, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
