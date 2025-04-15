import { StyleSheet, Text, View, TouchableOpacity, Switch, Platform } from 'react-native';
import { useState } from 'react';
import { Bell, Camera, Moon, Share2 } from 'lucide-react-native';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const SettingItem = ({ icon, title, value, onValueChange, type = 'switch' }: any) => (
    <View style={styles.settingItem}>
      <View style={styles.settingLeft}>
        {icon}
        <Text style={styles.settingText}>{title}</Text>
      </View>
      {type === 'switch' ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: '#D1D1D6', true: '#34C759' }}
          thumbColor={Platform.OS === 'ios' ? '#fff' : value ? '#fff' : '#f4f3f4'}
        />
      ) : (
        <TouchableOpacity onPress={onValueChange}>
          <Text style={styles.buttonText}>Configure</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.settingsList}>
        <SettingItem
          icon={<Bell size={24} color="#007AFF" />}
          title="Notifications"
          value={notifications}
          onValueChange={setNotifications}
        />
        <SettingItem
          icon={<Moon size={24} color="#007AFF" />}
          title="Dark Mode"
          value={darkMode}
          onValueChange={setDarkMode}
        />
        <SettingItem
          icon={<Camera size={24} color="#007AFF" />}
          title="Camera Settings"
          type="button"
          onValueChange={() => {}}
        />
        <SettingItem
          icon={<Share2 size={24} color="#007AFF" />}
          title="Share App"
          type="button"
          onValueChange={() => {}}
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  title: {
    fontSize: 34,
    fontFamily: 'Inter_700Bold',
    marginBottom: 20,
    paddingHorizontal: 20,
    color: '#1C1C1E',
  },
  settingsList: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E5EA',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 17,
    marginLeft: 15,
    fontFamily: 'Inter_400Regular',
    color: '#1C1C1E',
  },
  buttonText: {
    color: '#007AFF',
    fontSize: 17,
    fontFamily: 'Inter_400Regular',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
  },
  version: {
    fontSize: 15,
    color: '#8E8E93',
    fontFamily: 'Inter_400Regular',
  },
});