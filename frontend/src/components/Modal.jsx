import { faPause, faPlay, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState, useRef } from 'react';
import ReactAudioPlayer from 'react-audio-player';

const Modal = ({ shloka, bookId, chapterId, onClose }) => {
  const [audioUrl, setAudioUrl] = useState('');
  const audioRef = useRef(null);
  const audioApiUrl = `http://127.0.0.1:8000/api/books/${bookId}/chapters/${chapterId}/shlokas/${shloka.id}/play-audio/`;

  // Fetch audio
  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const response = await fetch(audioApiUrl);
        if (response.ok) {
          const audioBlob = await response.blob();
          const url = URL.createObjectURL(audioBlob);
          setAudioUrl(url);
        } else {
          console.error('Error fetching audio:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching audio:', error);
      }
    };

    fetchAudio();

    // Cleanup URL to avoid memory leaks
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioApiUrl]);

  // Close modal on outside click
  const closeModalOnClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
      onClick={closeModalOnClickOutside}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg md:max-w-xl lg:max-w-2xl overflow-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl text-gray-600 hover:text-red-500 focus:outline-none"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <h2 className="text-xl font-bold mb-4">Shloka {shloka.shloka_number}</h2>
        <p className="mb-4 text-gray-700">{shloka.shlok_text}</p>

        {audioUrl && (
          <div className="mt-4">
            {/* Audio Player Container */}
            <div className="audio-player-container p-4 rounded-lg shadow-lg border border-gray-300 bg-gray-50">
              <ReactAudioPlayer
                ref={audioRef}
                src={audioUrl}
                autoPlay={false}
                controls
                className="w-full rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
