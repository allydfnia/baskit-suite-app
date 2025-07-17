import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {
  ShoppingCart,
  TrendingUp,
  Package,
  DollarSign,
  Receipt,
  Calendar,
  ChevronDown,
  User,
  FileText,
  Clock,
  TriangleAlert as AlertTriangle,
  ChevronRight,
  ArrowUp,
  ArrowDown,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Header from '@/components/Header';

interface BusinessMetric {
  label: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: any;
}

interface Order {
  id: string;
  type: 'sales' | 'purchase';
  customer: string;
  amount: string;
  date: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  customer: string;
  orderId: string;
  amount: string;
  dueDate: string;
  daysOverdue: number;
}

const filterOptions = [
  { label: 'Hari Ini', value: 'today' },
  { label: '7 Hari Terakhir', value: '7days' },
  { label: '30 Hari Terakhir', value: '30days' },
  { label: 'Bulan Ini', value: 'month' },
  { label: 'Minggu Ini', value: 'week' },
];

const orderTypeOptions = [
  { label: 'Semua', value: 'all' },
  { label: 'Penjualan', value: 'sales' },
  { label: 'Pembelian', value: 'purchase' },
];

export default function DashboardScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState('7days');
  const [selectedOrderType, setSelectedOrderType] = useState('all');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showOrderTypeDropdown, setShowOrderTypeDropdown] = useState(false);

  const businessMetrics: BusinessMetric[] = [
    {
      label: 'Pendapatan',
      value: 'Rp500jt',
      change: '11%',
      changeType: 'positive',
      icon: DollarSign,
    },
    {
      label: 'Sales Order',
      value: '120',
      change: '14%',
      changeType: 'positive',
      icon: ShoppingCart,
    },
    {
      label: 'Purchase Order',
      value: '67',
      change: '11%',
      changeType: 'negative',
      icon: Package,
    },
    {
      label: 'Total Piutang',
      value: 'Rp500jt',
      change: 'Lewat: Rp228jt',
      changeType: 'positive',
      icon: Receipt,
    },
  ];

  // Hanya pesanan dengan status pending atau processing
  const allOrders: Order[] = [
    {
      id: '1',
      type: 'sales',
      customer: 'CV XYZ Supplier',
      amount: 'Rp26.600.000',
      date: '14 Jun 2025',
      status: 'pending',
    },
    {
      id: '2',
      type: 'purchase',
      customer: 'PT Tech Solutions',
      amount: 'Rp26.600.000',
      date: '14 Jun 2025',
      status: 'pending',
    },
    {
      id: '3',
      type: 'sales',
      customer: 'PT Global Parts',
      amount: 'Rp26.600.000',
      date: '12 Jun 2025',
      status: 'processing',
    },
  ];

  // Filter pesanan berdasarkan tipe yang dipilih dan batasi hanya 3 teratas
  const filteredOrders = allOrders
    .filter(order => {
      if (selectedOrderType === 'all') return true;
      return order.type === selectedOrderType;
    })
    .slice(0, 3); // Batasi hanya 3 pesanan teratas

  const dueInvoices: Invoice[] = [
    {
      id: '1',
      invoiceNumber: 'INV-2025-001',
      customer: 'PT ABC Sejahtera',
      orderId: 'SO-001',
      amount: 'Rp36.225.000',
      dueDate: '20 Jun 2025',
      daysOverdue: 0,
    },
    {
      id: '2',
      invoiceNumber: 'INV-2025-002',
      customer: 'PT Tech Solutions',
      orderId: 'SO-002',
      amount: 'Rp36.225.000',
      dueDate: '30 Jun 2025',
      daysOverdue: 0,
    },
    {
      id: '3',
      invoiceNumber: 'INV-2025-003',
      customer: 'PT Pilo Distribusi',
      orderId: 'PO-002',
      amount: 'Rp36.225.000',
      dueDate: '30 Jun 2025',
      daysOverdue: 0,
    },
  ];

  const receivablesData = {
    overdue90plus: 'Rp47jt',
    overdue30to90: 'Rp123jt',
    overdue1to30: 'Rp184jt',
    notDue: 'Rp668jt',
  };

  const handleNotificationPress = () => {
    console.log('Notifikasi ditekan');
  };

  const handleProfilePress = () => {
    router.push('/profile');
  };

  const handleSeeAllOrders = () => {
    router.push('/orders');
  };

  const handleSeeAllBusinessMetrics = () => {
    // Navigate to a detailed business analytics page
    console.log('Navigating to detailed business metrics');
    // router.push('/analytics'); // You can implement this route later
  };

  const renderBusinessSummary = () => (
    <View style={styles.businessSummaryContainer}>
      <View style={styles.sectionHeaderWithAction}>
        <Text style={styles.sectionTitle}>Ringkasan Bisnis</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilterDropdown(!showFilterDropdown)}
        >
          <Text style={styles.filterButtonText}>
            {filterOptions.find(f => f.value === selectedFilter)?.label}
          </Text>
          <ChevronDown size={16} color="#6b7280" />
        </TouchableOpacity>
      </View>

      {showFilterDropdown && (
        <View style={styles.businessFilterDropdown}>
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

      <View style={styles.metricsGrid}>
        {businessMetrics.map((metric, index) => (
          <View key={index} style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <metric.icon size={16} color="#6b7280" />
              <Text style={styles.metricLabel}>{metric.label}</Text>
            </View>
            <Text style={styles.metricValue}>{metric.value}</Text>
            <View style={styles.metricChangeContainer}>
              {metric.changeType === 'positive' ? (
                <ArrowUp size={12} color="#16a34a" />
              ) : (
                <ArrowDown size={12} color="#dc2626" />
              )}
              <Text
                style={[
                  styles.metricChange,
                  { color: metric.changeType === 'positive' ? '#16a34a' : '#dc2626' },
                ]}
              >
                {metric.change}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderOrdersList = () => (
    <View style={styles.ordersContainer}>
      <View style={styles.sectionHeaderWithAction}>
        <Text style={styles.sectionTitle}>Daftar Pesanan</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowOrderTypeDropdown(!showOrderTypeDropdown)}
        >
          <Text style={styles.filterButtonText}>
            {orderTypeOptions.find(o => o.value === selectedOrderType)?.label}
          </Text>
          <ChevronDown size={16} color="#6b7280" />
        </TouchableOpacity>
      </View>

      {showOrderTypeDropdown && (
        <View style={styles.orderTypeDropdown}>
          {orderTypeOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={styles.filterOption}
              onPress={() => {
                setSelectedOrderType(option.value);
                setShowOrderTypeDropdown(false);
              }}
            >
              <Text style={styles.filterOptionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {filteredOrders.length > 0 ? (
        filteredOrders.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View style={styles.orderTypeContainer}>
                <View
                  style={[
                    styles.orderTypeBadge,
                    {
                      backgroundColor:
                        order.type === 'sales' ? '#dbeafe' : '#fef3c7',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.orderTypeText,
                      {
                        color: order.type === 'sales' ? '#1d4ed8' : '#d97706',
                      },
                    ]}
                  >
                    {order.type === 'sales' ? 'SALES ORDER' : 'PURCHASE ORDER'}
                  </Text>
                </View>
                <Text style={styles.orderAmount}>{order.amount}</Text>
              </View>
            </View>
            <Text style={styles.orderCustomer}>{order.customer}</Text>
            <View style={styles.orderFooter}>
              <Text style={styles.orderDate}>{order.date}</Text>
              <View
                style={[
                  styles.orderStatus,
                  {
                    backgroundColor:
                      order.status === 'processing'
                        ? '#dbeafe'
                        : '#fef3c7',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.orderStatusText,
                    {
                      color:
                        order.status === 'processing'
                          ? '#2563eb'
                          : '#d97706',
                    },
                  ]}
                >
                  {order.status === 'processing' ? 'DIKONFIRMASI' : 'MENUNGGU KONFIRMASI'}
                </Text>
              </View>
            </View>
          </View>
        ))
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            Tidak ada pesanan {selectedOrderType === 'all' ? '' : selectedOrderType === 'sales' ? 'penjualan' : 'pembelian'} yang sedang diproses
          </Text>
        </View>
      )}

      <TouchableOpacity style={styles.seeMoreLink} onPress={handleSeeAllOrders}>
        <Text style={styles.seeMoreText}>Lihat Selengkapnya</Text>
      </TouchableOpacity>
    </View>
  );

  const renderReceivablesDetail = () => (
    <View style={styles.receivablesContainer}>
      <Text style={styles.sectionTitle}>Detail Piutang</Text>
      <View style={styles.receivablesGrid}>
        <View style={styles.receivableCard}>
          <Text style={styles.receivableLabel}>Lewat 90+ Hari</Text>
          <Text style={[styles.receivableAmount, { color: '#991b1b' }]}>
            {receivablesData.overdue90plus}
          </Text>
        </View>
        <View style={styles.receivableCard}>
          <Text style={styles.receivableLabel}>Lewat 30-90 Hari</Text>
          <Text style={[styles.receivableAmount, { color: '#dc2626' }]}>
            {receivablesData.overdue30to90}
          </Text>
        </View>
        <View style={styles.receivableCard}>
          <Text style={styles.receivableLabel}>Lewat 1-30 Hari</Text>
          <Text style={[styles.receivableAmount, { color: '#ea580c' }]}>
            {receivablesData.overdue1to30}
          </Text>
        </View>
        <View style={styles.receivableCard}>
          <Text style={styles.receivableLabel}>Belum Jatuh Tempo</Text>
          <Text style={styles.receivableAmount}>{receivablesData.notDue}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.seeMoreLink}>
        <Text style={styles.seeMoreText}>Lihat Selengkapnya</Text>
      </TouchableOpacity>
    </View>
  );

  const renderDueInvoices = () => (
    <View style={styles.invoicesContainer}>
      <Text style={styles.sectionTitle}>Faktur Jatuh Tempo</Text>
      {dueInvoices.map((invoice) => (
        <View key={invoice.id} style={styles.invoiceCard}>
          <View style={styles.invoiceHeader}>
            <Text style={styles.invoiceNumber}>{invoice.invoiceNumber}</Text>
            <Text style={styles.invoiceAmount}>{invoice.amount}</Text>
          </View>
          <Text style={styles.invoiceCustomer}>{invoice.customer}</Text>
          <View style={styles.invoiceDetails}>
            <Text style={styles.invoiceOrder}>Pesanan: {invoice.orderId}</Text>
          </View>
          <Text style={styles.invoiceDueDate}>Jatuh Tempo: {invoice.dueDate}</Text>
        </View>
      ))}

      <TouchableOpacity style={styles.seeMoreLink}>
        <Text style={styles.seeMoreText}>Lihat Selengkapnya</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Selamat Datang"
        subtitle="Berikut ringkasan bisnis Anda"
        notificationCount={3}
        onNotificationPress={handleNotificationPress}
        onProfilePress={handleProfilePress}
      />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderBusinessSummary()}
        {renderOrdersList()}
        {renderReceivablesDetail()}
        {renderDueInvoices()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  businessSummaryContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  sectionHeaderWithAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  businessFilterDropdown: {
    position: 'absolute',
    top: 60,
    right: 20,
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
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
    flex: 1,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  metricChangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricChange: {
    fontSize: 12,
    fontWeight: '500',
  },
  ordersContainer: {
    padding: 20,
    paddingTop: 0,
  },
  orderTypeDropdown: {
    position: 'absolute',
    top: 60,
    right: 20,
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
  orderCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  orderHeader: {
    marginBottom: 8,
  },
  orderTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  orderTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  orderTypeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  orderAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
  },
  orderCustomer: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderDate: {
    fontSize: 12,
    color: '#6b7280',
  },
  orderStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  orderStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  emptyState: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  seeMoreLink: {
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  seeMoreText: {
    fontSize: 14,
    color: '#ea580c',
    fontWeight: '500',
  },
  receivablesContainer: {
    padding: 20,
    paddingTop: 0,
  },
  receivablesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  receivableCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    alignItems: 'flex-start',
  },
  receivableLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
  },
  receivableAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
  },
  invoicesContainer: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 20,
  },
  invoiceCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  invoiceNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  invoiceAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
  },
  invoiceCustomer: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
    fontWeight: '600',
  },
  invoiceDetails: {
    marginBottom: 8,
  },
  invoiceOrder: {
    fontSize: 12,
    color: '#6b7280',
  },
  invoiceDueDate: {
    fontSize: 12,
    color: '#6b7280',
  },
});