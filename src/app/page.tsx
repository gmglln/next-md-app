'use client';

import React from "react";
import LocationButton from "@/components/LocationButton";
import LocationCard from "@/components/LocationCard";

// Definición de tipo para la ubicación
interface Location {
  id: number;
  lat: number;
  long: number;
  address: string;
}

// JSON con ubicaciones simuladas
const locations: Location[] = [
  {
    id: 1,
    lat: 40.7128,
    long: -74.006,
    address: "New York, NY, USA"
  },
  {
    id: 2,
    lat: 34.0522,
    long: -118.2437,
    address: "Los Angeles, CA, USA"
  },
  {
    id: 3,
    lat: 51.5074,
    long: -0.1278,
    address: "London, UK"
  }
];

const Home: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">

      {/* Body Section (80%) */}
      <div className="flex-1 bg-gray-900 flex flex-col items-center justify-start p-4 overflow-y-auto">
        <h1 className="text-2xl font-bold text-white mb-4">Locations stored</h1>
        {locations.map((location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>

      {/* Button Section (20%) */}
      <div className="h-20 bg-gray-900 flex items-center justify-center">
        <LocationButton onClick={() => console.log("Location now button clicked!")} />
      </div>
    </div>
  );
};

export default Home;
