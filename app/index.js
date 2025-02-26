import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Main() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");
      setIsAuthenticated(!!token); // Si hay token, está autenticado
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return null; // Evita el parpadeo mientras carga la autenticación
  }

  return <Redirect href={isAuthenticated ? "(tabs)" : "/auth/LoginScreen"} />;
}
