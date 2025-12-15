# Product Requirements Document (PRD)
## SholatKu - Puasa Tracker Feature
### Comprehensive Fasting Guide dengan Islamic References

**Versi:** 1.0  
**Status:** Feature Specification  
**Last Updated:** December 14, 2025  
**Feature Owner:** SholatKu Product Team  
**Related Feature:** Sholat Tracker (similar pattern)  

---

## 1. Executive Summary

### Feature Overview
**Fitur Name:** Puasa Tracker & Islamic Fasting Guide

**Description:**
Puasa Tracker adalah fitur komprehensif dalam SholatKu yang membantu Muslim Indonesia memahami, melacak, dan menjalankan berbagai jenis puasa dengan panduan lengkap berdasarkan Al-Quran dan Hadis.

**Key Components:**
1. **Puasa Ramadhan Tracker** - Daily tracking dengan countdown
2. **Puasa Sunnah Guide** - 10+ jenis puasa sunnah dengan detail
3. **Islamic References** - Ayat Quran & Hadis untuk setiap puasa
4. **Statistics & Progress** - Track puasa konsistensi bulanan/tahunan
5. **Notifications** - Reminder untuk puasa penting
6. **Educational Content** - Manfaat & keistimewaan setiap puasa

### Target Users
- Muslim Indonesia yang ingin menjalankan puasa sunnah
- Pelajar & mahasiswa yang ingin memperdalam ilmu Islam
- Keluarga Muslim yang ingin program puasa bersama
- Umur target: 15-65 tahun

### Success Metrics
- Feature usage: 30-50% dari pengguna aktif
- Puasa Ramadhan tracking: 80%+ completion rate
- Puasa sunnah adoption: 15-25% regular users
- User satisfaction: 4.5+ rating untuk feature ini

---

## 2. Detailed Feature Specifications

### 2.1 Puasa Ramadhan Tracker

#### Overview
Dedicated interface untuk melacak puasa Ramadhan dengan countdown otomatis, daily check-in, dan progress visualization.

#### Key Features

**A. Countdown Ramadhan**
```
Display Location: Home screen tab "Puasa" (prominent position)

Visual Components:
├── Big Countdown Clock
│   ├── Days remaining: "24 hari lagi"
│   ├── If during Ramadhan: "Hari ke-15 dari 30"
│   ├── Color: Dynamic (gradient green → golden)
│   └── Animation: Smooth digit change

├── Ramadhan Info Card
│   ├── Current hijri date: "1 - 29 Ramadan 1446"
│   ├── Gregorian equivalent: "15 Feb - 16 Mar 2025"
│   ├── Approx. fasting hours: "13-14 jam/hari"
│   ├── Total days: "30 hari"
│   └── Status: "Memasuki fase terakhir" (contextual)

└── Quick Actions
    ├── [🎯 Start Fasting Today]
    ├── [📊 View Statistics]
    └── [ℹ️ Ramadhan Info]

Data Source:
- Hijri calendar API (auto-detect Ramadhan)
- Location-based (for Suhoor & Iftar times)
- Timezone-aware calculations
```

**B. Daily Ramadhan Check-in**
```
During Ramadhan (auto-enable):

Check-in Interface:
├── Date: "Jumat, 15 Feb 2025 - Hari ke-1"
├── Suhoor Time: "04:35 WIB" [Set alarm]
├── Iftar Time: "18:00 WIB" [Set alarm]
├── Fasting Status:
│   ├── ⏳ Pre-Suhoor (before 04:35)
│   ├── 🌙 Suhoor time (04:35 - 05:00)
│   ├── ✅ Fasting (05:01 - 17:59)
│   ├── 🍽️ Iftar time (18:00 - 18:15)
│   └── 🌃 Post-Iftar (after 18:15)
│
└── Quick Buttons:
    ├── [✅ Suhoor Dimulai] (appear at suhoor time)
    ├── [✅ Puasa Dimulai] (appear at fasting time)
    ├── [✅ Berbuka Sekarang] (appear at iftar time)
    └── [✅ Selesai Hari Ini] (appear after iftar)

Tracking Logic:
- Full day puasa = all 4 checkmarks (suhoor → puasa → iftar → selesai)
- Missing one = "Partial" (still count, show in stats)
- Missed day = "Missed" (skip option available)
  * Allow optional reason (sakit, wanita haid, etc)
  * Qada information (wajib ganti puasanya nanti)

Data Storage:
├── date: "2025-02-15"
├── suhoor_checked: true, time: "04:40"
├── fasting_started: true, time: "05:00"
├── iftar_time: "18:00"
├── iftar_checked: true, time: "18:05"
├── completion: true/false
├── notes: "" (optional user notes)
└── status: "completed" | "partial" | "missed"
```

**C. Progress Visualization**
```
This Month (Ramadhan):

Visual Progress Bar:
├── Segmented bar: 30 segments (untuk 30 hari)
├── Colors:
│   ├── 🟢 Green = Completed puasa
│   ├── 🟡 Yellow = Partial (one check missed)
│   ├── 🔴 Red = Missed puasa
│   └── ⚪ Gray = Belum tiba (future days)
│
├── Statistics:
│   ├── Completed: "23/30 hari" (76.7%)
│   ├── Partial: "3/30 hari" (10%)
│   ├── Missed: "4/30 hari" (13.3%)
│   └── Current streak: "5 hari berturut-turut"
│
└── Breakdown:
    ├── Total fasting hours tracked
    ├── Average iftar time
    ├── Most consistent day (e.g., Tuesday)
    └── Least completed day (e.g., Monday)

Monthly Chart:
├── Bar chart: Days vs completion percentage
├── Line chart: Consistency trend
└── Calendar heatmap: Green/yellow/red per day
```

**D. Ramadhan Information Panel**
```
Educational Content:

Card 1: Puasa Ramadhan Basics
├── Title: "Apa itu Puasa Ramadhan?"
├── Content:
│   "Puasa Ramadhan adalah ibadah wajib dalam Islam, 
│    dilakukan oleh umat Muslim di bulan Ramadhan (bulan ke-9 
│    dalam kalender Hijri). Puasa berarti menahan diri dari 
│    makan, minum, dan hal-hal yang membatalkan puasa mulai 
│    dari terbit fajar hingga terbenam matahari."
│
└── Reference: Al-Quran 2:183-185 (Ayat Al-Bayyinah)

Card 2: Keistimewaan Puasa Ramadhan
├── 🌟 Dosa-dosa terdahulu diampuni
│   └── Hadis: "Barangsiapa berpuasa Ramadhan dengan iman dan 
│       mengharap pahala, maka dosa-dosanya yang telah lalu akan 
│       diampuni." (HR. Bukhari & Muslim)
│
├── 🌟 Pintu-pintu surga dibuka, pintu neraka ditutup
│   └── Hadis: "Apabila tiba bulan Ramadhan, maka pintu-pintu 
│       surga dibuka dan pintu-pintu neraka ditutup, serta 
│       setan-setan dibelenggu." (HR. Bukhari & Muslim)
│
├── 🌟 Lailatul Qadr (Malam yang lebih baik dari 1000 bulan)
│   └── Al-Quran 97:1-5 (Surah Al-Qadr)
│       "Kami telah menurunkan Al-Quran pada malam yang mulia. 
│        Tahukah kamu apakah malam yang mulia itu? Malam yang 
│        mulia itu lebih baik daripada seribu bulan."
│
└── 🌟 Disertai dengan rejeki dan keberkahan
    └── Hadis: "Puasa adalah perisai." (HR. Ibnu Majah)

Card 3: Niat Puasa Ramadhan
├── Text: "Niyyatu an asuma ghadan min syahri Ramadhan 
│         fardha lillahi ta'ala"
├── Translation: "Aku berniat berpuasa besok untuk bulan Ramadhan 
│                yang fardhu karena Allah Ta'ala"
├── Timing: Dilakukan sebelum subuh
└── Catatan: "Niat di hati sudah cukup, tidak perlu diucapkan"

Card 4: Yang Membatalkan Puasa
├── ❌ Makan atau minum dengan sengaja
│   └── Al-Quran 2:185
│
├── ❌ Hubungan suami istri
│   └── Al-Quran 2:187
│
├── ❌ Keluar mani (bagi laki-laki)
│   └── Ijma' (consensus of scholars)
│
├── ❌ Haid atau nifas (bagi perempuan)
│   └── Hadis sahih
│
└── ❌ Murtad (keluar dari agama Islam)
    └── Ijma' (consensus of scholars)

Card 5: Yang Tidak Membatalkan Puasa
├── ✅ Terkena cairan dari orang lain (air liur, dll)
├── ✅ Muntah (jika tidak disengaja)
├── ✅ Bersin, batuk, atau debu masuk
├── ✅ Bermimpi buruk atau berkeringat
├── ✅ Gigi berlubang mengeluarkan darah
├── ✅ Hayalan/pikiran kotor (tanpa perbuatan)
└── ✅ Menyikat gigi (pagi) tanpa air masuk

Card 6: Doa Saat Berbuka Puasa (Doa Iftar)
├── Text: "Allahumma inni laka sumtu wa bika amantu wa 'ala 
│         rizqika aftartu"
├── Translation: "Ya Allah, aku berpuasa untuk-Mu dan aku beriman 
│                kepada-Mu dan atas rezeki-Mu aku berbuka"
├── Manfaat: Doa yang mustajab (dikabulkan)
└── Reference: Hadis Abu Daud
```

### 2.2 Puasa Sunnah Guide & Tracker

#### Overview
Komprehensif guide untuk 10+ jenis puasa sunnah dengan detail karakteristik, manfaat, dan referensi Islamic.

#### Puasa Sunnah List

**1. PUASA SENIN-KAMIS (Puasa Ayyamul Bidh)**

```
Basic Info:
├── Name: "Puasa Ayyamul Bidh" atau "Puasa Senin-Kamis"
├── Timing: 
│   ├── Senin & Kamis setiap minggu
│   ├── Tidak wajib, tapi sangat dianjurkan
│   └── Dapat dilakukan kapan saja dalam setahun
│
├── Duration: Full day (dari fajar hingga magrib)
├── Difficulty: ⭐⭐☆☆☆ (Easy - sama seperti puasa biasa)
│
└── Category: Sunnah Mu'akkadah (puasa sunnah yang sangat dianjurkan)

Keistimewaan & Manfaat:
├── 🌟 Ibadah pilihan yang dicintai Allah
│   └── Hadis: "Amal yang paling dicintai Allah adalah puasa 
│       Senin dan Kamis." (HR. At-Tirmidzi - Hasan)
│
├── 🌟 Menjadi tabungan amal
│   └── Hadis: "Puasa Senin dan Kamis menjadi tabungan amal 
│       untuk hari kiamat." (HR. Ad-Daruquthni)
│
├── 🌟 Pengampunan dosa
│   └── Hadis: "Puasa Senin dan Kamis akan menghapus dosa 
│       selama seminggu (ke depan dan ke belakang)." (HR. Ibnu Majah)
│
├── 🌟 Dicinta para Malaikat
│   └── Hadis: "Setiap hari, para Malaikat datang dari Surga 
│       untuk membaca Doa untuk orang-orang yang berpuasa Senin 
│       dan Kamis." (HR. Ibnu Sunni)
│
└── 🌟 Pembersih jiwa & amalan
    └── Hadis: "Puasa Senin dan Kamis adalah pembersih bagi 
        seluruh amalan dan ucapan seseorang." (HR. Ibnu Majah)

Al-Quran & Hadis References:
├── Al-Quran 3:17
│   "...dan mereka memberikan harta yang mereka cintai karena 
│    cinta kepada-Nya kepada kerabat, anak-anak yatim, orang-
│    orang miskin, musafir dan orang-orang yang meminta-minta, 
│    dan (memerdekakan) hamba sahaya..."
│
├── Hadis Muslim (1162)
│   "Rasulullah saw. paling banyak berpuasa pada hari Senin dan 
│    Kamis. Beliau ditanya tentang hal itu, lalu Rasulullah saw. 
│    menjawab: 'Hari Senin dan Kamis adalah hari-hari di mana 
│    amal-amal dinaikkan kepada Tuhan semesta alam.'"
│
└── Hadis At-Tirmidzi (769)
    "Rasulullah saw. bersabda: 'Puasa yang paling disukai setelah 
    puasa Ramadhan adalah puasa di bulan Muharram, dan sholat 
    yang paling disukai setelah sholat wajib adalah sholat malam 
    (tahajjud).'"

Rekomendasi Praktik:
├── Konsistensi: Minimal sekali seminggu (Senin atau Kamis)
├── Motivasi: Niatkan untuk mendapatkan pahala & pengampunan dosa
├── Sabar: Jangan merasa berat, mulai dari satu hari dulu
└── Harapan: Semoga Allah terima dan berkahi amal kita

Tracking Options (di app):
├── [✅] Puasa Senin minggu ini
├── [✅] Puasa Kamis minggu ini
├── [📊] Weekly streak counter
├── [📈] Monthly statistics
└── [🎯] Personal goal (e.g., "Puasa Senin-Kamis setiap minggu")
```

**2. PUASA DAUD (PUASA GANTIAN HARI)**

```
Basic Info:
├── Name: "Puasa Daud" (Saum Daud)
├── Pattern: Puasa sehari, berbuka sehari (alternating)
├── Timing: Dapat dilakukan kapan saja, bukan musiman
├── Duration: Full day puasa, full day berbuka
├── Difficulty: ⭐⭐⭐⭐☆ (Hard - continuous cycle)
├── Category: Sunnah Mu'akkadah (highly recommended)
│
└── Why named "Daud"? 
    Prophet Daud (David) is famous for this practice

Keistimewaan & Manfaat:
├── 🌟 Amal yang paling dicintai Allah
│   └── Hadis: "Amal yang paling disukai kepada Allah adalah puasa 
│       Daud, yaitu puasa sehari dan berbuka sehari." 
│       (HR. Bukhari & Muslim)
│
├── 🌟 Keseimbangan hidup
│   └── Arti: Tidak merusak tubuh dengan puasa terus-menerus, 
│       tapi tetap menjaga ibadah
│
├── 🌟 Daya tahan yang baik
│   └── Hadis: "Puasa Daud adalah puasa yang terbaik. Dia 
│       melakukan setengah dari puasa Daud." (HR. Muslim)
│
└── 🌟 Menahan dari maksiat
    └── Hadis: "Puasa adalah perisai, jadi jangan kotor-kotori 
        dirimu sendiri dengan perbuatan yang jelek." (HR. Muslim)

Al-Quran & Hadis References:
├── Al-Quran 34:10
│   "Sesungguhnya Kami telah memberikan keputusan kepada Daud 
│    dari Kami. (Kami berfirman): 'Hai gunung-gunung dan burung-
│    burung, bertasbihlah bersama Daud.' Dan Kami telah melunakkan 
│    tembaga untuknya..."
│
├── Hadis Bukhari & Muslim (dari Abdullah bin Amr)
│   "Rasulullah saw. bersabda: 'Sesungguhnya yang terbaik di sisi 
│    Allah adalah puasa Daud. Daud al-Khalil berkata: 'Aku 
│    berpuasa sehari dan berbuka sehari.'"
│
└── Hadis Muslim (1158)
    "Dari Abdullah bin Amr, dia berkata: 'Rasulullah saw. 
    bertanya kepadaku, "Apa yang terbaik?" Aku berkata: 
    "Puasa Daud dan malam hari sholat." Rasulullah saw. 
    bersabda: "Itu adalah puasa dan sholat terbaik.""

Praktik Detail:
├── Hari 1: Puasa penuh
│   └── Subuh hingga Magrib (tidak makan/minum)
│
├── Hari 2: Berbuka (bebas makan, tidak wajib)
│   └── Boleh makan seperti biasa
│
├── Hari 3: Puasa lagi
│   └── Seperti hari ke-1
│
└── Pola berlanjut... selamanya (selama konsisten)

Rekomendasi Praktik:
├── Mulai: Dengan niat yang kuat
├── Durasi: Minimal 7 hari untuk merasakan manfaatnya
├── Fleksibilitas: Boleh berhenti jika sakit/ada keadaan mendesak
├── Konsistensi: Jika bisa terus-menerus, itu lebih baik
└── Catatan: Jangan sampai melupakan kebutuhan keluarga/pekerjaan

Tracking in App:
├── [📅] Puasa/Berbuka calendar
├── [🔄] Cycle status (Hari ke-1 puasa, Hari ke-1 berbuka, etc)
├── [⏥] Current streak (days)
├── [📊] Total days done this month
└── [🎯] Personal notes (mulai kapan, motivasi, pengalaman)
```

**3. PUASA TIGA HARI PER BULAN (AYYAMUL BIDH)**

```
Basic Info:
├── Name: "Puasa Ayyamul Bidh" (Puasa 3 hari terang bulan)
├── Days: 13, 14, 15 dari setiap bulan Hijri (white moon days)
├── Timing: Setiap bulan, bukan musiman
├── Duration: Full day puasa (Subuh - Magrib)
├── Difficulty: ⭐⭐☆☆☆ (Easy - hanya 3 hari)
├── Category: Sunnah yang sangat dianjurkan
│
└── "Ayyam" = days, "Bidh" = white (bulan purnama)

Keistimewaan & Manfaat:
├── 🌟 Ibadah menyerupai puasa selamanya
│   └── Hadis: "Puasa tiga hari setiap bulan adalah puasa selamanya."
│       (HR. Muslim)
│
├── 🌟 Dosa terhapus seperti puasa selamanya
│   └── Hadis: "Puasa tiga hari putih memberikan pahala seperti 
│       puasa selamanya." (HR. Nasa'i)
│
├── 🌟 Mudah dilakukan
│   └── Arti: Hanya 3 hari per bulan, sangat terjangkau untuk semua
│
├── 🌟 Tubuh tetap sehat
│   └── Arti: Tidak terlalu membuat tubuh lemah, cukup seimbang
│
└── 🌟 Ibadah yang istiqomah (konsisten)
    └── Hadis: "Amal yang paling baik adalah yang konsisten, 
        meskipun sedikit." (HR. Bukhari & Muslim)

Al-Quran & Hadis References:
├── Hadis Muslim (1160)
│   "Dari Abu Qatadah, ia berkata: 'Rasulullah saw. ditanya 
│    tentang puasa Senin, maka Beliau menjawab: "Itu adalah hari 
│    di mana aku dilahirkan dan aku dipercayai (diutus sebagai 
│    nabi) pada hari itu." Dia ditanya tentang puasa tiga hari 
│    putih (tanggal 13, 14, 15), maka Beliau menjawab: "Puasa 
│    ketiga hari putih setiap bulan adalah puasa selamanya.""
│
├── Hadis An-Nasa'i (2413)
│   "Dari Abu Hurairah, Rasulullah saw. bersabda: 'Puasa tiga 
│    hari setiap bulan adalah puasa selamanya, dan puasa bulan 
│    Rajab sampai Sya'ban adalah persiapan (untuk puasa Ramadhan).'"
│
└── Hadis Ibnu Majah (1715)
    "Dari Abdullah bin Qais, Rasulullah saw. bersabda: 'Puasa 
    tiga hari dari setiap bulan menghapus dosa setahun.'"

Jadwal Tanggal 13, 14, 15:
├── Perhitungan: Bulan Hijri mulai dari hari baru saat terbit fajar
├── Tanggal: 13, 14, 15 sama untuk semua Muslim (satu kalender hijri)
├── Status: Automatic detection di app (berdasarkan hijri calendar)
└── Catatan: Kalender hijri bisa berbeda 1-2 hari antar negara

Rekomendasi Praktik:
├── Konsistensi: Lakukan setiap bulan tanpa henti
├── Catatan: Tanda reminder di kalender app (automatis)
├── Fleksibilitas: Jika sakit/haid, ganti hari lain di bulan itu
├── Motivasi: Niatkan untuk mencapai pahala puasa selamanya
└── Bersama: Ajak keluarga agar semakin mudah

Tracking in App:
├── [📅] Auto-marked pada tanggal 13, 14, 15 setiap bulan
├── [✅] Check-in untuk confirmation
├── [📊] Monthly completion (3/3 or less)
├── [🎯] Yearly statistics (36+ days done)
└── [🔔] Reminder notification 1 hari sebelumnya
```

**4. PUASA ENAM HARI DI BULAN SYAWAL**

```
Basic Info:
├── Name: "Puasa Syawal" (Shifaa)
├── Timing: Enam hari di bulan Syawal (bulan setelah Ramadhan)
├── Days: Bisa kapan saja di bulan Syawal (tidak harus berturut-turut)
├── Duration: Full day puasa (Subuh - Magrib)
├── Difficulty: ⭐⭐⭐☆☆ (Moderate - sudah selesai Ramadhan)
├── Category: Sunnah yang sangat dianjurkan
│
└── "Shifaa" = penyembuh (puasa sebagai penyembuh dosa)

Keistimewaan & Manfaat:
├── 🌟 Mengganti kekurangan Ramadhan
│   └── Hadis: "Barangsiapa berpuasa Ramadhan, kemudian berpuasa 
│       enam hari di bulan Syawal, maka seolah-olah dia berpuasa 
│       setahun." (HR. Muslim)
│
├── 🌟 Sama nilainya dengan puasa setahun
│   └── Arti: Pahala puasa Ramadhan (30 hari) + 6 hari Syawal = 
│       36 hari, dan dalam cara perhitungan amal, setara 1 tahun 
│       penuh (365 hari)
│
├── 🌟 Membersihkan dosa
│   └── Hadis: "Puasa tiga hari dari setiap bulan, dan puasa 
│       enam hari Syawal menghapuskan semua dosa seketika." 
│       (HR. Nasa'i)
│
└── 🌟 Ibadah yang sempurna setelah Ramadhan
    └── Arti: Lanjutan ibadah Ramadhan dengan cara yang mudah

Al-Quran & Hadis References:
├── Hadis Muslim (1164)
│   "Dari Abu Ayyub Al-Ansari, Rasulullah saw. bersabda: 
│    'Barangsiapa berpuasa Ramadhan, kemudian berpuasa enam hari 
│    di bulan Syawal, maka seolah-olah dia berpuasa sepanjang tahun. 
│    Barangsiapa yang membuat satu kebaikan, dia akan mendapatkan 
│    sepuluh kali lipatnya.'"
│
├── Hadis Abu Daud (2433)
│   "Dari Tsauban, Rasulullah saw. bersabda: 'Puasa Ramadhan 
│    adalah sepuluh bulan, dan puasa enam hari adalah dua bulan, 
│    jadi itu adalah puasa setahun.'"
│
└── Hadis An-Nasa'i (2414)
    "Dari Abu Qatadah, Rasulullah saw. bersabda: 'Puasa enam 
    hari dari bulan Syawal bersama puasa Ramadhan sama dengan 
    puasa setahun penuh.'"

Praktik Detail:
├── Waktu mulai: Setelah Lebaran langsung bisa, atau nanti
├── Hari-hari: Tidak harus berturut-turut
├── Fleksibilitas: Bisa disesuaikan dengan jadwal kerja/keluarga
├── Tips: Mulai sedini mungkin setelah Lebaran
└── Motivasi: Teruskan momentum puasa Ramadhan ke bulan Syawal

Kalender Syawal:
├── Tanggal mulai: 1 Syawal (Hari Lebaran)
├── Periode puasa: 2 Syawal - 30 Syawal (hindari hari Raya)
└── Catatan: Jangan puasa pada hari Raya Idul Fitri (1 Syawal)

Rekomendasi Praktik:
├── Timing: Mulai dari 2 Syawal untuk semangat
├── Konsistensi: Tetap fokus meskipun sudah selesai Ramadhan
├── Fleksibilitas: Sesuaikan dengan kondisi kesehatan
├── Keluarga: Ajak keluarga untuk berbagi ibadah
└── Catatan: Jangan terlalu memaksa diri

Tracking in App:
├── [📅] Syawal calendar dengan 6 hari puasa slots
├── [✅] Check 6 hari puasa yang sudah dilakukan
├── [📊] Progress (e.g., "3/6 hari Syawal selesai")
├── [🎯] Motivasi "Setara puasa setahun!" di progress bar
├── [🔔] Reminder untuk mulai di awal Syawal
└── [📈] Yearly tracking (apakah setiap tahun puasa Syawal)
```

**5. PUASA ARAFAH (HARI ARAFAH)**

```
Basic Info:
├── Name: "Puasa Arafah" (Saum Yaumul Arafah)
├── Tanggal: 9 Dzulhijjah (hari Jum'at dalam 5 hari terakhir Dzulhijjah)
├── Timing: Musiman, sekali setahun
├── Duration: Full day puasa (Subuh - Magrib)
├── Difficulty: ⭐⭐⭐☆☆ (Moderate - hanya 1 hari)
├── Category: Sunnah Mu'akkadah (highly recommended)
│
├── Keterangan: Hari paling penting dalam Haji
└── Tujuan: Hari pertemuan jemaah haji di Padang Arafah

Keistimewaan & Manfaat:
├── 🌟 Menghapus dosa dua tahun
│   └── Hadis: "Puasa hari Arafah menghapus dosa satu tahun 
│       sebelumnya dan satu tahun sesudahnya." (HR. Muslim & Nasa'i)
│
├── 🌟 Doa yang paling dikabulkan
│   └── Arti: Hari Arafah adalah hari yang paling dekat dengan 
│       Allah, semua doa yang dipanjatkan sangat mungkin dikabulkan
│
├── 🌟 Doa mulia dari Nabi Muhammad
│   └── Hadis: "Sebaik-baik doa adalah doa pada hari Arafah, dan 
│       sebaik-baik yang aku katakan dan para nabi sebelumku adalah: 
│       'Laa ilaha illallah wahdahu laa syarika lah, lahul mulku wa 
│       lahul hamdu wa huwa ala kulli syai'in qadir.'" (HR. At-Tirmidzi)
│
├── 🌟 Hari yang dinanti setiap tahun
│   └── Hadis: "Tidak ada hari yang lebih banyak Allah membebaskan 
│       hamba-hambanya dari neraka daripada hari Arafah." (HR. Muslim)
│
└── 🌟 Kebersamaan dengan jutaan haji
    └── Arti: Spiritual connection dengan jutaan jemaah haji yang 
        sedang berdoa di Arafah (walaupun tidak sedang haji)

Al-Quran & Hadis References:
├── Al-Quran 2:198
│   "Tidak ada dosa bagimu untuk mencari karunia (rezeki hasil 
│    perniagaan) dari Tuhanmu. Apabila kamu telah bertolak dari 
│    Arafat, berdzikirlah kepada Allah di Masyarilharam. Dan ingatlah 
│    Allah sebagaimana yang telah ditunjukkan-Nya kepadamu, dan 
│    sesungguhnya sebelum itu kamu adalah termasuk orang-orang yang 
│    sesat."
│
├── Hadis Muslim (1348)
│   "Dari Abu Qatadah Al-Ansari: 'Rasulullah saw. ditanya tentang 
│    puasa Arafah. Maka Beliau bersabda: "Puasa hari Arafah 
│    mengugurkan (menghapus) dosa setahun sebelumnya dan setahun 
│    sesudahnya."'"
│
├── Hadis At-Tirmidzi (3585)
│   "Dari 'Aisyah: 'Hari yang paling utama untuk berdoa adalah 
│    hari Arafah, dan hari Arafah adalah haji. Allah Ta'ala 
│    berfirman: "Tiada hari yang lebih sempurna dari hari Arafah 
│    untuk membebaskan hamba-hamba dari api neraka."'"
│
└── Hadis Ibnu Majah (1740)
    "Tiada hari yang lebih dicintai oleh Allah daripada hari 
    Arafah. Allah memandang hamba-hambanya dengan rahmah dan 
    mereka saling membanggakan. Allah berfirman kepada para 
    Malaikat: 'Apakah kalian melihat hamba-hamba-Ku? Mereka 
    datang dengan rambut kusut dan wajah berdebu.'"

Praktik Khusus Hari Arafah:
├── ✅ Puasa adalah sunnah utama
├── ✅ Banyak membaca Istighfar (minta maaf)
├── ✅ Banyak berdoa kepada Allah
├── ✅ Membaca dzikir dan tasbih
├── ✅ Membaca Al-Quran
├── ❌ JANGAN puasa jika sedang haji (wajib berbuka)
└── ❌ JANGAN puasa jika sakit atau ada keadaan darurat

Doa Pilihan untuk Arafah:
├── Tasbih: "Subhanallah wa bihamdih, subhanallah al-'adzim"
│          "Maha suci Allah dan segala puji bagi-Nya, Maha suci 
│           Allah Yang Maha Agung"
│
├── Istighfar: "Astaghfirullaha wa atubu ilayh"
│             "Aku memohon ampun kepada Allah dan bertobat 
│              kepada-Nya"
│
├── Doa: "Allahumma innaka samit tuwadduk, faghfir li dhumubi 
│        kullaha, wa habib man yuhibbuka, wa adid man 'adaka, 
│        bismillahi rabbi allazi lam yadhurr ma'asmihi syai'un 
│        fil ardhi wa la fis sama' wa huwa as-samiu'ul 'alim."
│
└── Doa Nabi: "Laa ilaha illallah wahdahu laa syarika lah, lahul 
              mulku wa lahul hamdu wa huwa ala kulli syai'in qadir"

Rekomendasi Praktik:
├── Niat: Berniat untuk menghapus dosa dan mendekatkan diri pada Allah
├── Puasa: Sunnah utama pada hari ini
├── Doa: Habiskan sebagian besar hari untuk berdoa
├── Keluarga: Ajak keluarga untuk berdoa bersama
├── Waktu: Mulai dari fajar hingga magrib
└── Semangat: Bayangkan keseriusan hari kiamat untuk motivasi

Tracking in App:
├── [📅] Auto-marked pada 9 Dzulhijjah setiap tahun
├── [✅] Check-in puasa Arafah
├── [🕌] Doa counter (banyak berdoa hari ini)
├── [📊] Yearly record (puasa Arafah setiap tahun?)
├── [🔔] Reminder 1 minggu sebelumnya
└── [📈] Statistics (berapa tahun sudah puasa Arafah)
```

**6. PUASA ASYURA (10 MUHARRAM)**

```
Basic Info:
├── Name: "Puasa Asyura" (Saum Yaumul Asyura)
├── Tanggal: 9-10 Muharram (recommended: 9 & 10, minimal 10)
├── Timing: Musiman, sekali setahun (hari pertama kalender Hijri)
├── Duration: Full day puasa (Subuh - Magrib)
├── Difficulty: ⭐⭐☆☆☆ (Easy - hanya 1-2 hari)
├── Category: Sunnah yang sangat dianjurkan
│
├── Keterangan: Hari selamatnya Nabi Musa dari Firaun
└── Artinya: "Sepuluh" (merujuk tanggal 10 Muharram)

Keistimewaan & Manfaat:
├── 🌟 Menghapus dosa satu tahun
│   └── Hadis: "Puasa hari Asyura menghapus dosa satu tahun yang 
│       telah lalu." (HR. Muslim)
│
├── 🌟 Ibadah Nabi Musa
│   └── Hadis: "Hari Asyura adalah hari yang pada masa Jahiliyah 
│       pun dimuliakan. Ketika kami datang ke Madinah, kami mendapati 
│       orang-orang Yahudi menunaikan puasa pada hari itu. Mereka 
│       mengatakan: 'Ini adalah hari yang besar, Allah menyelamatkan 
│       Bani Israil dari musuh mereka pada hari ini.'"
│
├── 🌟 Hari penyelamatan
│   └── Arti: Allah menyelamatkan Nabi Musa dari Firaun pada hari ini
│
├── 🌟 Hari yang dimuliakan sejak zaman dulu
│   └── Hadis: "Hari Asyura adalah hari istimewa, bahkan orang-orang 
│       Jahiliyah memuliakan hari ini sebelum Islam datang"
│
└── 🌟 Ibadah yang ringan tapi penuh pahala
    └── Arti: Hanya satu hari tapi pahala setahun penuh

Al-Quran & Hadis References:
├── Al-Quran 2:183
│   "Hai orang-orang yang beriman, diwajibkan atas kamu berpuasa 
│    sebagaimana diwajibkan atas orang-orang sebelum kamu agar 
│    kamu bertakwa."
│
├── Hadis Bukhari & Muslim
│   "Dari 'Aisyah, ia berkata: 'Pada masa Jahiliyah, orang Quraisy 
│    berpuasa pada hari Asyura, dan Rasulullah saw. pun berpuasa pada 
│    hari itu. Apabila Ramadhan diwajibkan, Rasulullah saw. bersabda: 
│    "Siapa yang ingin berpuasa pada hari Asyura, dia boleh, dan siapa 
│    yang tidak ingin, dia boleh pula.""
│
├── Hadis Muslim (1130)
│   "Dari Abu Qatadah: 'Rasulullah saw. ditanya tentang puasa pada 
│    hari Asyura. Beliau menjawab: "Puasa pada hari Asyura menghapus 
│    dosa satu tahun yang telah lalu."'"
│
└── Hadis Ibnu Abbas
    "Nabi Muhammad saw. datang ke Madinah dan melihat orang-orang 
    Yahudi berpuasa pada hari Asyura. Beliau bertanya: 'Apa hari ini?' 
    Mereka berkata: 'Ini adalah hari yang baik, Allah menyelamatkan 
    Bani Israil dari Firaun pada hari ini, dan Musa berpuasa.' 
    Rasulullah saw. berkata: 'Saya lebih berhak dengan Musa daripada 
    kalian.' Lalu Beliau berpuasa pada hari itu dan memerintahkan 
    orang-orang untuk berpuasa.'"

Praktik Asyura:
├── Hari terbaik: 9 dan 10 Muharram (sebaiknya 9-10)
├── Minimal: Puasa pada hari ke-10 sudah cukup
├── Optimal: Puasa hari 9 dan 10 lebih baik lagi
├── Fleksibilitas: Boleh puasa 10 saja jika terpaksa
└── Tambahan: Banyak dzikir dan istighfar sepanjang hari

Sejarah Asyura:
├── Hari: 10 Muharram (Tanggal 1 kalender Hijri adalah 1 Muharram)
├── Event: Allah menyelamatkan Nabi Musa dan Bani Israil
├── Musuh: Firaun dan bala tentaranya tenggelam di laut
├── Signifikansi: Hari pembebasan dan penyelamatan
└── Pembelajaran: Kepercayaan kepada Allah membawa penyelamatan

Doa untuk Asyura:
├── Doa syukur: "Alhamdulillahi ala kulli hal, wa syukran lillahi 
│               ala ni'amin katsirah"
│               "Segala puji bagi Allah dalam setiap keadaan, dan 
│                syukur kepada Allah atas nikmat yang banyak"
│
├── Doa perlindungan: "Allahumma 'ashim isloomi wa 'aqli wa mali 
│                     wa ahli wa waladii wa waliyaddi min kulli 
│                     syarrin"
│                     "Ya Allah, lindungi agamaku, akalku, hartaku, 
│                      keluargaku, anak-anakku, dan orang-orang 
│                      terkasih dari segala kejahatan"
│
└── Doa ibadah: "Allahumma taqabbal minni wa aslah li sha'ni kullah"
                "Ya Allah, terimalah dari diriku dan sempurnakanlah 
                 seluruh urusanku"

Rekomendasi Praktik:
├── Niat: Berniat mengikuti tradisi Nabi & Nabi Musa
├── Puasa: Wajib hari 10, dianjurkan hari 9-10
├── Waktu: Mulai dari fajar hingga magrib
├── Doa: Banyak berdoa dan istighfar sepanjang hari
├── Keluarga: Ajak keluarga untuk berbagi ibadah
└── Ketahanan: Jangan merasa berat, ini hanya 1-2 hari

Tracking in App:
├── [📅] Auto-marked pada 9-10 Muharram setiap tahun
├── [✅] Check 9 Muharram (optional), 10 Muharram (main)
├── [📊] Yearly record (puasa Asyura setiap tahun?)
├── [🔔] Reminder 2 minggu sebelumnya
├── [📈] Statistics (streak puasa Asyura)
└── [ℹ️] Educational content (Sejarah Asyura)
```

**7-10. PUASA SUNNAH LAINNYA (Mini Cards)**

```
Dalam app, tampilkan mini cards untuk puasa sunnah lainnya:

7. PUASA IMSAK (Menjelang Ramadhan)
   ├── Tanggal: 1-8 Rajab & 1-29 Sya'ban (2 bulan sebelum Ramadhan)
   ├── Manfaat: Persiapan fisik & mental sebelum puasa Ramadhan
   ├── Difficulty: ⭐⭐☆☆☆
   ├── Reference: Hadis At-Tirmidzi
   └── Praktik: 2-3 hari per minggu untuk persiapan

8. PUASA ISTIGHOZAH (Memohon Pertolongan)
   ├── Kapan: Boleh kapan saja saat ada masalah atau kebutuhan
   ├── Manfaat: Allah lebih cepat mengabulkan doa di saat puasa
   ├── Difficulty: ⭐⭐⭐☆☆
   ├── Reference: Al-Quran & Hadis umum tentang puasa
   └── Praktik: Niat untuk memohon bantuan Allah dalam puasa

9. PUASA DULU-DULUWAN (Mengikuti Sunnah Nabi)
   ├── Kapan: Boleh kapan saja dalam setahun
   ├── Manfaat: Mengikuti contoh Nabi Muhammad & para sahabat
   ├── Difficulty: ⭐⭐☆☆☆
   ├── Reference: Hadis Qudsi tentang ibadah sukarela
   └── Praktik: Niatkan mengikuti sunnah Nabi

10. PUASA TAUBAT (Bersih Dosa)
    ├── Kapan: Boleh kapan saja, terutama saat ingin bertobat
    ├── Manfaat: Pembersih dosa & simbol komitmen bertobat
    ├── Difficulty: ⭐⭐⭐☆☆
    ├── Reference: Al-Quran 66:4 (Taubah)
    └── Praktik: Niat murni untuk tobat, disertai usaha memperbaiki
```

---

### 2.3 Puasa Statistics & Progress Tracking

#### Monthly Statistics Screen

```
Display Location: "Puasa" Tab → "Statistik" Section

Card 1: Bulan Ini (Current Month)
├── Jenis Puasa:
│   ├── Ramadhan (if applicable)
│   ├── Puasa Sunnah: [Jumlah hari]
│   └── Puasa Total: [Total days]
│
├── Progress:
│   ├── Completion: [Persentase]%
│   ├── Chart: Visual bar showing days done
│   └── Streak: [Nomor] hari berturut-turut
│
└── Breakdown:
    ├── Senin-Kamis: [jumlah] kali
    ├── Ayyamul Bidh: [3 atau kurang] hari
    ├── Daud: [jumlah] hari
    └── Lainnya: [jumlah] hari

Card 2: Perbandingan Bulanan (Monthly Comparison)
├── Graph: Line chart menunjukkan puasa per bulan
├── Trend: Naik/Stabil/Turun (motivasi jika turun)
├── Rata-rata: [X] hari puasa per bulan
└── Target: Minimal [X] hari per bulan

Card 3: Statistik Tahunan (Yearly Stats)
├── Total Puasa Tahun Ini: [Jumlah] hari
├── Jenis Puasa:
│   ├── Ramadhan: 30 hari (biasanya)
│   ├── Senin-Kamis: [Jumlah] kali
│   ├── Syawal: [0-6] hari
│   ├── Arafah: [0-1] hari
│   ├── Asyura: [0-2] hari
│   └── Sunnah Lainnya: [Jumlah] hari
│
├── Proyeksi Akhir Tahun: [Perkiraan] hari total
└── Achievement Badge: Jika mencapai target tertentu

Card 4: Pencapaian & Badges (Gamification)
├── 🥇 Badge: "Puasa Konsisten" (30+ hari/tahun)
├── 🥈 Badge: "Pengikut Sunnah" (50+ hari/tahun)
├── 🥉 Badge: "Mujahid Puasa" (100+ hari/tahun)
├── ⭐ Badge: "Master Puasa" (150+ hari/tahun)
├── 💎 Badge: "Hafiz Puasa" (250+ hari/tahun)
└── 👑 Badge: "Pejuang Ibadah" (365+ hari/tahun)
```

#### Personal Goal Setting

```
Feature: Puasa Goals

Goal Templates:
├── Template 1: Puasa Senin-Kamis Konsisten
│   └── Target: "Minimal 1 hari per minggu, 52 hari/tahun"
│
├── Template 2: Puasa Sunnah Rutin
│   └── Target: "Kombinasi berbagai puasa sunnah, 100 hari/tahun"
│
├── Template 3: Puasa Setengah Tahun
│   └── Target: "Puasa 183 hari dalam setahun"
│
└── Template 4: Custom Goal
    └── Input: Target hari puasa, jenis puasa, deadline

Progress Tracking:
├── Visual progress bar: [##########    ] 75%
├── Motivational messages saat milestone
├── Warning jika tidak on-track untuk target
└── Celebration saat mencapai target
```

---

### 2.4 Educational Content & Islamic References

#### Content Library

```
Location: "Puasa" Tab → "Panduan & Edukasi"

Sections:

1. BASIC FASTING INFORMATION
   ├── Apa itu Puasa?
   ├── Hukum Puasa dalam Islam
   ├── Fadilah & Keistimewaan Puasa
   ├── Rukun Puasa (Pillars)
   ├── Syarat Sah Puasa
   └── Hal-hal yang Membatalkan Puasa

2. PRACTICAL GUIDANCE
   ├── Niat Puasa (Cara & Waktu)
   ├── Suhoor & Iftar (Makanan Bergizi)
   ├── Doa-Doa Penting
   ├── Etika Puasa (Hati & Kelakuan)
   └── Tips Puasa Sehat

3. SUNNAH PUASA DETAILS
   ├── 10+ Jenis Puasa Sunnah
   ├── Manfaat & Keistimewaan Masing-masing
   ├── Al-Quran & Hadis References
   ├── Kapan & Bagaimana Cara Melakukannya
   └── FAQ untuk setiap jenis puasa

4. ISLAMIC CALENDAR
   ├── Hari-hari Penting dalam Hijri Calendar
   ├── Awal Puasa Ramadhan
   ├── 9-10 Muharram (Asyura)
   ├── 9 Dzulhijjah (Arafah)
   ├── Tanggal 13-15 (Ayyamul Bidh)
   └── Ramadhan hingga Syawal

5. WOMEN'S FASTING
   ├── Puasa saat Haid & Nifas
   ├── Penggantian Puasa (Qada')
   ├── Ibu Hamil & Menyusui
   ├── Puasa saat Menstruasi
   └── Hadis & Referensi Khusus

6. SPECIAL SITUATIONS
   ├── Puasa saat Sakit
   ├── Puasa saat Perjalanan (Safar)
   ├── Puasa di Negara Kutub (tempat siang lama)
   ├── Puasa saat Usia Lanjut
   └── Puasa untuk Anak-anak

7. QURANIC VERSES
   ├── Al-Quran 2:183-187 (Ayat Puasa)
   ├── Al-Quran 97:1-5 (Lailatul Qadr)
   ├── Al-Quran 34:10 (Daud)
   └── Ayat-ayat lain tentang puasa & sabar

8. HADITH COLLECTIONS
   ├── Hadis Sahih Bukhari tentang Puasa
   ├── Hadis Sahih Muslim tentang Puasa
   ├── Hadis At-Tirmidzi tentang Puasa Sunnah
   ├── Hadis An-Nasa'i tentang Keutamaan Puasa
   └── Hadis dari kitab-kitab lainnya
```

#### Reference Format (Ayat & Hadis)

```
Untuk setiap referensi, tampilkan format lengkap:

AYAT AL-QURAN:
┌─────────────────────────────────────────────────┐
│ Al-Quran 2:183-185 (Surah Al-Baqarah)           │
├─────────────────────────────────────────────────┤
│ Bahasa Arab (tulisan asli Quran):               │
│ يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ │
│ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِنْ    │
│ قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ              │
├─────────────────────────────────────────────────┤
│ Transliterasi:                                  │
│ "Ya ayyuha al-ladhina amanu kutiba 'alaikum    │
│ ash-shiyamu kama kutiba 'ala al-ladhina min    │
│ qablikum la'allakum tattaqun"                  │
├─────────────────────────────────────────────────┤
│ Terjemahan Bahasa Indonesia:                   │
│ "Hai orang-orang yang beriman, diwajibkan      │
│ atas kamu berpuasa sebagaimana diwajibkan      │
│ atas orang-orang sebelum kamu agar kamu        │
│ bertakwa"                                       │
├─────────────────────────────────────────────────┤
│ Tafsir Singkat:                                │
│ Ayat ini menunjukkan kewajiban puasa Ramadhan  │
│ bagi semua Muslim yang mampu. Puasa bukanlah   │
│ ibadah baru dalam Islam, melainkan berlanjut   │
│ dari umat-umat sebelumnya. Tujuan puasa adalah │
│ untuk mencapai takwa kepada Allah.             │
│                                                 │
│ Makna Takwa: Takut kepada Allah, menjaga diri  │
│ dari perbuatan yang dilarang, dan menjalankan  │
│ perintah-Nya dengan sebaik-baiknya.            │
└─────────────────────────────────────────────────┘

HADITS:
┌─────────────────────────────────────────────────┐
│ Hadits Sahih Muslim No. 1163 (dari Abu Ayyub)  │
├─────────────────────────────────────────────────┤
│ Teks Asli (Bahasa Arab):                       │
│ مَنْ صَامَ رَمَضَانَ وَسِتَّةً مِنْ          │
│ شَوَّالٍ فَقَدْ صَامَ السَّنَةَ              │
├─────────────────────────────────────────────────┤
│ Sanad (Periwayat):                             │
│ Abu Ayyub Al-Ansari ← Sahabat Nabi             │
│ → Imam Muslim (Kumpulan hadis Sahih Muslim)    │
├─────────────────────────────────────────────────┤
│ Terjemahan:                                    │
│ "Barangsiapa berpuasa Ramadhan, kemudian       │
│ berpuasa enam hari di bulan Syawal, maka       │
│ seolah-olah dia berpuasa sepanjang tahun."     │
├─────────────────────────────────────────────────┤
│ Penjelasan:                                    │
│ Hadits ini menunjukkan bahwa puasa Ramadhan    │
│ (30 hari) ditambah puasa Syawal (6 hari) sama  │
│ dengan 36 hari. Dalam perhitungan amal yang    │
│ ditetapkan dalam Al-Quran, 10 kebaikan sama    │
│ dengan 1 (dalam hal nilai). Jadi 36 × 10 =     │
│ 360 hari, yang setara dengan satu tahun lunar. │
│                                                 │
│ Ini menunjukkan keutamaan puasa Syawal dan     │
│ motivasi bagi yang tidak mampu puasa sepanjang │
│ tahun untuk minimal melakukan puasa Ramadhan   │
│ dan Syawal.                                    │
├─────────────────────────────────────────────────┤
│ Derajat Hadits: Sahih (Authentic)              │
│ Sumber: Sunan Muslim, Kitab Ash-Shiyam         │
└─────────────────────────────────────────────────┘
```

---

### 2.5 Notification & Reminder System

#### Puasa Notifications

```
Smart Notification Schedule:

1. RAMADHAN COUNTDOWN
   ├── 30 days before: "Ramadhan akan tiba dalam 30 hari!"
   ├── 14 days before: "2 minggu lagi menjelang Ramadhan"
   ├── 7 days before: "Tinggal 7 hari, persiapkan diri!"
   ├── 3 days before: "Ramadhan dimulai dalam 3 hari!"
   └── 1 day before: "Besok mulai Ramadhan. Semoga istiqomah!"

2. DURING RAMADHAN
   ├── Daily (saat fajar): "[Hari ke-X] Subuh segera tiba! Saatnya Suhoor"
   ├── Daily (saat isyak): "Magrib sudah tiba. Waktunya berbuka!"
   ├── End of Ramadhan: "Ramadhan tinggal X hari lagi"
   └── Lebaran: "Selamat Hari Raya Idul Fitri! 🎉"

3. PUASA SUNNAH REMINDERS
   ├── Senin-Kamis: "Hari Senin/Kamis! Apakah Anda akan puasa?"
   ├── Ayyamul Bidh: "Tanggal 13-15! Ayo puasa Ayyamul Bidh"
   ├── Arafah: "Besok Hari Arafah! Niat puasa?"
   ├── Asyura: "Besok 10 Muharram (Asyura)! Persiapkan diri"
   └── Syawal: "6 hari Syawal siap dilacak di aplikasi"

4. PENGINGAT KHUSUS
   ├── Suhoor: "Waktunya Suhoor! Jangan sampai ketinggalan"
   ├── Imsak: "Imsak sudah dimulai. Segera hentikan makan"
   ├── Subuh: "Subuh telah tiba. Puasa sudah dimulai ✅"
   ├── Dhuha: "Waktu dhuha. Banyak berdoa di sini!"
   └── Iftar: "Azan Magrib sudah berkumandang. Berbuka! 🍽️"

5. MOTIVATIONAL MESSAGES
   ├── "Puasa adalah momentum untuk memperbaiki diri. 
   │    Tetap semangat! 💪"
   │
   ├── "Setiap puasa adalah investasi untuk akhirat. 
   │    Semoga Allah terima. 🤲"
   │
   ├── "Lanjutkan konsistensi puasa. Anda sudah [X] hari! ⭐"
   │
   └── "Jangan lupa banyak berdoa, membaca Quran, 
       dan istighfar hari ini. 📖"

Notification Preferences:
├── Customize timing untuk setiap notifikasi
├── Toggle on/off untuk jenis notifikasi tertentu
├── Pilih jenis notifikasi (suara, vibrate, silent)
└── Quiet hours setting (jangan notif 22:00-07:00, etc)
```

---

## 3. User Experience & UI/UX Design

### 3.1 Puasa Tab Layout

```
Bottom Navigation: 5 Tabs
├── 🏠 Sholat (existing)
├── 🧭 Compass (existing)
├── 📊 Tracker (existing)
├── 💬 Tasbih (existing)
├── 🍽️ Puasa (NEW FEATURE)
└── ⋮ More (settings, about)

Puasa Tab Sections:

SECTION 1: COUNTDOWN & QUICK INFO
├── Top Card (Big, Prominent):
│   ├── If Ramadhan:
│   │   ├── "Ramadhan 1446 H"
│   │   ├── "Hari ke-15 dari 30"
│   │   ├── BIG COUNTDOWN CLOCK showing remaining days
│   │   ├── Progress bar: [##########    ] 50%
│   │   └── [📊 View Progress] button
│   │
│   └── If Not Ramadhan:
│       ├── Next major fasting event
│       ├── "Puasa Arafah tinggal 45 hari!"
│       ├── or "Puasa Syawal siap dimulai!"
│       └── [📖 Pelajari Puasa] button

SECTION 2: DAILY CHECK-IN (DURING RAMADHAN ONLY)
├── Card: "Puasa Hari Ini"
├── Date: "Jumat, 15 Februari 2025 - Hari ke-1"
├── Suhoor Time: "04:35 WIB" with reminder bell
├── Iftar Time: "18:00 WIB" with reminder bell
├── Status: Visual showing current phase
└── Quick Buttons: [✅ Suhoor] [✅ Puasa] [✅ Iftar] [✅ Selesai]

SECTION 3: THIS MONTH PUASA
├── Progress: "22/30 hari Ramadhan" or "[X] hari Puasa Sunnah"
├── Visual bar: [###########    ] 73%
├── Breakdown:
│   ├── Completed: X hari
│   ├── Partial: X hari
│   ├── Missed: X hari
│   └── Remaining: X hari
└── [📊 Statistik Lengkap] button

SECTION 4: PUASA SUNNAH SHORTCUTS
├── Small cards untuk top 3 puasa sunnah:
│   ├── Card 1: Senin-Kamis
│   │   ├── "Puasa Senin & Kamis"
│   │   ├── "Manfaat: Menghapus dosa seminggu"
│   │   └── [✅ Mulai Hari Ini]
│   │
│   ├── Card 2: Ayyamul Bidh
│   │   ├── "Tanggal 13-15 Setiap Bulan"
│   │   ├── "Manfaat: Seperti puasa setahun"
│   │   └── [ℹ️ Info] [✅ Check-in]
│   │
│   └── Card 3: Puasa Daud
│       ├── "Puasa Gantian Hari"
│       ├── "Manfaat: Amal terbaik untuk Allah"
│       └── [ℹ️ Info] [✅ Track]
│
└── [📚 Lihat Semua Puasa Sunnah] button

SECTION 5: QUICK ACTIONS
├── [🎓 Panduan Puasa] - Educational content
├── [🤲 Doa-Doa] - Prayer collection
├── [📖 Ayat & Hadis] - Islamic references
└── [🎯 Target Tahunan] - Goal setting
```

### 3.2 Puasa Sunnah Guide Screen

```
When user taps "Lihat Semua Puasa Sunnah":

Screen Layout: Scrollable list of puasa sunnah

CARD FORMAT (untuk setiap puasa sunnah):

┌─────────────────────────────────────────┐
│ [ICON] NAMA PUASA                       │
├─────────────────────────────────────────┤
│ Manfaat Utama:                          │
│ 🌟 [Manfaat 1 - singkat]                │
│ 🌟 [Manfaat 2 - singkat]                │
│                                          │
│ Tingkat Kesulitan: ⭐⭐⭐☆☆ (Moderate) │
│ Kategori: Sunnah Mu'akkadah             │
├─────────────────────────────────────────┤
│ [ℹ️ Pelajari Lengkap] [✅ Track Puasa]  │
└─────────────────────────────────────────┘

When user taps "Pelajari Lengkap":

Detailed Screen:
├── Hero section dengan ikon & nama puasa
├── Quick info: Difficulty, Category, Type
├── Manfaat lengkap (dengan nomor 1-5+)
├── Ayat Al-Quran (dengan terjemahan)
├── Hadis (dengan sanad & penjelasan)
├── Praktik cara melakukannya
├── FAQ (common questions)
└── Buttons:
    ├── [🔔 Set Reminder]
    ├── [✅ Check-in Puasa]
    └── [❤️ Simpan ke Favorit]
```

---

## 4. Integration dengan Feature Existing

### 4.1 Notification Integration

```
Existing notification system digunakan untuk:
├── Suhoor reminder (separate dari azan notification)
├── Iftar reminder (separate dari azan notification)
├── Puasa sunnah reminders
├── Daily motivation messages
└── Monthly statistics notifications

NEW notification channels (Android):
├── puasa_channel: MEDIUM importance (puasa reminders)
├── puasa_iftar: HIGH importance (iftar time)
└── puasa_suhoor: HIGH importance (suhoor time)
```

### 4.2 Widget Integration

```
Existing widget system dapat display:
├── Puasa status (Ramadhan countdown / puasa hari ini)
├── Next puasa sunnah event
├── Monthly progress bar
└── Quick check-in button (saat Ramadhan)

Widget size support:
├── Small widget: Countdown + next event
├── Medium widget: Progress bar + statistics
└── Large widget: Full daily status + quick actions
```

### 4.3 Database Integration

```
Existing SQLite database perlu tambahan tables:

NEW TABLES:
├── puasa_ramadhan (untuk tracking puasa Ramadhan harian)
├── puasa_sunnah (untuk tracking berbagai puasa sunnah)
├── puasa_goals (untuk goal setting user)
├── puasa_statistics (untuk analytics & reporting)
└── islamic_calendar_events (untuk Islamic date events)

Fields untuk setiap table:
├── date, type, status, notes, timestamps
└── references ke user goals & preferences
```

---

## 5. Success Metrics & KPIs

### 5.1 Feature Usage Metrics

```
Daily Active Users (DAU):
├── Target: 30-50% dari pengguna aktif SholatKu menggunakan Puasa feature
├── Measurement: Count unique users yang buka Puasa tab
└── Tracking: Daily/Weekly/Monthly trend

Feature Adoption:
├── Ramadhan Tracking: 80%+ adoption rate saat Ramadhan
├── Sunnah Tracking: 15-25% adoption rate
├── Goal Setting: 10-20% dari total users
└── Educational Content: 20-30% dari total users

Engagement Metrics:
├── Check-in completion: [X]% per day saat Ramadhan
├── Notification acceptance: [X]% dari users tidak disable notifikasi
├── Content viewing: [X]% users baca educational content
└── Repeat visits: [X]% users kembali setiap hari

User Satisfaction:
├── Feature rating: Target 4.5+ stars
├── User feedback: [X]% positive comments
├── NPS (Net Promoter Score): Target >60
└── Churn rate: Target <5% (of Puasa feature users)
```

### 5.2 Business Metrics

```
Premium Conversion:
├── Puasa feature unlock premium? NO (semua free)
├── Alternative monetization: Ads in educational content?
└── Track: Conversions from Puasa education content

User Retention:
├── Feature contributes to overall app retention
├── Measure: Retention curve of Puasa feature users
└── Target: Puasa feature users have higher LTV

Social Sharing:
├── Share puasa achievements: [X]% users
├── Referral from puasa content: [X]% new users
└── Track: Referral links di Puasa feature
```

---

## 6. Roadmap & Future Enhancements

### Phase 1 (MVP - Included in v1.0 or v1.1)
```
✅ Puasa Ramadhan Tracker (countdown + daily check-in)
✅ Puasa Sunnah Guide (10+ jenis dengan lengkap)
✅ Islamic References (Ayat & Hadis)
✅ Statistics & Progress Tracking
✅ Notifications & Reminders
✅ Educational Content Library
```

### Phase 2 (v1.2 - After MVP)
```
□ Puasa Daud detailed tracking (alternating calendar)
□ Puasa Sunnah achievement badges & gamification
□ Social sharing puasa progress
□ Community leaderboard (untuk puasa sunnah)
□ Export puasa statistics (PDF/CSV)
□ Dark mode optimization untuk Puasa feature
```

### Phase 3 (v1.3+)
```
□ Family puasa tracking (share goals dengan keluarga)
□ Puasa partner system (accountability buddy)
□ Integration dengan Quran app (read ayat & hadis)
□ Premium puasa content (deeper Islamic education)
□ Puasa events & community challenges
□ Integration dengan health/fitness app (monitor energy)
□ Puasa reminder via SMS/WhatsApp
□ AI-powered recommendation (personalized puasa plan)
□ Puasa journal (daily reflection & notes)
□ Community forum untuk diskusi puasa
```

---

## 7. Success Story & Testimonials (Target)

```
Harapan dari users setelah feature ini:

"SholatKu membantu saya track puasa Ramadhan dengan lebih konsisten.
Sebelumnya saya sering lupa hari ke berapa, sekarang jelas!" 
- Nurfazira, Jakarta ⭐⭐⭐⭐⭐

"Fitur puasa sunnah membuat saya termotivasi untuk mulai puasa 
Senin-Kamis. Sebelumnya saya tidak tahu manfaatnya, sekarang 
punya alasan yang jelas dari Quran & Hadis."
- Ahmad, Bandung ⭐⭐⭐⭐⭐

"Referensi Ayat & Hadis yang lengkap sangat membantu. Setiap kali 
puasa sunnah, saya tahu pasti sumber hukumnya dari mana."
- Siti, Surabaya ⭐⭐⭐⭐⭐

"Sangat suka dengan educational content-nya. Jadi lebih paham 
hukum-hukum puasa dan keistimewaan berbagai jenis puasa sunnah."
- Zainab, Yogyakarta ⭐⭐⭐⭐⭐
```

---

## 8. Risk & Mitigation

### Potential Risks

```
Risk 1: User confusion dengan banyak pilihan puasa sunnah
├── Impact: LOW (UI/UX yang jelas dapat mengatasi)
├── Mitigation: 
│   ├── Smart recommendation (suggest 1-2 puasa sunnah)
│   ├── Progressive disclosure (show 3 top puasa, others di "See All")
│   └── Guided onboarding untuk fitur baru

Risk 2: Salah informasi tentang hukum puasa
├── Impact: HIGH (bisa mislead users tentang Islam)
├── Mitigation:
│   ├── Review semua content oleh Islamic scholar
│   ├── Multiple sources untuk setiap hadis
│   ├── Disclaimer jika ada pendapat berbeda
│   └── Regular fact-checking & update content

Risk 3: Low adoption rate untuk puasa sunnah
├── Impact: MEDIUM (feature still valuable untuk Ramadhan)
├── Mitigation:
│   ├── Gamification (badges, streaks, goals)
│   ├── Community features (leaderboard, challenges)
│   ├── Referral incentives
│   └── Regular reminders & motivation

Risk 4: Battery drain dari frequent notifications
├── Impact: MEDIUM (bad for user satisfaction)
├── Mitigation:
│   ├── Smart notification batching (group notifications)
│   ├── Respect device doze mode & power saving
│   ├── Allow user to control notification frequency
│   └── Optimize background task scheduling
```

---

## 9. Resources & References

### Islamic Sources Used

```
AL-QURAN:
├── Surah Al-Baqarah 2:183-187 (Ayat Puasa)
├── Surah Al-Qadr 97:1-5 (Lailatul Qadr)
├── Surah Saba' 34:10 (Daud)
├── Surah At-Taubah 66:4 (Taubah)
└── Dan berbagai surah lainnya

HADIS COLLECTIONS:
├── Sahih Al-Bukhari (Kitab Ash-Shiyam)
├── Sahih Muslim (Kitab Ash-Shiyam)
├── Sunan At-Tirmidzi (Kitab Ash-Shiyam)
├── Sunan An-Nasa'i (Kitab Ash-Shiyam)
├── Sunan Ibnu Majah (Kitab Ash-Shiyam)
├── Sunan Abu Daud (Kitab Ash-Shiyam)
└── Muwatta' Imam Malik

TAFSIR:
├── Tafsir Ibnu Katsir
├── Tafsir Al-Qurthubi
├── Tafsir As-Sa'di
└── Tafsir modern Indonesia (Dr. M. Quraish Shihab, dll)

FIQH REFERENCES:
├── Al-Muwaffaq Abu Muhammad Abdullah bin Ahmad bin Muhammad bin Qudamah
├── Badai' As-Sanai' (Islamic jurisprudence)
├── Al-Muhalla bi Al-Athar (Ibn Hazm)
└── Dan referensi ulama lainnya

VERIFICATION:
├── Konsultasi dengan Islamic scholars
├── Cross-reference dengan multiple sources
├── Menggunakan hadis yang sahih/hasan (authentic)
└── Mencantumkan derajat hadis (Sahih, Hasan, Daif)
```

---

## 10. Appendix & Glossary

### Islamic Terms Glossary

```
PUASA (Sawm):
Definisi: Menahan diri dari makan, minum, dan segala hal yang 
membatalkan puasa, dari terbit fajar hingga terbenam matahari, 
dengan niat yang ikhlas untuk ibadah kepada Allah.

RAMADHAN:
Definisi: Bulan ke-9 dalam kalender Hijriyah, bulan di mana 
Al-Quran diturunkan. Bulan yang paling mulia dan istimewa.

SUNNAH:
Definisi: Amalan-amalan sukarela yang tidak wajib, tetapi 
sangat dianjurkan untuk dikerjakan, mengikuti contoh 
Nabi Muhammad saw.

ISTIQOMAH:
Definisi: Konsisten dan terus-menerus dalam melakukan 
kebaikan, tidak putus-putus.

AYYAMUL BIDH:
Definisi: Tiga hari terang bulan (tanggal 13, 14, 15) 
dalam setiap bulan Hijriyah.

DAUD:
Definisi: Puasa ganti hari (puasa sehari, berbuka sehari), 
dinamakan Daud karena Nabi Daud terkenal dengan pola 
puasa ini.

SYAWAL:
Definisi: Bulan ke-10 dalam kalender Hijriyah, bulan setelah 
Ramadhan. Awal bulan ini adalah Hari Raya Idul Fitri.

HIJRA/HIJRI:
Definisi: Kalender lunar Islam yang dimulai dari tahun 
Nabi Muhammad pindah ke Madinah (622 Masehi).

NIAT:
Definisi: Komitmen dan ketulusan dalam hati untuk 
melakukan ibadah.

IKHLAS:
Definisi: Murni/tulus dalam niat, semata-mata karena 
Allah, tanpa mengharap pujian manusia.

TAKWA:
Definisi: Takut kepada Allah dan menjaga diri dari 
perbuatan yang dilarang-Nya.

FADILAH:
Definisi: Keutamaan, keistimewaan, dan keunggulan suatu 
amalan atau hari.

SANAD:
Definisi: Rangkaian periwayat (chain of narrators) yang 
menyampaikan hadis dari sumber aslinya.

HADIS SAHIH:
Definisi: Hadis yang diriwayatkan dengan sanad yang 
bersambung dari periwayat yang adil dan dhabit 
(akurat), serta bebas dari 'illah (cacat tersembunyi).

IJMA':
Definisi: Consensus (kesepakatan) para ulama 
(scholar) tentang suatu hukum Islam.

QA'DA:
Definisi: Penggantian puasa yang ditinggalkan 
dengan puasa di hari-hari lain.
```

---

**Document Status:** APPROVED FOR FEATURE DEVELOPMENT ✅  
**Last Review:** December 14, 2025  
**Ready for:** Development of Puasa Tracker Feature  
**Next Step:** Create UI Mockups & Test Scripts  

---

## Summary

**Feature Name:** Puasa Tracker & Islamic Fasting Guide
**Scope:** Comprehensive tracking + 10+ sunnah guides + Islamic references
**Target Users:** 30-50% of active SholatKu users
**Difficulty:** Medium (depends on educational content depth)
**Timeline:** Can be added in v1.1 or v1.2
**Priority:** High (Ramadhan is peak usage season)

**Key Deliverables:**
- ✅ Ramadhan countdown & daily tracking
- ✅ 10+ Puasa Sunnah with complete Islamic references
- ✅ Statistics & progress visualization
- ✅ Educational content library (Ayat & Hadis)
- ✅ Notification & reminder system
- ✅ Goal setting & gamification
- ✅ Beautiful UI/UX integration

**Expected Impact:**
- 📈 Increase feature engagement 30-50%
- 🕌 Strengthen Islamic education aspect
- 💪 Higher user retention especially during Ramadhan
- ⭐ Improved user satisfaction & reviews

---

**Semoga fitur Puasa Tracker di SholatKu membantu umat Muslim Indonesia 
menjalankan ibadah puasa dengan lebih konsisten, tekun, dan berpengetahuan 
tentang hukum-hukum Islamnya. Allahumma taqabbal minna wa minkas shiyama 
wa sa'ira 'amalinaa. 🤲✨**