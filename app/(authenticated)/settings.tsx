import { StyleSheet, Text, View } from "react-native";
import { LogoutCard } from "@/components/cards/LogoutCard";
import { SafeAreaView } from "react-native-safe-area-context";
import RefreshableLayout from "@/components/layout/RefreshableLayout";

export default function ConfigScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <RefreshableLayout onRefresh={() => {}}>
        <Text>Generate QR</Text>
        <LogoutCard />
      </RefreshableLayout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 85,
  }
});
