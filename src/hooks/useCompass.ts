import { useState, useEffect, useCallback, useRef } from 'react';
import { Magnetometer, MagnetometerMeasurement } from 'expo-sensors';
import { useLocation } from './useLocation';

// Makkah coordinates (Kaaba)
const MAKKAH_LAT = 21.4225;
const MAKKAH_LNG = 39.8262;

/**
 * Calculate Qibla direction from a given location using proper spherical geometry
 * Returns bearing in degrees from True North (0-360)
 * For Jakarta, Indonesia: should be approximately 295° (WNW direction)
 */
const calculateQibla = (lat: number, lng: number): number => {
    // Convert to radians
    const φ1 = (lat * Math.PI) / 180;
    const φ2 = (MAKKAH_LAT * Math.PI) / 180;
    const Δλ = ((MAKKAH_LNG - lng) * Math.PI) / 180;

    // Forward azimuth formula
    const y = Math.sin(Δλ) * Math.cos(φ2);
    const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);

    let bearing = Math.atan2(y, x) * (180 / Math.PI);

    // Normalize to 0-360
    bearing = (bearing + 360) % 360;

    return bearing;
};

// Get magnetic field strength for calibration status
const getMagneticStrength = (data: MagnetometerMeasurement): number => {
    return Math.sqrt(data.x ** 2 + data.y ** 2 + data.z ** 2);
};

// Smooth angle transitions (handles 0-360 wraparound)
const smoothAngle = (newAngle: number, prevAngle: number, factor: number = 0.15): number => {
    let delta = newAngle - prevAngle;

    // Handle wraparound
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    let result = prevAngle + delta * factor;

    // Normalize to 0-360
    if (result < 0) result += 360;
    if (result >= 360) result -= 360;

    return result;
};

export const useCompass = () => {
    const [heading, setHeading] = useState(0);
    const [qiblaDirection, setQiblaDirection] = useState(295); // Default for Indonesia
    const [calibrationStatus, setCalibrationStatus] = useState<'good' | 'medium' | 'poor'>('good');
    const [isAvailable, setIsAvailable] = useState(true);
    const { currentLocation, loading: locationLoading } = useLocation();

    const prevHeadingRef = useRef(0);

    // Calculate Qibla direction when location changes
    useEffect(() => {
        if (currentLocation) {
            const qibla = calculateQibla(currentLocation.latitude, currentLocation.longitude);
            console.log(`[Qibla] Calculated: ${qibla.toFixed(1)}° from (${currentLocation.latitude}, ${currentLocation.longitude})`);
            setQiblaDirection(qibla);
        }
    }, [currentLocation]);

    // Subscribe to magnetometer
    useEffect(() => {
        let subscription: any;

        const subscribe = async () => {
            try {
                const available = await Magnetometer.isAvailableAsync();
                setIsAvailable(available);

                if (!available) {
                    console.warn('[Compass] Magnetometer not available');
                    return;
                }

                // Update every 100ms for smoother animation
                Magnetometer.setUpdateInterval(100);

                subscription = Magnetometer.addListener((data) => {
                    // Calculate heading from magnetometer data
                    // When phone is FLAT (screen up), x points right and y points up
                    // atan2(x, y) gives angle from Y-axis (which points to magnetic north when x=0)

                    // Try different formulas based on common phone orientations
                    // For phone FLAT on table (screen facing up):
                    let rawAngle = Math.atan2(-data.x, data.y) * (180 / Math.PI);

                    // Normalize to 0-360 (0 = North, 90 = East, 180 = South, 270 = West)
                    rawAngle = (rawAngle + 360) % 360;

                    // Apply smoothing filter
                    const smoothed = smoothAngle(rawAngle, prevHeadingRef.current, 0.2);
                    prevHeadingRef.current = smoothed;

                    setHeading(smoothed);

                    // Check calibration based on field strength
                    const strength = getMagneticStrength(data);
                    if (strength < 15) {
                        setCalibrationStatus('poor');
                    } else if (strength < 30) {
                        setCalibrationStatus('medium');
                    } else {
                        setCalibrationStatus('good');
                    }
                });
            } catch (error) {
                console.warn('[Compass] Error:', error);
                setIsAvailable(false);
            }
        };

        subscribe();
        return () => subscription?.remove();
    }, []);

    // Calculate how far to rotate to face Qibla
    const qiblaAngle = useCallback(() => {
        // Relative angle: how much to turn from current heading to face Qibla
        let angle = qiblaDirection - heading;
        if (angle < 0) angle += 360;
        if (angle >= 360) angle -= 360;
        return angle;
    }, [heading, qiblaDirection]);

    // Check if device is pointing toward Qibla (within ±10 degrees)
    const checkPointingToQibla = useCallback(() => {
        const angle = qiblaAngle();
        return angle < 10 || angle > 350;
    }, [qiblaAngle]);

    return {
        heading,
        qiblaDirection,
        qiblaAngle: qiblaAngle(),
        isPointingToQibla: checkPointingToQibla(),
        calibrationStatus,
        isAvailable,
        locationLoading,
        hasLocation: !!currentLocation,
    };
};
