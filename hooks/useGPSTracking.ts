import { useState, useEffect, useRef } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import { supabase } from '../supabaseClient';

interface LocationCoordinates {
    latitude: number;
    longitude: number;
    accuracy?: number;
    speed?: number;
    heading?: number;
}

interface UseGPSTrackingOptions {
    busNumber: string;
    institutionId: string;
    isActive: boolean; // Whether trip is active
    updateInterval?: number; // Milliseconds between updates (default: 10000 = 10 seconds)
}

export const useGPSTracking = ({
    busNumber,
    institutionId,
    isActive,
    updateInterval = 10000
}: UseGPSTrackingOptions) => {
    const [currentLocation, setCurrentLocation] = useState<LocationCoordinates | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [permissionGranted, setPermissionGranted] = useState<boolean>(false);
    const watchIdRef = useRef<string | null>(null);

    // Request location permissions
    const requestPermissions = async () => {
        try {
            const permission = await Geolocation.requestPermissions();
            if (permission.location === 'granted') {
                setPermissionGranted(true);
                setError(null);
                return true;
            } else {
                setError('Location permission denied. Please enable location access in settings.');
                return false;
            }
        } catch (err) {
            setError('Failed to request location permissions');
            console.error('Permission error:', err);
            return false;
        }
    };

    // Update location in Supabase
    const updateLocationInDB = async (coords: LocationCoordinates) => {
        try {
            const { error: dbError } = await supabase
                .from('bus_locations')
                .upsert({
                    bus_number: busNumber,
                    institution_id: institutionId,
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                    speed: coords.speed || null,
                    heading: coords.heading || null,
                    updated_at: new Date().toISOString()
                }, {
                    onConflict: 'bus_number,institution_id'
                });

            if (dbError) {
                console.error('Database update error:', dbError);
            }
        } catch (err) {
            console.error('Failed to update location:', err);
        }
    };

    // Get current position once
    const getCurrentPosition = async () => {
        try {
            const position = await Geolocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 10000
            });

            const coords: LocationCoordinates = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy,
                speed: position.coords.speed || undefined,
                heading: position.coords.heading || undefined
            };

            setCurrentLocation(coords);
            await updateLocationInDB(coords);
            setError(null);
        } catch (err: any) {
            setError(`GPS Error: ${err.message || 'Unable to get location'}`);
            console.error('GPS error:', err);
        }
    };

    // Start watching position changes
    const startWatching = async () => {
        try {
            const watchId = await Geolocation.watchPosition(
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                },
                async (position, err) => {
                    if (err) {
                        setError(`GPS tracking error: ${err.message}`);
                        return;
                    }

                    if (position) {
                        const coords: LocationCoordinates = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            accuracy: position.coords.accuracy,
                            speed: position.coords.speed || undefined,
                            heading: position.coords.heading || undefined
                        };

                        setCurrentLocation(coords);
                        await updateLocationInDB(coords);
                        setError(null);
                    }
                }
            );

            watchIdRef.current = watchId;
        } catch (err: any) {
            setError(`Failed to start GPS tracking: ${err.message}`);
            console.error('Watch error:', err);
        }
    };

    // Stop watching
    const stopWatching = async () => {
        if (watchIdRef.current) {
            await Geolocation.clearWatch({ id: watchIdRef.current });
            watchIdRef.current = null;
        }
    };

    // Main effect - manages GPS tracking based on trip state
    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;

        const startTracking = async () => {
            if (!isActive) return;

            // Request permissions first
            const hasPermission = await requestPermissions();
            if (!hasPermission) return;

            // Get initial position
            await getCurrentPosition();

            // Use position watching for continuous updates
            await startWatching();
        };

        if (isActive && busNumber && institutionId) {
            startTracking();
        } else {
            stopWatching();
        }

        // Cleanup
        return () => {
            stopWatching();
            if (intervalId) clearInterval(intervalId);
        };
    }, [isActive, busNumber, institutionId]);

    return {
        currentLocation,
        error,
        permissionGranted,
        requestPermissions,
        getCurrentPosition
    };
};
