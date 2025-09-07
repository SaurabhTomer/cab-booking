import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { io } from "socket.io-client";

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Connect to socket on current origin (Vite proxy in dev, same origin in prod)
const socket = io();

const LiveMap = ({ rideId }) => {
    const [position, setPosition] = useState({ lat: 28.6139, lng: 77.209 }); // Default coordinates

    useEffect(() => {
        // Join ride room to receive live updates
        socket.emit("joinRide", rideId);

        // Listen for driver location updates
        socket.on("receiveLocation", (loc) => {
            setPosition({ lat: loc.lat, lng: loc.lng });
        });

        return () => socket.off("receiveLocation");
    }, [rideId]);

    return (
        <div className="w-full h-64 sm:h-80 lg:h-96 overflow-hidden rounded-xl">
            <MapContainer center={[position.lat, position.lng]} zoom={13} className="h-full w-full">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[position.lat, position.lng]} />
            </MapContainer>
        </div>
    );
};

export default LiveMap;
