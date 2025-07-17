import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Bell, User } from 'lucide-react-native';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showNotifications?: boolean;
  showProfile?: boolean;
  notificationCount?: number;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
}

export default function Header({
  title,
  subtitle,
  showNotifications = true,
  showProfile = true,
  notificationCount = 0,
  onNotificationPress,
  onProfilePress,
}: HeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>

        <View style={styles.actionsContainer}>
          {showNotifications && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={onNotificationPress}
              activeOpacity={0.7}
            >
              <Bell size={18} color="#6b7280" strokeWidth={2} />
              {notificationCount > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationCount}>
                    {notificationCount > 99 ? '99+' : notificationCount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          )}

          {showProfile && (
            <TouchableOpacity
              style={styles.profileContainer}
              onPress={onProfilePress}
              activeOpacity={0.7}
            >
              <Image
                source={{
                  uri: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
                }}
                style={styles.profileImage}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingTop: 44,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    height: 60,
  },
  titleContainer: {
    flex: 1,
    marginRight: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    letterSpacing: -0.3,
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 13,
    color: '#6b7280',
    lineHeight: 16,
    marginTop: 1,
    fontWeight: '400',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionButton: {
    position: 'relative',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#ef4444',
    borderRadius: 7,
    minWidth: 14,
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  notificationCount: {
    fontSize: 8,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 10,
  },
  profileContainer: {
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    padding: 1,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
  },
});