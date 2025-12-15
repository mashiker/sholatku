import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('sholatku.db');

export const initDatabase = async () => {
  try {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;

      CREATE TABLE IF NOT EXISTS muhasabah_entries (
        date TEXT PRIMARY KEY,
        answers TEXT,
        reflection TEXT,
        created_at INTEGER
      );
      
      CREATE TABLE IF NOT EXISTS prayer_times (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT UNIQUE NOT NULL,
        city TEXT NOT NULL,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL,
        timezone TEXT NOT NULL,
        method INTEGER,
        fajr TEXT NOT NULL,
        shuruq TEXT NOT NULL,
        dhuhr TEXT NOT NULL,
        asr TEXT NOT NULL,
        maghrib TEXT NOT NULL,
        isha TEXT NOT NULL,
        imsak TEXT,
        dhuha TEXT,
        hijri_date TEXT,
        hijri_month_name TEXT,
        day_of_week TEXT,
        expires_at INTEGER,
        last_updated INTEGER
      );

      CREATE INDEX IF NOT EXISTS idx_prayer_date ON prayer_times(date);
      CREATE INDEX IF NOT EXISTS idx_prayer_city ON prayer_times(city);

      CREATE TABLE IF NOT EXISTS checkins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        prayer_date TEXT NOT NULL,
        prayer_type TEXT NOT NULL,
        checked_in_at INTEGER NOT NULL,
        checked_in_time TEXT NOT NULL,
        notes TEXT,
        location TEXT,
        UNIQUE(prayer_date, prayer_type)
      );

      CREATE INDEX IF NOT EXISTS idx_checkin_date ON checkins(prayer_date);

      CREATE TABLE IF NOT EXISTS streaks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        current_streak INTEGER DEFAULT 0,
        longest_streak INTEGER DEFAULT 0,
        total_days_tracked INTEGER DEFAULT 0,
        last_updated INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS locations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        city TEXT UNIQUE NOT NULL,
        country TEXT,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL,
        timezone TEXT NOT NULL,
        is_favorite BOOLEAN DEFAULT 0,
        is_current BOOLEAN DEFAULT 0,
        created_at INTEGER
      );

      CREATE INDEX IF NOT EXISTS idx_location_favorite ON locations(is_favorite);

      CREATE TABLE IF NOT EXISTS tasbih_records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        tasbih_name TEXT NOT NULL,
        count INTEGER NOT NULL DEFAULT 0,
        target_count INTEGER,
        completed BOOLEAN DEFAULT 0,
        created_at INTEGER,
        updated_at INTEGER,
        UNIQUE(date, tasbih_name)
      );

      CREATE TABLE IF NOT EXISTS islamic_dates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        hijri_date TEXT UNIQUE NOT NULL,
        gregorian_date TEXT NOT NULL,
        event_name TEXT NOT NULL,
        event_type TEXT,
        notification_enabled BOOLEAN DEFAULT 1
      );

      CREATE TABLE IF NOT EXISTS masjids (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        address TEXT,
        city TEXT NOT NULL,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL,
        phone TEXT,
        website TEXT,
        rating REAL DEFAULT 0,
        amenities TEXT,
        is_verified BOOLEAN DEFAULT 0
      );
    `);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};
