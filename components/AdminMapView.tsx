
import React, { useState, useEffect } from 'react';
import { Marker, Popup, Polyline } from 'react-leaflet';
import LeafletMapWrapper from './GoogleMapWrapper'; // Keeping the filename for now
import { Bus, StudentLocation, Location } from '../types';
import { supabase } from '../supabaseClient';
import L from 'leaflet';

interface AdminMapViewProps {
    institutionId: string | null;
    isDark?: boolean;
}

// Custom icon for buses (orange)
const busIcon = new L.DivIcon({
    html: `<div style="background-color: #f3ae3d; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); font-size: 18px;">🚌</div>`,
    className: 'custom-bus-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 16]
});

// Custom icon for students (green)
const studentIcon = new L.DivIcon({
    html: `<div style="background-color: #10b981; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>`,
    className: 'custom-student-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 12]
});

const AdminMapView: React.FC<AdminMapViewProps> = ({ institutionId, isDark = false }) => {
    const [buses, setBuses] = useState<Bus[]>([]);
    const [students, setStudents] = useState<StudentLocation[]>([]);
    const [center, setCenter] = useState<Location>({ lat: 12.9716, lng: 77.5946 }); // Default: Bangalore

    // Fetch buses and students
    useEffect(() => {
        if (!institutionId) return;

        const fetchData = async () => {
            // Fetch buses from bus_locations
            const { data: busData } = await supabase
                .from('bus_locations')
                .select('*')
                .eq('institution_id', institutionId);

            if (busData && busData.length > 0) {
                const busesWithLocations: Bus[] = busData.map((b: any) => ({
                    id: b.id,
                    busNumber: b.bus_number,
                    route: 'Route',
                    institution_id: b.institution_id,
                    status: 'active',
                    currentLat: parseFloat(b.latitude),
                    currentLng: parseFloat(b.longitude)
                }));
                setBuses(busesWithLocations);

                // Set center to first bus location
                setCenter({
                    lat: busesWithLocations[0].currentLat || 12.9716,
                    lng: busesWithLocations[0].currentLng || 77.5946
                });
            }

            // Fetch students with pickup locations
            const { data: studentData } = await supabase
                .from('profiles')
                .select('*')
                .eq('institution_id', institutionId)
                .eq('role', 'student')
                .not('pickup_latitude', 'is', null);

            if (studentData) {
                const studentsWithLocations: StudentLocation[] = studentData.map((s: any) => ({
                    id: s.id,
                    name: s.full_name || 'Unnamed',
                    grade: s.department || 'N/A',
                    rollNumber: s.staff_id || 'N/A',
                    boarded: false,
                    avatar: s.image_url || `https://i.pravatar.cc/150?u=${s.id}`,
                    institution_id: s.institution_id,
                    assignedBus: s.assignedBus || '',
                    pickupLocation: s.pickup_latitude && s.pickup_longitude ? {
                        lat: parseFloat(s.pickup_latitude),
                        lng: parseFloat(s.pickup_longitude)
                    } : undefined,
                    pickupAddress: s.pickup_address
                }));
                setStudents(studentsWithLocations);
            }
        };

        fetchData();

        // Subscribe to real-time updates
        const busSubscription = supabase
            .channel('bus-locations-admin')
            .on('postgres_changes' as any, {
                event: '*',
                table: 'bus_locations',
                filter: `institution_id=eq.${institutionId}`
            }, () => {
                fetchData();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(busSubscription);
        };
    }, [institutionId]);

    return (
        <LeafletMapWrapper center={center} zoom={13} isDark={isDark}>
            {/* Bus Markers */}
            {buses.map((bus) => (
                bus.currentLat && bus.currentLng && (
                    <Marker
                        key={bus.id}
                        position={[bus.currentLat, bus.currentLng]}
                        icon={busIcon}
                    >
                        <Popup>
                            <div className="p-2">
                                <h3 className="font-bold text-sm">🚌 Bus {bus.busNumber}</h3>
                                <p className="text-xs text-gray-600">Status: Active</p>
                            </div>
                        </Popup>
                    </Marker>
                )
            ))}

            {/* Student Pickup Location Markers */}
            {students.map((student) => (
                student.pickupLocation && (
                    <Marker
                        key={student.id}
                        position={[student.pickupLocation.lat, student.pickupLocation.lng]}
                        icon={studentIcon}
                    >
                        <Popup>
                            <div className="p-2">
                                <h3 className="font-bold text-sm">{student.name}</h3>
                                <p className="text-xs text-gray-600">{student.grade}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {student.pickupAddress || 'Pickup Location'}
                                </p>
                            </div>
                        </Popup>
                    </Marker>
                )
            ))}
        </LeafletMapWrapper>
    );
};

export default AdminMapView;
