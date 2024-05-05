import React, { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';

// Definición de tipo para la ubicación
interface Location {
  id: number;
  lat: number;
  long: number;
  address: string;
}

interface UseLocationHook {
  currentLocation: Location | null;
  locations: Location[];
  savingLocation: boolean;
  getLocation: () => void;
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

const useLocationHook = (): UseLocationHook => {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [savingLocation, setSavingLocation] = useState<boolean>(false);

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
          address: ""
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

      // Actualizar el estado de la ubicación actual para mostrar la dirección
      setCurrentLocation(locationWithAddress);

    } catch (error) {
      console.error('Error saving location:', error);
      toast.error('Failed to save location');
    } finally {
      setSavingLocation(false);
    }
  };

  // Verificar si existe el JSON en el localStorage
  useEffect(() => {
    const storedLocationsString = localStorage.getItem("locations");
    if (!storedLocationsString) {
      const initialLocations = generateInitialLocations();
      localStorage.setItem("locations", JSON.stringify(initialLocations));
      setLocations(initialLocations);
    } else {
      setLocations(JSON.parse(storedLocationsString));
    }
  }, []);

  return { currentLocation, locations, savingLocation, getLocation };
};

export default useLocationHook;
