import React from "react";
import { MapPin, Share2, Trash } from "react-feather";

interface Location {
  id: number;
  lat: number;
  long: number;
  address: string;
}

interface LocationCardProps {
  location: Location;
}

// Abrir la dirección en Google Maps
const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  const openInGoogleMaps = () => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.long}`;
    window.open(mapsUrl, "_blank");
  };

  const deleteLocation = () => {
    const storedLocationsString = localStorage.getItem("locations");
    if (storedLocationsString) {
      const storedLocations: Location[] = JSON.parse(storedLocationsString);
      const updatedLocations = storedLocations.filter(
        (loc: Location) => loc.id !== location.id
      );
      localStorage.setItem("locations", JSON.stringify(updatedLocations));
      // Podemos agregar un mensaje de confirmación si es necesario
    }
  };

  const shareLocation = () => {
    if (navigator.share) {
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.long}`;
      navigator.share({
        title: "Compartir ubicación",
        text: `Ubicación: ${location.address}. Abrir en Google Maps: ${mapsUrl}`,
        url: mapsUrl
      })
        .then(() => console.log("Ubicación compartida con éxito"))
        .catch((error) => console.error("Error al compartir ubicación", error));
    } else {
      console.log("La función de compartir no está disponible en este navegador.");
      // Podemos proporcionar una alternativa aquí si es necesario
    }
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
      <div className="flex justify-between items-center mt-2">
        <button
          className="flex items-center px-3 py-1 text-sm bg-slate-800 hover:bg-slate-900 text-white rounded-md"
          onClick={openInGoogleMaps}
        >
          <MapPin className="h-4 w-4 mr-1" />
          Abrir en Maps
        </button>
        <div className="flex items-center">
          <button className="flex items-center text-gray-300 hover:text-white p-1" onClick={shareLocation}>
            <Share2 className="h-4 w-4" />
          </button>
          <button className="flex items-center text-gray-300 hover:text-white p-1 ml-2" onClick={deleteLocation}>
            <Trash className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
