
import React from 'react';

const ScissorsIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 15.5l-2.293-2.293a1 1 0 010-1.414l9.586-9.586a1 1 0 011.414 0l2.293 2.293a1 1 0 010 1.414l-9.586 9.586a1 1 0 01-1.414 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.5l-2.293-2.293a1 1 0 00-1.414 0l-9.586 9.586a1 1 0 000 1.414l2.293 2.293a1 1 0 001.414 0l9.586-9.586a1 1 0 000-1.414z" />
  </svg>
);


const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-4">
          <div className="flex items-center space-x-3">
             <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                <ScissorsIcon className="w-6 h-6 transform -rotate-45"/>
             </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              AI Hairstyle Studio
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
