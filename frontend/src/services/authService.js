import instance from "./authInstance.js";
import { toast } from "react-toastify";

export const getToken = () => {
  return localStorage.getItem("token");
};

export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

export const clearToken = () => {
  localStorage.removeItem("token");
};

export const login = async (credentials) => {
  try {
    const response = await instance.post("/api/user/login", credentials);
    const { success, message, token } = response.data;

    if (success) {
      if (token) {
        saveToken(token);
        toast.success("Logged in successfully");
        return token;
      }
      if (message) {
        toast.info(message);
        return false;
      }
    } else {
      toast.error(message || "Login failed");
      return false;
    }
  } catch (error) {
    console.error(error.message);
    toast.error("Login Failed");
    return false;
  }
};


export const register = async (credentials) => {
  try {
    const { data } = await instance.post("/api/user/register", credentials);
    if (data.success) {
      toast.success(data.message);
      return data.success;
    } else {
      toast.error(data.message);
      return data.success;
    }
  } catch (error) {
    console.log(error.message);
    toast.error("Registration Failed");
  }
};

export const logout = async () => {
  const token = getToken();
  if (!token) {
    return null;
  }
  try {
    const { data } = await instance.post("/api/user/logout");
    if (data.success) {
      clearToken();
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error.message);
    toast.error("Failed to log out");
  }
};

export const verifyEmail = async (token) => {
  try {
    const { data } = await instance.get(`/api/user/verify/${token}`);
    if (data.success) {
      saveToken(data.token);
      toast.success(data.message);
      return data.success;
    } else {
      toast.error(data.message);
      return data.success;
    }
  } catch (error) {
    console.log(error.message);
    toast.error("Failed to verify Email");
  }
};

export const resendVerification = async (email) => {
  try {
    const { data } = await instance.post("/api/user/resend-verification", {
      email,
    });
    if (data.success) {
      toast.success(data.message);
      return data.success;
    } else {
      toast.error(data.message);
      return data.success;
    }
  } catch (error) {
    console.error(error.message);
    toast.error("Failed to resend verification email");
  }
};

export const requestPasswordReset = async (email) => {
  try {
    const { data } = await instance.post("/api/user/request-reset", { email });
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
    return data.success;
  } catch (error) {
    console.error(error.message);
    toast.error("Failed to request password reset");
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const { data } = await instance.post(`/api/user/reset/${token}`, {
      newPassword,
    });
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
    return data.success;
  } catch (error) {
    console.error(error.message);
    toast.error("Failed to reset password");
  }
};

export const getUser = async () => {
  try {
    const { data } = await instance.get("/api/user/data");
    if (data.success) {
      return data.user;
    } else {
      toast.error(data.message);
      return null;
    }
  } catch (error) {
    console.error(error.message);
    toast.error("Failed to fetch user data");
  }
};

export const getUserCount = async () => {
  try {
    const { data } = await instance.get("/api/user/count");
    return data;
  } catch (error) {
    console.error("Error fetching user count: ", error.message);
  }
};
