# PRD: Muhasabah Diri Tracker Feature
**SholatKu - Daily Self-Reflection & Accountability Module**

**Version:** 1.0  
**Status:** Design Phase  
**Last Updated:** December 14, 2025  
**Author:** Product Team  
**Feature Release Target:** v1.2.0 (12-14 minggu post v1.0.0)  

---

## 1. Executive Summary

**Muhasabah Diri Tracker** adalah fitur spiritual introspection yang membantu Muslim Indonesia melakukan evaluasi diri harian berdasarkan prinsip Islamic accountability (hisab).

**Core Concept:**
- 📋 **Daily Questions** - 4 random pertanyaan muhasabah setiap hari (pool 50+ questions)
- 📝 **Personal Notes** - User isi refleksi & jawaban panjang untuk setiap hari
- 📊 **Calendar Insights** - Lihat history muhasabah sepanjang bulan/tahun
- 🎮 **Gamification** - Streak counter, badges, collections
- 🔍 **Pattern Analysis** - Lihat trend spiritual growth dari hari ke hari

**Target User:** Muslim Indonesia yg serious tentang spiritual development + daily accountability  
**Success Metric:** 50%+ daily active engagement selama Ramadhan, 30%+ retention post-Ramadhan

---

## 2. Problem Statement

### 2.1 User Problems
1. **No structured reflection practice** → Banyak Muslim tahu muhasabah penting tapi tidak konsisten
2. **Forgot to reflect daily** → Tanpa reminder & tracking, mudah lupa introspeksi
3. **No progress visibility** → Tidak bisa lihat spiritual growth dari waktu ke waktu
4. **Isolated practice** → Muhasabah sering private, tanpa gamification/motivation

### 2.2 Islamic Foundation
Muhasabah adalah ibadah yang sangat dianjurkan:
- **QS. Al-Hashr 59:18** - "...dan hendaklah setiap jiwa memperhatikan apa yang telah dipersiapkannya untuk hari esok..."
- **Hadis Umar** - "Hisabu anfusakum qabla an tuhsabu" (Evaluasi diri sebelum dievaluasi)
- **Imam Al-Ghozali** - Muhasabah adalah upaya menjaga diri dan keteguhan dalam ketaatan

---

## 3. Feature Scope

### 3.1 Core Features (MVP - v1.2.0)

✅ **Daily Muhasabah Questions**
- 4 random questions per hari (dari pool 50+)
- Questions berubah-ubah, tidak repeat dalam 1 minggu
- Multiple difficulty levels (Light, Moderate, Deep)
- Arabic translations included

✅ **Personal Reflection Notes**
- Free-form text input untuk setiap hari
- Character limit: 500-2000 chars (detail tapi ringkas)
- Optional: audio record (future)
- Auto-save draft

✅ **Data Storage & History**
- All entries saved automatically
- Calendar view untuk browse history
- See notes dari hari-hari sebelumnya
- Export data (CSV/PDF)

✅ **Streak & Gamification**
- Daily streak counter (berapa hari berturut-turut)
- Completion badges (7-day, 30-day, 100-day)
- Collection system (rare achievements)
- Progress visualization

✅ **Calendar View**
- Month view dengan indicators (hari mana sudah diisi)
- Color coding (completed, partial, skipped)
- Tap any day untuk lihat notes
- Week view juga tersedia

✅ **Insights & Analytics**
- Weekly summary
- Most common reflection themes
- Streak statistics
- Spiritual growth indicator

---

## 4. Detailed Feature Specifications

### 4.1 Daily Muhasabah Questions Pool (50+ Questions)

#### Category A: Niat & Ibadah (10 Questions)

1. **Niat Harian**
   - Hari ini, apakah niat saya mengerjakan sesuatu adalah semata-mata karena Allah?
   - Or in Arabic: هل كانت نيتي في كل عمل اليوم لله وحده؟

2. **Kualitas Sholat**
   - Dalam 5 waktu sholat hari ini, apakah saya sholat dengan khusyu dan penuh perhatian?
   - Pertanyaan fokus: Apakah hati saya hadir atau pikiran melayang?

3. **Dzikir & Doa**
   - Apakah saya melakukan dzikir/doa secara konsisten hari ini?
   - Berapa banyak saya mengingatkan diri tentang Allah?

4. **Bacaan Quran**
   - Berapa banyak Quran yg saya baca hari ini dengan kesadaran penuh?
   - Apakah saya merenungkan maknanya atau hanya membaca begitu saja?

5. **Shadaqah & Amal**
   - Apakah saya berbuat baik kepada seseorang hari ini?
   - Apa motivasi saya? Karena Allah atau mencari apresiasi?

6. **Ibadah Qolb**
   - Apakah saya banyak berfikir positif tentang orang lain?
   - Berapa kali saya berdoa untuk kebaikan seseorang (tidak ada yang tahu)?

7. **Konsistensi Ibadah**
   - Apakah rutinitas ibadah saya hari ini sama seperti kemarin?
   - Atau saya sibuk sehingga meninggalkan beberapa amalan?

8. **Niyyah Taubat**
   - Apakah saya tulus berniat untuk meninggalkan dosa?
   - Atau saya hanya merasa bersalah tanpa action nyata?

9. **Shodaqoh Waktu**
   - Apakah saya gunakan waktu saya untuk hal yang bermanfaat?
   - Berapa lama saya buang waktu untuk hal yang tidak berguna?

10. **Keberkahan Amal**
    - Apakah amal saya hari ini berkesan bagi orang lain?
    - Atau saya hanya mengejar jumlah tanpa kualitas?

#### Category B: Akhlak & Interaksi (12 Questions)

11. **Kesabaran**
    - Apakah saya sabar terhadap orang lain hari ini?
    - Berapa kali saya marah/kehilangan kesabaran?

12. **Kebersyukuran**
    - Apa yang saya syukuri hari ini?
    - Apakah saya fokus pada kekurangan atau mensyukuri kecukupan?

13. **Kejujuran**
    - Apakah saya jujur dalam setiap perkataan hari ini?
    - Apakah saya berbohong atau mengatakan setengah-setengah tentang sesuatu?

14. **Amanah**
    - Apakah saya memenuhi amanah yg diberikan orang?
    - Apa saja yang dipercayakan orang kepada saya, dan apakah saya lakukan dengan baik?

15. **Ibunya Kerendahan Hati (Humility)**
    - Apakah saya sombong atau merasa lebih baik dari orang lain hari ini?
    - Berapa kali saya merendahkan hati mengakui kesalahan?

16. **Kasih Sayang**
    - Apakah saya menunjukkan kasih sayang kepada keluarga hari ini?
    - Apakah ada yang merasa terluka karena saya?

17. **Membantu Orang Lain**
    - Siapa saja yg saya bantu hari ini?
    - Apakah saya menolong dengan sepenuh hati atau setengah hati?

18. **Menghormati Orang Tua & Elder**
    - Apakah saya hormat terhadap orang tua/guru/yang lebih tua?
    - Ada perkataan/tindakan yang tidak menghormati?

19. **Bermaaf-maafan**
    - Apakah ada orang yang saya sakit hati/marah kepada?
    - Apakah saya mau memaafkan atau belum ikhlas?

20. **Gosip & Backbiting**
    - Berapa kali saya membicarakan orang di belakang mereka?
    - Apakah saya ikut-ikutan atau saya tegakkan kebenaran?

21. **Integritas Harian**
    - Apakah saya tetap berprinsip hari ini?
    - Atau saya kompromi nilai demi kenyamanan?

22. **Keikhlasan**
    - Berapa banyak amal saya hari ini yg ikhlas?
    - Atau saya melakukannya untuk pujian/apresiasi orang?

#### Category C: Hawa Nafsu & Godaan (12 Questions)

23. **Keinginan Dunia**
    - Apakah saya tergoda oleh kemewahan/uang hari ini?
    - Apakah saya prioritaskan akhirat atau dunia?

24. **Hawa Nafsu**
    - Apakah saya mendengarkan hawa nafsu atau akal sehat?
    - Ada godaan yang hampir membuat saya tersesat?

25. **Mata & Pendengaran**
    - Apa saja yg saya lihat hari ini?
    - Apakah mata saya menjaga kesopanan (aurat)?

26. **Media & Hiburan**
    - Berapa banyak waktu saya buang untuk social media/hiburan?
    - Apakah konten yang saya konsumsi membawa saya lebih dekat atau jauh dari Allah?

27. **Kemesraan Berlebihan**
    - Apakah saya terlalu fokus pada penampilan/kecantikan?
    - Atau saya seimbang antara perawatan diri dan spiritual?

28. **Keinginan Mahram**
    - Apakah saya jaga pandangan dari hal yang tidak halal?
    - Apakah saya tergoda oleh sesuatu yang haram?

29. **Rasa Iri & Dengki**
    - Apakah saya iri dengan kesuksesan orang lain?
    - Atau saya doakan kebaikan untuk mereka?

30. **Keserakahan**
    - Apakah saya serakah mencari uang/harta?
    - Apakah saya puas dengan rezeki yang diberikan?

31. **Kemarahan Tak Terkontrol**
    - Apakah emosi saya terkontrol?
    - Ada momen dimana saya marah tanpa alasan yg masuk akal?

32. **Penyimpangan Tujuan**
    - Apakah saya mulai tergoda oleh tujuan yang menyimpang dari nilai Islam?
    - Atau saya tetap pada jalur yang benar?

33. **Ketakutan Berlebihan**
    - Apakah saya takut akan prestige/status daripada takut Allah?
    - Apakah keputusan saya dipengaruhi oleh takut orang atau takut Allah?

34. **Sifat Buruk Tiba-tiba**
    - Apakah ada sifat buruk yang muncul tiba-tiba hari ini?
    - Siapa penyebabnya? Bagaimana saya hadapi?

#### Category D: Dosa & Kesalahan (10 Questions)

35. **Dosa Besar**
    - Apakah saya melakukan dosa yang saya ketahui haram?
    - Dosa apa yang paling mengganggu hati saya?

36. **Dosa Kecil**
    - Apakah saya menganggap remeh dosa-dosa kecil?
    - Apakah saya taubat untuk semua dosa, besar atau kecil?

37. **Melawan Orang Tua**
    - Apakah saya menurut kepada orang tua hari ini?
    - Ada momen dimana saya tidak mendengarkan mereka?

38. **Berjanji Palsu**
    - Apakah saya tepati janji yang saya buat?
    - Apakah ada janji yang saya ingkari?

39. **Sumpah Berlebihan**
    - Apakah saya berjanji/bersumpah dengan mudah hari ini?
    - Apakah saya hati-hati dengan sumpah saya?

40. **Dusta**
    - Apakah saya istighfar untuk setiap dusta yg saya katakan?
    - Berapa banyak saya berbohong hari ini?

41. **Kesombongan Rahasia**
    - Apakah ada kesombongan di hati saya yang tidak orang lihat?
    - Apakah saya merasa sombong di depan Allah?

42. **Taubat Palsu**
    - Apakah taubat saya sungguh-sungguh atau hanya di permukaan?
    - Apakah saya niat tidak akan ulangi dosa itu?

43. **Pelanggaran Kecil**
    - Apakah saya melakukan hal-hal kecil yang bertentangan dengan syariat?
    - Contoh: mata yang tidak tertutup, aurat terbuka, dll?

44. **Hutang & Tanggung Jawab**
    - Apakah saya lunasi hutang yang saya punya (materi atau non-materi)?
    - Apakah ada orang yang menunggu saya membayar hutang?

#### Category E: Pertumbuhan & Tujuan (6 Questions)

45. **Tujuan Hidup**
    - Apakah saya masih fokus pada tujuan hidup saya?
    - Atau saya terbawa oleh kesenangan dunia?

46. **Pembelajaran Spiritual**
    - Apakah saya belajar sesuatu yang baru tentang agama hari ini?
    - Berapa banyak investasi saya pada ilmu agama?

47. **Mentoring & Sharing**
    - Apakah saya ajarkan agama kepada orang lain hari ini?
    - Apakah saya hanya menyimpan ilmu untuk diri sendiri?

48. **Perbaikan Diri**
    - Sifat jelek apa yang ingin saya ubah?
    - Apakah saya sudah ambil tindakan untuk mengubahnya?

49. **Komitmen Spiritual**
    - Apakah komitmen saya terhadap Allah masih kuat?
    - Atau mulai kendor dan tergoda?

50. **Visi Akhirat**
    - Apakah saya ingatkan diri tentang akhirat hari ini?
    - Apakah saya takut dan siap menghadapi Allah?

---

### 4.2 Question Selection Logic

```typescript
// Algorithm untuk random selection
- Pool: 50+ questions
- Per day: 4 questions (mix category)
- Never repeat: same question dalam 30 hari
- Variety: max 1 question per category per day
- Difficulty: 2 light + 1 moderate + 1 deep (balance)

// Daily Generation (automatic)
- Time: 12:00 AM (tengah malam)
- Or: First app open, jika setelah 6 AM
- Shuffle algorithm: seeded random (sama seed = sama questions untuk all users)
```

### 4.3 UI: Daily Muhasabah Screen

```
┌─────────────────────────────────────────┐
│ 🤲 MUHASABAH DIRI HARIAN                │
├─────────────────────────────────────────┤
│                                         │
│ Senin, 14 Desember 2025                │
│ Hari ke-45 | Streak: 45 hari 🔥        │
│                                         │
├─────────────────────────────────────────┤
│ PERTANYAAN HARI INI (4):                │
│                                         │
│ 1️⃣ NIAT & IBADAH (Light)               │
│    "Dalam 5 waktu sholat hari ini,      │
│     apakah saya sholat dengan khusyu?"  │
│    [Jawab]                              │
│                                         │
│ 2️⃣ AKHLAK (Moderate)                   │
│    "Apakah saya sabar terhadap orang    │
│     lain hari ini?"                     │
│    [Jawab]                              │
│                                         │
│ 3️⃣ HAWA NAFSU (Moderate)               │
│    "Berapa banyak waktu saya buang      │
│     untuk social media?"                │
│    [Jawab]                              │
│                                         │
│ 4️⃣ DOSA (Deep)                         │
│    "Apakah taubat saya sungguh-sungguh  │
│     atau hanya di permukaan?"           │
│    [Jawab]                              │
│                                         │
├─────────────────────────────────────────┤
│ CATATAN REFLEKSI PRIBADI:               │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ (text field - 500-2000 chars)       │ │
│ │ Tulis refleksi lengkap, perasaan,   │ │
│ │ rencana perbaikan untuk besok...    │ │
│ │                                     │ │
│ │ (Draft auto-save setiap 30 detik)   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Karakter: 245 / 2000                    │
│                                         │
├─────────────────────────────────────────┤
│ [SIMPAN & SELESAI]  [LANJUTKAN BESOK]   │
│                                         │
│ ⭐ Streak akan bertambah 1 setelah klik │
│                                         │
└─────────────────────────────────────────┘
```

### 4.4 Question Answer Format

User bisa jawab dengan cara:
1. **Text Input** - Short answer (50-200 chars)
2. **Reflection Note** - Panjang (di catatan pribadi utama)
3. **Rating** - Slide 1-5 untuk quantify (optional)

```
Pertanyaan: "Apakah saya sholat dengan khusyu hari ini?"

Option 1 - Text Answer:
"Saya sholat dengan khusyu, tapi pikiran sempat melayang
saat sholat Asar karena stress kerja"

Option 2 - Rating:
[Khusyu Level: |---●---| 3/5]
(Explanation di catatan utama)

Both bisa dikombinasikan
```

### 4.5 Calendar View

```
MONTH VIEW - Desember 2025

     Do Se Se Ra Ka Ju Sa
  1       1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣
  2  7️⃣ 8️⃣ 9️⃣ 🔟 1️⃣1️⃣ 1️⃣2️⃣ 1️⃣3️⃣
  3  1️⃣4️⃣ 1️⃣5️⃣ 1️⃣6️⃣ 1️⃣7️⃣ 1️⃣8️⃣ 1️⃣9️⃣ 2️⃣0️⃣
  4  2️⃣1️⃣ 2️⃣2️⃣ 2️⃣3️⃣ 2️⃣4️⃣ 2️⃣5️⃣ 2️⃣6️⃣ 2️⃣7️⃣
  5  2️⃣8️⃣ 2️⃣9️⃣ 3️⃣0️⃣ 3️⃣1️⃣

Legend:
✅ = Completed (4/4 questions + notes)
⚠️  = Partial (questions only, no notes)
⭕ = Skipped (nothing filled)
🔥 = Streak day

Color Coding:
🟢 Green = Consistent days
🟡 Yellow = Occasional days
⚫ Gray = Skipped days
```

Tap any day → Full screen lihat:
- 4 questions yang ditanya
- Answers yang diberikan
- Full reflection notes
- Editing option

### 4.6 Gamification System

#### Streak Counter
```
🔥 45 HARI BERTURUT-TURUT!
├─ Tertinggi bulan ini: 45 hari
├─ Total hari muhasabah tahun ini: 156 hari
└─ Konsistensi tahun ini: 43%
```

#### Badge Collection

Unlocked badges:
- 🥉 **Bronze Reflector** - Complete 7 days (Tier 1)
- 🥈 **Silver Thinker** - Complete 30 days (Tier 1)
- 🏆 **Golden Seeker** - Complete 100 days (Legendary)
- 📚 **Knowledge Keeper** - Read 50+ different questions
- 💪 **Fortress Builder** - Never break streak in 1 month (30+ days)
- 🌙 **Night Warrior** - Complete muhasabah after 8 PM (10 times)
- ⚡ **Speed Thinker** - Complete in <3 minutes (speed challenge)
- 🎯 **Truth Seeker** - Write >1500 chars daily notes (5 times)
- 🙏 **Repentance Master** - Complete Dosa category 20 times
- ✨ **Spiritual Warrior** - Maintain 90+ day streak

#### Collections (Rarity System)

```
COLLECTIONS - Unlock special items

🌟 COMMON (25% unlock rate)
   └─ 50 different questions asked & answered
   └─ Unlock: Special badge + avatar frame

💎 RARE (10% unlock rate)
   └─ Deep reflection questions answered consistently
   └─ Unlock: Premium avatar border + theme unlock

👑 LEGENDARY (3% unlock rate)
   └─ Perfect month (30/30 days, 4/4 questions)
   └─ Unlock: Exclusive icon + special title
   └─ Reward: 1 month ad-free

🔮 EPIC QUEST (1% unlock rate)
   └─ Ramadhan challenge (30 days perfect during Ramadhan)
   └─ Unlock: Rarest badge + lifetime special status
```

Profile shows collection:
```
KOLEKSI SAYA:

Common Badges: 12/50 ⭐
Rare Items: 3/20 💎
Legendary Unlocks: 1/10 👑
Epic Quests: 0/5 🔮

Completion: 23%
```

### 4.7 Data Storage Schema

```typescript
// Daily Entry
interface MuhasabahEntry {
  id: string;
  date: Date;
  dayStreak: number;
  
  questions: {
    id: string;
    text: string;
    category: string;
    difficulty: 'light' | 'moderate' | 'deep';
    userAnswer?: string;
    rating?: number; // 1-5
  }[]; // exactly 4
  
  reflectionNotes: {
    fullText: string;
    charCount: number;
    editedAt: Date;
    autoSaved: boolean;
  };
  
  completionStatus: 'full' | 'partial' | 'skipped';
  completedAt: Date;
  
  timeSpent: number; // in seconds
  mood?: 'light' | 'neutral' | 'heavy'; // inferred from notes
}

// Stats & Analytics
interface MuhasabahStats {
  userId: string;
  totalDaysCompleted: number;
  currentStreak: number;
  longestStreak: number;
  
  avgTimePerSession: number;
  mostAnsweredCategory: string;
  totalCharactersWritten: number;
  
  monthlyCompletion: {
    month: string;
    completed: number; // days
    total: number; // days in month
    percentage: number;
  }[];
  
  unlockedBadges: string[];
  collections: {
    common: number;
    rare: number;
    legendary: number;
    epic: number;
  };
}

// Insights
interface MuhasabahInsights {
  weekSummary: {
    week: number;
    date: Date;
    consistency: string; // "Excellent", "Good", "Fair"
    topThemes: string[]; // dari answers
    recommendedFocus: string; // area yg perlu improve
  }[];
  
  yearTrend: {
    month: string;
    completionRate: number;
    avgSessionLength: number;
    emotionalTone: 'positive' | 'neutral' | 'reflective';
  }[];
  
  patternAnalysis: {
    bestTimeToReflect: string; // e.g., "Early morning 5-6 AM"
    mostActiveCategory: string;
    growthAreas: string[];
    areasToWork: string[];
  };
}
```

### 4.8 Weekly & Monthly Insights

```
WEEKLY SUMMARY - Minggu ke-2 Desember

✅ Completion: 7/7 hari SEMPURNA!
⭐ Konsistensi: Excellent 🎉

Total Waktu Refleksi: 3 jam 45 menit
Rata-rata per hari: 32 menit

TOP THEMES MINGGUAN:
1. Khusyu dalam sholat (5 mentions)
2. Kesabaran dengan keluarga (4 mentions)
3. Media & hiburan (3 mentions)

EMOTIONAL TONE: Reflective + Positive 🙏

RECOMMENDATIONS:
→ Fokus pada: Integritas (baru disebutkan)
→ Terus pertahankan: Konsistensi ibadah
→ Improve: Balance antara dunia & akhirat

NEXT WEEK TARGET: Maintain streak + deeper reflection!

[SHARE SUMMARY] [EXPORT DATA]
```

### 4.9 Notes Management

```
NOTES HISTORY - Desember

Senin, 14 Des (Hari 45)
"Hari ini saya sadar bahwa saya sering lalai 
dalam sholat Dzuhur. Saya tergesa-gesa hanya 
ingin menyelesaikan sholat tanpa khusyu. 
Saya perlu lebih sadar akan kehadiran Allah 
ketika berdiri di hadapan-Nya. Target besok: 
sholat Dzuhur dengan khusyu penuh 30 menit 
sebelum, minimal 5 menit meditasi niat."

[VIEW] [EDIT] [DELETE]

Minggu, 13 Des (Hari 44)
"Alhamdulillah hari ini saya berhasil 
membantu ibu membersihkan rumah tanpa 
diminta. Saya merasa ikhlas dan bahagia..."

[VIEW] [EDIT] [DELETE]

Sabtu, 12 Des (Hari 43)
...
```

---

## 5. User Flows

### Flow 1: First Time Opening
1. Welcome screen: "Mulai Muhasabah Diri Harian"
2. Brief explanation tentang muhasabah + Islamic basis
3. Permission untuk notifications
4. First 4 questions presented
5. Onboarding complete → go to daily screen

### Flow 2: Daily Muhasabah (Typical)
1. Open app or notification
2. See 4 questions for today
3. Answer 4 questions (text or rating)
4. Write reflection notes
5. [SIMPAN & SELESAI]
6. See streak +1 animation
7. Optional: check stats/badges

### Flow 3: View History
1. Go to Calendar tab
2. Browse month/year
3. Tap any day (green = completed)
4. See questions asked & notes written
5. Edit notes if wanted
6. See insights sidebar

### Flow 4: Check Achievements
1. Open Badges tab
2. See unlocked badges with unlock date
3. See locked badges with requirements
4. Open Collections view
5. See completion percentage

---

## 6. Reminders & Notifications

### Notification Strategy

```
TYPE 1: Daily Reminder
├─ Time: 8 PM (customizable)
├─ Message: "Waktu muhasabah diri! Refleksikan hari 
│           ini sebelum tidur 🤲"
├─ Action: Open app → questions
└─ Frequency: Daily

TYPE 2: Streak Warning
├─ Trigger: User didn't fill day 25 at 10 PM
├─ Message: "Jangan putus! Masih ada waktu 
│           untuk muhasabah hari ini 🔥"
├─ Action: Quick fill
└─ Frequency: Once per day if missed

TYPE 3: Motivation
├─ Trigger: Every 10-day streak milestone
├─ Message: "🎉 Wah! Sudah 10 hari berturut-turut.
│           Semangat! Jangan putus"
├─ Action: Open badges
└─ Frequency: Auto on milestones

TYPE 4: Weekly Summary
├─ Time: Friday 6 PM
├─ Message: "Ringkasan muhasabah minggu ini: 
│           6/7 hari, konsistensi Baik!"
├─ Action: Open summary
└─ Frequency: Weekly
```

---

## 7. Advanced Features (Future)

### v1.2.1 (Weeks 3-4)
- Audio journal (voice record reflection)
- Mood tracking (visual mood log)
- Custom questions (user create own)

### v1.3.0 (Weeks 5-8)
- AI suggestions based on patterns
- Spiritual coaching tips (personalized)
- Integration dengan puasa tracker
- Monthly prayer (duaa) recommendations

### v1.4.0+
- Community challenges (private group)
- Accountability partners
- Export to PDF/beautiful reports
- Integration dengan calendar for special dates
- Multi-language support

---

## 8. Technical Specs

### Frontend Stack
- React Native + Expo
- Redux (state management)
- SQLite (local storage)
- expo-notifications (reminders)
- react-native-calendar (calendar UI)

### Data Storage
- SQLite: muhasabah_entries, muhasabah_stats, questions_pool
- Cloud sync: Firebase (future for backup)
- Offline-first: all data stored locally

### Question Pool Management
- Static JSON file (50 questions)
- Seeded RNG untuk deterministic selection
- Pre-loaded at app start
- Weekly update possible (backend optional)

### Performance
- Calendar render: <1 sec (month view)
- Statistics calculation: <500ms
- Notification trigger: ±5 min margin

---

## 9. Success Metrics

### Primary KPIs (v1.2.0 launch)
- **Daily Active Users** (Muhasabah only): 40%+ of total DAU
- **Completion Rate**: 70%+ daily completion during launch month
- **Streak Achievement**: 50%+ achieve 7+ day streak
- **Reflection Quality**: avg 500+ characters per notes
- **Feature Retention**: 45%+ still using after 30 days post-launch

### Secondary KPIs
- **Badge Unlock Rate**: 30%+ unlock at least 3 badges
- **Collection Completion**: 15%+ reach Rare tier
- **Consistency Pattern**: 25%+ maintain >50% monthly completion
- **User Satisfaction**: 4.5+ rating from users

### Quality Metrics
- **Crash rate**: <0.05% (feature specific)
- **Notification delivery**: 95%+ on-time
- **Data integrity**: 100% no lost entries
- **Load time**: <1.5 sec all views

---

## 10. Implementation Timeline

### Phase 1: Foundation (Weeks 1-2)
- Database schema setup
- 50 questions library creation
- Calendar component setup
- Basic UI screens

### Phase 2: Core Features (Weeks 3-4)
- Daily questions & answers
- Notes storage & editing
- Streak counter
- Basic stats

### Phase 3: Gamification & Insights (Weeks 5-6)
- Badge system implementation
- Collections & unlocking
- Weekly/monthly analytics
- Insights calculation

### Phase 4: Polish & Testing (Week 7)
- QA testing all features
- Performance optimization
- Notification testing
- Beta with 50+ users

### Phase 5: Launch (Week 8)
- Marketing assets
- Store listing
- Soft launch (10%)
- Full launch (100%)

**Target Launch**: Late April 2026 (post-Ramadhan, Eid season)

---

## 11. Risks & Mitigation

| Risk | Mitigation |
|------|-----------|
| Low daily engagement | Strong onboarding, daily notifications, streak motivation |
| Notification fatigue | Customizable reminder time, skip option |
| Question repetition fatigue | 50+ diverse questions, 30-day non-repeat guarantee |
| Data privacy concerns | Explicit privacy policy, all data local by default |
| Algorithm gamification abuse | Random seeding, can't predict questions, streak resets fairly |
| Burnout from deep reflection | Mix light + moderate questions, optional depth |

---

## 12. FAQ & UX Considerations

**Q: Apakah pertanyaan akan selalu sama setiap hari?**
A: Tidak. Setiap hari dapat 4 random questions dari pool 50, tidak repeat dalam 30 hari. Setiap user dapat pertanyaan yang berbeda (seeded RNG).

**Q: Apakah saya bisa skip hari?**
A: Ya, tapi streak akan reset jadi 0. Sebelum reset, ada warning notification untuk prevent accidental skip.

**Q: Apakah notes saya bisa dilihat orang lain?**
A: Tidak. Semua notes private, local storage only. Tidak ada sharing/public profile.

**Q: Bagaimana kalau saya ingin edit notes lama?**
A: Bisa. Tap any day in calendar → edit notes. Timestamp preserved tapi ada "edited" marker.

**Q: Apakah ada backup data?**
A: MVP v1.2.0: Local only. v1.3.0+: Optional cloud backup (Firebase).

---

## 13. Islamic Authenticity

### Sources for Questions:
- ✅ Quran (Al-Hashr 59:18, At-Taubah 126, Al-Ankabut 45)
- ✅ Hadis Sahih (Bukhari, Muslim, Tirmidzi)
- ✅ Imam Al-Ghozali writings
- ✅ Islamic scholars (Imam An-Nawawi, Ibn Qayyim Al-Jawziyyah)

### Review Process:
- All questions reviewed oleh Islamic scholar
- Ensure authenticity & alignment dengan tawheed
- Avoid controversial madhab-specific questions
- Focus on universal Islamic principles

---

## 14. Approval & Sign-off

**Status:** ✅ READY FOR DESIGN & DEVELOPMENT

**Next Steps:**
1. Islamic scholar review on questions
2. Design mockups (Figma)
3. Database & API setup
4. Begin Phase 1 implementation

---

**Final Notes:**

Fitur ini bukan sekadar tracking app. Ini adalah **spiritual companion** yang membantu Muslim untuk:
- Hidup lebih sadar & accountable kepada Allah
- Membangun habits introspeksi yang sustainable
- Melihat growth spiritual dari waktu ke waktu
- Tetap termotivasi melalui gamification yang meaningful

Kombinasi antara:
- **Islamic foundation** (muhasabah adalah sunnah Rasul)
- **Modern UX** (calendar, gamification, analytics)
- **Personalization** (50+ questions, random daily)
- **Engagement mechanics** (streaks, badges, collections)

= Platform introspeksi yang powerful dan menggerakkan.

Good luck dengan implementation! 🤲✨
