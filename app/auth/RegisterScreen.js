import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import * as z from "zod";
import { registerUser } from "../../src/api/authApi"
import { LOGIN_STRINGS } from "../../src/components/utils/strings";

const registerSchema = z.object({
  first_name: z.string().min(3, "Mínimo 3 caracteres").max(12, "Máximo 12 caracteres"),
  last_name: z.string().min(3, "Mínimo 3 caracteres").max(16, "Máximo 16 caracteres"),
  email: z.string().email("Correo inválido").min(10, "Mínimo 10 caracteres"),
  password: z.string().min(8, "Mínimo 8 caracteres").max(16, "Máximo 16 caracteres"),
  country: z.string().min(3, "Mínimo 3 caracteres").max(20, "Máximo 20 caracteres")
});

export default function RegisterScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);

    const cleanData = {
      first_name: data.first_name.trim(),
      last_name: data.last_name.trim(),
      email: data.email.trim(),
      password: data.password.trim(),
      country: data.country.trim(),
      description: data.description?.trim() || undefined,
      image: data.image?.trim() || undefined,
    };

    try {

      console.log("📌 Intentando registrar usuario:", data);

      const response = await registerUser(cleanData);

      if (response.status === 201) {
        Alert.alert("SUCCESS", LOGIN_STRINGS.SUCCESS_REGISTER);
        router.replace("/auth/LoginScreen");
      } else {
        Alert.alert("Error", response.data.message || LOGIN_STRINGS.ERROR_REGISTRATION);
      }
    } catch (error) {
      console.error("Error register user:", error.response?.data || error.message);
      Alert.alert("Error", error.response?.data?.message || LOGIN_STRINGS.ERROR_SERVER);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <Text>Name:</Text>
      <Controller
        control={control}
        name="first_name"
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} placeholder="Name" value={value} onChangeText={onChange} />
        )}
      />
      {errors.first_name && <Text style={styles.error}>{errors.first_name.message}</Text>}

      <Text>Lasname:</Text>
      <Controller
        control={control}
        name="last_name"
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} placeholder="Lastname" value={value} onChangeText={onChange} />
        )}
      />
      {errors.last_name && <Text style={styles.error}>{errors.last_name.message}</Text>}

      <Text>Email:</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" autoCapitalize="none" value={value} onChangeText={onChange} />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Text>Password:</Text>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} placeholder="Password" secureTextEntry value={value} onChangeText={onChange} />
        )}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      <Text>Country:</Text>
      <Controller
        control={control}
        name="country"
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} placeholder="Country" value={value} onChangeText={onChange} />
        )}
      />
      {errors.country && <Text style={styles.error}>{errors.country.message}</Text>}
      
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <Button title="Register" onPress={handleSubmit(onSubmit)} />
      )}

      <Text style={styles.link} onPress={() => router.replace("/auth/LoginScreen")}>
      {LOGIN_STRINGS.ALREADY_ACCOUNT}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", backgroundColor: "#F5F5F5" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 12, marginBottom: 10, borderRadius: 8, backgroundColor: "#FFF" },
  error: { color: "red", marginBottom: 10 },
  link: { color: "blue", marginTop: 15, textAlign: "center", fontSize: 16 },
});

