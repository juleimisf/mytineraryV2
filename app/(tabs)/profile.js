import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../src/slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);

  const [loading, setLoading] = useState(true);

  const defaultImage = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  useEffect(() => {
    // Simula la carga de datos
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      dispatch(logout());
      router.replace("/auth/LoginScreen");
    } catch (error) {
      Alert.alert("Error", "No se pudo cerrar sesión, intenta de nuevo.");
    }
  };


  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!user || !user.email) {
    return (
      <View >
           <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
      </View>
    );
  }

  return (
    <Animated.View entering={FadeIn.duration(500)} style={styles.container}>
      {/* Icono de perfil */}
      <Ionicons name="person-circle-outline" size={80} color="#007AFF" />

      {/* Imagen de perfil */}
      <Image
        source={{ uri: user.image || "https://via.placeholder.com/150" }}
        style={styles.profileImage}
      />

      {/* Información del usuario */}
      <Text style={styles.name}>{`${user.first_name} ${user.last_name}`}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.country}>🌍 {user.country}</Text>

      {/* Botón de Cerrar Sesión */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 18,
    color: "#666",
  },
  country: {
    fontSize: 18,
    color: "#007AFF",
    marginTop: 5,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#FF3B30",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  logoutText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

