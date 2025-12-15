import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import { Text, useTheme, Button, TextInput, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from 'date-fns';
import { id } from 'date-fns/locale';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { AppDispatch } from '@/redux/store';
import { loadTodayEntry, saveEntry, selectMuhasabah } from '@/redux/slices/muhasabahSlice';
import { getDailyQuestions, MuhasabahQuestion } from '@/services/muhasabah/questionPool';
import { getMuhasabahHistory } from '@/services/muhasabah/muhasabahRepository';
import { DailyQuestionCard } from '@/components/muhasabah/DailyQuestionCard';
import { StreakBadge } from '@/components/muhasabah/StreakBadge';

const { width } = Dimensions.get('window');
const DAY_SIZE = (width - 40 - 6 * 4) / 7; // 7 days, 6 gaps

export default function TrackerScreen() {
    const theme = useTheme();
    const dispatch = useDispatch<AppDispatch>();
    const { todayEntry, currentStreak, loading } = useSelector(selectMuhasabah);

    const [questions, setQuestions] = useState<MuhasabahQuestion[]>([]);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [reflection, setReflection] = useState('');
    const [mode, setMode] = useState<'daily' | 'history'>('daily');
    const [completedDates, setCompletedDates] = useState<Set<string>>(new Set());
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const todayDate = format(new Date(), 'yyyy-MM-dd');
    const todayDisplay = format(new Date(), 'EEEE, d MMMM yyyy', { locale: id });

    // Load initial data
    useEffect(() => {
        dispatch(loadTodayEntry());
        loadHistory();
    }, [dispatch]);

    const loadHistory = async () => {
        try {
            const history = await getMuhasabahHistory();
            const dates = new Set(history.map(e => e.date));
            setCompletedDates(dates);
        } catch (e) {
            console.error("Error loading history", e);
        }
    };

    // Initialize questions and answers
    useEffect(() => {
        if (todayEntry) {
            try {
                const parsedAnswers = JSON.parse(todayEntry.answers);
                const todays = getDailyQuestions(todayDate);
                setQuestions(todays);

                const answerMap: any = {};
                parsedAnswers.forEach((a: any) => {
                    answerMap[a.id] = a.answer;
                });
                setAnswers(answerMap);
                setReflection(todayEntry.reflection);
            } catch (e) {
                console.error("Error parsing entry", e);
            }
        } else {
            setQuestions(getDailyQuestions(todayDate));
            setAnswers({});
            setReflection('');
        }
    }, [todayEntry, todayDate]);

    const handleSave = () => {
        if (Object.keys(answers).length < questions.length) {
            Alert.alert("Belum Selesai", "Mohon jawab semua pertanyaan muhasabah hari ini.");
            return;
        }

        const answersArray = questions.map(q => ({
            id: q.id,
            text: q.text,
            category: q.category,
            answer: answers[q.id] || ''
        }));

        dispatch(saveEntry({
            date: todayDate,
            answers: JSON.stringify(answersArray),
            reflection: reflection,
            created_at: Date.now()
        })).then((res) => {
            if (saveEntry.fulfilled.match(res)) {
                Alert.alert("Alhamdulillah", "Muhasabah hari ini telah dicatat. Semoga menjadi pribadi lebih baik!");
                loadHistory(); // Refresh calendar
            }
        });
    };

    const isCompleted = !!todayEntry;

    // Calendar helpers
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    // Pad start of month
    const startDayOfWeek = monthStart.getDay(); // 0 = Sunday
    const paddedDays = [...Array(startDayOfWeek).fill(null), ...daysInMonth];

    const changeMonth = (delta: number) => {
        const newMonth = new Date(currentMonth);
        newMonth.setMonth(newMonth.getMonth() + delta);
        setCurrentMonth(newMonth);
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#1a237e', '#283593', '#3949ab']} style={styles.headerGradient}>
                <SafeAreaView edges={['top']}>
                    <View style={styles.header}>
                        <View>
                            <Text variant="headlineSmall" style={styles.title}>Muhasabah Diri</Text>
                            <Text style={styles.dateText}>{todayDisplay}</Text>
                        </View>
                        <StreakBadge streak={currentStreak} />
                    </View>

                    {/* Tab Selector */}
                    <View style={styles.tabContainer}>
                        <TouchableOpacity
                            style={[styles.tab, mode === 'daily' && styles.tabActive]}
                            onPress={() => setMode('daily')}
                        >
                            <Text style={[styles.tabText, mode === 'daily' && styles.tabTextActive]}>Hari Ini</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tab, mode === 'history' && styles.tabActive]}
                            onPress={() => setMode('history')}
                        >
                            <Text style={[styles.tabText, mode === 'history' && styles.tabTextActive]}>Kalender</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </LinearGradient>

            <ScrollView contentContainerStyle={styles.content}>
                {loading && <ActivityIndicator size="large" color="#1a237e" style={{ marginTop: 20 }} />}

                {!loading && mode === 'daily' && (
                    <View style={styles.dailyContainer}>
                        {isCompleted && (
                            <Surface style={styles.completedBanner} elevation={2}>
                                <Text style={styles.completedText}>✅ Muhasabah Hari Ini Selesai</Text>
                            </Surface>
                        )}

                        <Text variant="titleMedium" style={styles.sectionTitle}>Pertanyaan Hari Ini</Text>

                        {questions.map((q) => (
                            <DailyQuestionCard
                                key={q.id}
                                question={q}
                                answer={answers[q.id] || ''}
                                onAnswer={(text) => setAnswers(prev => ({ ...prev, [q.id]: text }))}
                            />
                        ))}

                        <Text variant="titleMedium" style={styles.sectionTitle}>Catatan Refleksi (Opsional)</Text>
                        <TextInput
                            mode="outlined"
                            placeholder="Tulis apa yang saya rasakan..."
                            multiline
                            numberOfLines={4}
                            value={reflection}
                            onChangeText={setReflection}
                            style={styles.reflectionInput}
                        />

                        <Button
                            mode="contained"
                            onPress={handleSave}
                            style={styles.saveButton}
                            labelStyle={{ fontSize: 16, paddingVertical: 4 }}
                        >
                            {isCompleted ? "Simpan Perubahan" : "Simpan Muhasabah"}
                        </Button>
                    </View>
                )}

                {!loading && mode === 'history' && (
                    <View style={styles.calendarContainer}>
                        {/* Month Navigation */}
                        <View style={styles.monthNav}>
                            <TouchableOpacity onPress={() => changeMonth(-1)}>
                                <MaterialCommunityIcons name="chevron-left" size={32} color="#1a237e" />
                            </TouchableOpacity>
                            <Text variant="titleLarge" style={styles.monthTitle}>
                                {format(currentMonth, 'MMMM yyyy', { locale: id })}
                            </Text>
                            <TouchableOpacity onPress={() => changeMonth(1)}>
                                <MaterialCommunityIcons name="chevron-right" size={32} color="#1a237e" />
                            </TouchableOpacity>
                        </View>

                        {/* Day Headers */}
                        <View style={styles.dayHeaders}>
                            {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => (
                                <Text key={day} style={styles.dayHeader}>{day}</Text>
                            ))}
                        </View>

                        {/* Calendar Grid */}
                        <View style={styles.calendarGrid}>
                            {paddedDays.map((day, index) => {
                                if (!day) {
                                    return <View key={`pad-${index}`} style={styles.dayCell} />;
                                }
                                const dateStr = format(day, 'yyyy-MM-dd');
                                const completed = completedDates.has(dateStr);
                                const isTodayDate = isToday(day);

                                return (
                                    <View
                                        key={dateStr}
                                        style={[
                                            styles.dayCell,
                                            isTodayDate && styles.todayCell,
                                        ]}
                                    >
                                        <Text style={[
                                            styles.dayNumber,
                                            isTodayDate && styles.todayText,
                                        ]}>
                                            {format(day, 'd')}
                                        </Text>
                                        {completed && (
                                            <MaterialCommunityIcons
                                                name="check-circle"
                                                size={16}
                                                color="#4CAF50"
                                            />
                                        )}
                                    </View>
                                );
                            })}
                        </View>

                        {/* Stats */}
                        <Surface style={styles.statsSurface} elevation={1}>
                            <View style={styles.statsRow}>
                                <View style={styles.statItem}>
                                    <Text style={styles.statNumber}>{completedDates.size}</Text>
                                    <Text style={styles.statLabel}>Total Hari</Text>
                                </View>
                                <View style={styles.statItem}>
                                    <Text style={styles.statNumber}>{currentStreak}</Text>
                                    <Text style={styles.statLabel}>Streak</Text>
                                </View>
                            </View>
                        </Surface>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    headerGradient: {
        paddingBottom: 20,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    title: {
        fontWeight: 'bold',
        color: '#fff',
    },
    dateText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 14,
    },
    tabContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 16,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 12,
        padding: 4,
    },
    tab: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 10,
    },
    tabActive: {
        backgroundColor: '#fff',
    },
    tabText: {
        fontWeight: '500',
        color: 'rgba(255,255,255,0.8)',
    },
    tabTextActive: {
        color: '#1a237e',
        fontWeight: 'bold',
    },
    content: {
        padding: 20,
        paddingBottom: 50,
    },
    dailyContainer: {
        marginTop: 0,
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: 12,
        marginTop: 12,
        color: '#1a237e',
    },
    reflectionInput: {
        backgroundColor: '#fff',
        marginBottom: 24,
    },
    saveButton: {
        borderRadius: 8,
        backgroundColor: '#1a237e',
    },
    completedBanner: {
        backgroundColor: '#E8F5E9',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        alignItems: 'center',
    },
    completedText: {
        color: '#2E7D32',
        fontWeight: 'bold',
    },
    // Calendar styles
    calendarContainer: {
        marginTop: 0,
    },
    monthNav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    monthTitle: {
        fontWeight: 'bold',
        color: '#1a237e',
    },
    dayHeaders: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 8,
    },
    dayHeader: {
        width: DAY_SIZE,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#666',
        fontSize: 12,
    },
    calendarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
    },
    dayCell: {
        width: DAY_SIZE,
        height: DAY_SIZE,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    todayCell: {
        borderWidth: 2,
        borderColor: '#1a237e',
    },
    dayNumber: {
        fontSize: 14,
        color: '#333',
    },
    todayText: {
        fontWeight: 'bold',
        color: '#1a237e',
    },
    statsSurface: {
        marginTop: 20,
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#fff',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1a237e',
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
    },
});
