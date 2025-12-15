# 🚀 Build dengan GitHub Actions

Panduan untuk build APK/AAB menggunakan GitHub Actions (gratis, tanpa WSL/EAS limit).

## ⚡ Quick Start

### 1. Push ke GitHub
```bash
git add .
git commit -m "Add GitHub Actions build workflow"
git push origin main
```

### 2. Trigger Build Manual
1. Buka repo di GitHub
2. Klik tab **Actions**
3. Pilih workflow **"Build Android APK/AAB"**
4. Klik tombol **"Run workflow"**
5. Pilih **build_type** (apk/aab) dan **profile**
6. Klik **"Run workflow"** (hijau)

### 3. Download Hasil Build
1. Tunggu build selesai (± 15-30 menit)
2. Klik workflow run yang selesai
3. Scroll ke bawah ke bagian **Artifacts**
4. Download `sholatku-apk-xxx` atau `sholatku-aab-xxx`

---

## 🔐 Setup Signing Key (Untuk Production AAB)

Untuk build production AAB yang bisa diupload ke Play Store, kamu perlu setup signing key:

### Step 1: Generate Keystore (jika belum punya)
```bash
keytool -genkeypair -v -storetype PKCS12 -keystore release.keystore -alias sholatku -keyalg RSA -keysize 2048 -validity 10000
```

### Step 2: Convert Keystore ke Base64
```bash
# Linux/WSL/Mac
base64 -w 0 release.keystore > keystore-base64.txt

# Windows PowerShell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("release.keystore")) | Out-File keystore-base64.txt
```

### Step 3: Setup GitHub Secrets
1. Buka repo GitHub → **Settings** → **Secrets and variables** → **Actions**
2. Tambahkan secrets berikut:

| Secret Name | Value |
|------------|-------|
| `ANDROID_KEYSTORE_BASE64` | Isi file keystore-base64.txt |
| `ANDROID_KEYSTORE_PASSWORD` | Password keystore |
| `ANDROID_KEY_ALIAS` | `sholatku` (atau alias yang kamu pilih) |
| `ANDROID_KEY_PASSWORD` | Password key |

---

## 📋 Build Types

| Type | File | Untuk |
|------|------|-------|
| `apk` | `.apk` | Testing, install langsung ke device |
| `aab` | `.aab` | Upload ke Google Play Store |

---

## ⏱️ Estimasi Waktu Build
- **First build:** 25-40 menit (download dependencies)
- **Subsequent builds:** 15-25 menit (cached)

---

## 🆓 Limit GitHub Actions
- **Free tier:** 2000 menit/bulan
- **Per build:** ± 20-30 menit
- **Artinya:** ± 60-100 builds gratis per bulan!

---

## ❓ Troubleshooting

### Build gagal "Out of memory"
Sudah dihandle dengan `GRADLE_OPTS: -Xmx4g`

### Build gagal signing
Pastikan semua 4 secrets sudah ditambahkan dengan benar

### Artifacts tidak muncul
Cek log build, mungkin ada error saat build

---

## 🔗 Links
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Expo Prebuild Documentation](https://docs.expo.dev/workflow/prebuild/)
