import { createContext, useEffect, useState } from "react";
import {
  clearToken,
  getToken,
  getUser,
  getUserCount,
  login,
  logout,
  register,
  requestPasswordReset,
  resendVerification,
  resetPassword,
  verifyEmail,
} from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = getToken();
        if (!token) {
          setLoading(false);
          return;
        }

        const userData = await getUser();
        if (userData) {
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        } else {
          localStorage.removeItem("user");
        }
      } catch (error) {
        setError(error.message);
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogin = async (credentials) => {
    const token = await login(credentials);
    if (token) {
      const userData = await getUser();
      if (userData) {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      }
      return true;
    }
    return false;
  };

  const handleRegister = async (credentials) => {
    const success = await register(credentials);
    return success;
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    localStorage.removeItem("user");
    clearToken();
  };

  const handleSendVerify = async (email) => {
    const success = await resendVerification(email);
    return success;
  };

  const handleVerify = async (token) => {
    const success = await verifyEmail(token);
    return success;
  };

  const handleRequestPasswordReset = async (email) => {
    const success = await requestPasswordReset(email);
    return success;
  };

  const handlePasswordReset = async (token, newPassword) => {
    const success = await resetPassword(token, newPassword);
    return success;
  };

  const fetchUserCount = async () => {
    const data = await getUserCount();
    return data;
  };

  const value = {
    user,
    loading,
    error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    sendVerify: handleSendVerify,
    verify: handleVerify,
    requestReset: handleRequestPasswordReset,
    reset: handlePasswordReset,
    fetchUserCount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
