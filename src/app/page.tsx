'use client';

import React from "react";

// JSON con ubicaciones simuladas
const locations = [
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

export default function Home() {
  return (
    <div className="flex flex-col h-screen">

      {/* Body Section (80%) */}
      <div className="flex-1 bg-gray-900 flex flex-col items-center justify-start p-4 overflow-y-auto">
        <h1 className="text-2xl font-bold text-white mb-4">Locations stored</h1>
        {locations.map((location) => (
          <div
            key={location.id}
            className="bg-zing-900 rounded-lg p-4 mb-4 w-full max-w-md border border-gray-500"
          >
            <p className="text-white text-lg font-semibold mb-2">
              {location.address}
            </p>
            <p className="text-gray-300 text-sm">
              Latitude: {location.lat}, Longitude: {location.long}
            </p>
          </div>
        ))}
      </div>

      {/* Button Section (20%) */}
      <div className="h-20 bg-gray-900 flex items-center justify-center">
        <button
          className="px-4 py-2 bg-green-500 text-white font-bold rounded-lg focus:outline-none focus:ring focus:ring-green-400"
          onClick={() => console.log("Location now button clicked!")}
        >
          Location now
        </button>
      </div>
    </div>
  );
}
