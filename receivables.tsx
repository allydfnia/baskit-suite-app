import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Clock, TriangleAlert as AlertTriangle, CircleAlert as AlertCircle, Circle as XCircle, Calendar, DollarSign, User, FileText, ChevronDown } from 'lucide-react-native';
import Header from '@/components/Header';
import { useRouter } from 'expo-router';

interface Receivable {
  id: string;
  invoiceNumber: string;
  customer: string;
  amount: string;
  dueDate: string;
  daysOverdue: number;
  category: 'current' | 'overdue1to30' | 'overdue30to90' | 'overdue90plus';
  orderId: string;
}

const categoryOptions = [
  { label: 'Semua Piutang', value: 'all' },
  { label: 'Belum Jatuh Tempo', value: 'current' },
  { label: '1-30 Hari Terlambat', value: 'overdue1to30' },
  { label: '30-90 Hari Terlambat', value: 'overdue30to90' },
  { label: '90+ Hari Terlambat', value: 'overdue90plus' },
];

export default function ReceivablesScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const receivables: Receivable[] = [
    {
      id: '1',
      invoiceNumber: 'INV-2025-001',
      customer: 'PT ABC Sejahtera',
      amount: 'Rp 184.050.000',
      dueDate: '25 Jan 2025',
      daysOverdue: 0,
      category: 'current',
      orderId: 'SO-2025-001',
    },
    {
      id: '2',
      invoiceNumber: 'INV-2025-002',
      customer: 'PT Tech Solutions',
      amount: 'Rp 47.300.000',
      dueDate: '20 Jan 2025',
      daysOverdue: 0,
      category: 'current',
      orderId: 'SO-2025-002',
    },
    {
      id: '3',
      invoiceNumber: 'INV-2024-198',
      customer: 'PT Innovation Corp',
      amount: 'Rp 113.175.000',
      dueDate: '5 Jan 2025',
      daysOverdue: 10,
      category: 'overdue1to30',
      orderId: 'SO-2024-198',
    },
    {
      id: '4',
      invoiceNumber: 'INV-2024-189',
      customer: 'PT Global Parts',
      amount: 'Rp 236.230.000',
      dueDate: '28 Des 2024',
      daysOverdue: 18,
      category: 'overdue1to30',
      orderId: 'SO-2024-189',
    },
    {
      id: '5',
      invoiceNumber: 'INV-2024-165',
      customer: 'CV Premium Supplies',
      amount: 'Rp 80.295.000',
      dueDate: '15 Des 2024',
      daysOverdue: 31,
      category: 'overdue30to90',
      orderId: 'SO-2024-165',
    },
    {
      id: '6',
      invoiceNumber: 'INV-2024-142',
      customer: 'PT Industrial Solutions',
      amount: 'Rp 129.375.000',
      dueDate: '30 Nov 2024',
      daysOverdue: 46,
      category: 'overdue30to90',
      orderId: 'SO-2024-142',
    },
    {
      id: '7',
      invoiceNumber: 'INV-2024-089',
      customer: 'PT Legacy Systems',
      amount: 'Rp 62.160.000',
      dueDate: '15 Okt 2024',
      daysOverdue: 92,
      category: 'overdue90plus',
      orderId: 'SO-2024-089',
    },
    {
      id: '8',
      invoiceNumber: 'INV-2024-067',
      customer: 'CV Old Client',
      amount: 'Rp 41.440.000',
      dueDate: '30 Sep 2024',
      daysOverdue: 107,
      category: 'overdue90plus',
      orderId: 'SO-2024-067',
    },
  ];

  const filteredReceivables = receivables.filter((receivable) => {
    if (selectedCategory === 'all') return true;
    return receivable.category === selectedCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'current':
        return <Clock size={20} color="#16a34a" />;
      case 'overdue1to30':
        return <AlertTriangle size={20} color="#ea580c" />;
      case 'overdue30to90':
        return <AlertCircle size={20} color="#dc2626" />;
      case 'overdue90plus':
        return <XCircle size={20} color="#991b1b" />;
      default:
        return <Clock size={20} color="#6b7280" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'current':
        return { bg: '#dcfce7', text: '#16a34a', border: '#16a34a' };
      case 'overdue1to30':
        return { bg: '#fed7aa', text: '#ea580c', border: '#ea580c' };
      case 'overdue30to90':
        return { bg: '#fecaca', text: '#dc2626', border: '#dc2626' };
      case 'overdue90plus':
        return { bg: '#fca5a5', text: '#991b1b', border: '#991b1b' };
      default:
        return { bg: '#f3f4f6', text: '#6b7280', border: '#6b7280' };
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'current':
        return 'Belum Jatuh Tempo';
      case 'overdue1to30':
        return '1-30 Hari';
      case 'overdue30to90':
        return '30-90 Hari';
      case 'overdue90plus':
        return '90+ Hari';
      default:
        return 'Tidak Diketahui';
    }
  };

  const calculateTotalsByCategory = () => {
    const totals = {
      current: 0,
      overdue1to30: 0,
      overdue30to90: 0,
      overdue90plus: 0,
    };

    receivables.forEach((receivable) => {
      const amount = parseFloat(receivable.amount.replace('Rp ', '').replace(/\./g, ''));
      totals[receivable.category] += amount;
    });

    return totals;
  };

  const totals = calculateTotalsByCategory();

  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString('id-ID')}`;
  };

  const handleNotificationPress = () => {
    console.log('Notifikasi ditekan');
  };

  const handleProfilePress = () => {
    router.push('/profile');
  };

  const renderSummaryCard = (category: string, amount: number, count: number) => {
    const color = getCategoryColor(category);
    const icon = getCategoryIcon(category);
    const label = getCategoryLabel(category);

    return (
      <View key={category} style={[styles.summaryCard, { borderLeftColor: color.border }]}>
        <View style={styles.summaryHeader}>
          {icon}
          <Text style={styles.summaryLabel}>{label}</Text>
        </View>
        <Text style={[styles.summaryAmount, { color: color.text }]}>
          {formatCurrency(amount)}
        </Text>
        <Text style={styles.summaryCount}>{count} faktur</Text>
      </View>
    );
  };

  const renderReceivableCard = (receivable: Receivable) => {
    const color = getCategoryColor(receivable.category);
    const icon = getCategoryIcon(receivable.category);

    return (
      <TouchableOpacity key={receivable.id} style={styles.receivableCard}>
        <View style={styles.receivableHeader}>
          <View style={styles.receivableInfo}>
            <View style={styles.categoryContainer}>
              {icon}
              <Text style={styles.invoiceNumber}>{receivable.invoiceNumber}</Text>
            </View>
            <View style={[styles.categoryBadge, { backgroundColor: color.bg }]}>
              <Text style={[styles.categoryText, { color: color.text }]}>
                {getCategoryLabel(receivable.category)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.receivableDetails}>
          <View style={styles.detailRow}>
            <User size={16} color="#6b7280" />
            <Text style={styles.detailText}>{receivable.customer}</Text>
          </View>
          <View style={styles.detailRow}>
            <FileText size={16} color="#6b7280" />
            <Text style={styles.detailText}>Pesanan: {receivable.orderId}</Text>
          </View>
          <View style={styles.detailRow}>
            <Calendar size={16} color="#6b7280" />
            <Text style={styles.detailText}>Jatuh Tempo: {receivable.dueDate}</Text>
          </View>
          {receivable.daysOverdue > 0 && (
            <View style={styles.detailRow}>
              <AlertTriangle size={16} color="#dc2626" />
              <Text style={[styles.detailText, { color: '#dc2626' }]}>
                {receivable.daysOverdue} hari terlambat
              </Text>
            </View>
          )}
        </View>

        <View style={styles.receivableFooter}>
          <View style={styles.amountContainer}>
            <DollarSign size={18} color="#1f2937" />
            <Text style={styles.receivableAmount}>{receivable.amount}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Piutang"
        subtitle="Pantau faktur yang belum dibayar dan status pembayaran"
        notificationCount={5}
        onNotificationPress={handleNotificationPress}
        onProfilePress={handleProfilePress}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.summaryContainer}>
          <Text style={styles.sectionTitle}>Ringkasan Piutang</Text>
          <View style={styles.summaryGrid}>
            {Object.entries(totals).map(([category, amount]) => {
              const count = receivables.filter(r => r.category === category).length;
              return renderSummaryCard(category, amount, count);
            })}
          </View>
        </View>

        <View style={styles.filtersContainer}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
          >
            <Text style={styles.filterButtonText}>
              {categoryOptions.find(c => c.value === selectedCategory)?.label}
            </Text>
            <ChevronDown size={16} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {showCategoryDropdown && (
          <View style={styles.filterDropdown}>
            {categoryOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.filterOption}
                onPress={() => {
                  setSelectedCategory(option.value);
                  setShowCategoryDropdown(false);
                }}
              >
                <Text style={styles.filterOptionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.receivablesContainer}>
          <Text style={styles.sectionTitle}>
            {filteredReceivables.length} Piutang
          </Text>
          {filteredReceivables.map(renderReceivableCard)}
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
  scrollView: {
    flex: 1,
  },
  summaryContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  summaryAmount: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  summaryCount: {
    fontSize: 12,
    color: '#6b7280',
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
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
    top: 280,
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
  receivablesContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  receivableCard: {
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
  receivableHeader: {
    marginBottom: 12,
  },
  receivableInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  invoiceNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '600',
  },
  receivableDetails: {
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
  receivableFooter: {
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
  receivableAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
});