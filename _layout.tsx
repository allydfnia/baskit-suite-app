import { Tabs } from 'expo-router';
import { Monitor, Package, Receipt, Users } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarActiveTintColor: '#ea580c',
        tabBarInactiveTintColor: '#6b7280',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginBottom: 2,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dasbor',
          tabBarIcon: ({ size, color, focused }) => (
            <Monitor 
              size={size} 
              color={color} 
              fill={focused ? color : 'transparent'}
              strokeWidth={focused ? 1.5 : 2}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: 'Produk',
          tabBarIcon: ({ size, color, focused }) => (
            <Package 
              size={size} 
              color={color} 
              fill={focused ? color : 'transparent'}
              strokeWidth={focused ? 1.5 : 2}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Transaksi',
          tabBarIcon: ({ size, color, focused }) => (
            <Receipt 
              size={size} 
              color={color} 
              fill={focused ? color : 'transparent'}
              strokeWidth={focused ? 1.5 : 2}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="receivables"
        options={{
          title: 'Pelanggan',
          tabBarIcon: ({ size, color, focused }) => (
            <Users 
              size={size} 
              color={color} 
              fill={focused ? color : 'transparent'}
              strokeWidth={focused ? 1.5 : 2}
            />
          ),
        }}
      />
    </Tabs>
  );
}