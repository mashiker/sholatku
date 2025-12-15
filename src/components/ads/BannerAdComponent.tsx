import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { selectIsPremium } from '@/redux/slices/premiumSlice';

// AdMob temporarily disabled - requires native configuration
// To enable AdMob:
// 1. Create AdMob account at admob.google.com
// 2. Create an App and get App ID
// 3. Add to app.json: "plugins": [["react-native-google-mobile-ads", {"androidAppId": "ca-app-pub-xxx"}]]
// 4. Uncomment the BannerAd component below

interface Props {
    style?: object;
}

export const BannerAdComponent: React.FC<Props> = ({ style }) => {
    const isPremium = useSelector(selectIsPremium);

    // Don't show ads for premium users
    if (isPremium) {
        return null;
    }

    // Placeholder for ads - will show actual ads once AdMob is configured
    return (
        <View style={[styles.container, styles.placeholder, style]}>
            <Text style={styles.placeholderText}>📢 Iklan akan muncul di sini</Text>
        </View>
    );

    /* Enable this once AdMob is configured:
    return (
        <View style={[styles.container, style]}>
            <BannerAd
                unitId={adUnitId}
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
        </View>
    );
    */
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    placeholder: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 8,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    placeholderText: {
        color: '#999',
        fontSize: 12,
    },
});
