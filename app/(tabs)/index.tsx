import { Button, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACCESS_TOKEN_KEY } from '@/constants/general';
import { useAuth } from '@/hooks/useAuth';

export default function HomeScreen() {
  const { isAuthenticated, isLoading } = useAuth()
  return (
    <View style={styles.container}>
      <Image
        source="https://images.unsplash.com/photo-1613628413169-6018504ae295?q=80&w=2000&auto=format&fit=crop"
        style={styles.heroImage}
        contentFit="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title}>ZunoPay</Text>
        <Text>Authenticated : {isAuthenticated == true ? "true" : "false"}</Text>
        <Text style={styles.subtitle}>
          Scan and pay easily
        </Text>
        <Button onPress={async() => await AsyncStorage.removeItem(ACCESS_TOKEN_KEY)} title='Clean local' />
      </View>
    </View>
  );
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