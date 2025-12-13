# Technical Design Document (TDD)
## SholatKu - React Native + Expo
### Implementation Architecture & Specifications

**Versi:** 2.0  
**Status:** Ready for Development  
**Last Updated:** December 13, 2025  
**Platform:** React Native + Expo (iOS 13+, Android 8+)  

---

## 1. Technology Stack

### Frontend Stack
```
├── React Native 0.72+
│   ├── React 18.2+
│   └── TypeScript 5.0+ (strict mode)
│
├── Navigation
│   ├── React Navigation 6.x
│   ├── Stack Navigator
│   └── Bottom Tab Navigator
│
├── State Management
│   ├── Redux Toolkit 1.9+
│   ├── Redux Persist 6.0+
│   └── React Redux 8.1+
│
├── UI Components & Styling
│   ├── React Native Paper 5.9+ (Material Design)
│   ├── Tamagui 1.0+ (optional, for advanced components)
│   └── Reanimated 2.x (smooth animations)
│
├── Data Management
│   ├── Axios 1.6+ (HTTP client)
│   ├── @tanstack/react-query 5.0+ (server state)
│   └── expo-sqlite 13.0+ (local database)
│
├── Sensors & Location
│   ├── expo-location 16.0+
│   ├── expo-compass 12.0+
│   ├── expo-sensors 12.0+
│   └── react-native-maps 1.0+
│
├── Background & Notifications
│   ├── expo-task-manager 11.0+
│   ├── expo-background-fetch 11.0+
│   ├── expo-notifications 0.20+
│   └── expo-av 13.0+ (audio)
│
└── Utilities
    ├── date-fns 2.30+
    ├── zustand 4.4+ (optional, lightweight state)
    └── lodash 4.17+
```

### Development Stack
```
├── Build & Bundling
│   ├── Expo CLI 50.0+
│   ├── Expo EAS Build (managed)
│   └── Metro Bundler (React Native default)
│
├── Testing
│   ├── Jest 29.0+
│   ├── @testing-library/react-native 12.0+
│   └── Detox (E2E testing, optional)
│
├── Development Tools
│   ├── VS Code + Expo extensions
│   ├── Cursor AI / Claude Code
│   └── Expo DevTools
│
└── Version Control & CI/CD
    ├── Git & GitHub
    ├── GitHub Actions (optional)
    └── Expo EAS Submit (app store publishing)
```

---

## 2. Project Structure & Folder Architecture

```
SholatKu/
├── App.tsx                          # Root component
├── app.json                         # Expo configuration
├── package.json
├── tsconfig.json
│
├── src/
│   ├── navigation/
│   │   ├── RootNavigator.tsx       # Main navigation setup
│   │   ├── BottomTabNavigator.tsx
│   │   └── LinkingConfiguration.ts # Deep linking
│   │
│   ├── screens/
│   │   ├── HomeScreen.tsx          # Main prayer times display
│   │   ├── CompassScreen.tsx       # Qibla compass
│   │   ├── TrackerScreen.tsx       # Sholat & puasa tracking
│   │   ├── TasbihScreen.tsx        # Dhikr counter
│   │   ├── CalendarScreen.tsx      # Hijri calendar
│   │   ├── SettingsScreen.tsx      # App settings
│   │   ├── MapScreen.tsx           # Nearby masjids
│   │   └── SplashScreen.tsx        # Onboarding
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── ErrorBoundary.tsx
│   │   │
│   │   ├── prayer/
│   │   │   ├── PrayerCard.tsx      # Individual prayer display
│   │   │   ├── CountdownTimer.tsx  # Countdown to next prayer
│   │   │   ├── ProgressBar.tsx     # Daily progress (0-5)
│   │   │   └── StreakDisplay.tsx   # Streak counter with emoji
│   │   │
│   │   ├── compass/
│   │   │   ├── CompassNeedle.tsx
│   │   │   └── CompassCircle.tsx
│   │   │
│   │   ├── tasbih/
│   │   │   ├── TasbihCounter.tsx
│   │   │   └── CounterButton.tsx
│   │   │
│   │   └── calendar/
│   │       ├── HijriCalendar.tsx
│   │       └── IslamicDates.tsx
│   │
│   ├── hooks/
│   │   ├── usePrayerTimes.ts       # Fetch & cache prayer times
│   │   ├── useCompass.ts           # Compass sensor management
│   │   ├── useLocation.ts          # GPS & location detection
│   │   ├── useTracker.ts           # Sholat tracking state
│   │   ├── useTasbih.ts            # Tasbih counter state
│   │   ├── useNotifications.ts     # Notification setup
│   │   ├── useBackgroundTask.ts    # Background task management
│   │   ├── useAsync.ts             # Utility async hook
│   │   └── index.ts                # Export all hooks
│   │
│   ├── redux/
│   │   ├── store.ts                # Redux store configuration
│   │   ├── hooks.ts                # Typed Redux hooks
│   │   └── slices/
│   │       ├── prayersSlice.ts     # Prayer times state
│   │       ├── trackerSlice.ts     # Sholat tracker state
│   │       ├── settingsSlice.ts    # App settings state
│   │       ├── locationSlice.ts    # Location & GPS state
│   │       ├── tasbihSlice.ts      # Tasbih counter state
│   │       └── uiSlice.ts          # UI/UX state (loading, errors)
│   │
│   ├── services/
│   │   ├── api/
│   │   │   ├── prayerTimesApi.ts  # Aladhan API client
│   │   │   ├── mapsApi.ts         # Google Maps API
│   │   │   └── client.ts          # Axios instance config
│   │   │
│   │   ├── database/
│   │   │   ├── dbInit.ts          # SQLite initialization
│   │   │   ├── prayerDb.ts        # Prayer times repository
│   │   │   ├── trackerDb.ts       # Tracker repository
│   │   │   ├── tasbihDb.ts        # Tasbih repository
│   │   │   ├── locationDb.ts      # Location repository
│   │   │   ├── islamicDatesDb.ts  # Islamic dates repository
│   │   │   ├── masjidDb.ts        # Masjid repository
│   │   │   └── index.ts           # Export repositories
│   │   │
│   │   ├── background/
│   │   │   └── taskManager.ts     # Background task handlers
│   │   │
│   │   ├── notifications/
│   │   │   ├── notificationManager.ts  # Notification setup & sending
│   │   │   ├── soundManager.ts         # Azan sound playback
│   │   │   └── channels.ts             # Android notification channels
│   │   │
│   │   └── sensors/
│   │       ├── compassManager.ts   # Compass & qibla calculation
│   │       └── locationManager.ts  # GPS & location services
│   │
│   ├── utils/
│   │   ├── dateTime.ts             # Date/time utilities
│   │   ├── prayer.ts               # Prayer-related helpers
│   │   ├── qibla.ts                # Qibla calculation
│   │   ├── hijri.ts                # Hijri calendar conversion
│   │   ├── constants.ts            # App-wide constants
│   │   ├── permission.ts           # Permission requests
│   │   └── validators.ts           # Input validation
│   │
│   ├── types/
│   │   ├── index.ts                # Root types export
│   │   ├── prayer.ts               # Prayer-related types
│   │   ├── tracker.ts              # Tracker types
│   │   ├── settings.ts             # Settings types
│   │   ├── api.ts                  # API response types
│   │   └── storage.ts              # Storage types
│   │
│   ├── theme/
│   │   ├── colors.ts               # Color palette
│   │   ├── typography.ts           # Font sizes & weights
│   │   ├── spacing.ts              # Padding/margin scales
│   │   └── darkMode.ts             # Dark mode colors
│   │
│   └── assets/
│       ├── sounds/
│       │   ├── azan-default.mp3
│       │   ├── azan-makkah.mp3
│       │   ├── azan-madinah.mp3
│       │   └── ...
│       │
│       ├── images/
│       │   ├── logo.png
│       │   ├── splash.png
│       │   └── icons/
│       │
│       └── fonts/
│           └── (custom fonts if needed)
│
├── __tests__/
│   ├── utils/
│   │   ├── qibla.test.ts
│   │   ├── hijri.test.ts
│   │   ├── dateTime.test.ts
│   │   └── prayer.test.ts
│   │
│   ├── hooks/
│   │   └── usePrayerTimes.test.ts
│   │
│   └── services/
│       └── prayerTimesApi.test.ts
│
└── docs/
    ├── ARCHITECTURE.md
    ├── API_INTEGRATION.md
    ├── DATABASE_SCHEMA.md
    └── SETUP_GUIDE.md
```

---

## 3. Database Schema (SQLite)

### Tables & Fields

#### `prayer_times` Table
```sql
CREATE TABLE prayer_times (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT UNIQUE NOT NULL,           -- YYYY-MM-DD
  city TEXT NOT NULL,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  timezone TEXT NOT NULL,
  calculation_method INTEGER,          -- 1-15 (JAKIM=11)
  
  -- Prayer times (HH:mm format)
  fajr TEXT NOT NULL,
  shuruq TEXT NOT NULL,
  dhuhr TEXT NOT NULL,
  asr TEXT NOT NULL,
  maghrib TEXT NOT NULL,
  isha TEXT NOT NULL,
  
  -- Additional times
  imsak TEXT,
  dhuha TEXT,
  
  -- Metadata
  hijri_date TEXT,                     -- 1445-01-01
  hijri_month_name TEXT,               -- Muharram, Safar, etc
  day_of_week TEXT,                    -- Monday, Tuesday, etc
  
  -- Cache management
  expires_at INTEGER,                  -- Unix timestamp
  last_updated INTEGER,
  
  FOREIGN KEY(city) REFERENCES locations(city)
);

CREATE INDEX idx_prayer_date ON prayer_times(date);
CREATE INDEX idx_prayer_city ON prayer_times(city);
CREATE INDEX idx_prayer_expires ON prayer_times(expires_at);
```

#### `checkins` Table
```sql
CREATE TABLE checkins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  prayer_date TEXT NOT NULL,           -- YYYY-MM-DD
  prayer_type TEXT NOT NULL,           -- fajr, dhuhr, asr, maghrib, isha
  checked_in_at INTEGER NOT NULL,      -- Unix timestamp
  checked_in_time TEXT NOT NULL,       -- HH:mm actual time user prayed
  notes TEXT,                          -- Optional notes
  location TEXT,                       -- Where user prayed
  
  UNIQUE(prayer_date, prayer_type),
  FOREIGN KEY(prayer_date) REFERENCES prayer_times(date)
);

CREATE INDEX idx_checkin_date ON checkins(prayer_date);
CREATE INDEX idx_checkin_type ON checkins(prayer_type);
```

#### `streaks` Table
```sql
CREATE TABLE streaks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  current_streak INTEGER DEFAULT 0,    -- Days with all 5 prayers
  longest_streak INTEGER DEFAULT 0,
  total_days_tracked INTEGER DEFAULT 0,
  last_updated INTEGER NOT NULL
);
```

#### `locations` Table
```sql
CREATE TABLE locations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  city TEXT UNIQUE NOT NULL,
  country TEXT,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  timezone TEXT NOT NULL,
  calculation_method INTEGER DEFAULT 11,
  
  is_favorite BOOLEAN DEFAULT 0,
  is_current BOOLEAN DEFAULT 0,
  
  created_at INTEGER,
  last_used INTEGER
);

CREATE INDEX idx_location_favorite ON locations(is_favorite);
CREATE INDEX idx_location_current ON locations(is_current);
```

#### `tasbih_records` Table
```sql
CREATE TABLE tasbih_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,                  -- YYYY-MM-DD
  tasbih_name TEXT NOT NULL,           -- Subhanallah, etc
  count INTEGER NOT NULL DEFAULT 0,
  target_count INTEGER,
  completed BOOLEAN DEFAULT 0,
  
  created_at INTEGER,
  updated_at INTEGER,
  
  UNIQUE(date, tasbih_name)
);

CREATE INDEX idx_tasbih_date ON tasbih_records(date);
```

#### `islamic_dates` Table
```sql
CREATE TABLE islamic_dates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  hijri_date TEXT UNIQUE NOT NULL,     -- 1445-01-01
  gregorian_date TEXT NOT NULL,
  event_name TEXT NOT NULL,            -- Ramadan, Eid Fitri, etc
  event_type TEXT,                     -- month_start, special_day, etc
  notification_enabled BOOLEAN DEFAULT 1,
  
  created_at INTEGER
);
```

#### `masjids` Table
```sql
CREATE TABLE masjids (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  address TEXT,
  city TEXT NOT NULL,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  phone TEXT,
  website TEXT,
  
  school_type TEXT,                   -- Hanafi, Syafiiyah, etc
  amenities TEXT,                     -- JSON: {wudu, toilet, parking, etc}
  
  rating REAL DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  
  is_verified BOOLEAN DEFAULT 0,
  last_updated INTEGER,
  
  FOREIGN KEY(city) REFERENCES locations(city)
);

CREATE INDEX idx_masjid_city ON masjids(city);
CREATE INDEX idx_masjid_location ON masjids(latitude, longitude);
```

---

## 4. API Integration

### Aladhan API Client
**Endpoint:** https://api.aladhan.com/v1

```typescript
// Example: Get prayer times for specific date & location
GET /timings/DDMMYYYY?latitude=LAT&longitude=LNG&method=METHOD&school=SCHOOL

Response:
{
  code: 200,
  status: "OK",
  data: {
    timings: {
      Fajr: "04:45",
      Sunrise: "06:10",
      Dhuhr: "12:35",
      Asr: "15:55",
      Sunset: "19:00",
      Maghrib: "19:05",
      Isha: "20:30",
      Imsak: "04:35",
      Dhuha: "06:35"
    },
    date: {
      readable: "13 Dec 2025",
      timestamp: "1702425600",
      gregorian: { date: "13-12-2025", ... },
      hijri: { date: "29-06-1446", ... }
    },
    meta: {
      latitude: -6.2293,
      longitude: 106.6626,
      timezone: "Asia/Jakarta",
      method: { id: 11, name: "JAKIM", ... },
      ...
    }
  }
}
```

### Google Maps API (Optional, for masjid finding)
**Endpoints:**
- Nearby Search
- Place Details
- Geocoding

---

## 5. Redux State Structure

```typescript
// Root State
interface RootState {
  prayers: PrayersState
  tracker: TrackerState
  tasbih: TasbihState
  location: LocationState
  settings: SettingsState
  ui: UiState
}

// Prayers Slice
interface PrayersState {
  todayPrayers: PrayerTime | null
  monthPrayers: PrayerTime[]
  nextPrayer: {
    type: PrayerType
    time: string
    minutesUntil: number
  } | null
  loading: boolean
  error: string | null
  lastUpdate: number | null
}

// Tracker Slice
interface TrackerState {
  todayCheckins: Map<PrayerType, CheckInEntity>
  currentStreak: number
  longestStreak: number
  totalDaysTracked: number
  monthlyStats: Statistics
  selectedDate: string
}

// Tasbih Slice
interface TasbihState {
  counters: TasbihCounter[]
  selectedCounter: TasbihCounter | null
  dailyGoals: Map<string, number>
}

// Location Slice
interface LocationState {
  currentLocation: Location | null
  favoriteLocations: Location[]
  isAutoDetect: boolean
}

// Settings Slice
interface SettingsState {
  azanType: string
  notificationsEnabled: boolean
  vibrateEnabled: boolean
  reminderMinutes: number
  darkMode: boolean
  calculationMethod: number
  language: string
  soundVolume: number
  iqomahEnabled: boolean
}

// UI Slice
interface UiState {
  loading: boolean
  error: string | null
  snackbarMessage: string | null
  selectedTab: number
}
```

---

## 6. Custom Hooks Interface

### usePrayerTimes(date?: string)
```typescript
interface UsePrayerTimesResult {
  prayers: PrayerTime | null
  monthPrayers: PrayerTime[]
  loading: boolean
  error: string | null
  retry: () => void
  nextPrayer: { type: string, minutesUntil: number } | null
}
```

### useCompass()
```typescript
interface UseCompassResult {
  heading: number                    // 0-360°
  accuracy: 'Excellent' | 'Good' | 'Fair' | 'Poor'
  qibla: number                      // 0-360° to Makkah
  relativeAngle: number              // Device to Qibla
  calibrationNeeded: boolean
}
```

### useLocation()
```typescript
interface UseLocationResult {
  location: { latitude: number, longitude: number, city: string } | null
  loading: boolean
  error: string | null
  retry: () => void
}
```

### useTracker()
```typescript
interface UseTrackerResult {
  checkins: Map<PrayerType, CheckInEntity>
  streak: { current: number, longest: number }
  progress: number                   // 0-5
  checkInPrayer: (type: PrayerType) => Promise<void>
  undoCheckIn: (type: PrayerType) => Promise<void>
  getMonthlyStats: () => Statistics
}
```

---

## 7. Key Components Interface

### PrayerCard
```typescript
interface PrayerCardProps {
  prayerType: PrayerType
  time: string                       // HH:mm
  status: 'passed' | 'next' | 'pending'
  minutesUntil?: number
  checked: boolean
  onCheckIn: () => void
}
```

### CompassNeedle
```typescript
interface CompassNeedleProps {
  heading: number                    // Current device heading
  qibla: number                      // Qibla direction
  relativeAngle: number              // Angle from device to qibla
}
```

### TasbihCounter
```typescript
interface TasbihCounterProps {
  count: number
  target: number
  onIncrement: () => void
  onReset: () => void
}
```

---

## 8. Service Layer Architecture

### PrayerTimesApi Service
```typescript
class PrayerTimesApiClient {
  async getPrayerTimes(
    date: string,
    lat: number,
    lng: number,
    method: number
  ): Promise<PrayerResponse>
  
  async getPrayerTimesMonth(
    year: number,
    month: number,
    lat: number,
    lng: number
  ): Promise<PrayerResponse[]>
  
  async getQiblaDirection(
    lat: number,
    lng: number
  ): Promise<{ qibla: number, timezone: string }>
}
```

### Database Repositories
```typescript
class PrayerRepository {
  async insertPrayerTimes(prayer: PrayerEntity): Promise<void>
  async getPrayerTimesForDate(date: string): Promise<PrayerEntity | null>
  async getPrayerTimesMonth(year, month): Promise<PrayerEntity[]>
  async deleteExpiredCache(expiresAt: number): Promise<void>
}

class TrackerRepository {
  async insertCheckIn(checkin: CheckInEntity): Promise<void>
  async getCheckInsForDate(date: string): Promise<CheckInEntity[]>
  async getStreakInfo(): Promise<StreakEntity>
  async updateStreak(streak: StreakEntity): Promise<void>
}

// Similar for Tasbih, Location, IslamicDates, Masjid
```

---

## 9. Background Task Implementation

### Background Prayer Notification Task
```typescript
// Define background task handler
const PRAYER_CHECK_TASK = 'PRAYER_CHECK_TASK'

async function prayerCheckTask() {
  try {
    // 1. Get current location from storage
    const location = await getStoredLocation()
    
    // 2. Fetch prayer times for today
    const prayers = await prayerTimesDb.getPrayerTimesForDate(today)
    
    // 3. Get current time
    const now = new Date()
    
    // 4. Check if any prayer time matches (±1 minute tolerance)
    const matchingPrayer = prayers.find(p => 
      timeDifference(now, parseTime(p.time)) <= 60
    )
    
    // 5. If match, trigger notification
    if (matchingPrayer) {
      await notificationManager.showPrayerNotification(
        matchingPrayer.name,
        matchingPrayer.time,
        'prayer'
      )
    }
    
    return BackgroundFetch.Result.NewData
  } catch (error) {
    console.error('Prayer check task failed:', error)
    return BackgroundFetch.Result.Failed
  }
}

// Register task
async function registerBackgroundTask() {
  try {
    await BackgroundFetch.registerTaskAsync(PRAYER_CHECK_TASK, {
      minimumInterval: 5 * 60,        // 5 minutes
      stopOnTerminate: false,
      startOnBoot: true
    })
    TaskManager.defineTask(PRAYER_CHECK_TASK, prayerCheckTask)
  } catch (error) {
    console.error('Failed to register background task:', error)
  }
}
```

---

## 10. Performance Optimization

### Strategies
1. **Code Splitting:** Lazy-load screens with React.lazy()
2. **Memoization:** React.memo for expensive components
3. **FlatList Optimization:** keyExtractor, getItemLayout, removeClippedSubviews
4. **Image Optimization:** Use react-native-fast-image
5. **Redux Selectors:** Use reselect for derived state
6. **Database Indexing:** Create indexes on frequently queried columns
7. **API Caching:** 24-hour cache TTL for prayer times
8. **Background Task:** Optimized intervals, no excessive polling

### Memory Management
- Cleanup useEffect subscriptions properly
- Unsubscribe from sensors/compass when not needed
- Limit cached data to 2 months
- Clear old database records periodically

---

## 11. Testing Strategy

### Unit Tests (Jest)
- Utility functions: qibla.ts, hijri.ts, dateTime.ts
- Redux reducers
- Service methods

### Integration Tests
- API client + database flow
- Redux store + components

### E2E Tests (Detox, optional)
- First launch onboarding
- Prayer notification trigger
- Tracker check-in flow

---

## 12. Security & Privacy

### Data Security
- Local data encrypted (SQLite with encryption)
- No authentication needed (local app)
- No external data transmission
- Permission: Runtime (Android 6+)

### Privacy
- GDPR compliant
- No analytics by default
- Optional Firebase Analytics
- No ads tracking (basic CPM)

---

## 13. Deployment & Release

### Build Process
1. **Development:** `expo start` → Expo Go
2. **Testing:** `eas build --platform ios --profile preview` (iOS)
3. **Production:** `eas build --platform ios --profile production` (iOS)
4. **App Store:** `eas submit --platform ios`
5. **Google Play:** Similar process for Android

### Version Management
- Semantic versioning: Major.Minor.Patch
- Changelog per version
- Beta releases via TestFlight + Google Play Beta

---

**Document Status:** APPROVED FOR DEVELOPMENT ✅  
**Last Review:** December 13, 2025  
**Tech Lead:** React Native + Expo Specialist  
**Ready for:** PROMPT 1 (Expo Project Setup)