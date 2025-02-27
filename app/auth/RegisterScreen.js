import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "expo-router";
import * as z from "zod";

// 📌 1️⃣ Definir esquema de validación con Zod
const registerSchema = z.object({
  first_name: z.string().min(3, "Mínimo 3 caracteres").max(12, "Máximo 12 caracteres"),
  last_name: z.string().min(3, "Mínimo 3 caracteres").max(16, "Máximo 16 caracteres"),
  email: z.string().email("Correo inválido").min(10, "Mínimo 10 caracteres"),
  password: z.string().min(8, "Mínimo 8 caracteres").max(16, "Máximo 16 caracteres"),
  country: z.string().min(3, "Mínimo 3 caracteres").max(20, "Máximo 20 caracteres"),
  description: z.string().min(30, "Mínimo 30 caracteres").max(500, "Máximo 500 caracteres").optional(),
  image: z.string().url("Debe ser una URL válida").optional(),
});

export default function RegisterScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);


const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem("userToken", token);
    console.log("✅ Token guardado con éxito");
  } catch (error) {
    console.error("❌ Error guardando el token:", error);
  }
};

  // 📌 2️⃣ Inicializar React Hook Form con validaciones de Zod
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  // 📌 3️⃣ Función para enviar los datos a la API
  const onSubmit = async (data) => {
    setLoading(true);

    // Limpieza de datos
    const cleanData = {
      first_name: data.first_name.trim(),
      last_name: data.last_name.trim(),
      email: data.email.trim(),
      password: data.password.trim(),
      country: data.country.trim(),
      description: data.description?.trim() || undefined,
      image: data.image?.trim() || undefined,
    };

    console.log("📌 Enviando datos:", JSON.stringify(cleanData, null, 2));

    try {
      const response = await axios.post(
        "https://mytinerary-server.onrender.com/api/auth/register",
        cleanData,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("✅ Respuesta API:", response.data);

      if (response.data.status === 201) {
        Alert.alert("Éxito", "Usuario registrado correctamente");
        router.replace("/auth/LoginScreen"); // 📌 Redirige al login después del registro exitoso
      } else {
        Alert.alert("Error", response.data.message || "Hubo un problema con el registro");
      }
    } catch (error) {
      console.error("❌ Error al registrar usuario:", error.response?.data || error.message);
      Alert.alert("Error", error.response?.data?.message || "Error en el servidor. Intenta más tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      {/* 📌 4️⃣ Campos del Formulario */}
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

      <Text>Descripción (opcional):</Text>
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} placeholder="Descripción" value={value} onChangeText={onChange} multiline numberOfLines={3} />
        )}
      />

      <Text>Imagen de perfil (URL opcional):</Text>
      <Controller
        control={control}
        name="image"
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} placeholder="URL de imagen" value={value} onChangeText={onChange} />
        )}
      />

      {/* 📌 5️⃣ Botón de Registro */}
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <Button title="Registrarse" onPress={handleSubmit(onSubmit)} />
      )}

      <Text style={styles.link} onPress={() => router.replace("/auth/LoginScreen")}>
        ¿Ya tienes cuenta? Inicia sesión
      </Text>
    </View>
  );
}

// 📌 6️⃣ Estilos
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", backgroundColor: "#F5F5F5" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 12, marginBottom: 10, borderRadius: 8, backgroundColor: "#FFF" },
  error: { color: "red", marginBottom: 10 },
  link: { color: "blue", marginTop: 15, textAlign: "center", fontSize: 16 },
});

