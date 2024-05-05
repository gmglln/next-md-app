'use client';

import React from "react";
import LocationButton from "@/components/LocationButton";
import LocationCard from "@/components/LocationCard";
import useLocationHook from "@/hooks/useLocationHook";

const Home: React.FC = () => {
  const { currentLocation, locations, savingLocation, getLocation } = useLocationHook();

  return (
    <div className="flex flex-col h-screen">
      {/* Body Section (80%) */}
      <div className="flex-1 bg-gray-900 flex flex-col items-center justify-start p-4 overflow-y-auto">
        <h1 className="text-2xl font-bold text-white mb-4">Locations stored</h1>
        {currentLocation && <LocationCard location={currentLocation} />}
        {locations.map((location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>
      {/* Button Section (20%) */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-900 flex items-center justify-center p-4">
        <LocationButton onClick={getLocation} saving={savingLocation} />
      </div>
    </div>
  );
};

export default Home;
