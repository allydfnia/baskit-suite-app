import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import {
  Search,
  Filter,
  Package,
  ShoppingCart,
  Calendar,
  DollarSign,
  User,
  ChevronDown,
} from 'lucide-react-native';
import Header from '@/components/Header';
import { useRouter } from 'expo-router';

interface Order {
  id: string;
  type: 'sales' | 'purchase';
  orderNumber: string;
  customer: string;
  amount: string;
  date: string;
  status: 'pending' | 'completed' | 'cancelled' | 'processing';
  items: number;
}

const filterOptions = [
  { label: 'Semua Pesanan', value: 'all' },
  { label: 'Pesanan Penjualan', value: 'sales' },
  { label: 'Pesanan Pembelian', value: 'purchase' },
];

const statusOptions = [
  { label: 'Semua Status', value: 'all' },
  { label: 'Menunggu', value: 'pending' },
  { label: 'Diproses', value: 'processing' },
  { label: 'Selesai', value: 'completed' },
  { label: 'Dibatalkan', value: 'cancelled' },
];

export default function OrdersScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const orders: Order[] = [
    {
      id: '1',
      type: 'sales',
      orderNumber: 'SO-2025-001',
      customer: 'PT ABC Sejahtera',
      amount: 'Rp 184.050.000',
      date: '15 Jan 2025',
      status: 'completed',
      items: 15,
    },
    {
      id: '2',
      type: 'purchase',
      orderNumber: 'PO-2025-001',
      customer: 'CV XYZ Supplier',
      amount: 'Rp 129.375.000',
      date: '14 Jan 2025',
      status: 'processing',
      items: 8,
    },
    {
      id: '3',
      type: 'sales',
      orderNumber: 'SO-2025-002',
      customer: 'PT Tech Solutions',
      amount: 'Rp 47.300.000',
      date: '13 Jan 2025',
      status: 'pending',
      items: 5,
    },
    {
      id: '4',
      type: 'purchase',
      orderNumber: 'PO-2025-002',
      customer: 'PT Global Parts',
      amount: 'Rp 236.230.000',
      date: '12 Jan 2025',
      status: 'completed',
      items: 22,
    },
    {
      id: '5',
      type: 'sales',
      orderNumber: 'SO-2025-003',
      customer: 'PT Innovation Corp',
      amount: 'Rp 113.175.000',
      date: '11 Jan 2025',
      status: 'cancelled',
      items: 10,
    },
    {
      id: '6',
      type: 'purchase',
      orderNumber: 'PO-2025-003',
      customer: 'CV Premium Supplies',
      amount: 'Rp 80.295.000',
      date: '10 Jan 2025',
      status: 'processing',
      items: 6,
    },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || order.type === selectedFilter;
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    
    return matchesSearch && matchesFilter && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return { bg: '#dcfce7', text: '#16a34a' };
      case 'processing':
        return { bg: '#dbeafe', text: '#2563eb' };
      case 'pending':
        return { bg: '#fef3c7', text: '#d97706' };
      case 'cancelled':
        return { bg: '#fecaca', text: '#dc2626' };
      default:
        return { bg: '#f3f4f6', text: '#6b7280' };
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'sales' 
      ? { bg: '#dbeafe', text: '#1d4ed8' }
      : { bg: '#fef3c7', text: '#d97706' };
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'SELESAI';
      case 'processing':
        return 'DIPROSES';
      case 'pending':
        return 'MENUNGGU';
      case 'cancelled':
        return 'DIBATALKAN';
      default:
        return status.toUpperCase();
    }
  };

  const handleNotificationPress = () => {
    console.log('Notifikasi ditekan');
  };

  const handleProfilePress = () => {
    router.push('/profile');
  };

  const renderOrderCard = (order: Order) => {
    const statusColor = getStatusColor(order.status);
    const typeColor = getTypeColor(order.type);

    return (
      <TouchableOpacity key={order.id} style={styles.orderCard}>
        <View style={styles.orderHeader}>
          <View style={styles.orderInfo}>
            <View style={styles.orderTypeContainer}>
              <View style={[styles.orderTypeBadge, { backgroundColor: typeColor.bg }]}>
                <Text style={[styles.orderTypeText, { color: typeColor.text }]}>
                  {order.type === 'sales' ? 'PENJUALAN' : 'PEMBELIAN'}
                </Text>
              </View>
              <Text style={styles.orderNumber}>{order.orderNumber}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: statusColor.bg }]}>
              <Text style={[styles.statusText, { color: statusColor.text }]}>
                {getStatusText(order.status)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.orderDetails}>
          <View style={styles.detailRow}>
            <User size={16} color="#6b7280" />
            <Text style={styles.detailText}>{order.customer}</Text>
          </View>
          <View style={styles.detailRow}>
            <Calendar size={16} color="#6b7280" />
            <Text style={styles.detailText}>{order.date}</Text>
          </View>
          <View style={styles.detailRow}>
            <Package size={16} color="#6b7280" />
            <Text style={styles.detailText}>{order.items} item</Text>
          </View>
        </View>

        <View style={styles.orderFooter}>
          <View style={styles.amountContainer}>
            <DollarSign size={18} color="#1f2937" />
            <Text style={styles.orderAmount}>{order.amount}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Pesanan"
        subtitle="Kelola pesanan penjualan dan pembelian Anda"
        notificationCount={2}
        onNotificationPress={handleNotificationPress}
        onProfilePress={handleProfilePress}
      />

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#6b7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari pesanan atau pelanggan..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.filtersContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilterDropdown(!showFilterDropdown)}
        >
          <Filter size={16} color="#6b7280" />
          <Text style={styles.filterButtonText}>
            {filterOptions.find(f => f.value === selectedFilter)?.label}
          </Text>
          <ChevronDown size={16} color="#6b7280" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowStatusDropdown(!showStatusDropdown)}
        >
          <Text style={styles.filterButtonText}>
            {statusOptions.find(s => s.value === selectedStatus)?.label}
          </Text>
          <ChevronDown size={16} color="#6b7280" />
        </TouchableOpacity>
      </View>

      {showFilterDropdown && (
        <View style={styles.filterDropdown}>
          {filterOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={styles.filterOption}
              onPress={() => {
                setSelectedFilter(option.value);
                setShowFilterDropdown(false);
              }}
            >
              <Text style={styles.filterOptionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {showStatusDropdown && (
        <View style={styles.statusDropdown}>
          {statusOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={styles.filterOption}
              onPress={() => {
                setSelectedStatus(option.value);
                setShowStatusDropdown(false);
              }}
            >
              <Text style={styles.filterOptionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.ordersContainer}>
          <Text style={styles.sectionTitle}>
            {filteredOrders.length} Pesanan Ditemukan
          </Text>
          {filteredOrders.map(renderOrderCard)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  searchContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    gap: 12,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  filterDropdown: {
    position: 'absolute',
    top: 180,
    left: 20,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 1000,
  },
  statusDropdown: {
    position: 'absolute',
    top: 180,
    left: 140,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 1000,
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  filterOptionText: {
    fontSize: 14,
    color: '#374151',
  },
  scrollView: {
    flex: 1,
  },
  ordersContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  orderCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderHeader: {
    marginBottom: 12,
  },
  orderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  orderTypeContainer: {
    flex: 1,
  },
  orderTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  orderTypeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  orderDetails: {
    gap: 8,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#6b7280',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  orderAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
});