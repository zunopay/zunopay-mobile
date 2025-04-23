import { ACCESS_TOKEN_KEY } from "@/constants/general";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Button, StyleSheet, View } from "react-native";

export function LogoutCard () {
    const router = useRouter();

    const handleLogout = async() => {
      await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
      router.replace('/login')
    }

    return (
        <View style={styles.content}>
        <Button onPress={handleLogout} title='Logout' />
      </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    heroImage: {
      width: '100%',
      height: 300,
    },
    content: {
      padding: 20,
    },
    title: {
      fontSize: 32,
      fontFamily: 'Inter_700Bold',
      marginBottom: 10,
      color: '#1C1C1E',
    },
    subtitle: {
      fontSize: 16,
      fontFamily: 'Inter_400Regular',
      color: '#8E8E93',
      lineHeight: 24,
    },
  });