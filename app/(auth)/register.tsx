import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller, useWatch } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { useAsyncStorage } from "@/hooks/useAsyncStorage";
import { ACCESS_TOKEN_KEY } from "@/constants/general";
import { register, RegisterFormData } from "@/api/auth/query";
import { RoutePath } from "@/enums/RoutePath";
import { useRouter } from "expo-router";

const RegisterScreen = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>();
  setValue('role', 'Merchant')

  const router = useRouter();
  const [, setAccessToken] = useAsyncStorage<string>(ACCESS_TOKEN_KEY, "");

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const { data: authorization, errorMessage } = await register(data);
      if (!authorization || errorMessage) {
        // Put toaster message
        return;
      }
      await setAccessToken(authorization.accessToken);
      router.replace(RoutePath.Verify_Email as any);
    } catch (err: any) {
      console.log("Registration Error", err.response?.data?.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register</Text>

      <Controller
        control={control}
        name="username"
        rules={{ required: "Username is required" }}
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Username"
              onChangeText={onChange}
              value={value}
            />
            {errors.username && (
              <Text style={styles.error}>{errors.username.message}</Text>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="email"
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email format",
          },
        }}
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && (
              <Text style={styles.error}>{errors.email.message}</Text>
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
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={onChange}
              value={value}
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password.message}</Text>
            )}
          </>
        )}
      />

      <Text style={styles.label}>Region</Text>
      <Controller
        control={control}
        name="region"
        defaultValue="EU"
        rules={{ required: "Region is required" }}
        render={({ field: { onChange, value } }) => (
          <Picker
            selectedValue={value}
            onValueChange={onChange}
            style={styles.picker}
          >
            <Picker.Item label="Europe" value="EU" />
            <Picker.Item label="India" value="IN" />
            <Picker.Item label="Brazil" value="BR" />
            <Picker.Item label="Singapore" value="SG" />
          </Picker>
        )}
      />

      <Controller
        control={control}
        name="referralCode"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Referral Code"
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Button title="Register" onPress={handleSubmit(onSubmit)} />
      <Text onPress={() => router.push(RoutePath.Login as any)}>Already have a account ? Login !</Text>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  header: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    marginTop: 10,
    fontWeight: "bold",
  },

  picker: {
    height: 55,
    borderColor: "#ccc",
    borderWidth: 1,
    marginVertical: 8,
    paddingHorizontal: 5,
    borderRadius: 6,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  error: {
    color: "red",
    marginBottom: 4,
    marginTop: -4,
    fontSize: 12,
  },
});
