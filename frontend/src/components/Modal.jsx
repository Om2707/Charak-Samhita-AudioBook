import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ shloka, bookId, chapterId, onClose }) => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const audioRef = useRef(null);
  const modalRef = useRef(null);
  const audioApiUrl = `http://127.0.0.1:8000/api/books/${bookId}/chapters/${chapterId}/shlokas/${shloka.id}/play-audio/`;

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        setLoading(true);
        const response = await fetch(audioApiUrl);
        if (response.ok) {
          const audioBlob = await response.blob();
          const url = URL.createObjectURL(audioBlob);
          setAudioUrl(url);
        }
      } catch (error) {
        console.error('Error fetching audio:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAudio();
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [audioApiUrl]);

  const playAudio = () => {
    if (audioRef.current && audioUrl) {
      if (audioRef.current.ended) {
        audioRef.current.currentTime = 0;
      }
      audioRef.current.play();
      setPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlaying(false);
    }
  };

  const handleSeek = (e) => {
    if (audioRef.current && audioRef.current.duration) {
      const seekTime = (audioRef.current.duration / 100) * e.target.value;
      audioRef.current.currentTime = seekTime;
      setProgress(e.target.value);
    }
  };

  const updateProgress = () => {
    if (audioRef.current && audioRef.current.duration) {
      const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(currentProgress);
      
      const timeRemaining = audioRef.current.duration - audioRef.current.currentTime;
      setRemainingTime(timeRemaining);

      if (audioRef.current.ended) {
        setPlaying(false);
        setProgress(0);
        setRemainingTime(0);
      }
    }
  };

  const handleSpeedChange = (speed) => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
    }
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

  return (
    <div 
      className="fixed inset-0 bg-gray-800 bg-opacity-75 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-auto relative"
      >
        {/* Dynamic padding based on screen size */}
        <div className="p-4 sm:p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-gray-800">
            Shloka {shloka.shloka_number}
          </h2>

          <div className="bg-blue-50 rounded-lg shadow-md border-2 sm:border-4 border-blue-400">
            {/* Content section with dynamic padding and responsive text */}
            <div className="p-3 sm:p-4 md:p-6">
              <p className="text-base sm:text-lg md:text-xl text-center leading-relaxed break-words">
                {shloka.shlok_text}
              </p>

              <div className="mt-4 sm:mt-6">
                <audio
                  ref={audioRef}
                  src={audioUrl}
                  onTimeUpdate={updateProgress}
                  onEnded={() => setPlaying(false)}
                />
                {/* Audio controls with responsive spacing */}
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <button
                    className={`rounded-full w-10 h-10 sm:w-12 sm:h-12 flex justify-center items-center bg-blue-500 text-white hover:bg-blue-600 transition-all transform hover:scale-105 ${
                      playing ? 'animate-pulse' : ''
                    }`}
                    onClick={playing ? pauseAudio : playAudio}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="animate-spin">↻</span>
                    ) : (
                      <FontAwesomeIcon icon={playing ? faPause : faPlay} />
                    )}
                  </button>

                  {/* Flexible progress bar */}
                  <div className="flex-grow">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={progress || 0}
                      onChange={handleSeek}
                      className="w-full h-2 rounded-lg appearance-none bg-blue-200 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
                    />
                  </div>

                  <select
                    value={playbackSpeed}
                    onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
                    className="rounded-full w-14 sm:w-16 h-10 sm:h-12 bg-blue-500 text-white hover:bg-blue-600 text-center cursor-pointer transition-all transform hover:scale-105 text-sm sm:text-base"
                  >
                    {speedOptions.map((speed) => (
                      <option key={speed} value={speed}>
                        {speed}x
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Remaining time with responsive text */}
                <div className="text-center text-xs sm:text-sm mt-2 sm:mt-3 text-gray-600">
                  <span>{`Remaining Time: ${Math.floor(remainingTime / 60)}:${Math.floor(remainingTime % 60)
                    .toString()
                    .padStart(2, '0')}`}</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-red-500 text-white w-6 h-6 sm:w-8 sm:h-8 rounded-full hover:bg-red-600 flex items-center justify-center transition-all transform hover:scale-110 text-sm sm:text-base"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;