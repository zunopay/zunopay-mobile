import React from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert } from "react-native";
import { useAsyncStorage } from "@/hooks/useAsyncStorage";
import { ACCESS_TOKEN_KEY } from "@/constants/general";
import { Controller, useForm } from "react-hook-form";
import { login, LoginFormData } from "@/api/auth/query";
import { useRouter } from "expo-router";


export default function LoginScreen() {
  const [, setAccessToken] = useAsyncStorage<string>(ACCESS_TOKEN_KEY, "");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const router = useRouter();
  const handleLogin = async (data: LoginFormData) => {
    try {
      const { data: authorization, errorMessage } = await login(data);
      if (!authorization || errorMessage) {
        // Put toaster message
        return;
      }
      await setAccessToken(authorization.accessToken);
      Alert.alert("Success", "Logged in!");
      router.push("/(tabs)")
    } catch (error) {
      Alert.alert("Error", "Login failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>

      <Controller
        control={control}
        name="usernameOrEmail"
        rules={{ required: "Email or username is required" }}
        render={({ field: { onChange } }) => (
          <>
            <TextInput
              style={styles.input}
              onChangeText={onChange}
              autoCapitalize="none"
              placeholder="email or username"
            />
            {errors.usernameOrEmail && (
              <Text style={styles.error}>{errors.usernameOrEmail.message}</Text>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="password"
        rules={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        }}
        render={({ field: { onChange } }) => (
          <>
            <TextInput
              style={styles.input}
              onChangeText={onChange}
              secureTextEntry
              placeholder="********"
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password.message}</Text>
            )}
          </>
        )}
      />

      <Button title="Login" onPress={handleSubmit(handleLogin)} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 6,
    marginBottom: 12,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
    marginTop: -8,
  },
});
