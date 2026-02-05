
import React, { useState, useEffect } from 'react';
import { Marker, Popup, Polyline } from 'react-leaflet';
import LeafletMapWrapper from './GoogleMapWrapper'; // Keeping the filename for now
import { BusStop, Location, Student } from '../types';
import { supabase } from '../supabaseClient';
import L from 'leaflet';

interface DriverMapViewProps {
    busNumber: string;
    institutionId: string | null;
    isDark?: boolean;
}

// Custom icon for current bus (large, highlighted)
const currentBusIcon = new L.DivIcon({
    html: `<div style="background-color: #f3ae3d; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 4px solid white; box-shadow: 0 4px 12px rgba(243,174,61,0.5); font-size: 24px; animation: pulse 2s infinite;">🚌</div>`,
    className: 'custom-current-bus-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 20]
});

// Custom icons for stops with numbers
const createStopIcon = (number: number) => new L.DivIcon({
    html: `<div style="background-color: #10b981; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); color: white; font-weight: bold; font-size: 16px;">${number}</div>`,
    className: `custom-stop-icon-${number}`,
    iconSize: [36, 36],
    iconAnchor: [18, 18]
});

const DriverMapView: React.FC<DriverMapViewProps> = ({ busNumber, institutionId, isDark = false }) => {
    const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
    const [route, setRoute] = useState<BusStop[]>([]);
    const [center, setCenter] = useState<Location>({ lat: 12.9716, lng: 77.5946 });

    // Fetch driver's bus location and route
    useEffect(() => {
        if (!busNumber || !institutionId) return;

        const fetchRouteData = async () => {
            // Fetch current bus location
            const { data: locationData } = await supabase
                .from('bus_locations')
                .select('*')
                .eq('bus_number', busNumber)
                .eq('institution_id', institutionId)
                .order('updated_at', { ascending: false })
                .limit(1)
                .single();

            if (locationData) {
                const location = {
                    lat: parseFloat(locationData.latitude),
                    lng: parseFloat(locationData.longitude)
                };
                setCurrentLocation(location);
                setCenter(location);
            }

            // Fetch route and stops for this bus
            const { data: routeData } = await supabase
                .from('bus_routes')
                .select(`
          id,
          bus_number,
          route_name,
          bus_stops (
            id,
            stop_name,
            latitude,
            longitude,
            stop_order,
            estimated_time
          )
        `)
                .eq('bus_number', busNumber)
                .eq('institution_id', institutionId)
                .single();

            if (routeData && routeData.bus_stops) {
                // Fetch students for each stop
                const stopsWithStudents = await Promise.all(
                    routeData.bus_stops.map(async (stop: any) => {
                        const { data: students } = await supabase
                            .from('profiles')
                            .select('*')
                            .eq('assignedBus', busNumber)
                            .eq('role', 'student');

                        const studentsAtStop: Student[] = students?.map((s: any) => ({
                            id: s.id,
                            name: s.full_name || 'Unnamed',
                            grade: s.department || 'N/A',
                            rollNumber: s.staff_id || 'N/A',
                            boarded: false,
                            avatar: s.image_url || `https://i.pravatar.cc/150?u=${s.id}`,
                            institution_id: s.institution_id,
                            assignedBus: s.assignedBus || ''
                        })) || [];

                        return {
                            id: stop.id,
                            routeId: routeData.id,
                            stopName: stop.stop_name,
                            location: {
                                lat: parseFloat(stop.latitude),
                                lng: parseFloat(stop.longitude)
                            },
                            stopOrder: stop.stop_order,
                            estimatedTime: stop.estimated_time,
                            students: studentsAtStop
                        };
                    })
                );

                setRoute(stopsWithStudents.sort((a, b) => a.stopOrder - b.stopOrder));
            }
        };

        fetchRouteData();

        // Subscribe to real-time location updates
        const locationSubscription = supabase
            .channel(`bus-location-${busNumber}`)
            .on('postgres_changes' as any, {
                event: '*',
                table: 'bus_locations',
                filter: `bus_number=eq.${busNumber}`
            }, (payload: any) => {
                if (payload.new) {
                    setCurrentLocation({
                        lat: parseFloat(payload.new.latitude),
                        lng: parseFloat(payload.new.longitude)
                    });
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(locationSubscription);
        };
    }, [busNumber, institutionId]);

    // Route path for visualization
    const routePath = route.map(stop => [stop.location.lat, stop.location.lng] as [number, number]);

    return (
        <LeafletMapWrapper center={center} zoom={14} isDark={isDark}>
            {/* Current Bus Location */}
            {currentLocation && (
                <Marker
                    position={[currentLocation.lat, currentLocation.lng]}
                    icon={currentBusIcon}
                >
                    <Popup>
                        <div className="p-2">
                            <h3 className="font-bold text-sm">🚌 Your Bus ({busNumber})</h3>
                            <p className="text-xs text-gray-600">Current Location</p>
                        </div>
                    </Popup>
                </Marker>
            )}

            {/* Route Line */}
            {routePath.length > 1 && (
                <Polyline
                    positions={routePath}
                    pathOptions={{
                        color: '#f3ae3d',
                        weight: 4,
                        opacity: 0.8
                    }}
                />
            )}

            {/* Stop Markers */}
            {route.map((stop, index) => (
                <Marker
                    key={stop.id}
                    position={[stop.location.lat, stop.location.lng]}
                    icon={createStopIcon(index + 1)}
                >
                    <Popup>
                        <div className="p-3 max-w-xs">
                            <h3 className="font-bold text-sm mb-2">
                                Stop {index + 1}: {stop.stopName}
                            </h3>
                            {stop.estimatedTime && (
                                <p className="text-xs text-gray-600 mb-2">
                                    ETA: {stop.estimatedTime}
                                </p>
                            )}
                            <div className="mt-2">
                                <p className="text-xs font-semibold mb-1">Students at this stop:</p>
                                {stop.students.length === 0 ? (
                                    <p className="text-xs text-gray-500 italic">No students assigned</p>
                                ) : (
                                    <ul className="text-xs space-y-1">
                                        {stop.students.slice(0, 5).map((student) => (
                                            <li key={student.id} className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                                {student.name} ({student.grade})
                                            </li>
                                        ))}
                                        {stop.students.length > 5 && (
                                            <li className="text-gray-500 italic">
                                                +{stop.students.length - 5} more
                                            </li>
                                        )}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </LeafletMapWrapper>
    );
};

export default DriverMapView;
