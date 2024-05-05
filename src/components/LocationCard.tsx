import React from "react";

interface LocationCardProps {
  location: {
    id: number;
    lat: number;
    long: number;
    address: string;
  };
}

// Abrir la dirección en Google Maps
const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  const openInGoogleMaps = () => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.long}`;
    window.open(mapsUrl, "_blank");
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4 mb-4 w-full max-w-md border border-dotted border-gray-500 shadow-sm">
      <p className="text-white text-md font-semibold mb-2">{location.address}</p>
      <div className="flex justify-between items-center">
        <span className="text-gray-300 text-sm">Latitude:</span>
        <span className="inline-block text-xs bg-slate-700 rounded-full px-2">{location.lat}</span>
      </div>
      <div className="flex justify-between items-center">
        <small className="text-gray-300 text-sm">Longitude:</small>
        <small className="inline-block text-xs bg-slate-700 rounded-full px-2">{location.long}</small>
      </div>
      <button
        className="mt-2 px-3 py-1 text-sm bg-slate-800 hover:bg-slate-900 text-white rounded-md"
        onClick={openInGoogleMaps}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 inline-block mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        Open map
      </button>
    </div>
  );
};

export default LocationCard;
