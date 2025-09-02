
import React, { useRef, useEffect, useState, useCallback } from 'react';

interface WebcamCaptureProps {
  onCapture: (imageDataUrl: string) => void;
  onBack: () => void;
}

const WebcamCapture: React.FC<WebcamCaptureProps> = ({ onCapture, onBack }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        setStream(mediaStream);
      } catch (err) {
        console.error("Error accessing webcam:", err);
        setError("Could not access the camera. Please check your browser permissions.");
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCapture = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUrl = canvas.toDataURL('image/jpeg');
        onCapture(dataUrl);
      }
    }
  }, [onCapture]);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex flex-col items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Live Camera</h2>
        
        {error ? (
          <div className="text-red-500 bg-red-100 p-4 rounded-lg">{error}</div>
        ) : (
          <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden mb-4">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            <canvas ref={canvasRef} className="hidden" />
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleCapture}
            disabled={!!error}
            className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
          >
            Capture Photo
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebcamCapture;
