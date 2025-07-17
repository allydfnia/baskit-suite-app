import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { User, Mail, Phone, Globe, Camera, ChevronLeft, CreditCard as Edit3, X, Lock } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface UserProfile {
  profilePicture: string;
  fullName: string;
  role: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  language: string;
}

export default function AccountSettingsScreen() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  
  const [userProfile, setUserProfile] = useState<UserProfile>({
    profilePicture: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
    fullName: 'Dena Santoso',
    role: 'Manajer Operasional',
    email: 'dena.santoso@baskit.app',
    phoneNumber: '8123456789',
    countryCode: '+62',
    language: 'Bahasa Indonesia',
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
    console.log('Saving profile changes...');
  };

  const handleUpdatePhoto = () => {
    console.log('Update photo');
    // Implement image picker logic here
  };

  const handleRemovePhoto = () => {
    console.log('Remove photo');
    setUserProfile({ ...userProfile, profilePicture: '' });
  };

  const renderField = (
    label: string,
    value: string,
    onChangeText: (text: string) => void,
    placeholder?: string
  ) => {
    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>{label}</Text>
        {isEditing ? (
          <TextInput
            style={styles.fieldInput}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder || `Masukkan ${label.toLowerCase()}`}
          />
        ) : (
          <Text style={styles.fieldValue}>{value}</Text>
        )}
      </View>
    );
  };

  const renderPhoneField = () => {
    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Nomor Ponsel</Text>
        {isEditing ? (
          <View style={styles.phoneInputContainer}>
            <View style={styles.countryCodeContainer}>
              <View style={styles.flagContainer}>
                <Text style={styles.flagEmoji}>🇮🇩</Text>
              </View>
              <Text style={styles.countryCodeText}>{userProfile.countryCode}</Text>
              <Text style={styles.dropdownArrow}>▼</Text>
            </View>
            <TextInput
              style={styles.phoneInput}
              value={userProfile.phoneNumber}
              onChangeText={(text) => setUserProfile({ ...userProfile, phoneNumber: text })}
              placeholder="812345678"
              keyboardType="phone-pad"
            />
          </View>
        ) : (
          <Text style={styles.fieldValue}>{userProfile.countryCode} {userProfile.phoneNumber}</Text>
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
          <Text style={styles.headerTitle}>Pengaturan Akun</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Informasi Akun Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Informasi Akun</Text>
              <View style={styles.headerButtons}>
                {isEditing ? (
                  <>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={handleCancel}
                    >
                      <X size={16} color="#6b7280" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.saveButton}
                      onPress={handleSave}
                    >
                      <Lock size={16} color="#6b7280" />
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={handleEdit}
                  >
                    <Edit3 size={16} color="#6b7280" />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View style={styles.fieldsContainer}>
              {/* Profile Picture Section */}
              <View style={styles.profilePictureSection}>
                <Text style={styles.fieldLabel}>Foto Profil</Text>
                <View style={styles.profilePictureContainer}>
                  <Image 
                    source={{ uri: userProfile.profilePicture }} 
                    style={styles.profilePicture}
                  />
                  {isEditing && (
                    <View style={styles.photoActions}>
                      <TouchableOpacity 
                        style={styles.photoActionButton}
                        onPress={handleUpdatePhoto}
                      >
                        <Text style={styles.photoActionText}>Update photo</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handleRemovePhoto}>
                        <Text style={styles.removePhotoText}>Remove photo</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>

              {renderField(
                'Nama Lengkap',
                userProfile.fullName,
                (text) => setUserProfile({ ...userProfile, fullName: text })
              )}

              {renderField(
                'Peran',
                userProfile.role,
                (text) => setUserProfile({ ...userProfile, role: text })
              )}

              {renderField(
                'Alamat Email',
                userProfile.email,
                (text) => setUserProfile({ ...userProfile, email: text })
              )}

              {renderPhoneField()}
            </View>
          </View>

          {/* Preferensi Pengguna Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Preferensi Pengguna</Text>
            
            <View style={styles.fieldsContainer}>
              {renderField(
                'Bahasa',
                userProfile.language,
                (text) => setUserProfile({ ...userProfile, language: text })
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
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldsContainer: {
    gap: 20,
  },
  profilePictureSection: {
    alignItems: 'flex-start',
  },
  profilePictureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 16,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f3f4f6',
  },
  photoActions: {
    gap: 8,
  },
  photoActionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  photoActionText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  removePhotoText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '400',
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
    fontWeight: '400',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    gap: 0,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderRightWidth: 0,
    gap: 8,
  },
  flagContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flagEmoji: {
    fontSize: 16,
  },
  countryCodeText: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '400',
  },
  dropdownArrow: {
    fontSize: 10,
    color: '#6b7280',
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '400',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderLeftWidth: 0,
  },
});