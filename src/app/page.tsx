'use client';

//Thrid party imports
import React from "react";
import { toast } from 'react-hot-toast';

//Local imports
import LocationButton from "@/components/LocationButton";
import LocationCard from "@/components/LocationCard";

// Definición de tipo para la ubicación
interface Location {
  id: number;
  lat: number;
  long: number;
  address: string;
}

const generateInitialLocations = (): Location[] => [
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
  const [currentLocation, setCurrentLocation] = React.useState<Location | null>(null);
  const [locations, setLocations] = React.useState<Location[]>([]);
  const [savingLocation, setSavingLocation] = React.useState<boolean>(false);

  // Obtener ubicación actual
  const getLocation = () => {
    if (navigator.geolocation) {
      setSavingLocation(true);
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const newLocation: Location = {
          id: Date.now(),
          lat: latitude,
          long: longitude,
          address: "" // En blanco por ahora
        };
        setCurrentLocation(newLocation);
        saveLocation(newLocation);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // Guardar ubicación en localStorage
  const saveLocation = async (location: Location) => {
    try {
      const storedLocations: Location[] = JSON.parse(localStorage.getItem("locations") || "[]");

      // Hacer solicitud a la API de Google Maps
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.long}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`);
      const data = await response.json();

      // Extraer la dirección postal del resultado
      const address = data.results[0]?.formatted_address || "";

      // Agregar la dirección postal al objeto de ubicación
      const locationWithAddress: Location = { ...location, address };

      const updatedLocations = [locationWithAddress, ...storedLocations];
      localStorage.setItem("locations", JSON.stringify(updatedLocations));
      toast.success('Location saved successfully');

      // TODO: Rerender the component to show the new location, temporarily reload the page
      window.location.reload();

    } catch (error) {
      console.error('Error saving location:', error);
      toast.error('Failed to save location');
    } finally {
      setSavingLocation(false);
    }
  };

  // Verificar si existe el JSON en el localStorage
  React.useEffect(() => {
    const storedLocationsString = localStorage.getItem("locations");
    if (!storedLocationsString) {
      const initialLocations = generateInitialLocations();
      localStorage.setItem("locations", JSON.stringify(initialLocations));
      setLocations(initialLocations);
    } else {
      setLocations(JSON.parse(storedLocationsString));
    }
  }, []);

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
      <div className="h-20 bg-gray-900 flex items-center justify-center">
        <LocationButton onClick={getLocation} saving={savingLocation} />
      </div>
    </div>
  );
};

export default Home;
