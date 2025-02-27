import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL = "https://mytinerary-server.onrender.com/api/auth/token";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await axios.post(
          API_URL,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setUser(response.data.response); // Guardar los datos del usuario
        } else {
          await AsyncStorage.removeItem("token"); // Si el token no es válido, eliminarlo
        }
      } catch (error) {
        console.error("❌ Error al verificar el token:", error.response?.data || error.message);
        await AsyncStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  return { user, loading };
}

