# Panduan Rilis ke Google Play Store & Update AdMob

## 📱 Rilis ke Google Play Store

### Persiapan Sebelum Rilis

#### 1. Update Versi Aplikasi
Edit file `app.json`:
```json
{
  "expo": {
    "version": "1.0.1",  // Tambah versi untuk setiap update
    "android": {
      "versionCode": 2  // WAJIB tambah 1 untuk setiap upload ke Play Store
    }
  }
}
```

> ⚠️ **PENTING:** `versionCode` harus selalu lebih besar dari versi sebelumnya!

#### 2. Build APK/AAB untuk Production
```powershell
# Build AAB (Android App Bundle) - DIREKOMENDASIKAN untuk Play Store
eas build --platform android --profile production

# Atau build lokal via WSL
wsl -e bash "/mnt/c/Users/USER/Videos/Jev_Playground/Android Playground/Sholatku/sholatku/build-android.sh"

# Atau build via GitHub Actions (GRATIS, RECOMMENDED!)
# Lihat panduan lengkap: .github/BUILD-GITHUB-ACTIONS.md
```

> 💡 **RECOMMENDED:** Gunakan **GitHub Actions** untuk build gratis tanpa limit EAS!
> 
> Caranya:
> 1. Push repo ke GitHub
> 2. Buka tab **Actions** → Pilih **"Build Android APK/AAB"**
> 3. Klik **"Run workflow"** → Download artifact setelah selesai

#### 3. Buat eas.json Profile Production (jika belum ada)
```json
{
  "build": {
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  }
}
```

---

### Upload ke Google Play Console

#### Langkah-langkah:
1. **Login** ke [Google Play Console](https://play.google.com/console)
2. **Pilih Aplikasi** > "Jadwal Adzan, Sholat, Kiblat"
3. **Release** > **Production** > **Create new release**
4. **Upload AAB/APK**:
   - Drag & drop file `.aab` atau `.apk`
   - Tunggu proses upload selesai
5. **Isi Release Notes** (Bahasa Indonesia):
   ```
   Pembaruan v1.0.1:
   - Pengaturan notifikasi per waktu sholat
   - Suara adzan berbeda untuk Subuh
   - Perbaikan bug dan peningkatan performa
   ```
6. **Review Release** > **Start rollout to Production**

---

### Checklist Sebelum Publish
- [ ] Screenshot & graphics sudah diupdate
- [ ] Deskripsi aplikasi lengkap
- [ ] Kebijakan privasi sudah ada
- [ ] Konten rating sudah diisi
- [ ] Target audience sudah ditentukan
- [ ] Ads declaration sudah diisi (jika pakai iklan)

---

## 📺 Update AdMob

### 1. Buka Google AdMob Console
🔗 [https://admob.google.com](https://admob.google.com)

### 2. Temukan App ID & Ad Unit IDs

**Lokasi di AdMob:**
- **Apps** > Pilih aplikasi > **App settings** > Copy **App ID**
- **Ad units** > Copy **Ad unit ID** untuk setiap jenis iklan

### 3. Update di `app.json`
```json
{
  "expo": {
    "plugins": [
      [
        "react-native-google-mobile-ads",
        {
          "androidAppId": "ca-app-pub-XXXXXXXXXXXXXXXX~YYYYYYYYYY"
        }
      ]
    ]
  }
}
```

### 4. Update Ad Unit IDs di Kode

**Lokasi file:** `src/components/ads/BannerAdComponent.tsx` atau file iklan lainnya

```typescript
// Ganti dengan Ad Unit ID yang benar
const BANNER_AD_UNIT_ID = __DEV__ 
  ? TestIds.BANNER  // Test ID saat development
  : 'ca-app-pub-XXXXXXXXXXXXXXXX/ZZZZZZZZZZ';  // Production ID
```

### 5. Jenis Ad Unit yang Tersedia
| Jenis | Deskripsi | Penggunaan |
|-------|-----------|------------|
| Banner | Iklan static di bawah layar | `BannerAd` |
| Interstitial | Iklan fullscreen | Antar halaman |
| Rewarded | Iklan video dengan reward | Fitur premium |
| Native | Iklan custom blend | Feed/List |

---

## 🔐 Manajemen Credentials

### Keystore (Signing Key)
- Disimpan di **EAS** (otomatis)
- Atau download dari: `eas credentials`

### Backup Penting
Simpan file-file berikut dengan aman:
1. **Keystore file** (`.jks` atau `.keystore`)
2. **Keystore password**
3. **Key alias & password**
4. **Google Play Console service account JSON**

> ⚠️ **JANGAN HILANGKAN KEYSTORE!** Jika hilang, tidak bisa update aplikasi lagi.

---

## 📊 Memantau Performa

### Play Console Metrics
- **Crashes & ANRs**
- **Ratings & reviews**
- **Install/uninstall stats**

### AdMob Reports
- **Estimated earnings**
- **Impressions & clicks**
- **Fill rate**

---

## 🚀 Quick Commands

```powershell
# Build production (cloud)
eas build --platform android --profile production

# Build preview (testing)
eas build --platform android --profile preview

# Submit ke Play Store (otomatis)
eas submit --platform android

# Cek credentials
eas credentials

# Update OTA (tanpa rebuild)
eas update --branch production
```

---

## ❓ Troubleshooting

### APK Ditolak Play Store
1. **versionCode tidak naik** → Tambah versionCode di app.json
2. **Target SDK terlalu rendah** → Update `targetSdkVersion` ke 34+
3. **Missing permissions disclosure** → Jelaskan penggunaan permission

### Iklan Tidak Muncul
1. Cek App ID benar di `app.json`
2. Cek Ad Unit ID benar di kode
3. Tunggu 24-48 jam setelah setup baru
4. Pastikan tidak pakai Test ID di production
