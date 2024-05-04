import React from "react";

interface LocationCardProps {
  location: {
    id: number;
    lat: number;
    long: number;
    address: string;
  };
}

const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  return (
    <div className="bg-gray-900 rounded-lg p-4 mb-4 w-full max-w-md border border-gray-500">
      <p className="text-white text-lg font-semibold mb-2">{location.address}</p>
      <p className="text-gray-300 text-sm">Latitude: {location.lat}, Longitude: {location.long}</p>
    </div>
  );
};

export default LocationCard;
