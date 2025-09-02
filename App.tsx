import React, { useState, useCallback, useMemo } from 'react';
import { Hairstyle } from './types';
import { HAIRSTYLES } from './constants';
import { editImageWithHairstyle } from './services/geminiService';
import Header from './components/Header';
import HairstyleSelector from './components/HairstyleSelector';
import ImageInput from './components/ImageInput';
import ImageDisplay from './components/ImageDisplay';
import Loader from './components/Loader';
import WebcamCapture from './components/WebcamCapture';
import Footer from './components/Footer';

type GenderFilter = 'all' | 'female' | 'male';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [selectedHairstyle, setSelectedHairstyle] = useState<Hairstyle | null>(null);
  const [customHairstyle, setCustomHairstyle] = useState<Hairstyle | null>(null); // State for the uploaded style
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showWebcam, setShowWebcam] = useState<boolean>(false);
  const [genderFilter, setGenderFilter] = useState<GenderFilter>('all');

  const handleImageUpload = (imageDataUrl: string) => {
    setOriginalImage(imageDataUrl);
    setEditedImage(null);
    setError(null);
    setShowWebcam(false);
  };

  const handleHairstyleSelect = useCallback((hairstyle: Hairstyle) => {
    setSelectedHairstyle(hairstyle);
    setError(null);
  }, []);

  const handleCustomHairstyleUpload = (imageDataUrl: string) => {
    const newCustomStyle: Hairstyle = {
      id: `custom-${Date.now()}`, // Unique ID for each upload
      name: 'Your Style',
      previewImage: imageDataUrl,
      prompt: "Apply the hairstyle from the second image (the style reference) to the person in the first image. Preserve the person's facial features and the original background. The only change should be the hairstyle.",
      gender: 'unisex',
    };
    setCustomHairstyle(newCustomStyle); // Set the available custom style
    setSelectedHairstyle(newCustomStyle); // Also select it immediately
    setError(null);
  };
  
  const handleFilterChange = (filter: GenderFilter) => {
    // If a non-custom hairstyle is selected, check if it should be deselected
    if (selectedHairstyle && !selectedHairstyle.id.startsWith('custom')) {
      const isVisible = filter === 'all' || selectedHairstyle.gender === filter || selectedHairstyle.gender === 'unisex';
      if (!isVisible) {
        setSelectedHairstyle(null);
      }
    }
    setGenderFilter(filter);
  };

  const displayedHairstyles = useMemo(() => {
    const baseStyles = HAIRSTYLES.filter(style => 
      genderFilter === 'all' || style.gender === genderFilter || style.gender === 'unisex'
    );
    
    // If a custom hairstyle has been uploaded, add it to the list
    if (customHairstyle) {
      return [customHairstyle, ...baseStyles];
    }
    
    return baseStyles;
  }, [genderFilter, customHairstyle]);

  const handleTryHairstyle = async () => {
    if (!originalImage || !selectedHairstyle) {
      setError('Please upload an image and select a hairstyle first.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setEditedImage(null);

    try {
      let resultImage: string | null;
      // Check if the selected hairstyle is a custom one by its ID prefix
      if (selectedHairstyle.id.startsWith('custom')) {
         resultImage = await editImageWithHairstyle(
          originalImage, 
          selectedHairstyle.prompt, 
          selectedHairstyle.previewImage // Pass reference image
        );
      } else {
         resultImage = await editImageWithHairstyle(originalImage, selectedHairstyle.prompt);
      }

      if (resultImage) {
        setEditedImage(resultImage);
      } else {
        setError('Could not generate the new hairstyle. The model may not have returned an image.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while generating the hairstyle. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setOriginalImage(null);
    setEditedImage(null);
    setSelectedHairstyle(null);
    setCustomHairstyle(null); // Reset custom hairstyle
    setIsLoading(false);
    setError(null);
    setShowWebcam(false);
    setGenderFilter('all');
  };

  if (showWebcam) {
    return <WebcamCapture onCapture={handleImageUpload} onBack={() => setShowWebcam(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
      <Header />
      <main className="container mx-auto p-4 md:p-8 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Controls */}
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Get Started</h2>
            
            <div className="space-y-6">
              <div>
                <label className="text-lg font-semibold text-gray-700 block mb-2">1. Provide Your Photo</label>
                <ImageInput onImageUpload={handleImageUpload} onWebcamOpen={() => setShowWebcam(true)} />
              </div>

              <div>
                <label className="text-lg font-semibold text-gray-700 block mb-2">2. Select a Hairstyle</label>
                
                <div className="flex items-center space-x-2 mb-4 bg-gray-200 p-1 rounded-lg">
                  {(['all', 'female', 'male'] as const).map((filter) => (
                    <button 
                      key={filter}
                      onClick={() => handleFilterChange(filter)} 
                      className={`w-full py-1.5 px-3 rounded-md text-sm font-semibold capitalize transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                        genderFilter === filter 
                          ? 'bg-white text-indigo-600 shadow-sm' 
                          : 'text-gray-600 hover:bg-white/50'
                      }`}
                      aria-pressed={genderFilter === filter}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                <HairstyleSelector 
                  hairstyles={displayedHairstyles} 
                  selectedHairstyle={selectedHairstyle} 
                  onSelect={handleHairstyleSelect}
                  onCustomUpload={handleCustomHairstyleUpload}
                />
              </div>

              <div>
                <label className="text-lg font-semibold text-gray-700 block mb-2">3. See the Magic</label>
                <button
                  onClick={handleTryHairstyle}
                  disabled={!originalImage || !selectedHairstyle || isLoading}
                  className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center shadow-md"
                >
                  {isLoading ? 'Generating...' : 'Try It On'}
                </button>
              </div>

              {(originalImage || selectedHairstyle) && (
                 <button
                    onClick={handleReset}
                    className="w-full bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 transition-all duration-300 flex items-center justify-center"
                  >
                  Start Over
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Display */}
          <div className="lg:col-span-8 bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center min-h-[60vh]">
            {isLoading && <Loader />}
            {error && !isLoading && (
              <div className="text-center text-red-500 bg-red-100 p-4 rounded-lg">
                <p className="font-bold">Oops! Something went wrong.</p>
                <p>{error}</p>
              </div>
            )}
            {!isLoading && !error && (
              <ImageDisplay originalImage={originalImage} editedImage={editedImage} />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;