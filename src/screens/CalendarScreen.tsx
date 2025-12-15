import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, useTheme, Surface, Chip, Card, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getTodayHijri, getUpcomingEvents, HIJRI_MONTHS, IslamicEvent } from '@/services/calendar/hijriCalendar';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export default function CalendarScreen() {
    const theme = useTheme();
    const todayHijri = getTodayHijri();
    const todayGregorian = format(new Date(), 'EEEE, d MMMM yyyy', { locale: id });
    const upcomingEvents = getUpcomingEvents(60);

    const getEventTypeColor = (type: IslamicEvent['type']) => {
        switch (type) {
            case 'holiday': return ['#4CAF50', '#66BB6A'];
            case 'fasting': return ['#FF9800', '#FFB74D'];
            case 'special': return ['#9C27B0', '#BA68C8'];
            case 'sunnah': return ['#2196F3', '#64B5F6'];
            default: return ['#607D8B', '#90A4AE'];
        }
    };

    const getEventIcon = (type: IslamicEvent['type']) => {
        switch (type) {
            case 'holiday': return 'party-popper';
            case 'fasting': return 'food-off';
            case 'special': return 'star-crescent';
            case 'sunnah': return 'hand-heart';
            default: return 'calendar';
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#5d4037', '#6d4c41', '#8d6e63']} style={styles.headerGradient}>
                <SafeAreaView edges={['top']}>
                    <View style={styles.header}>
                        <Text variant="headlineSmall" style={styles.title}>Kalender Hijriah</Text>
                    </View>

                    {/* Today's Hijri Date */}
                    <Surface style={styles.dateCard} elevation={4}>
                        <View style={styles.dateHeader}>
                            <MaterialCommunityIcons name="star-crescent" size={32} color="#5d4037" />
                            <View style={styles.dateInfo}>
                                <Text variant="displaySmall" style={styles.hijriDay}>{todayHijri.day}</Text>
                                <Text variant="titleLarge" style={styles.hijriMonth}>{todayHijri.monthName}</Text>
                                <Text variant="bodyMedium" style={styles.hijriYear}>{todayHijri.year} Hijriah</Text>
                            </View>
                        </View>
                        <Divider style={{ marginVertical: 12 }} />
                        <View style={styles.gregorianInfo}>
                            <MaterialCommunityIcons name="calendar" size={18} color="#888" />
                            <Text style={styles.gregorianText}>{todayGregorian}</Text>
                        </View>
                    </Surface>
                </SafeAreaView>
            </LinearGradient>

            <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 30 }}>
                {/* Hijri Months Overview */}
                <Text variant="titleMedium" style={styles.sectionTitle}>Bulan Hijriah</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.monthsScroll}>
                    {HIJRI_MONTHS.map((month, index) => (
                        <Surface
                            key={month.id}
                            style={[
                                styles.monthCard,
                                month.id === todayHijri.month && styles.monthCardActive
                            ]}
                            elevation={1}
                        >
                            <Text style={[
                                styles.monthNumber,
                                month.id === todayHijri.month && styles.monthNumberActive
                            ]}>
                                {month.id}
                            </Text>
                            <Text style={[
                                styles.monthName,
                                month.id === todayHijri.month && styles.monthNameActive
                            ]}>
                                {month.name}
                            </Text>
                            <Text style={styles.monthArabic}>{month.arabicName}</Text>
                        </Surface>
                    ))}
                </ScrollView>

                {/* Upcoming Events */}
                <Text variant="titleMedium" style={styles.sectionTitle}>Peristiwa Mendatang</Text>
                {upcomingEvents.length === 0 ? (
                    <Text style={styles.noEvents}>Tidak ada peristiwa dalam 60 hari ke depan</Text>
                ) : (
                    upcomingEvents.map((event, index) => {
                        const [colorStart, colorEnd] = getEventTypeColor(event.type);
                        return (
                            <Card key={index} style={styles.eventCard} mode="elevated">
                                <Card.Content>
                                    <View style={styles.eventHeader}>
                                        <View style={[styles.eventIcon, { backgroundColor: colorStart }]}>
                                            <MaterialCommunityIcons
                                                name={getEventIcon(event.type) as any}
                                                size={24}
                                                color="#fff"
                                            />
                                        </View>
                                        <View style={styles.eventInfo}>
                                            <Text variant="titleMedium" style={styles.eventName}>{event.name}</Text>
                                            <Text style={styles.eventDesc}>{event.description}</Text>
                                        </View>
                                        <Chip
                                            mode="flat"
                                            compact
                                            style={{ backgroundColor: colorEnd + '40' }}
                                            textStyle={{ color: colorStart, fontSize: 12 }}
                                        >
                                            {event.daysUntil === 0 ? 'Hari ini!' : `${event.daysUntil} hari`}
                                        </Chip>
                                    </View>

                                    {event.recommendedAmal && event.recommendedAmal.length > 0 && (
                                        <View style={styles.amalContainer}>
                                            <Text style={styles.amalTitle}>Amal yang dianjurkan:</Text>
                                            <View style={styles.amalList}>
                                                {event.recommendedAmal.map((amal, i) => (
                                                    <Chip
                                                        key={i}
                                                        icon="check"
                                                        compact
                                                        style={styles.amalChip}
                                                        textStyle={{ fontSize: 11 }}
                                                    >
                                                        {amal}
                                                    </Chip>
                                                ))}
                                            </View>
                                        </View>
                                    )}
                                </Card.Content>
                            </Card>
                        );
                    })
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
        paddingBottom: 60,
    },
    header: {
        alignItems: 'center',
        paddingTop: 10,
    },
    title: {
        fontWeight: 'bold',
        color: '#fff',
    },
    dateCard: {
        marginHorizontal: 16,
        marginTop: 16,
        padding: 20,
        borderRadius: 16,
        backgroundColor: '#fff',
    },
    dateHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateInfo: {
        marginLeft: 16,
    },
    hijriDay: {
        fontWeight: 'bold',
        color: '#5d4037',
        fontSize: 48,
        lineHeight: 52,
    },
    hijriMonth: {
        fontWeight: 'bold',
        color: '#5d4037',
    },
    hijriYear: {
        color: '#8d6e63',
    },
    gregorianInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    gregorianText: {
        marginLeft: 8,
        color: '#666',
    },
    content: {
        flex: 1,
        marginTop: -40,
        paddingTop: 50,
    },
    sectionTitle: {
        fontWeight: 'bold',
        paddingHorizontal: 16,
        marginBottom: 12,
        marginTop: 16,
    },
    monthsScroll: {
        paddingLeft: 16,
    },
    monthCard: {
        width: 80,
        padding: 12,
        marginRight: 8,
        borderRadius: 12,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    monthCardActive: {
        backgroundColor: '#5d4037',
    },
    monthNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    monthNumberActive: {
        color: '#fff',
    },
    monthName: {
        fontSize: 11,
        color: '#666',
        textAlign: 'center',
    },
    monthNameActive: {
        color: '#fff',
    },
    monthArabic: {
        fontSize: 12,
        color: '#999',
        marginTop: 4,
    },
    noEvents: {
        textAlign: 'center',
        color: '#888',
        paddingVertical: 20,
    },
    eventCard: {
        marginHorizontal: 16,
        marginBottom: 12,
        borderRadius: 12,
    },
    eventHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    eventIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    eventInfo: {
        flex: 1,
        marginLeft: 12,
    },
    eventName: {
        fontWeight: 'bold',
    },
    eventDesc: {
        fontSize: 12,
        color: '#666',
    },
    amalContainer: {
        marginTop: 12,
        backgroundColor: '#f9f9f9',
        padding: 12,
        borderRadius: 8,
    },
    amalTitle: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
        marginBottom: 8,
    },
    amalList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    amalChip: {
        backgroundColor: '#e8f5e9',
    },
});
