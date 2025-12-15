import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, Chip } from 'react-native-paper';
import { MuhasabahQuestion } from '@/services/muhasabah/questionPool';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
    question: MuhasabahQuestion;
    answer: string; // 'yes' | 'no' | ''
    onAnswer: (text: string) => void;
}

export const DailyQuestionCard: React.FC<Props> = ({ question, answer, onAnswer }) => {
    const getDifficultyColor = (diff: string) => {
        switch (diff) {
            case 'LIGHT': return '#4CAF50';
            case 'MODERATE': return '#FF9800';
            case 'DEEP': return '#F44336';
            default: return '#999';
        }
    };

    return (
        <Card style={styles.card}>
            <Card.Content>
                <View style={styles.header}>
                    <Chip
                        compact
                        style={{ backgroundColor: getDifficultyColor(question.difficulty) + '20' }}
                        textStyle={{ color: getDifficultyColor(question.difficulty), fontSize: 10, fontWeight: 'bold' }}
                    >
                        {question.category}
                    </Chip>
                </View>

                {question.arabic && (
                    <Text style={styles.arabic}>{question.arabic}</Text>
                )}

                <Text variant="titleMedium" style={styles.questionText}>
                    {question.text}
                </Text>

                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={[styles.answerButton, answer === 'yes' && styles.yesActive]}
                        onPress={() => onAnswer('yes')}
                    >
                        <MaterialCommunityIcons
                            name="check-circle"
                            size={24}
                            color={answer === 'yes' ? '#fff' : '#4CAF50'}
                        />
                        <Text style={[styles.buttonText, answer === 'yes' && styles.buttonTextActive]}>Ya</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.answerButton, answer === 'no' && styles.noActive]}
                        onPress={() => onAnswer('no')}
                    >
                        <MaterialCommunityIcons
                            name="close-circle"
                            size={24}
                            color={answer === 'no' ? '#fff' : '#F44336'}
                        />
                        <Text style={[styles.buttonText, answer === 'no' && styles.buttonTextActive]}>Tidak</Text>
                    </TouchableOpacity>
                </View>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        marginBottom: 16,
        backgroundColor: '#fff',
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    arabic: {
        fontSize: 18,
        textAlign: 'right',
        color: '#1a237e',
        marginBottom: 8,
    },
    questionText: {
        marginBottom: 16,
        lineHeight: 24,
        color: '#333',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 12,
    },
    answerButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#e0e0e0',
        gap: 8,
    },
    yesActive: {
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
    },
    noActive: {
        backgroundColor: '#F44336',
        borderColor: '#F44336',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    buttonTextActive: {
        color: '#fff',
    },
});
