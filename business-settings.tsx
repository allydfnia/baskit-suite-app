import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { Building, Globe, MapPin, Clock, DollarSign, ChevronLeft, CreditCard as Edit3, Percent } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface BusinessProfile {
  businessName: string;
  legalEntity: string;
  businessType: string;
  industryType: string;
  country: string;
  operatingHours: string;
  province: string;
  regency: string;
  district: string;
  streetName: string;
  landmark: string;
  currency: string;
  taxRate: string;
}

export default function BusinessSettingsScreen() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile>({
    businessName: 'Toko Kreasi Nusantara',
    legalEntity: 'CV',
    businessType: 'Retail',
    industryType: 'Fashion & Aksesoris',
    country: 'Indonesia',
    operatingHours: '09:00 - 23:00',
    province: 'DKI Jakarta',
    regency: 'Jakarta Pusat',
    district: 'Kebayoran Baru',
    streetName: '-',
    landmark: '-',
    currency: 'Rp (Indonesia Rupiah)',
    taxRate: '10%',
  });

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const renderField = (
    label: string,
    value: string,
    onChangeText: (text: string) => void
  ) => {
    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>{label}</Text>
        {isEditing ? (
          <TextInput
            style={styles.fieldInput}
            value={value}
            onChangeText={onChangeText}
            placeholder={`Masukkan ${label.toLowerCase()}`}
          />
        ) : (
          <Text style={styles.fieldValue}>{value}</Text>
        )}
      </View>
    );
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
          <Text style={styles.headerTitle}>Pengaturan Bisnis</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Informasi Bisnis Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Informasi Bisnis</Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={handleEdit}
              >
                <Edit3 size={16} color="#6b7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.fieldsContainer}>
              {renderField(
                'Nama Bisnis',
                businessProfile.businessName,
                (text) => setBusinessProfile({ ...businessProfile, businessName: text })
              )}

              {renderField(
                'Entitas Hukum',
                businessProfile.legalEntity,
                (text) => setBusinessProfile({ ...businessProfile, legalEntity: text })
              )}

              {renderField(
                'Jenis Bisnis',
                businessProfile.businessType,
                (text) => setBusinessProfile({ ...businessProfile, businessType: text })
              )}

              {renderField(
                'Jenis Industri',
                businessProfile.industryType,
                (text) => setBusinessProfile({ ...businessProfile, industryType: text })
              )}
            </View>
          </View>

          {/* Lokasi & Jam Operasional Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Lokasi & Jam Operasional</Text>
            
            <View style={styles.fieldsContainer}>
              {renderField(
                'Negara',
                businessProfile.country,
                (text) => setBusinessProfile({ ...businessProfile, country: text })
              )}

              {renderField(
                'Jam Operasional',
                businessProfile.operatingHours,
                (text) => setBusinessProfile({ ...businessProfile, operatingHours: text })
              )}

              {renderField(
                'Provinsi',
                businessProfile.province,
                (text) => setBusinessProfile({ ...businessProfile, province: text })
              )}

              {renderField(
                'Kabupaten / Kota',
                businessProfile.regency,
                (text) => setBusinessProfile({ ...businessProfile, regency: text })
              )}

              {renderField(
                'Kecamatan',
                businessProfile.district,
                (text) => setBusinessProfile({ ...businessProfile, district: text })
              )}

              {renderField(
                'Nama Jalan',
                businessProfile.streetName,
                (text) => setBusinessProfile({ ...businessProfile, streetName: text })
              )}

              {renderField(
                'Patokan',
                businessProfile.landmark,
                (text) => setBusinessProfile({ ...businessProfile, landmark: text })
              )}
            </View>

            <TouchableOpacity style={styles.mapButton}>
              <MapPin size={16} color="#ff6b35" />
              <Text style={styles.mapButtonText}>Lihat di Peta</Text>
            </TouchableOpacity>
          </View>

          {/* Pengaturan Keuangan Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Pengaturan Keuangan</Text>
            
            <View style={styles.fieldsContainer}>
              {renderField(
                'Mata Uang',
                businessProfile.currency,
                (text) => setBusinessProfile({ ...businessProfile, currency: text })
              )}

              {renderField(
                'Pajak',
                businessProfile.taxRate,
                (text) => setBusinessProfile({ ...businessProfile, taxRate: text })
              )}
            </View>
          </View>
        </View>
      </ScrollView>
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
    marginRight: 48,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  sectionContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  editButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldsContainer: {
    gap: 16,
  },
  fieldContainer: {
    gap: 8,
  },
  fieldLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '400',
  },
  fieldValue: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '600',
  },
  fieldInput: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '600',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    marginTop: 16,
  },
  mapButtonText: {
    fontSize: 14,
    color: '#ff6b35',
    fontWeight: '500',
  },
});