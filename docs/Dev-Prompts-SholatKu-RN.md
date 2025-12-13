# Development Prompts untuk SholatKu (React Native + Expo)
## Siap Copy-Paste ke Cursor, Claude Code, atau VibeCode

---

## PROMPT 1: Expo Project Setup & Architecture

```
OBJECTIVE:
Setup Expo project SholatKu dengan folder structure yang clean sesuai architecture pattern,
beserta semua dependencies yang diperlukan.

REQUIREMENTS:

1. CREATE EXPO PROJECT:
   npx create-expo-app SholatKu --template

2. INSTALL DEPENDENCIES dengan npm/yarn:
   Core packages:
   - react@^18.2.0
   - react-native@^0.72.0
   - expo@^50.0.0
   - typescript@^5.0.0
   - @react-navigation/native@^6.1.0
   - @react-navigation/bottom-tabs@^6.5.0
   - @react-navigation/stack@^6.3.0

   State Management:
   - @reduxjs/toolkit@^1.9.7
   - react-redux@^8.1.3
   - redux-persist@^6.0.0

   API & Data:
   - axios@^1.6.0
   - @tanstack/react-query@^5.0.0
   - expo-sqlite@^13.0.0

   UI Components:
   - react-native-paper@^5.9.0
   - tamagui@^1.0.0

   Sensors & Location:
   - expo-location@^16.0.0
   - expo-compass@^12.0.0
   - expo-sensors@^12.0.0
   - react-native-maps@^1.0.0

   Background & Notifications:
   - expo-task-manager@^11.0.0
   - expo-background-fetch@^11.0.0
   - expo-notifications@^0.20.0
   - expo-av@^13.0.0

   Utilities:
   - date-fns@^2.30.0
   - lodash@^4.17.0
   - zustand@^4.4.0

   Testing:
   - jest@^29.0.0
   - @testing-library/react-native@^12.0.0

3. FOLDER STRUCTURE (create semua folders & stub files):
   src/
   ├── navigation/
   │   ├── RootNavigator.tsx
   │   ├── BottomTabNavigator.tsx
   │   └── LinkingConfiguration.ts
   ├── screens/
   │   ├── HomeScreen.tsx
   │   ├── CompassScreen.tsx
   │   ├── TrackerScreen.tsx
   │   ├── TasbihScreen.tsx
   │   ├── CalendarScreen.tsx
   │   ├── SettingsScreen.tsx
   │   ├── MapScreen.tsx
   │   └── SplashScreen.tsx
   ├── components/
   │   ├── common/
   │   │   ├── Header.tsx
   │   │   ├── Card.tsx
   │   │   ├── Button.tsx
   │   │   └── LoadingSpinner.tsx
   │   ├── prayer/
   │   │   ├── PrayerCard.tsx
   │   │   ├── CountdownTimer.tsx
   │   │   ├── ProgressBar.tsx
   │   │   └── StreakDisplay.tsx
   │   ├── compass/
   │   │   ├── CompassNeedle.tsx
   │   │   └── CompassCircle.tsx
   │   ├── tasbih/
   │   │   ├── TasbihCounter.tsx
   │   │   └── CounterButton.tsx
   │   └── calendar/
   │       ├── HijriCalendar.tsx
   │       └── IslamicDates.tsx
   ├── hooks/
   │   ├── usePrayerTimes.ts
   │   ├── useCompass.ts
   │   ├── useLocation.ts
   │   ├── useTracker.ts
   │   ├── useTasbih.ts
   │   ├── useNotifications.ts
   │   └── index.ts
   ├── redux/
   │   ├── store.ts
   │   └── slices/
   │       ├── prayersSlice.ts
   │       ├── trackerSlice.ts
   │       ├── settingsSlice.ts
   │       ├── locationSlice.ts
   │       ├── tasbihSlice.ts
   │       └── uiSlice.ts
   ├── services/
   │   ├── api/
   │   │   └── prayerTimesApi.ts
   │   ├── database/
   │   │   └── dbInit.ts
   │   ├── background/
   │   │   └── taskManager.ts
   │   ├── notifications/
   │   │   └── notificationManager.ts
   │   └── sensors/
   │       └── compassManager.ts
   ├── utils/
   │   ├── dateTime.ts
   │   ├── prayer.ts
   │   ├── qibla.ts
   │   ├── hijri.ts
   │   ├── constants.ts
   │   └── permission.ts
   ├── types/
   │   ├── index.ts
   │   ├── prayer.ts
   │   ├── tracker.ts
   │   └── settings.ts
   ├── theme/
   │   ├── colors.ts
   │   ├── typography.ts
   │   └── spacing.ts
   └── App.tsx

4. TYPESCRIPT SETUP:
   - tsconfig.json dengan strict mode enabled
   - Path aliases: @/* untuk src/

5. APP.JSON CONFIG:
   - App name: "SholatKu"
   - Version: 1.0.0
   - App icon & splash screen placeholders
   - Permissions untuk location, notifications, calendar

6. MAIN APP COMPONENT:
   - App.tsx sebagai root
   - Redux Provider wrapping navigation
   - Redux Persist hydration handling
   - Error boundary setup

OUTPUT:
- Complete Expo project structure
- package.json dengan semua dependencies
- tsconfig.json properly configured
- App.tsx basic setup
- All folder stubs created
- app.json configured
- Ready untuk next steps

STYLE:
- Clean code structure
- TypeScript strict mode
- Proper imports organization
- Comments dalam Bahasa Indonesia
```

---

## PROMPT 2: Database Setup & SQLite Schema

```
OBJECTIVE:
Setup SQLite database dengan Expo SQLite, create semua tables, dan implement basic CRUD operations.

REQUIREMENTS:

1. FILE: src/services/database/dbInit.ts
   - Import expo-sqlite
   - Create database instance: sholatku.db
   - Implement initDatabase() function dengan CREATE TABLE statements untuk:
     * prayer_times (date, fajr, dhuhr, asr, maghrib, isha, imsak, shuruq, dhuha, timezone, city, lat/lng, method, expires_at)
     * checkins (prayer_date, prayer_type, checked_in_at, checked_in_time, notes)
     * streaks (current_streak, longest_streak, total_days_tracked, last_updated)
     * locations (city, country, latitude, longitude, timezone, is_favorite, is_current)
     * tasbih_records (date, tasbih_name, count, target_count, completed)
     * islamic_dates (hijri_date, gregorian_date, event_name, notification_enabled)
     * masjids (name, address, city, lat/lng, phone, website, rating, amenities)
   - Create proper indexes untuk frequently queried columns (date, city, etc)
   - Error handling untuk database initialization

2. FILE: src/services/database/prayerDb.ts
   - Implement PrayerRepository class dengan methods:
     * insertPrayerTimes(prayer: PrayerEntity): Promise<void>
     * getPrayerTimesForDate(date: string): Promise<PrayerEntity | null>
     * getPrayerTimesMonth(year: number, month: number): Promise<PrayerEntity[]>
     * deleteExpiredCache(expiresAt: number): Promise<void>
   - Use async/await dengan try-catch
   - Proper error handling & logging

3. FILE: src/services/database/trackerDb.ts
   - Implement TrackerRepository class dengan methods:
     * insertCheckIn(checkin: CheckInEntity): Promise<void>
     * getCheckInsForDate(date: string): Promise<CheckInEntity[]>
     * getStreakInfo(): Promise<StreakEntity>
     * updateStreak(streak: StreakEntity): Promise<void>
     * getMonthlyStats(month: string): Promise<Statistics>
   - Statistics calculation logic

4. FILE: src/services/database/tasbihDb.ts
   - Implement TasbihRepository untuk tasbih counter operations
   - Methods: insertRecord, getRecordsForDate, updateCount, getTargetProgress

5. FILE: src/services/database/locationDb.ts
   - Implement LocationRepository untuk saved locations
   - Methods: insertLocation, getFavoriteLocations, getCurrentLocation, deleteLocation

6. TYPES FILE: src/types/index.ts
   - Export all entity types: PrayerEntity, CheckInEntity, StreakEntity, LocationEntity, TasbihEntity, IslamicDateEntity, MasjidEntity

7. INITIALIZATION:
   - Call initDatabase() di App.tsx saat app start
   - Handle database errors gracefully
   - Implement migration strategy jika ada schema changes

OUTPUT:
- dbInit.ts dengan complete database schema
- All repository files dengan CRUD operations
- Proper TypeScript interfaces untuk entities
- Error handling & logging
- Database initialization pada app startup

STYLE:
- Clean SQL queries dengan proper formatting
- Async/await pattern consistently
- Comments explaining complex queries
- Type-safe database operations
```

---

## PROMPT 3: Prayer Times API Integration & Caching

```
OBJECTIVE:
Implement Aladhan API client dengan caching strategy, error handling, dan fallback logic.

REQUIREMENTS:

1. FILE: src/types/api.ts
   - Create interfaces untuk API responses:
     * PrayerResponse { data: { timings: { Fajr, Dhuhr, Asr, Maghrib, Isha } }, code: number, status: string }
     * PrayerTimings interface
     * ApiResponse<T> wrapper interface

2. FILE: src/services/api/prayerTimesApi.ts
   - Create axios client instance dengan:
     * baseURL: https://api.aladhan.com/v1
     * timeout: 10000ms
     * error interceptor untuk proper error handling
   - Implement object prayerTimesApi dengan methods:
     * async getPrayerTimes(date, latitude, longitude, method): Promise<PrayerResponse>
       - params: date (DD-MM-YYYY), latitude, longitude, method (default 11 = JAKIM)
       - Error handling
     * async getPrayerTimesMonth(year, month, latitude, longitude, method): Promise<PrayerResponse[]>
       - Fetch bulan penuh prayer times
     * async getIslamicMetadata(latitude, longitude): Promise<{ qibla: number, timezone: string }>
       - Get qibla direction & metadata

3. FILE: src/redux/slices/prayersSlice.ts
   - Redux slice dengan state:
     * todayPrayers: PrayerTime | null
     * monthPrayers: PrayerTime[]
     * nextPrayer: { type, time, minutesUntil } | null
     * loading: boolean
     * error: string | null
     * lastUpdate: number | null

   - Async thunk fetchPrayerTimes(date, latitude, longitude, method):
     * Try API first
     * On success: save to local DB, update Redux
     * On error: fallback ke cache dari DB
     * Return either fresh data atau cached data
     * Proper error messages

   - Reducers:
     * clearError()
     * calculateNextPrayer() helper logic

4. CACHING STRATEGY:
   - Network-first approach: try API, fallback ke cache
   - Cache TTL: 24 hours (store expiration timestamp)
   - Offline mode: support 2 months cached data
   - Auto-cleanup: deleteExpiredCache() setiap hari

5. FILE: src/hooks/usePrayerTimes.ts
   - Custom hook yang:
     * Accept optional date parameter
     * Get location dari useLocation hook
     * Dispatch fetchPrayerTimes thunk
     * Return { prayers, loading, error, retry }
     * Handle auto-refresh & retry logic

6. ERROR HANDLING:
   - Network errors: fallback ke cache
   - Invalid location: show user-friendly error
   - API timeout: retry dengan exponential backoff
   - Corrupt cache: graceful degradation

OUTPUT:
- Complete API client setup
- Redux slice untuk prayer times state
- Caching strategy implemented
- Custom hook untuk prayer times
- Error handling & fallback logic
- Type-safe API responses

STYLE:
- Proper async/await pattern
- Redux best practices
- Error messages dalam Bahasa Indonesia
- Logging untuk debugging
```

---

## PROMPT 4: Redux Store Setup & State Management

```
OBJECTIVE:
Setup Redux store dengan all slices, persistence, dan middleware configuration.

REQUIREMENTS:

1. FILE: src/redux/store.ts
   - Configure Redux store dengan:
     * configureStore from @reduxjs/toolkit
     * Redux Persist setup:
       - AsyncStorage untuk persistence
       - Whitelist: settings, location, tracker, tasbih (persist ini)
       - Blacklist: prayers, ui (jangan persist real-time data)
     * Middleware: serialization check ignoring persist actions
   - Export: store, persistor, RootState, AppDispatch types

2. FILE: src/redux/slices/settingsSlice.ts
   - State:
     * azanType: string (default: 'makkah')
     * notificationsEnabled: boolean
     * vibrateEnabled: boolean
     * reminderMinutes: number (default: 10)
     * darkMode: boolean
     * calculationMethod: number (default: 11)
     * language: string (default: 'id')
     * soundVolume: number (0-100)
     * iqomahEnabled: boolean
   - Reducers: updateSetting(), updateMultipleSettings()

3. FILE: src/redux/slices/locationSlice.ts
   - State:
     * currentLocation: { city, latitude, longitude, timezone } | null
     * favoriteLocations: Location[]
     * isAutoDetect: boolean
   - Reducers: 
     * setCurrentLocation()
     * addFavoriteLocation()
     * removeFavoriteLocation()
     * setAutoDetect()

4. FILE: src/redux/slices/trackerSlice.ts
   - State:
     * todayCheckins: Map<PrayerType, CheckInEntity>
     * currentStreak: number
     * longestStreak: number
     * totalDaysTracked: number
     * monthlyStats: Statistics
     * selectedDate: string
   - Reducers:
     * checkInPrayer()
     * undoCheckIn()
     * updateStreak()
     * loadMonthlyStats()
   - Async thunks: loadTrackerData()

5. FILE: src/redux/slices/tasbihSlice.ts
   - State:
     * counters: TasbihCounter[]
     * selectedCounter: TasbihCounter | null
     * dailyGoals: Map<string, number>
   - Reducers:
     * incrementCounter()
     * resetCounter()
     * saveCounter()
     * createNewCounter()
     * updateGoal()

6. FILE: src/redux/slices/uiSlice.ts
   - State:
     * loading: boolean
     * error: string | null
     * snackbarMessage: string | null
     * selectedTab: number (0-4 untuk tabs)
   - Reducers:
     * setLoading()
     * setError()
     * showSnackbar()
     * selectTab()

7. FILE: src/redux/slices/prayersSlice.ts
   - (dari PROMPT 3, dipastikan di sini juga)
   - Thunk: fetchPrayerTimes()
   - State: todayPrayers, monthPrayers, nextPrayer, loading, error, lastUpdate

8. FILE: src/redux/hooks.ts
   - Export typed hooks:
     * useAppDispatch = useDispatch<AppDispatch>
     * useAppSelector = useSelector<RootState>

9. APP.TSX INTEGRATION:
   - Wrap app dengan Provider store={store}
   - Setup PersistGate untuk rehydration
   - Handle loading state saat rehydrating

OUTPUT:
- Complete Redux store configuration
- All slices properly typed
- Redux Persist integrated
- Custom typed hooks
- App.tsx dengan provider setup
- Proper state structure & immutability

STYLE:
- Redux Toolkit best practices
- Proper action creators automatically
- Serializable state (no functions/classes)
- Comments menjelaskan complex logic
```

---

## PROMPT 5: Custom Hooks Implementation

```
OBJECTIVE:
Implement semua custom hooks yang diperlukan untuk manage sensors, location, dan data fetching.

REQUIREMENTS:

1. FILE: src/hooks/useLocation.ts
   - useLocation() hook:
     * Use Expo Location API
     * Request permission saat first launch
     * Get current GPS location
     * Auto-detect & cache location
     * Return: { location: { latitude, longitude, city }, loading, error, retry }
     * Fallback ke last saved location jika error
     * Background update setiap jam

2. FILE: src/hooks/useCompass.ts
   - useCompass() hook:
     * Use expo-compass untuk magnetometer data
     * Calculate qibla direction dari location
     * Track device bearing
     * Accuracy indicator (Good/Fair/Poor)
     * Return: { heading, accuracy, qibla, relativeAngle }
     * Auto-calibration hints
     * Cleanup properly saat unmount

3. FILE: src/hooks/usePrayerTimes.ts
   - (dari PROMPT 3, implement lengkap di sini)
   - usePrayerTimes(date?: string) hook
   - Auto-load saat mount
   - Return: { prayers, loading, error, retry }

4. FILE: src/hooks/useTracker.ts
   - useTracker() hook:
     * Load today's check-ins
     * Calculate progress (0-5)
     * Get streak info
     * Methods: checkInPrayer(type), undoCheckIn(type), getMonthlyStats()
     * Return: { checkins, streak, progress, checkIn, undo, stats }

5. FILE: src/hooks/useTasbih.ts
   - useTasbih() hook:
     * Manage tasbih counters
     * Track daily goals
     * Load/save counters
     * Methods: increment(), reset(), save(), createNew()
     * Return: { counter, progress, increment, reset, save }

6. FILE: src/hooks/useNotifications.ts
   - useNotifications() hook:
     * Setup notification listeners
     * Handle notification taps
     * Request permissions
     * Return: { notificationPermission, scheduleNotification }

7. FILE: src/hooks/useBackgroundTask.ts
   - useBackgroundTask() hook:
     * Register/unregister background fetch task
     * Handle background task triggers
     * Check prayer times in background
     * Proper cleanup

8. FILE: src/hooks/useAsync.ts
   - Utility hook untuk generic async operations:
     * Handle loading, error, data states
     * Retry logic
     * Used by other hooks internally

9. FILE: src/hooks/index.ts
   - Export semua hooks

OUTPUT:
- All custom hooks fully implemented
- Proper React hooks patterns (useEffect cleanup, dependencies)
- Error handling & edge cases
- Type-safe return values
- Integration dengan Redux & services
- Permission handling

STYLE:
- React hooks best practices
- Proper dependency arrays
- Cleanup functions untuk side effects
- Comments menjelaskan complex logic
```

---

## PROMPT 6: Core Components Implementation

```
OBJECTIVE:
Implement reusable components untuk prayer display, compass, dan tracker UI.

REQUIREMENTS:

1. FILE: src/components/prayer/PrayerCard.tsx
   - PrayerCard component:
     * Props: prayerType, time, status ('passed'|'next'|'pending'), minutesUntil, checked, onCheckIn
     * Display: icon + prayer name + time + countdown (jika next)
     * Status colors: ✅ done, 🔔 next, ⏳ pending
     * Tap action: checkIn jika status 'next'
     * Responsive styling dengan React Native StyleSheet

2. FILE: src/components/prayer/CountdownTimer.tsx
   - CountdownTimer component:
     * Props: targetTime (HH:mm), prayerName, onTimeReached
     * Display: minutes & seconds remaining
     * Update setiap detik
     * Format: "dalam 23m 45d"
     * Color change saat mendekati waktu (red warning)

3. FILE: src/components/prayer/ProgressBar.tsx
   - ProgressBar component:
     * Props: completed (0-5), total (5)
     * Segmented visual: 5 segments per sholat
     * Green untuk completed, gray untuk pending
     * Display text: "2/5 sholat"
     * Smooth animation saat update

4. FILE: src/components/prayer/StreakDisplay.tsx
   - StreakDisplay component:
     * Props: currentStreak, longestStreak, totalDays
     * Big emoji + number display: "🔥 15 hari"
     * Subtitle: "Personal record: 45 hari"
     * Celebration animation saat streak increases
     * Color: golden/warm untuk streak

5. FILE: src/components/compass/CompassNeedle.tsx
   - CompassNeedle component:
     * Props: heading, qibla, relativeAngle
     * Animated SVG atau Canvas-based needle
     * Rotate smoothly sesuai device bearing
     * Show qibla direction line
     * Update rate: 60 FPS smooth

6. FILE: src/components/compass/CompassCircle.tsx
   - CompassCircle component:
     * Props: heading, qibla
     * Background circle dengan degree markers (0°, 90°, 180°, 270°)
     * Cardinal directions (N, E, S, W)
     * Qibla marker highlighted
     * Display current bearing (e.g., "291° dari Utara")

7. FILE: src/components/tasbih/TasbihCounter.tsx
   - TasbihCounter component:
     * Props: count, target, onIncrement, onReset
     * Big number display untuk count
     * Large tap target untuk +1 button
     * Visual progress towards target
     * Haptic feedback saat tap

8. FILE: src/components/tasbih/CounterButton.tsx
   - CounterButton component:
     * Big button untuk increment counter
     * Size: ~80% screen width
     * Feedback: ripple effect + haptic
     * Tap delay <100ms

9. FILE: src/components/calendar/HijriCalendar.tsx
   - HijriCalendar component:
     * Display dual calendars: Gregorian + Hijri
     * Month navigation
     * Highlight important Islamic dates
     * Tap date untuk details

10. FILE: src/components/common/Header.tsx
    - Header component:
      * Props: title, subtitle, onSettings
      * Display location + current date (Gregorian + Hijri)
      * Settings icon untuk navigate ke settings

11. FILE: src/components/common/Card.tsx
    - Reusable Card component:
      * Props: children, style, onPress
      * Rounded corners + shadow
      * Responsive padding

OUTPUT:
- All components properly typed dengan TypeScript
- React.memo untuk performance optimization
- Smooth animations dengan Reanimated 2
- Accessibility: proper labels & touch targets
- Responsive untuk berbagai screen sizes
- Dark mode support

STYLE:
- Functional components dengan hooks
- StyleSheet.create untuk styles
- Proper prop interfaces
- Comments menjelaskan complex UI logic
```

---

## PROMPT 7: Home Screen & Navigation Setup

```
OBJECTIVE:
Implement Home Screen dengan jadwal sholat, navigation structure, dan layout.

REQUIREMENTS:

1. FILE: src/screens/HomeScreen.tsx
   - Component struktur:
     * Header: location + date
     * Prayer list: 5 sholat cards menggunakan FlatList
     * Next prayer countdown prominently displayed
     * Daily progress bar (0-5)
     * Quick action buttons: [🧭 Qibla] [✅ Check-in] [📊 Tracker]
     * Tab navigation indicator

   - Logic:
     * Load prayer times dengan usePrayerTimes hook
     * Calculate next prayer
     * Load today's check-ins dari Redux
     * Detect user location
     * Show loading spinner saat fetch
     * Handle errors dengan retry button

   - State:
     * prayers dari Redux usePrayerTimes
     * checkins dari Redux useSelector
     * location dari Redux
     * Tab selection untuk swipe navigation

2. FILE: src/navigation/RootNavigator.tsx
   - RootNavigator stack:
     * Splash screen (onBoarding)
     * Main app container (BottomTabNavigator)
     * Modal screens (LocationPicker, About, etc)
     * Stack navigator untuk transitions

3. FILE: src/navigation/BottomTabNavigator.tsx
   - Bottom Tab structure:
     * Tab 1: Home (Jadwal Sholat)
     * Tab 2: Compass (Qibla)
     * Tab 3: Tracker (Daily Status)
     * Tab 4: Tasbih (Counter)
     * Tab 5: More (Calendar, Settings, Map)
     * Icons + labels untuk setiap tab
     * Active tab styling (warna primary)

4. FILE: src/screens/SplashScreen.tsx
   - Splash/Onboarding:
     * Show app logo
     * Request permissions: Location, Notifications, Calendar
     * Initialize database
     * Load initial data
     * Auto-navigate ke Home setelah 2-3 detik

5. FILE: src/navigation/LinkingConfiguration.ts
   - Deep linking setup:
     * Define deep linking patterns
     * Handle app scheme (sholatku://)
     * Route mapping

6. APP.TSX UPDATES:
   - Wrap dengan Redux Provider
   - Wrap dengan PersistGate
   - Wrap dengan NavigationContainer
   - Setup Redux store rehydration loading

OUTPUT:
- Complete home screen dengan jadwal sholat
- Navigation structure (tabs + stack)
- Splash/onboarding screen
- Deep linking configuration
- Redux integration
- Loading states & error handling

STYLE:
- Responsive layout untuk berbagai screen sizes
- Tab bar styling sesuai Islamic theme
- Proper navigation flow
- Smooth screen transitions
```

---

## PROMPT 8: Background Notifications & Sensors

```
OBJECTIVE:
Setup background task untuk prayer notifications dan sensor manager untuk compass.

REQUIREMENTS:

1. FILE: src/services/background/taskManager.ts
   - Define background task PRAYER_CHECK_TASK dengan:
     * Get current location dari storage
     * Fetch prayer times untuk hari ini
     * Get current time
     * Check jika current time match prayer time (±1 menit)
     * Trigger notification jika match
     * Return proper BackgroundFetch result
     * Error handling & logging

   - registerBackgroundTask() function:
     * Register task dengan BackgroundFetch.registerTaskAsync
     * minimumInterval: 5 minutes
     * stopOnTerminate: false
     * startOnBoot: true

   - unregisterBackgroundTask() function:
     * Cleanup saat app unload

2. FILE: src/services/notifications/notificationManager.ts
   - notificationManager object dengan methods:
     * setupNotificationChannels(): setup Android channels
     * showPrayerNotification(prayerName, time, type)
       - Create NotificationCompat.Builder
       - Set sound: azan MP3 dari assets
       - Set vibrate pattern: [0, 500, 200, 500]
       - Set tap action: open app to HomeScreen
       - Set title & body dengan prayer info
     * handleNotificationResponse(): handle user tap notification
     * setNotificationListener(): listen untuk notification events

3. FILE: src/services/notifications/soundManager.ts
   - soundManager object:
     * playAzan(azanType: string): play azan sound dari assets
     * stopAzan(): stop playing
     * setVolume(volume: 0-100)
     * preloadSounds(): cache sounds di memory

4. FILE: src/services/sensors/compassManager.ts
   - CompassManager class:
     * Constructor(latitude, longitude, onHeadingChange, onAccuracyChange)
     * start(): subscribe to compass updates
     * stop(): unsubscribe & cleanup
     * getQiblaDirection(): calculate qibla dari lat/lng
     * getRelativeQiblaAngle(deviceBearing): angle dari device ke qibla
     * getAccuracyLabel(accuracy): Poor/Fair/Good/Excellent

   - qibla calculation:
     * Makkah coordinates: lat=21.4225, lng=39.8262
     * Haversine formula untuk bearing calculation
     * Return angle 0-360°

5. FILE: src/services/sensors/locationManager.ts
   - LocationManager class:
     * Get current location dengan expo-location
     * Request permissions
     * Handle location denied
     * Geocode lat/lng ke city name
     * Auto-detect timezone dari lat/lng
     * Cache location ke Redux & storage

6. FILE: src/services/notifications/notificationChannels.ts
   - Create Android notification channels:
     * azan_channel: HIGH importance, custom sound
     * reminder_channel: DEFAULT importance
     * Setup di MainActivity equivalent (App.tsx)

7. APP.TSX INTEGRATION:
   - Call registerBackgroundTask() saat app launches
   - Setup notification listeners
   - Initialize location detector
   - Call initDatabase() sebelum start

OUTPUT:
- Complete background task setup
- Prayer notifications firing tepat waktu
- Compass sensor working smoothly
- Location auto-detection
- Permission requests working
- Error handling untuk sensor failures

STYLE:
- Coroutine/async patterns untuk background work
- Proper cleanup & memory management
- Logging untuk debugging
- Permission handling gracefully
```

---

## PROMPT 9: Database Repositories & Services

```
OBJECTIVE:
Implement repository patterns untuk database operations dengan proper error handling.

REQUIREMENTS:

1. COMPLETE: src/services/database/prayerDb.ts
   - PrayerRepository singleton class:
     * insertPrayerTimes(prayer: PrayerEntity)
     * getPrayerTimesForDate(date: string)
     * getPrayerTimesMonth(year, month)
     * updatePrayerTimes(date, updates)
     * deleteExpiredCache()
     * getNextPrayer(date)

   - Transaction support untuk batch operations
   - Proper SQL escaping untuk SQL injection prevention
   - Logging untuk debugging

2. COMPLETE: src/services/database/trackerDb.ts
   - TrackerRepository singleton:
     * insertCheckIn(checkin: CheckInEntity)
     * getCheckInsForDate(date)
     * getStreak()
     * updateStreak(streak)
     * getMonthlyStats(month)
     * deleteCheckIn(date, type)
     * getConsecutiveDays(fromDate)

   - Streak calculation logic:
     * Count consecutive days with all 5 prayers
     * Reset saat ada missing sholat
     * Track longest streak

3. COMPLETE: src/services/database/tasbihDb.ts
   - TasbihRepository singleton:
     * insertRecord(record: TasbihEntity)
     * getRecordsForDate(date)
     * updateCount(date, tasbihName, count)
     * getTargetProgress(tasbihName)
     * getTodayRecords()
     * getSummary(month)

4. COMPLETE: src/services/database/locationDb.ts
   - LocationRepository singleton:
     * insertLocation(location: LocationEntity)
     * getFavoriteLocations()
     * getCurrentLocation()
     * updateCurrent(city, lat, lng)
     * deleteLocation(id)
     * searchLocations(query)

5. COMPLETE: src/services/database/islamicDatesDb.ts
   - IslamicDatesRepository singleton:
     * insertDate(date: IslamicDateEntity)
     * getImportantDates(hijriMonth)
     * getUpcomingDates()
     * updateNotification(id, enabled)

6. COMPLETE: src/services/database/masjidDb.ts
   - MasjidRepository singleton:
     * insertMasjid(masjid: MasjidEntity)
     * getMasjidsNearby(lat, lng, radiusKm)
     * searchMasjids(query)
     * rateMasjid(id, rating)
     * addReview(id, review)
     * updateCache(masjids)

7. FILE: src/services/database/index.ts
   - Export semua repositories sebagai singletons
   - Initialize DB saat app start

8. ERROR HANDLING:
   - Graceful error handling dengan proper messages
   - Retry logic untuk transient errors
   - Logging untuk debugging
   - User-friendly error messages dalam Bahasa Indonesia

OUTPUT:
- All repository implementations complete
- CRUD operations untuk all entities
- Transaction support
- Proper error handling
- Database optimization dengan indexes
- Type-safe operations

STYLE:
- Repository pattern untuk data abstraction
- Singleton pattern untuk repositories
- Async/await dengan try-catch
- Comprehensive comments
```

---

## PROMPT 10: Testing & Utilities

```
OBJECTIVE:
Implement utility functions, helpers, dan unit tests untuk critical logic.

REQUIREMENTS:

1. FILE: src/utils/qibla.ts
   - calculateQiblaDirection(latitude, longitude): number
     * Haversine formula calculation
     * Return bearing 0-360°
     * Makkah coordinates: 21.4225, 39.8262

2. FILE: src/utils/hijri.ts
   - gregorianToHijri(gregorianDate): HijriDate
   - hijriToGregorian(hijriDate): Date
   - isRamadan(hijriMonth): boolean
   - getEidDate(hijriYear): Date
   - getCurrentHijriDate(): HijriDate

3. FILE: src/utils/dateTime.ts
   - formatDate(date): string (YYYY-MM-DD)
   - formatTime(time): string (HH:mm)
   - parseTime(timeString): minutes
   - calculateMinutesUntil(targetTime): number
   - getDayOfWeek(date): string dalam Bahasa Indonesia

4. FILE: src/utils/prayer.ts
   - calculateNextPrayer(prayers, currentTime): PrayerType | null
   - isPrayerDone(prayer, currentTime): boolean
   - sortPrayersByTime(prayers): PrayerType[]
   - getPrayerName(type): string dalam Bahasa Indonesia

5. FILE: src/utils/permission.ts
   - requestLocationPermission()
   - requestNotificationPermission()
   - requestCalendarPermission()
   - checkPermissionStatus(permission)

6. FILE: src/utils/storage.ts
   - AsyncStorage wrappers:
     * getItem(key)
     * setItem(key, value)
     * removeItem(key)
     * Type-safe dengan generics

7. FILE: src/utils/constants.ts
   - App constants:
     * PRAYER_TYPES = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha']
     * PRAYER_NAMES_ID = { fajr: 'Subuh', ... }
     * MAKKAH_COORDINATES = { lat: 21.4225, lng: 39.8262 }
     * API endpoints
     * Database names

8. FILE: __tests__/utils/qibla.test.ts
   - Unit tests untuk qibla calculation:
     * Test Jakarta qibla ≈ 291-295°
     * Test Surabaya qibla ≈ 286-290°
     * Test angle always 0-360°
     * Test edge cases (pole, etc)

9. FILE: __tests__/utils/hijri.test.ts
   - Unit tests untuk Hijri conversion:
     * Test Ramadan dates
     * Test Eid Fitri & Adha
     * Test roundtrip conversion

10. FILE: __tests__/utils/dateTime.test.ts
    - Unit tests untuk date/time utilities:
      * Test time formatting
      * Test countdown calculation
      * Test timezone handling

11. FILE: jest.config.js
    - Jest configuration:
      * Test environment: react-native
      * Module name mapper untuk path aliases
      * Coverage thresholds: 70%

OUTPUT:
- All utility functions with tests
- 70%+ code coverage untuk critical logic
- Jest setup proper
- Type-safe utilities
- Well-documented functions

STYLE:
- Pure functions tanpa side effects
- Comprehensive error handling
- Clear, descriptive function names
- Unit tests following AAA pattern (Arrange, Act, Assert)
```

---

## COMPLETE DEVELOPMENT ROADMAP

```
WEEK 1-2:
□ PROMPT 1: Expo project setup + architecture
□ PROMPT 2: Database schema & SQLite setup
□ PROMPT 3: Prayer API integration + caching

WEEK 2-3:
□ PROMPT 4: Redux store & state management
□ PROMPT 5: Custom hooks implementation
□ PROMPT 6: Core components (PrayerCard, Compass, etc)

WEEK 3-4:
□ PROMPT 7: Home screen + navigation
□ PROMPT 8: Background notifications + sensors
□ PROMPT 9: Database repositories complete

WEEK 4:
□ PROMPT 10: Utilities + testing
□ Integration testing
□ Bug fixes & optimization

WEEK 5:
□ Tracker screen + Tasbih screen implementation
□ Settings screen + customization
□ Remaining screens (Calendar, Map, More)

WEEK 6:
□ Polish UI/UX
□ Dark mode full support
□ Performance optimization
□ Beta testing

WEEK 7-8:
□ Final bug fixes
□ App store submissions (TestFlight + Google Play)
□ Launch! 🚀
```

---

## CARA PAKAI

1. **Pick satu PROMPT** dari atas (misal PROMPT 1 untuk setup)
2. **Copy seluruh prompt block** (antara ``` ``` markers)
3. **Paste ke Cursor command palette** atau Claude Code
4. **AI akan generate** semua files sesuai spec
5. **Review output** & adjust jika perlu
6. **Commit to git**
7. **Move ke PROMPT berikutnya**

---

**Status:** Ready for development ✨  
**Platform:** React Native + Expo  
**Target:** 8-10 weeks to MVP v1.0  
**Last Updated:** December 13, 2025  

---

**Good luck! 🚀 Semoga SholatKu jadi hit di Indonesia! 📱✨**