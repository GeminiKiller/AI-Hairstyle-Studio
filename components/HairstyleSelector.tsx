import React, { useRef } from 'react';
import { Hairstyle } from '../types';

interface HairstyleSelectorProps {
  hairstyles: Hairstyle[];
  selectedHairstyle: Hairstyle | null;
  onSelect: (hairstyle: Hairstyle) => void;
  onCustomUpload: (imageDataUrl: string) => void;
}

const UploadCard: React.FC<{ onUpload: (dataUrl: string) => void }> = ({ onUpload }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onUpload(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <div
      onClick={() => inputRef.current?.click()}
      className="cursor-pointer group border-2 border-dashed rounded-lg p-2 transition-all duration-300 border-gray-300 hover:border-indigo-500"
      role="button"
      aria-label="Upload custom hairstyle"
    >
      <input type="file" accept="image/*" ref={inputRef} onChange={handleFileChange} className="hidden" />
      <div className="w-full aspect-square rounded-md mb-2 flex flex-col items-center justify-center bg-transparent group-hover:bg-indigo-50 transition-colors duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 group-hover:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
        </svg>
      </div>
      <p className="text-center text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
        Upload Style
      </p>
    </div>
  );
}

const HairstyleSelector: React.FC<HairstyleSelectorProps> = ({ hairstyles, selectedHairstyle, onSelect, onCustomUpload }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      <UploadCard onUpload={onCustomUpload} />
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
            className={`w-full aspect-square rounded-md mb-2 ${
              style.id.startsWith('custom') ? 'object-contain bg-gray-100' : 'object-cover'
            }`}
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