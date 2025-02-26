/*import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "expo-router";

// Esquema de validación con Zod
const registerSchema = z.object({
    first_name: z.string().min(3, "Mínimo 3 caracteres").max(12, "Máximo 12 caracteres"),
    last_name: z.string().min(3, "Mínimo 3 caracteres").max(16, "Máximo 16 caracteres"),
    email: z.string().email("Correo inválido").min(10, "Mínimo 10 caracteres"),
    password: z.string().min(8, "Mínimo 8 caracteres").max(16, "Máximo 16 caracteres"),
    country: z.string().min(3, "Mínimo 3 caracteres").max(20, "Máximo 20 caracteres"),
});

export default function RegisterScreen({ navigation }) {
    const router = useRouter(); // 🔹 Usa useRouter en lugar de navigation

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = (data) => {
        console.log("📌 Datos del registro:", data);
        // Aquí puedes hacer la llamada a la API para registrar al usuario
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>

            <Text>Nombre:</Text>
            <Controller
                control={control}
                name="first_name"
                render={({ field: { onChange, value } }) => (
                    <TextInput style={styles.input} placeholder="Nombre" value={value} onChangeText={onChange} />
                )}
            />
            {errors.first_name && <Text style={styles.error}>{errors.first_name.message}</Text>}

            <Text>Apellido:</Text>
            <Controller
                control={control}
                name="last_name"
                render={({ field: { onChange, value } }) => (
                    <TextInput style={styles.input} placeholder="Apellido" value={value} onChangeText={onChange} />
                )}
            />
            {errors.last_name && <Text style={styles.error}>{errors.last_name.message}</Text>}

            <Text>Email:</Text>
            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                    <TextInput style={styles.input} placeholder="Correo electrónico" keyboardType="email-address" autoCapitalize="none" value={value} onChangeText={onChange} />
                )}
            />
            {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

            <Text>Contraseña:</Text>
            <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                    <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry value={value} onChangeText={onChange} />
                )}
            />
            {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

            <Text>País:</Text>
            <Controller
                control={control}
                name="country"
                render={({ field: { onChange, value } }) => (
                    <TextInput style={styles.input} placeholder="País" value={value} onChangeText={onChange} />
                )}
            />
            {errors.country && <Text style={styles.error}>{errors.country.message}</Text>}

            <Button title="Registrarse" onPress={handleSubmit(onSubmit)} />
            <Text style={styles.link} onPress={() => router.push("/auth/LoginScreen")}>
            ¿Ya tienes cuenta? Inicia sesión
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: "center", backgroundColor: "#F5F5F5" },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
    input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 5 },
    error: { color: "red", marginBottom: 10 },
    link: { color: "blue", marginTop: 15, textAlign: "center" },
});*/

import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "expo-router";
import * as z from "zod";

// 📌 Esquema de validación con Zod

const registerSchema = z.object({
    first_name: z.string().min(3, "Mínimo 3 caracteres").max(12, "Máximo 12 caracteres"),
    last_name: z.string().min(3, "Mínimo 3 caracteres").max(16, "Máximo 16 caracteres"),
    email: z.string().email("Correo inválido").min(10, "Mínimo 10 caracteres"),
    password: z.string().min(8, "Mínimo 8 caracteres").max(16, "Máximo 16 caracteres"),
    country: z.string().min(3, "Mínimo 3 caracteres").max(20, "Máximo 20 caracteres"),
});

export default function RegisterScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("https://mytinerary-server.onrender.com/api/auth/register", data);

      if (response.data.success) {
        Alert.alert("Éxito", "Usuario registrado correctamente");
        router.replace("/auth/LoginScreen"); // 🔹 Redirigir al login tras el registro
      } else {
        Alert.alert("Error", response.data.message || "Hubo un problema con el registro");
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      Alert.alert("Error", error.response?.data?.message || "Error en el servidor. Intenta más tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      {/* Nombre */}
      <Text>Nombre:</Text>
      <Controller
        control={control}
        name="first_name"
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} placeholder="Nombre" value={value} onChangeText={onChange} />
        )}
      />
      {errors.first_name && <Text style={styles.error}>{errors.first_name.message}</Text>}

      {/* Apellido */}
      <Text>Apellido:</Text>
      <Controller
        control={control}
        name="last_name"
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} placeholder="Apellido" value={value} onChangeText={onChange} />
        )}
      />
      {errors.last_name && <Text style={styles.error}>{errors.last_name.message}</Text>}

      {/* Email */}
      <Text>Email:</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} placeholder="Correo electrónico" keyboardType="email-address" autoCapitalize="none" value={value} onChangeText={onChange} />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      {/* Contraseña */}
      <Text>Contraseña:</Text>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry value={value} onChangeText={onChange} />
        )}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      {/* País */}
      <Text>País:</Text>
      <Controller
        control={control}
        name="country"
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} placeholder="País" value={value} onChangeText={onChange} />
        )}
      />
      {errors.country && <Text style={styles.error}>{errors.country.message}</Text>}

      {/* Descripción (Opcional) */}
      <Text>Descripción:</Text>
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} placeholder="Descripción (opcional)" value={value} onChangeText={onChange} multiline numberOfLines={3} />
        )}
      />
      {errors.description && <Text style={styles.error}>{errors.description.message}</Text>}

      {/* Imagen (Opcional) */}
      <Text>Imagen de perfil (URL):</Text>
      <Controller
        control={control}
        name="image"
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} placeholder="URL de imagen (opcional)" value={value} onChangeText={onChange} />
        )}
      />
      {errors.image && <Text style={styles.error}>{errors.image.message}</Text>}

      {/* Botón de Registro */}
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <Button title="Registrarse" onPress={handleSubmit(onSubmit)} />
      )}

      {/* Link a Login */}
      <Text style={styles.link} onPress={() => router.replace("/auth/LoginScreen")}>
        ¿Ya tienes cuenta? Inicia sesión
      </Text>
    </View>
  );
}

// 📌 Estilos mejorados
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", backgroundColor: "#F5F5F5" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 12, marginBottom: 10, borderRadius: 8, backgroundColor: "#FFF" },
  error: { color: "red", marginBottom: 10 },
  link: { color: "blue", marginTop: 15, textAlign: "center", fontSize: 16 },
});

