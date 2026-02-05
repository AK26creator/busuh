
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface LeafletMapWrapperProps {
    children: React.ReactNode;
    center: { lat: number; lng: number };
    zoom?: number;
    isDark?: boolean;
}

const LeafletMapWrapper: React.FC<LeafletMapWrapperProps> = ({
    children,
    center,
    zoom = 12,
    isDark = false
}) => {
    return (
        <div className="w-full h-full rounded-2xl overflow-hidden">
            <MapContainer
                center={[center.lat, center.lng]}
                zoom={zoom}
                style={{ height: '100%', width: '100%' }}
                zoomControl={true}
                className={isDark ? 'leaflet-dark-mode' : ''}
            >
                {/* Use different tile layers for dark/light mode */}
                {isDark ? (
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    />
                ) : (
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                )}
                {children}
            </MapContainer>
        </div>
    );
};

export default LeafletMapWrapper;
