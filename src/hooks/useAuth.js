import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { validateToken } from "../api/authApi"

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      setLoading(true);
      try {
        const userData = await validateToken();
        setUser(userData);
      } catch (error) {
        console.error("Error token", error.response?.data || error.message);
        await AsyncStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  return { user, loading };
}

