import React from 'react';
import { GenerationHistoryItem } from '../types';

interface HistoryPanelProps {
  history: GenerationHistoryItem[];
  onSelect: (item: GenerationHistoryItem) => void;
  currentImage: string | null;
  onClearHistory: () => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onSelect, currentImage, onClearHistory }) => {
  return (
    <section className="bg-white p-6 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Generation History</h2>
        <button
          onClick={onClearHistory}
          className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-100"
          aria-label="Clear generation history"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Clear History
        </button>
      </div>
      <div className="flex overflow-x-auto space-x-4 pb-4 -mb-4">
        {history.map((item) => {
          const isActive = currentImage === item.generatedImage;
          return (
            <div
              key={item.id}
              onClick={() => onSelect(item)}
              className={`cursor-pointer group flex-shrink-0 border-2 rounded-lg p-1 transition-all duration-300 relative ${
                isActive
                  ? 'border-indigo-500 ring-2 ring-indigo-300'
                  : 'border-gray-200 hover:border-indigo-400'
              }`}
            >
              <img
                src={item.generatedImage}
                alt={`Generated ${item.hairstyle.name}`}
                className="w-32 h-32 rounded-md object-cover"
                loading="lazy"
              />
              <div className="absolute inset-1 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 rounded-md flex items-end p-2 pointer-events-none">
                <p className="text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate">
                    {item.hairstyle.name}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HistoryPanel;