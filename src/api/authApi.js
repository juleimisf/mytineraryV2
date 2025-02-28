import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOGIN_STRINGS } from "../components/utils/strings";

const API_URL = "https://mytinerary-server.onrender.com/api/auth";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error("Error login:", error.response?.data || error.message);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error register:", error.response?.data || error.message);
    throw error;
  }
};

export const validateToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error(LOGIN_STRINGS.ERRO_TOKEN);

    const response = await axios.post(`${API_URL}/token`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error validation token:", error.response?.data || error.message);
    throw error;
  }
};
