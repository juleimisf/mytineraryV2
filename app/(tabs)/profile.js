import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../src/slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const router = useRouter();

  // 📌 Obtener datos del usuario desde Redux
  const user = useSelector((state) => state.auth.user);

  // 📌 Imagen por defecto si el usuario no tiene foto
  const defaultImage = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
  
  // 📌 Función para cerrar sesión
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token"); // Elimina token
    dispatch(logout()); // Limpia Redux
    router.replace("/auth/LoginScreen"); // Redirige al Login
  };

  return (
    <View style={styles.container}>
      {/* Icono de usuario */}
      <Ionicons name="person-circle" size={100} color="#007AFF" />

      {/* Imagen de perfil */}
      <Image source={{ uri: user?.image || defaultImage }} style={styles.profileImage} />

      {/* Información del usuario */}
      <Text style={styles.name}>{user?.first_name} {user?.last_name}</Text>
      <Text style={styles.email}>{user?.email}</Text>
      {user?.country && <Text style={styles.country}>🌍 {user.country}</Text>}

      {/* Botón de Cerrar Sesión */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

// 📌 Estilos para diseño moderno y responsivo
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center", 
    backgroundColor: "#F5F5F5", 
    padding: 20 
  },
  profileImage: { 
    width: 120, 
    height: 120, 
    borderRadius: 60, 
    marginVertical: 10 
  },
  name: { 
    fontSize: 22, 
    fontWeight: "bold", 
    color: "#333" 
  },
  email: { 
    fontSize: 18, 
    color: "#555", 
    marginBottom: 5 
  },
  country: { 
    fontSize: 16, 
    color: "#777", 
    marginBottom: 20 
  },
  logoutButton: { 
    backgroundColor: "#FF3B30", 
    padding: 12, 
    borderRadius: 8, 
    marginTop: 20, 
    width: "80%", 
    alignItems: "center" 
  },
  logoutText: { 
    color: "#FFF", 
    fontSize: 16, 
    fontWeight: "bold" 
  }
});

