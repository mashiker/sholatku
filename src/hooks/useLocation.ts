import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setLocation, setError, setLoading } from '@/redux/slices/locationSlice';
import { LocationRepository } from '@/services/database/locationDb';
import { LocationEntity } from '@/types';

export const useLocation = () => {
    const dispatch = useAppDispatch();
    const { currentLocation, loading, error } = useAppSelector((state) => state.location);
    const [permissionStatus, setPermissionStatus] = useState<Location.PermissionStatus | null>(null);

    const requestPermission = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        setPermissionStatus(status);
        return status;
    };

    const getLocation = async () => {
        try {
            dispatch(setLoading(true));
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                dispatch(setError('Izin lokasi ditolak. Mohon aktifkan izin lokasi.'));
                return;
            }

            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            });

            const addresses = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });

            const city = addresses[0]?.city || addresses[0]?.subregion || 'Unknown Location';
            const timezone = 'Asia/Jakarta'; // Simplified, ideally detect or API

            const entity: LocationEntity = {
                city,
                country: addresses[0]?.country || 'Indonesia',
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                timezone,
                is_favorite: false,
                is_current: true,
            };

            await LocationRepository.saveLocation(entity);
            dispatch(setLocation(entity));
        } catch (err) {
            console.error('Location error:', err);
            // Fallback to saved location
            const saved = await LocationRepository.getCurrentLocation();
            if (saved) {
                dispatch(setLocation(saved));
                dispatch(setError('Gagal mendeteksi lokasi terkini. Menggunakan lokasi tersimpan.'));
            } else {
                dispatch(setError('Gagal mendeteksi lokasi. Pastikan GPS aktif.'));
            }
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (!currentLocation) {
            getLocation();
        }
    }, []);

    return { currentLocation, loading, error, getLocation, requestPermission };
};
