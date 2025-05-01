import {  Tabs } from 'expo-router';
import { Platform, StyleSheet, View } from 'react-native';
import { Chrome as Home, QrCode, Settings } from 'lucide-react-native';
import { BlurView } from 'expo-blur';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () =>
          Platform.OS === 'ios' ? (
            <BlurView intensity={30} style={StyleSheet.absoluteFill} />
          ) : (
            <View style={[StyleSheet.absoluteFill, styles.androidTabBar]} />
          ),
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarLabelStyle: styles.tabBarLabel,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color, size }) => <QrCode size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 85,
    paddingBottom: 20,
    borderTopWidth: Platform.OS === 'ios' ? 0.2 : 1,
    borderTopColor: Platform.OS === 'ios' ? 'rgba(0, 0, 0, 0.2)' : '#E5E5EA',
  },
  androidTabBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  tabBarLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
  },
});