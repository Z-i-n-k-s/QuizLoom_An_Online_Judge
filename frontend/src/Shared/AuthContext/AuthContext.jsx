import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import apiClient from "../../api/Api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To handle loading state while fetching user data
  const [error, setError] = useState(null); // To handle any errors

  useEffect(() => {
    // Check for stored user data (for example, after a login)
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      fetchUserData(userData.id); // Fetch additional data (e.g., teacher_id) after login
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserData = async (userId) => {
    try {
      // Fetch additional user data by userId.
      // This data should include the teacher information if available.
      const data = await apiClient.getUserById(userId);
      console.log("Fetched user data:", data);

      // Determine the teacher id:
      // If your API returns a teacher_id field, it will be used.
      // Otherwise, you can default it to the user's id (or handle as needed).
      const teacherId = data.teacher_id || userId;

      // Merge the fetched data into the current user object.
      setUser((prevUser) => ({ ...prevUser, ...data, teacher_id: teacherId }));
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    fetchUserData(userData.id); // After login, fetch additional user data (such as teacher_id)
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
