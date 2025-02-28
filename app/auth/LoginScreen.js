import React, { useState, useEffect } from "react";
import {
  View, Text, TextInput, TouchableOpacity, Button,
  StyleSheet, ActivityIndicator, KeyboardAvoidingView,
  Platform, ScrollView, TouchableWithoutFeedback, Keyboard, Alert
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { setUser } from "../../src/slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import * as z from "zod";
import Icon from "react-native-vector-icons/FontAwesome";
import { LOGIN_STRINGS } from "../../src/components/utils/strings";
import { loginUser } from "../../src/api/authApi"

const loginSchema = z.object({
  email: z.string().email("Correo inválido").min(10, "Mínimo 10 caracteres"),
  password: z.string().min(8, "Mínimo 8 caracteres").max(16, "Máximo 16 caracteres"),
});

export default function LoginScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data) => {
    setLoading(true);
    try {
  
      const response = await loginUser(data.email, data.password);

      if (response.status === 200) {
        const { token, ...userData } = response.data;
        await AsyncStorage.setItem("token", token);
        dispatch(setUser(userData));
        router.replace("(tabs)");
    } else {
        Alert.alert("Error", response.data.message || LOGIN_STRINGS.ERROR_CREDENTIALS);
      }
    } catch (error) {
      console.error("Error login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.container}>
            <Icon name="user-circle" size={80} color="#007AFF" style={styles.icon} />
            <Text style={styles.title}>Iniciar Sesión</Text>
            <Text>{LOGIN_STRINGS.EMAIL}:</Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder={LOGIN_STRINGS.EMAIL_ADDRESS}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
            <Text>{LOGIN_STRINGS.PASSWORD}:</Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder= {LOGIN_STRINGS.PASSWORD}
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
            {loading ? (
              <ActivityIndicator size="large" color="#007AFF" />
            ) : (
              <TouchableOpacity style={styles.button} onPress={handleSubmit(handleLogin)}>
                <Text style={styles.buttonText}>{LOGIN_STRINGS.LOGIN}</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={() => router.push("/auth/RegisterScreen")}>
              <Text style={styles.link}>{LOGIN_STRINGS.NOTT_ACCONT}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1, padding: 20, justifyContent: "center", alignItems: "center", backgroundColor: "#F5F5F5", paddingTop : 80
  },
  icon: { marginBottom: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { width: "100%", borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 5 },
  error: { color: "red", marginBottom: 10 },
  button: { backgroundColor: "#007AFF", padding: 12, borderRadius: 5, marginTop: 10, width: "100%", alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16 },
  link: { color: "#007AFF", marginTop: 20, fontSize: 16 },
});