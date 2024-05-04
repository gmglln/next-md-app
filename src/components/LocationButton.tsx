import React from "react";

interface LocationButtonProps {
  onClick: () => void;
  saving?: boolean;
}

const LocationButton: React.FC<LocationButtonProps> = ({ onClick, saving = false }) => {
  return (
    <button
      className={`px-4 py-2 bg-green-500 text-white font-bold rounded-lg focus:outline-none focus:ring ${saving ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600 active:bg-green-700'}`}
      onClick={onClick}
      disabled={saving}
    >
      {saving ? 'Guardando...' : 'Location now'}
    </button>
  );
};

export default LocationButton;
