import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useAsyncStorage } from "@/hooks/useAsyncStorage";
import { RoutePath } from "@/enums/RoutePath";
import { useRouter } from "expo-router";
import { verifyEmail } from "@/api/user/query";
import { useLoginWithEmail, usePrivy } from "@privy-io/expo";
import { useAuth } from "@/hooks/useAuth";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const { email } = useAuth();

  const router = useRouter();
  const { isReady } = usePrivy();
  const { sendCode, loginWithCode } = useLoginWithEmail();
  const [currentTime, setCodeSendTime] = useAsyncStorage(
    "VERIFY_CODE_SENT",
    new Date()
  );

  const FIVE_MINUTES_MS = 5 * 60 * 1000;
  const isWithinFiveMinutes =
    new Date().getTime() - currentTime.getTime() <= FIVE_MINUTES_MS;

  useEffect(() => {
    const processOtp = async () => {
      if (isReady && isWithinFiveMinutes && email) {
        try {
          await sendCode({ email });
          await setCodeSendTime(new Date());
        } catch (e) {
          console.log(e);
        }
      }
    };
    processOtp();
  }, [isReady, email]);

  const onSubmit = async () => {
    if (!otp || otp.length < 4) {
      Alert.alert("Error", "Please enter a valid OTP.");
      return;
    }

    try {
      const user = await loginWithCode({ code: otp });
      if(user){
        const { errorMessage } = await verifyEmail();

        if (errorMessage) {
          Alert.alert(errorMessage || "Invalid OTP");
        }
  
        router.push(RoutePath.Home);
      }
    } catch (err: any) {
      console.error("Verification Error", err);
      Alert.alert("Error", "An error occurred during verification.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Verify Your Email</Text>
      <Text style={styles.instructions}>Enter the OTP sent to {email}</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        keyboardType="numeric"
        value={otp}
        onChangeText={setOtp}
      />

      <Button title="Verify Email" onPress={onSubmit} />
    </View>
  );
};

export default VerifyEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
  instructions: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 14,
  },
  input: {
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginVertical: 8,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: -4,
    marginBottom: 8,
  },
});
