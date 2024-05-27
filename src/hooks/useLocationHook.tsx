import React, { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';

// Type definition for the location
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

// Function to generate initial locations
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

  // Function to get the user's current location
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

  // Function to save the location to localStorage
  const saveLocation = async (location: Location) => {
    try {
      // Get locations stored in localStorage
      const storedLocations: Location[] = JSON.parse(localStorage.getItem("locations") || "[]");

      // Make a request to the Google Maps API to get the postal address
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.long}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`);
      const data = await response.json();

      // Extract the postal address from the result
      const address = data.results[0]?.formatted_address || "";

      // Add the postal address to the location object
      const locationWithAddress: Location = { ...location, address };

      // Update stored locations
      const updatedLocations = [locationWithAddress, ...storedLocations];
      localStorage.setItem("locations", JSON.stringify(updatedLocations));
      toast.success('Location saved successfully');

      // Update the current location state to display the address
      setCurrentLocation(locationWithAddress);

    } catch (error) {
      console.error('Error saving location:', error);
      toast.error('Failed to save location');
    } finally {
      setSavingLocation(false);
    }
  };

  // Effect hook to check and load stored locations from localStorage
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

  // Return the state and functions of the hook
  return { currentLocation, locations, savingLocation, getLocation };
};

export default useLocationHook;
