import { StyleSheet, Text, View } from "react-native";
import { BalanceCard } from "@/components/cards/BalanceCard";
import { LogoutCard } from "@/components/cards/LogoutCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { TransferCard } from "@/components/cards/TransferCard";
import RefreshableLayout from "@/components/layout/RefreshableLayout";

export default function HomeScreen() {
  return (
    <RefreshableLayout onRefresh={() => {}}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.subtitle}>Scan UPI/PIX/IBAN and pay</Text>
        <View style={styles.content}>
          <BalanceCard />
          <TransferCard />
        </View>
      </SafeAreaView>
    </RefreshableLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 85,
    paddingTop: 10,
  },
  heroImage: {
    width: "100%",
    height: 300,
  },
  content: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontFamily: "Inter_700Bold",
    marginBottom: 10,
    color: "#1C1C1E",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    color: "#8E8E93",
    lineHeight: 24,
    alignSelf: "center",
  },
});
