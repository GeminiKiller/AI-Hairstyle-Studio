import React from 'react';
import { Hairstyle } from '../types';

interface HairstyleSelectorProps {
  hairstyles: Hairstyle[];
  selectedHairstyle: Hairstyle | null;
  onSelect: (hairstyle: Hairstyle) => void;
}

const HairstyleSelector: React.FC<HairstyleSelectorProps> = ({ hairstyles, selectedHairstyle, onSelect }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {hairstyles.map((style) => (
        <div
          key={style.id}
          onClick={() => onSelect(style)}
          className={`cursor-pointer group border-2 rounded-lg p-2 transition-all duration-300 ${
            selectedHairstyle?.id === style.id
              ? 'border-indigo-500 ring-2 ring-indigo-300'
              : 'border-gray-200 hover:border-indigo-400'
          }`}
        >
          <img
            src={style.previewImage}
            alt={style.name}
            className="w-full aspect-square object-cover rounded-md mb-2"
          />
          <p className={`text-center text-sm font-medium ${
            selectedHairstyle?.id === style.id ? 'text-indigo-600' : 'text-gray-700 group-hover:text-indigo-600'
          }`}>
            {style.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default HairstyleSelector;
