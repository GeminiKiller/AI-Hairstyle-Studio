
import React from 'react';

interface ImageDisplayProps {
  originalImage: string | null;
  editedImage: string | null;
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


const ImageDisplay: React.FC<ImageDisplayProps> = ({ originalImage, editedImage }) => {
  if (!originalImage) {
    return <Placeholder />;
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-700 mb-3">Before</h3>
          <img src={originalImage} alt="Original" className="rounded-lg shadow-lg w-full object-contain max-h-[50vh]" />
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-700 mb-3">After</h3>
          {editedImage ? (
            <img src={editedImage} alt="Edited" className="rounded-lg shadow-lg w-full object-contain max-h-[50vh]" />
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
