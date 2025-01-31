import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import apiClient from "../../api/Api";


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiClient.fetchUser();
        if (response.success) {
          setUser(response.user_info);
        } else {
          console.error(response.message || "Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data from backend:", error);
      }
    };

    fetchUserData();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await apiClient.login(credentials);
      if (response.success) {
        setUser(response.user_info);
      } else {
        console.error(response.message || "Invalid login credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
