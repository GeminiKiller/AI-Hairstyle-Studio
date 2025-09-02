
import React, { useState, useEffect } from 'react';

const loadingMessages = [
  "Warming up the AI stylist...",
  "Analyzing your photo...",
  "Crafting your new look...",
  "Applying the final touches...",
  "Almost ready to reveal!",
  "Perfection takes a moment...",
];

const Loader: React.FC = () => {
  const [message, setMessage] = useState(loadingMessages[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessage(prevMessage => {
        const currentIndex = loadingMessages.indexOf(prevMessage);
        const nextIndex = (currentIndex + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
    }, 2500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-6"></div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">Creating your Hairstyle...</h2>
      <p className="text-gray-500 transition-opacity duration-500">{message}</p>
    </div>
  );
};

export default Loader;
