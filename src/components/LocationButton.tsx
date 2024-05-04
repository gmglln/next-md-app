import React from "react";

const LocationButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button
      className="px-4 py-2 bg-green-500 text-white font-bold rounded-lg focus:outline-none focus:ring focus:ring-green-400"
      onClick={onClick}
    >
      Location now
    </button>
  );
};

export default LocationButton;
