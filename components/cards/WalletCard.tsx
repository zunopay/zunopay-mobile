import { useFetchBalance } from "@/hooks/useFetchBalance";
import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient'; // Make sure to install expo-linear-gradient
import { FontAwesome } from '@expo/vector-icons';
import { usePathname, useRouter } from "expo-router";
import { RoutePath } from "@/enums/RoutePath";
import { ArrowDown, PiggyBankIcon, Plus, SendHorizonal } from "lucide-react-native";
import ZUNOPAY_SHORT_LOGO from '../../assets/images/logo.png';

export function WalletCard() {
  const { balance } = useFetchBalance();
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#1e3c72', '#2a5298']}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.container}
    >
      <View style={styles.row}>
        <Text style={styles.profile} onPress={() => router.push(RoutePath.Settings)}></Text>
        <Image
        source={ZUNOPAY_SHORT_LOGO}
        style={styles.logo}
      />
      </View>
      <Text style={styles.balance}>${balance ?? '0.00'}</Text>
      <View style={styles.bottomBar}>
        <View style={styles.actionWrapper}>
            <Pressable onPress={() => console.log('pressed')} style={styles.actionItem}>
                <ArrowDown color='black'/>
            </Pressable>
            <Text style={styles.text}>Receive</Text>
        </View>

        <View style={styles.actionWrapper}>
            <Pressable onPress={() => console.log('pressed')} style={styles.actionItem}>
                <PiggyBankIcon color='black'/>
            </Pressable>
            <Text style={styles.text}>To Bank</Text>
        </View>

        <View style={styles.actionWrapper}>
            <Pressable onPress={() => console.log('pressed')} style={styles.actionItem}>
                <PiggyBankIcon color='black'/>
            </Pressable>
            <Text style={styles.text}>Change</Text>
        </View>

        <View style={styles.actionWrapper}>
            <Pressable onPress={() => console.log('pressed')} style={styles.actionItem}>
                <SendHorizonal color='black'/>
            </Pressable>
            <Text style={styles.text}>Send</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    borderRadius: 16,
    padding: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  profile: {
    display: 'flex',
    backgroundColor: 'blue',
    width: 30,
    height: 30,
    borderRadius: 20,
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  balance: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#fff',
  },
  bottomBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionItem: {
    backgroundColor: 'white',
    width: 35,
    height: 35,
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap:5,
    width: 50
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode:'contain',
  },
  text: { color: 'white' }
});
