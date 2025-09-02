
import React from 'react';

interface ImageDisplayProps {
  originalImage: string | null;
  editedImage: string | null;
  onRegenerate: () => void;
  isLoading: boolean;
}

const Placeholder: React.FC = () => (
    <div className="w-full max-w-md h-96 bg-gray-200 rounded-lg flex flex-col items-center justify-center text-center p-4 border-2 border-dashed border-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 className="text-xl font-semibold text-gray-600">Your Images Will Appear Here</h3>
        <p className="text-gray-500 mt-2">Follow the steps on the left to start your virtual makeover.</p>
    </div>
);


const ImageDisplay: React.FC<ImageDisplayProps> = ({ originalImage, editedImage, onRegenerate, isLoading }) => {
  if (!originalImage) {
    return <Placeholder />;
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-start">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-700 mb-3">Before</h3>
          <img src={originalImage} alt="Original" className="rounded-lg shadow-lg w-full object-contain max-h-[50vh]" />
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-700 mb-3">After</h3>
          {editedImage ? (
            <div className="flex flex-col items-center">
                <div className="relative group w-full">
                    <img src={editedImage} alt="Edited" className="rounded-lg shadow-lg w-full object-contain max-h-[50vh]" />
                    <a
                        href={editedImage}
                        download="hairstyle-makeover.jpg"
                        className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer backdrop-blur-sm"
                        aria-label="Download image"
                        title="Download image"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                    </a>
                </div>
                <button
                    onClick={onRegenerate}
                    disabled={isLoading}
                    className="mt-4 bg-indigo-100 text-indigo-700 font-semibold py-2 px-4 rounded-lg hover:bg-indigo-200 transition-all duration-300 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed flex items-center shadow-sm"
                    aria-label="Regenerate hairstyle"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    Regenerate
                </button>
            </div>
          ) : (
            <div className="w-full h-full min-h-[300px] bg-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <span className="text-gray-500">Your new look will be here</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageDisplay;