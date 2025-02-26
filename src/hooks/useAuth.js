import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useAuth() {
  const { user, token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      setLoading(false);
    };

    checkAuth();
  }, []);

  return { isAuthenticated: !!token, loading };
}
