import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { User, Building, LogOut, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = () => {
    console.log('Logging out...');
    // Add logout logic here
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color="#1f2937" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Profil</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.settingsContainer}>
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => router.push('/account-settings')}
          >
            <View style={styles.settingLeft}>
              <User size={24} color="#1f2937" />
              <Text style={styles.settingText}>Pengaturan Akun</Text>
            </View>
            <ChevronRight size={20} color="#6b7280" />
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => router.push('/business-settings')}
          >
            <View style={styles.settingLeft}>
              <Building size={24} color="#1f2937" />
              <Text style={styles.settingText}>Pengaturan Bisnis</Text>
            </View>
            <ChevronRight size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>

        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutItem} onPress={handleLogout}>
            <View style={styles.settingLeft}>
              <LogOut size={24} color="#dc2626" />
              <Text style={styles.logoutText}>Keluar</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.versionText}>Version 3.0</Text>
          <Text style={styles.copyrightText}>© 2025 Baskit. All rights reserved.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    gap: 16,
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    marginRight: 48, // Compensate for back button width to center title
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  settingsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#f3f4f6',
    marginLeft: 64, // Align with text
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  settingText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#1f2937',
  },
  logoutContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 40,
    overflow: 'hidden',
  },
  logoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#dc2626',
  },
  footer: {
    alignItems: 'center',
    marginTop: 'auto',
    paddingBottom: 20,
  },
  versionText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#6b7280',
    marginBottom: 8,
  },
  copyrightText: {
    fontSize: 14,
    color: '#9ca3af',
  },
});