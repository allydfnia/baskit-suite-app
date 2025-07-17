import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
} from 'react-native';
import { Search, Filter, Package, Plus, Grid3x3 as Grid3X3, List, Star, TrendingUp, ChevronDown } from 'lucide-react-native';
import Header from '@/components/Header';
import { useRouter } from 'expo-router';

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  image: string;
  rating: number;
  sales: number;
  status: 'active' | 'inactive' | 'low_stock';
}

const categoryOptions = [
  { label: 'Semua Kategori', value: 'all' },
  { label: 'Elektronik', value: 'electronics' },
  { label: 'Fashion', value: 'fashion' },
  { label: 'Makanan & Minuman', value: 'food' },
  { label: 'Kesehatan', value: 'health' },
  { label: 'Olahraga', value: 'sports' },
];

const sortOptions = [
  { label: 'Terbaru', value: 'newest' },
  { label: 'Nama A-Z', value: 'name_asc' },
  { label: 'Nama Z-A', value: 'name_desc' },
  { label: 'Harga Terendah', value: 'price_asc' },
  { label: 'Harga Tertinggi', value: 'price_desc' },
  { label: 'Stok Terbanyak', value: 'stock_desc' },
];

export default function ProductsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const products: Product[] = [
    {
      id: '1',
      name: 'Smartphone Samsung Galaxy A54',
      category: 'electronics',
      price: 'Rp 4.999.000',
      stock: 25,
      image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.5,
      sales: 156,
      status: 'active',
    },
    {
      id: '2',
      name: 'Kemeja Formal Pria',
      category: 'fashion',
      price: 'Rp 299.000',
      stock: 8,
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.2,
      sales: 89,
      status: 'low_stock',
    },
    {
      id: '3',
      name: 'Kopi Arabica Premium 250g',
      category: 'food',
      price: 'Rp 125.000',
      stock: 45,
      image: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.8,
      sales: 234,
      status: 'active',
    },
    {
      id: '4',
      name: 'Vitamin C 1000mg',
      category: 'health',
      price: 'Rp 89.000',
      stock: 0,
      image: 'https://images.pexels.com/photos/208518/pexels-photo-208518.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.3,
      sales: 67,
      status: 'inactive',
    },
    {
      id: '5',
      name: 'Sepatu Lari Nike Air Max',
      category: 'sports',
      price: 'Rp 1.299.000',
      stock: 15,
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.6,
      sales: 123,
      status: 'active',
    },
    {
      id: '6',
      name: 'Laptop ASUS VivoBook',
      category: 'electronics',
      price: 'Rp 8.999.000',
      stock: 12,
      image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.4,
      sales: 78,
      status: 'active',
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return { bg: '#dcfce7', text: '#16a34a' };
      case 'low_stock':
        return { bg: '#fef3c7', text: '#d97706' };
      case 'inactive':
        return { bg: '#fecaca', text: '#dc2626' };
      default:
        return { bg: '#f3f4f6', text: '#6b7280' };
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'AKTIF';
      case 'low_stock':
        return 'STOK RENDAH';
      case 'inactive':
        return 'TIDAK AKTIF';
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

  const renderProductCard = (product: Product) => {
    const statusColor = getStatusColor(product.status);

    if (viewMode === 'grid') {
      return (
        <TouchableOpacity key={product.id} style={styles.gridProductCard}>
          <Image source={{ uri: product.image }} style={styles.gridProductImage} />
          <View style={styles.gridProductInfo}>
            <View style={[styles.statusBadge, { backgroundColor: statusColor.bg }]}>
              <Text style={[styles.statusText, { color: statusColor.text }]}>
                {getStatusText(product.status)}
              </Text>
            </View>
            <Text style={styles.gridProductName} numberOfLines={2}>
              {product.name}
            </Text>
            <Text style={styles.gridProductCategory}>{product.category}</Text>
            <View style={styles.gridProductRating}>
              <Star size={12} color="#fbbf24" fill="#fbbf24" />
              <Text style={styles.ratingText}>{product.rating}</Text>
              <Text style={styles.salesText}>({product.sales})</Text>
            </View>
            <Text style={styles.gridProductPrice}>{product.price}</Text>
            <Text style={styles.gridProductStock}>Stok: {product.stock}</Text>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity key={product.id} style={styles.listProductCard}>
        <Image source={{ uri: product.image }} style={styles.listProductImage} />
        <View style={styles.listProductInfo}>
          <View style={styles.listProductHeader}>
            <Text style={styles.listProductName} numberOfLines={1}>
              {product.name}
            </Text>
            <View style={[styles.statusBadge, { backgroundColor: statusColor.bg }]}>
              <Text style={[styles.statusText, { color: statusColor.text }]}>
                {getStatusText(product.status)}
              </Text>
            </View>
          </View>
          <Text style={styles.listProductCategory}>{product.category}</Text>
          <View style={styles.listProductDetails}>
            <View style={styles.listProductRating}>
              <Star size={14} color="#fbbf24" fill="#fbbf24" />
              <Text style={styles.ratingText}>{product.rating}</Text>
              <Text style={styles.salesText}>({product.sales} terjual)</Text>
            </View>
            <Text style={styles.listProductStock}>Stok: {product.stock}</Text>
          </View>
          <Text style={styles.listProductPrice}>{product.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Produk"
        subtitle="Kelola produk dan inventori Anda"
        notificationCount={3}
        onNotificationPress={handleNotificationPress}
        onProfilePress={handleProfilePress}
      />

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#6b7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari produk..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <View style={styles.filtersContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
        >
          <Filter size={16} color="#6b7280" />
          <Text style={styles.filterButtonText}>
            {categoryOptions.find(c => c.value === selectedCategory)?.label}
          </Text>
          <ChevronDown size={16} color="#6b7280" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowSortDropdown(!showSortDropdown)}
        >
          <TrendingUp size={16} color="#6b7280" />
          <Text style={styles.filterButtonText}>
            {sortOptions.find(s => s.value === selectedSort)?.label}
          </Text>
          <ChevronDown size={16} color="#6b7280" />
        </TouchableOpacity>

        <View style={styles.viewModeContainer}>
          <TouchableOpacity
            style={[styles.viewModeButton, viewMode === 'grid' && styles.viewModeActive]}
            onPress={() => setViewMode('grid')}
          >
            <Grid3X3 size={16} color={viewMode === 'grid' ? '#ea580c' : '#6b7280'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.viewModeButton, viewMode === 'list' && styles.viewModeActive]}
            onPress={() => setViewMode('list')}
          >
            <List size={16} color={viewMode === 'list' ? '#ea580c' : '#6b7280'} />
          </TouchableOpacity>
        </View>
      </View>

      {showCategoryDropdown && (
        <View style={styles.categoryDropdown}>
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

      {showSortDropdown && (
        <View style={styles.sortDropdown}>
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={styles.filterOption}
              onPress={() => {
                setSelectedSort(option.value);
                setShowSortDropdown(false);
              }}
            >
              <Text style={styles.filterOptionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.productsContainer}>
          <Text style={styles.sectionTitle}>
            {filteredProducts.length} Produk Ditemukan
          </Text>
          <View style={viewMode === 'grid' ? styles.gridContainer : styles.listContainer}>
            {filteredProducts.map(renderProductCard)}
          </View>
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
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    gap: 12,
  },
  searchBar: {
    flex: 1,
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
  addButton: {
    width: 44,
    height: 44,
    backgroundColor: '#ea580c',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    gap: 12,
    alignItems: 'center',
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
  viewModeContainer: {
    flexDirection: 'row',
    marginLeft: 'auto',
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  viewModeButton: {
    padding: 8,
    borderRadius: 6,
  },
  viewModeActive: {
    backgroundColor: '#fff7ed',
  },
  categoryDropdown: {
    position: 'absolute',
    top: 200,
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
    maxWidth: 200,
  },
  sortDropdown: {
    position: 'absolute',
    top: 200,
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
    maxWidth: 150,
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
  productsContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  listContainer: {
    gap: 12,
  },
  gridProductCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  gridProductImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#f3f4f6',
  },
  gridProductInfo: {
    padding: 12,
  },
  gridProductName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
    lineHeight: 18,
  },
  gridProductCategory: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  gridProductRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  salesText: {
    fontSize: 11,
    color: '#6b7280',
  },
  gridProductPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  gridProductStock: {
    fontSize: 12,
    color: '#6b7280',
  },
  listProductCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',
    gap: 12,
  },
  listProductImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
  listProductInfo: {
    flex: 1,
  },
  listProductHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  listProductName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
    marginRight: 8,
  },
  listProductCategory: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  listProductDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  listProductRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  listProductStock: {
    fontSize: 12,
    color: '#6b7280',
  },
  listProductPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  statusText: {
    fontSize: 9,
    fontWeight: '600',
  },
});