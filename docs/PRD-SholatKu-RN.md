# Product Requirements Document (PRD)
## SholatKu - Reminder Sholat & Azan Custom
### React Native + Expo Version

**Versi:** 2.0  
**Status:** Active Development  
**Last Updated:** December 13, 2025  
**Platform:** React Native + Expo (iOS & Android)  
**Target Devices:** iOS 13+, Android 8+  

---

## 1. Executive Summary

**Nama Produk:** SholatKu  
**Tagline:** "Sholat Tepat Waktu, Khusyu Terjaga"  
**Platform:** React Native + Expo (Cross-platform iOS & Android)  
**Target Market:** Muslim Indonesia urban (18-50 tahun)  
**Market Size:** ~100 juta Muslim Indonesia, ~70% smartphone penetration  
**Monetisasi Model:** Freemium (iklan + premium features)  
**MVP Launch:** 8-10 minggu  

**Problem Statement:**
- Warga Muslim urban sibuk, sering lupa jadwal sholat
- Aplikasi sholat existing (Muslim Pro, Prayer Times) mahal atau fitur kurang lengkap
- Kompas kiblat, tasbih digital, kalender Hijri terpisah - tidak terintegrasi
- Susah track konsistensi sholat + puasa + ibadah lainnya

**Solusi:**
SholatKu menggabungkan **jadwal sholat akurat**, **azan berkualitas tinggi**, **kompas kiblat**, **tasbih digital**, **kalender Hijri**, dan **tracker ibadah harian** dalam satu app modern dengan UI/UX minimalis, performa ringan, dan cross-platform (iOS & Android).

---

## 2. Product Vision & Goals

### Vision Statement
Menjadi aplikasi ibadah Muslim #1 di Indonesia dengan teknologi yang reliable, user-friendly, culturally relevant, dan gratis untuk semua.

### Strategic Goals (12 bulan)
1. **User Acquisition:** 100K downloads dalam 6 bulan pertama
2. **Engagement:** 40% DAU dari total downloads
3. **Monetisasi:** 5-8% premium conversion rate
4. **Quality:** Rating ≥4.6 di App Store & Play Store
5. **Community:** 10K+ referral dari WOM

### Success Metrics (KPI)
- Downloads: 100K (6 bulan)
- DAU: 40K
- Retention (D7): 55%
- MAU: 80K
- Premium subscribers: 4K-6K
- Revenue: Rp 200jt/bulan (6 bulan)
- App rating: 4.6+
- Average session: 8-10 menit

---

## 3. Core Features (MVP + Enhanced)

### 3.1 Jadwal Sholat Otomatis & Akurat

**User Story:** Sebagai Muslim, saya ingin tahu jadwal sholat hari ini & sebulan depan di lokasi saya, tanpa manual input.

**Requirements:**
- Deteksi lokasi GPS otomatis (saat first launch)
- Tampilkan 5 waktu sholat + 3 waktu tambahan:
  - Sholat: Subuh (Fajr), Dzuhur (Dhuhr), Ashar (Asr), Magrib (Maghrib), Isya (Isha)
  - Tambahan: Imsak, Syuruq (sunrise), Dhuha
- Update otomatis saat user ganti kota/zona waktu
- Akurasi: ±1-2 menit dari standar JAKIM
- Data source: Aladhan API (fallback: offline cache 50 kota)
- Show status: Sholat mana yang sudah lewat, mana next, countdown
- Kalender bulanan: View prayer times sebulan ke depan
- Multiple calculation methods: JAKIM (default), Kemenag, Syafiiyah, Hanafi

**Success Criteria:**
- ✅ Jadwal muncul dalam <2 detik
- ✅ Akurasi waktu terverifikasi
- ✅ Work offline dengan cache 2 bulan
- ✅ Support timezone Indonesia (WIB, WITA, WIT)
- ✅ Multi-location support (save 5 kota favorit)

---

### 3.2 Alarm & Notifikasi Azan

**User Story:** Saya ingin diingatkan dengan suara azan saat waktu sholat tiba, bahkan saat app di background.

**Requirements:**
- Trigger notifikasi saat waktu sholat tiba (background service)
- Audio azan: minimum 10 pilihan premium
  - Default: Makkah, Madinah, Suara Lokal, Modern, Harmoni, Suara Indonesia
  - Premium: Qari terkenal (Al-Afasi, Sudais, dll)
- Custom per sholat: on/off alarm, vibrate pattern, sound volume
- Iqomah notif: 15 menit setelah azan (customizable)
- Pre-reminder: 10 menit sebelum (customizable)
- Jama'at mode: Set waktu jama'at di masjid, phone auto-silent pada waktu tsb
- Sound file: MP3, streaming-friendly (~2-3MB per file)
- Do Not Disturb integration: Auto-silent saat sholat time

**Success Criteria:**
- ✅ Notif trigger tepat waktu ±10 detik
- ✅ Tetap bunyi di background/lock screen
- ✅ Tidak drain battery >5% per hari
- ✅ Work di iOS & Android 8+

---

### 3.3 Kompas Kiblat (Qibla Finder)

**User Story:** Saya ingin tahu arah kiblat dengan akurat tanpa buka app terpisah.

**Requirements:**
- Real-time compass bearing dari device sensors
- Calculate qibla direction: lat/lng user ke Makkah (21.4225, 39.8262)
- Visual: jarum animasi + derajat akurat (0-360°)
- Mode: portrait & landscape support
- Calibration hint: "Gerakkan device 8∞ untuk kalibrasi"
- Accuracy indicator: Excellent/Good/Fair/Poor (GPS-based)
- Update rate: 60 FPS smooth (hardware-permitting)
- Distance: Show "X km dari Makkah" (informative)
- Integration: Save as favorite location

**Success Criteria:**
- ✅ Accuracy ±3-5° (industry standard)
- ✅ Smooth animation tanpa lag
- ✅ Calibration mudah dipahami
- ✅ Work tanpa internet (sensor-only)

---

### 3.4 Tracker Sholat Harian & Puasa

**User Story:** Saya ingin track sholat & puasa harian, maintain streak, dan lihat statistik ibadah saya.

**Requirements:**
- **Sholat Tracking:**
  - Manual check-in button per sholat (setelah sholat)
  - Visual status: ✅ done, ⏳ pending, ❌ missed
  - Streak counter: berapa hari konsisten sholat (all 5)
  - Personal record: longest streak history
  - Daily progress bar: 0-5 sholat
  - Catatan optional per sholat (motivasi, tempat sholat, dll)
  - Photo upload per sholat (future: proof of location)

- **Puasa Tracking (Ramadan + Sunnah):**
  - Puasa Ramadan: auto-detect Ramadan dates, track daily
  - Puasa Senin-Kamis: toggle tracking
  - Puasa Daud: every other day tracking
  - Puasa sunnah lain: custom input

- **Statistics & History:**
  - This week/month/year stats
  - Consistency percentage: (sholahs done / expected) * 100
  - Best streak month/year
  - Compare with last month/year
  - Export stats (PDF/CSV)

- **Data Persistence:**
  - Local SQLite + optional cloud sync (premium)
  - Reset: otomatis di tengah malam (sesuai maghrib)
  - Auto-backup: daily backup ke device storage

**Success Criteria:**
- ✅ Check-in instan <300ms
- ✅ Streak akurat tanpa bug (tested edge cases)
- ✅ Data aman + backup automated
- ✅ Statistics calculated correctly

---

### 3.5 Tasbih Digital (Dhikr Counter)

**User Story:** Saya ingin menghitung tasbih/dzikir dengan mudah dan track target harian/mingguan saya.

**Requirements:**
- Simple counter interface dengan 3 main buttons:
  - [+] Increment counter
  - [Reset] Reset counter
  - [Save/Lap] Save milestone
- Customize tasbih texts:
  - Pre-defined: Subhanallah, Alhamdulillah, Allahu Akbar, La ilaha illallah (33x each)
  - Create custom dzikir dengan target count
  - Organize into groups (Sholah after, Dua-dua tertentu, dll)
- Daily/weekly goals:
  - Set target count per dzikir
  - Auto-reset at midnight
  - Notification: "Target dzikir belum tercapai hari ini"
- Sound feedback: Beep/vibration every N counts (customizable)
- History: View past counters, stats
- Social share: "Alhamdulillah sudah mencapai target tasbih hari ini 🤲"

**Success Criteria:**
- ✅ Counter responsive (tap delay <100ms)
- ✅ Multiple tasbih support without slowdown
- ✅ Haptic feedback smooth
- ✅ Large tap targets (accessibility)

---

### 3.6 Kalender Hijri & Islamic Dates

**User Story:** Saya ingin lihat tanggal Hijri, hari-hari penting Islam (Ramadan, Eid, dll) dan set reminder.

**Requirements:**
- Dual calendar view: Gregorian + Hijri
- Auto-sync tanggal Hijri dengan API (moonphase-based accuracy)
- Important dates:
  - Ramadan (1st - last day, with suhoor/iftar times)
  - Eid Fitri & Eid Adha
  - Islamic New Year (1st Muharram)
  - Prophet's Birthday (12 Rabi' al-awwal)
  - Arafah day (9 Dhul-hijjah)
- Notification: "Besok puasa Ramadan, persiapkan diri"
- Integration: Sync with device calendar (opt-in)
- Holiday info: Show why date is important

**Success Criteria:**
- ✅ Accurate Hijri date (verified with astronomical data)
- ✅ Notifications on schedule
- ✅ Beautiful visual representation

---

### 3.7 Widget & Home Screen Integration

**User Story:** Saya ingin lihat jadwal sholat berikutnya langsung dari homescreen tanpa buka app.

**Requirements:**
- **Widget Types:**
  - Small: Next prayer name + countdown (minimal)
  - Medium: Next prayer + countdown + arah kiblat mini
  - Large: All 5 prayers + today's tracker status
- Update rate: setiap menit (battery-optimized)
- Tap actions:
  - Widget tap: buka app ke relevant screen
  - Quick action: check-in sholat langsung dari widget
  - Qibla widget: tap to open compass
- Support dark/light theme + custom colors (premium)
- iOS: WidgetKit (>iOS 14)
- Android: Home widget + lock screen widget (Android 12+)

**Success Criteria:**
- ✅ Widget updates accurately
- ✅ No battery drain (widget optimization)
- ✅ Quick action works from widget

---

### 3.8 Share & Social Features

**User Story:** Saya ingin bagikan pencapaian sholat & ibadah ke teman dan medsos.

**Requirements:**
- **Share Templates:**
  - Daily achievement: "4/5 sholat hari ini, streak 15 hari 🔥"
  - Weekly stats: "50/35 sholat minggu ini 📊"
  - Monthly: "Konsistensi 85% bulan ini, Alhamdulillah 🤲"
- Share via: WhatsApp, Telegram, Instagram, Twitter, Facebook
- Include: QR code atau deep link dengan referral code
- Analytics: Track share conversion to installs
- Leaderboard (Premium): See top performers among friends (optional)

**Success Criteria:**
- ✅ Share template menarik & readable
- ✅ Share smooth <1 detik
- ✅ Tracking URL untuk analytics

---

### 3.9 Find Nearby Masjid & Islamic Places

**User Story:** Saya ingin cari masjid terdekat, informasi lokasi sholat, dan alamat.

**Requirements:**
- Map integration: Show masjid markers
- Filter: Jenis (Masjid, Mushalla, Balai Pengajian)
- Info per masjid:
  - Nama, alamat, jam buka
  - Foto, rating, reviews
  - Jenis (Hanafi, Syafiiyah, Maliki, Hanbali)
  - Amenities: toilet, wudu, parkir, musholla ibu, playground
  - Jama'at times (user-contributed)
  - Contact: phone, website
- Call/directions: Click to call or navigate via Maps
- Contribute: User bisa add/edit masjid info (community-driven)

**Success Criteria:**
- ✅ Map loads quickly
- ✅ Search & filter responsive
- ✅ User contributions moderated

---

### 3.10 Quran Integration (Future MVP+)

**User Story:** Saya ingin baca & dengar Al-Quran sambil tracking ibadah.

**Requirements:**
- Minimal Quran library integration:
  - View surat + ayat (text + translation)
  - Audio tilawah (1-2 qari options)
  - Bookmark favorite ayat
  - Daily ayat notification
- Integration: Link relevant dua from Quran
- Future: Full Quran app collab or white-label

**Success Criteria:**
- ✅ Quran loads offline-capable
- ✅ Audio streams without lag

---

## 4. User Flows

### 4.1 First Launch Onboarding
```
Splash Screen (2 detik)
    ↓
Welcome screen + benefits explanation
    ↓
Permission requests: Location, Notification, Calendar
    ↓
Detect location via GPS (or manual input)
    ↓
Select calculation method (JAKIM default)
    ↓
Load prayer times for today
    ↓
Schedule background notification service
    ↓
Home screen dengan jadwal sholat
    ↓
[Settings] untuk customize
```

### 4.2 Daily Prayer Notification Flow
```
Background service detects prayer time
    ↓
Trigger notification dengan azan sound
    ↓
User tap notif → app opens
    ↓
[✅ Check-in Sholat] button prominent
    ↓
Haptic + motivational message
    ↓
Progress update: 2/5 sholat
    ↓
Streak +1 (if consistent)
```

### 4.3 Tasbih Counter Usage
```
Home screen → [Tasbih] tab
    ↓
Select dzikir (Subhanallah, etc)
    ↓
Tap counter repeatedly
    ↓
Every 11th tap = vibrate + beep (customizable)
    ↓
Reach target → celebration notification
    ↓
Auto-save count + reset next day
```

### 4.4 Compass to Qibla
```
Home screen → [🧭 Qibla] button
    ↓
Compass screen loads
    ↓
Device magnetometer initializes
    ↓
Bearing calculated + animated needle
    ↓
Show: Device heading, Qibla direction, angle difference
    ↓
[Calibrate] if accuracy poor
    ↓
Swipe back to home
```

---

## 5. Technical Architecture Overview

### Technology Stack
- **Frontend:** React Native + TypeScript
- **Framework:** Expo (managed workflow for rapid development)
- **State Management:** Redux Toolkit + Redux Persist
- **Local Database:** SQLite (via expo-sqlite)
- **Networking:** Axios + React Query
- **APIs:** Aladhan.com (prayer times), Openweathermap (weather)
- **Sensors:** expo-compass, expo-location, expo-sensors
- **Background:** Expo Task Manager + Background Fetch
- **Notifications:** Expo Notifications
- **Maps:** React Native Maps (Google Maps / Apple Maps)
- **UI Framework:** React Native Paper / Tamagui (modern components)
- **Testing:** Jest + React Native Testing Library
- **Analytics:** Firebase Analytics (optional)

### High-Level Architecture
```
┌─────────────────────────────────────────┐
│       Presentation Layer (Screens)       │
│  HomeScreen, CompassScreen, Tracker, etc │
└─────────────┬───────────────────────────┘
              │
┌─────────────▼───────────────────────────┐
│     ViewModel / Custom Hooks Layer       │
│  usePrayerTimes, useCompass, useTracker  │
└─────────────┬───────────────────────────┘
              │
┌─────────────▼───────────────────────────┐
│       Redux Store (State Management)     │
│  prayers, tracker, settings, location    │
└─────────────┬───────────────────────────┘
              │
┌─────────────▼───────────────────────────┐
│          Repository Layer (Data)         │
│  PrayerRepository, TrackerRepository     │
└─────────────┬───────────────────────────┘
              │
    ┌─────────┴──────────┐
    │                    │
┌───▼──────────┐   ┌────▼──────────┐
│  Remote API  │   │  Local Data   │
│  Aladhan     │   │  SQLite       │
│  Google Maps │   │  AsyncStorage │
└──────────────┘   └───────────────┘

┌─────────────────────────────────────────┐
│    Background Services & Sensors        │
│  Background Tasks, Notifications, GPS   │
└─────────────────────────────────────────┘
```

---

## 6. User Interface & Design Language

### Design System
- **Color Scheme:** Islamic-inspired (emerald green, navy blue, warm gold accents)
- **Typography:** Clean sans-serif (SF Pro, Roboto)
- **Components:** Reusable & accessible
- **Animations:** Smooth, purposeful (Reanimated 2)
- **Dark Mode:** Full support with theme switching

### Key Screens

**Home Screen:**
- Header: Location + Date (e.g., "Pancoran, Jakarta • Jumat, 13 Des 2025")
- Prayer list: ⏰ Name HH:mm + status icons (✅, 🔔, ⏳)
- Countdown timer untuk sholat berikutnya
- Quick action buttons: [🧭 Qibla] [✅ Check-in] [📊 Tracker]
- Tab navigation: Sholat | Tasbih | Kalender | More

**Tracker Screen:**
- Status hari ini: 2/5 sholat
- 🔥 Streak: 15 hari (dengan personal record)
- Surat status per sholat dengan waktu actual
- [Share Progress 📱]
- Monthly stats + chart

**Compass Screen:**
- Big animated compass needle
- Bearing + Qibla angle display
- Accuracy indicator (Good/Fair/Poor)
- [Calibrate] button
- Distance to Makkah info

**Settings:**
- Location management (5 saved favorites)
- Azan selection + preview
- Notification customization
- Dark mode toggle
- Calculation method selection
- About & Help

---

## 7. Non-Functional Requirements

### Performance
- App cold start: <3 detik
- Screen transition: <300ms
- Prayer time fetch: <1 detik (cached)
- Background notification: ±10 detik accuracy
- Widget update: setiap menit, battery-optimized
- Battery drain: <8% per 24 jam (background)
- Memory usage: <100MB typical

### Reliability
- API uptime: 99.5% (fallback to cache)
- Data loss: 0% (local backup)
- Crash rate: <0.05%
- ANR rate: 0% (proper threading)

### Compatibility
- iOS: 13.0+
- Android: 8.0+ (API 26+)
- Device coverage: 95%+ (various screen sizes)
- Orientations: Portrait + Landscape
- Network: Work offline (with cached data)

### Security
- No authentication needed (local app)
- Location: Runtime permission, only when needed
- Permissions: Notification, Calendar, Maps
- Privacy: GDPR compliant, no data sent externally
- Data: Encrypted local storage (SQLite)

---

## 8. Monetization Strategy

### Freemium Model
| Feature | Free | Premium (Rp 49K/tahun) |
|---------|------|--------------------------|
| Jadwal sholat 5x | ✅ | ✅ |
| Azan default (3) | ✅ | ✅ |
| Azan premium (10+) | ❌ | ✅ |
| Tasbih basic | ✅ | ✅ |
| Tasbih advanced (multiple) | Limited | ✅ |
| Ads-free | ❌ | ✅ |
| Tracker unlimited | ✅ | ✅ |
| Export stats | ❌ | ✅ |
| Cloud sync | ❌ | ✅ (future) |
| Custom widgets | ❌ | ✅ |
| Offline maps | ❌ | ✅ |
| Ad-free widget | ❌ | ✅ |

### Revenue Streams
1. **Subscription Premium (40%):** Rp 49K/tahun
   - Target: 5-8% conversion dari DAU
   - Growth: +1-2% per kuartal year 1

2. **Ads (60%):** Banner + Interstitial
   - Banner: Bottom home screen (non-intrusive)
   - Interstitial: After 8+ sessions or check-ins
   - CPM: Rp 50-100 per impression
   - Network: Google Admob

3. **In-app Purchases (Future):**
   - Premium azan packs (artist collaborations)
   - Custom themes
   - Ad-free pass (1 month)

---

## 9. Launch Strategy & Marketing

### Phased Launch
1. **Closed Alpha (Week 1-2):** 50 internal testers
2. **Open Beta (Week 3-4):** TestFlight + Google Play Beta (1K testers)
3. **Soft Launch (Week 5-6):** Regional (Jakarta, Bandung, Surabaya)
4. **Public Launch (Week 7-8):** Full App Store & Play Store release

### Marketing Channels
- **Organic:** Reddit r/Islam, Instagram Muslim communities, TikTok creators
- **Influencer:** Partner dengan 5-10 Islamic content creators (budget: Rp 75jt)
- **Paid:** Google App Ads (budget: Rp 250jt first 3 months)
- **Content:** Blog posts, tutorial videos, Medium articles, YouTube shorts
- **Community:** Islamic tech forums, mosque partnerships, Islamic schools
- **WOM:** Referral program with incentives

### Target KPIs (6 months)
- Downloads: 100K
- DAU: 40K
- Retention (D7): 55%
- Premium subs: 4K-6K
- Monthly revenue: Rp 200jt
- Rating: 4.6+

---

## 10. Roadmap & Prioritization

### MVP v1.0 (Weeks 1-7)
- Jadwal sholat + countdown otomatis
- Alarm & azan notifikasi (3 default sounds)
- Kompas kiblat
- Tracker sholat harian + streak
- Tasbih digital basic
- Widget homescreen
- Share progress
- Settings & localization

### v1.1 (Weeks 8-10)
- 10+ pilihan azan premium
- Kalender Hijri integration
- Dark mode full
- Offline cache 2 bulan
- Puasa tracking (Ramadan + Sunnah)
- Masjid finder (basic)
- Improved UI/UX

### v1.2 (Weeks 11-12)
- Premium tier unlock
- Ads integration
- Cloud sync (Firebase)
- Statistics & export
- Push notification improvements
- Bug fixes & optimization

### v2.0 (Months 4-6, Future)
- Quran integration (read + listen)
- Community leaderboard
- Family tracking mode
- Islamic calendar events with alerts
- Bacaan doa & tasbeeh library
- Integration Google Calendar
- Web dashboard
- Multiple language support (English, Arabic)
- AI-powered prayer reminders

---

## 11. Success Metrics & Analytics

### User Metrics
- Downloads: 100K (6 bulan)
- DAU: 40K (40% of downloads)
- MAU: 80K (80% of downloads)
- Retention D1: 60%
- Retention D7: 55%
- Retention D30: 35%
- Engagement: 3+ sessions per day (target)
- Session length: 8-10 menit average

### Business Metrics
- Premium conversion: 5-8%
- ARPU (Average Revenue Per User): Rp 2000-3000/month
- LTV: Rp 24K-36K
- CAC (Customer Acquisition Cost): Rp 8K-12K blended
- LTV:CAC ratio: 3:1 minimum

### Quality Metrics
- Crash rate: <0.05%
- ANR rate: 0%
- API success rate: 99.5%
- Notification accuracy: ±10 seconds
- Rating: 4.6+ (target)

---

## 12. Dependencies & Risks

### External Dependencies
- Aladhan API availability (mitigated: 2-month cache)
- Device GPS/sensors (fallback: manual location)
- Android/iOS OS updates (maintain compatibility)
- Network connectivity (offline mode)

### Risks & Mitigation
| Risk | Impact | Mitigation |
|------|--------|-----------|
| API downtime | High | Local cache + offline mode |
| GPS accuracy | Medium | Auto-select nearest city |
| Battery drain | High | Optimize background tasks, notification tuning |
| Low conversion | Medium | A/B test pricing, improve onboarding, free tier engagement |
| Competitor (Muslim Pro) | Medium | Focus on UX, community features, free tier |
| Localization bugs | Medium | Extensive testing per locale |
| Background task killed | High | Expo Task Manager + fallback notifications |

---

## 13. Appendix

### Glossary
- **DAU:** Daily Active Users
- **MAU:** Monthly Active Users
- **Azan:** Call to prayer (Muslim)
- **Iqomah:** Second call to prayer (actual prayer start)
- **Qibla/Kiblat:** Direction toward Makkah
- **MVP:** Minimum Viable Product
- **ARPU:** Average Revenue Per User
- **CAC:** Customer Acquisition Cost
- **LTV:** Lifetime Value

### References
- Aladhan API: https://aladhan.com/api
- React Native Docs: https://reactnative.dev
- Expo Docs: https://docs.expo.dev
- Material Design: https://material.io

---

**Document Status:** APPROVED  
**Last Review:** December 13, 2025  
**Next Review:** After MVP v1.0 launch  
**Tech Lead:** React Native + Expo Specialist  
**Stakeholders:** Product Manager, Engineering Lead, Design Lead