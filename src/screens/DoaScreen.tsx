import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { Text, useTheme, Surface, Searchbar, Card, Chip, IconButton, Modal, Portal } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getAllCategories, getDoasByCategory, searchDoas, Doa, DoaCategory } from '@/services/doa/doaCollection';

export default function DoaScreen() {
    const theme = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedDoa, setSelectedDoa] = useState<Doa | null>(null);

    const categories = getAllCategories();

    const displayedDoas = searchQuery
        ? searchDoas(searchQuery)
        : selectedCategory
            ? getDoasByCategory(selectedCategory)
            : [];

    const selectedCategoryInfo = categories.find(c => c.id === selectedCategory);

    const handleShare = async (doa: Doa) => {
        try {
            await Share.share({
                message: `📿 ${doa.title}\n\n${doa.arabic}\n\n${doa.transliteration}\n\n${doa.translation}\n\n- ${doa.source || 'Hisnul Muslim'}`,
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#00695c', '#00897b', '#26a69a']} style={styles.headerGradient}>
                <SafeAreaView edges={['top']}>
                    <View style={styles.header}>
                        <Text variant="headlineSmall" style={styles.title}>Kumpulan Doa</Text>
                        <Text style={styles.subtitle}>Hisnul Muslim</Text>
                    </View>

                    {/* Search */}
                    <Searchbar
                        placeholder="Cari doa..."
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                        style={styles.searchBar}
                        inputStyle={{ fontSize: 14 }}
                    />
                </SafeAreaView>
            </LinearGradient>

            <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 30 }}>
                {/* Category Grid */}
                {!selectedCategory && !searchQuery && (
                    <>
                        <Text variant="titleMedium" style={styles.sectionTitle}>Kategori</Text>
                        <View style={styles.categoryGrid}>
                            {categories.map((category) => (
                                <TouchableOpacity
                                    key={category.id}
                                    style={styles.categoryCard}
                                    onPress={() => setSelectedCategory(category.id)}
                                    activeOpacity={0.7}
                                >
                                    <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                                        <MaterialCommunityIcons
                                            name={category.icon as any}
                                            size={32}
                                            color={category.color}
                                        />
                                    </View>
                                    <Text style={styles.categoryName}>{category.name}</Text>
                                    <Text style={styles.categoryCount}>{category.doas.length} doa</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </>
                )}

                {/* Doa List */}
                {(selectedCategory || searchQuery) && (
                    <>
                        {selectedCategory && !searchQuery && (
                            <View style={styles.categoryHeader}>
                                <TouchableOpacity onPress={() => setSelectedCategory(null)} style={styles.backButton}>
                                    <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
                                </TouchableOpacity>
                                <View style={[styles.categoryBadge, { backgroundColor: selectedCategoryInfo?.color }]}>
                                    <MaterialCommunityIcons
                                        name={selectedCategoryInfo?.icon as any}
                                        size={20}
                                        color="#fff"
                                    />
                                </View>
                                <Text variant="titleMedium" style={styles.categoryTitle}>
                                    {selectedCategoryInfo?.name}
                                </Text>
                            </View>
                        )}

                        {searchQuery && displayedDoas.length === 0 && (
                            <Text style={styles.noResults}>Tidak ditemukan doa dengan kata kunci "{searchQuery}"</Text>
                        )}

                        {displayedDoas.map((doa) => (
                            <Card
                                key={doa.id}
                                style={styles.doaCard}
                                mode="elevated"
                                onPress={() => setSelectedDoa(doa)}
                            >
                                <Card.Content>
                                    <Text variant="titleMedium" style={styles.doaTitle}>{doa.title}</Text>
                                    <Text style={styles.arabicText} numberOfLines={2}>{doa.arabic}</Text>
                                    <Text style={styles.translitText} numberOfLines={1}>{doa.transliteration}</Text>
                                </Card.Content>
                            </Card>
                        ))}
                    </>
                )}
            </ScrollView>

            {/* Doa Detail Modal */}
            <Portal>
                <Modal visible={!!selectedDoa} onDismiss={() => setSelectedDoa(null)} contentContainerStyle={styles.modal}>
                    {selectedDoa && (
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.modalHeader}>
                                <Text variant="titleLarge" style={styles.modalTitle}>{selectedDoa.title}</Text>
                                <View style={styles.modalActions}>
                                    <IconButton
                                        icon="share-variant"
                                        size={24}
                                        onPress={() => handleShare(selectedDoa)}
                                    />
                                    <IconButton
                                        icon="close"
                                        size={24}
                                        onPress={() => setSelectedDoa(null)}
                                    />
                                </View>
                            </View>

                            <Surface style={styles.arabicContainer} elevation={0}>
                                <Text style={styles.arabicFull}>{selectedDoa.arabic}</Text>
                            </Surface>

                            <View style={styles.section}>
                                <Text style={styles.sectionLabel}>Transliterasi</Text>
                                <Text style={styles.transliterationFull}>{selectedDoa.transliteration}</Text>
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.sectionLabel}>Arti</Text>
                                <Text style={styles.translationFull}>{selectedDoa.translation}</Text>
                            </View>

                            {selectedDoa.source && (
                                <Chip icon="book-open-variant" style={styles.sourceChip}>
                                    {selectedDoa.source}
                                </Chip>
                            )}

                            {selectedDoa.benefit && (
                                <Surface style={styles.benefitContainer} elevation={0}>
                                    <MaterialCommunityIcons name="lightbulb-on" size={20} color="#FF9800" />
                                    <Text style={styles.benefitText}>{selectedDoa.benefit}</Text>
                                </Surface>
                            )}
                        </ScrollView>
                    )}
                </Modal>
            </Portal>
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
    },
    header: {
        alignItems: 'center',
        paddingTop: 10,
    },
    title: {
        fontWeight: 'bold',
        color: '#fff',
    },
    subtitle: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 14,
    },
    searchBar: {
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 12,
    },
    content: {
        flex: 1,
    },
    sectionTitle: {
        fontWeight: 'bold',
        paddingHorizontal: 16,
        marginTop: 20,
        marginBottom: 12,
    },
    categoryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 12,
    },
    categoryCard: {
        width: '45%',
        backgroundColor: '#fff',
        padding: 16,
        margin: 6,
        borderRadius: 12,
        alignItems: 'center',
        elevation: 2,
    },
    categoryIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    categoryName: {
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
    categoryCount: {
        fontSize: 12,
        color: '#888',
    },
    categoryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    backButton: {
        marginRight: 12,
    },
    categoryBadge: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    categoryTitle: {
        fontWeight: 'bold',
    },
    noResults: {
        textAlign: 'center',
        color: '#888',
        paddingVertical: 40,
    },
    doaCard: {
        marginHorizontal: 16,
        marginBottom: 8,
        borderRadius: 12,
    },
    doaTitle: {
        fontWeight: 'bold',
        marginBottom: 8,
    },
    arabicText: {
        fontSize: 20,
        fontFamily: 'System',
        textAlign: 'right',
        lineHeight: 36,
        color: '#333',
    },
    translitText: {
        fontSize: 13,
        color: '#666',
        fontStyle: 'italic',
        marginTop: 8,
    },
    modal: {
        backgroundColor: '#fff',
        margin: 16,
        padding: 20,
        borderRadius: 16,
        maxHeight: '85%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    modalTitle: {
        fontWeight: 'bold',
        flex: 1,
    },
    modalActions: {
        flexDirection: 'row',
    },
    arabicContainer: {
        backgroundColor: '#f5f5f5',
        padding: 20,
        borderRadius: 12,
        marginBottom: 20,
    },
    arabicFull: {
        fontSize: 28,
        fontFamily: 'System',
        textAlign: 'center',
        lineHeight: 48,
        color: '#1a237e',
    },
    section: {
        marginBottom: 16,
    },
    sectionLabel: {
        fontSize: 12,
        color: '#888',
        fontWeight: '600',
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    transliterationFull: {
        fontSize: 15,
        fontStyle: 'italic',
        color: '#555',
        lineHeight: 24,
    },
    translationFull: {
        fontSize: 15,
        color: '#333',
        lineHeight: 24,
    },
    sourceChip: {
        alignSelf: 'flex-start',
        marginBottom: 16,
    },
    benefitContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFF8E1',
        padding: 12,
        borderRadius: 8,
        alignItems: 'flex-start',
    },
    benefitText: {
        flex: 1,
        marginLeft: 8,
        fontSize: 13,
        color: '#5D4037',
        lineHeight: 20,
    },
});
