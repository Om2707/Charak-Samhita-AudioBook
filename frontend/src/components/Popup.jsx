import { useRef, useState } from "react";

const Popup = ({
  text,
  explanation,
  translation,
  audioText,
  audioExplanation,
  onClose,
}) => {
  const [isTranslated, setIsTranslated] = useState(false);
  const audioTextRef = useRef(null);
  const audioExplanationRef = useRef(null);

  const handleTranslate = () => {
    setIsTranslated(!isTranslated);
  };

  const handlePlayAudio = (audioRef) => {
    if (audioTextRef.current && audioTextRef.current !== audioRef.current) {
      audioTextRef.current.pause();
    }
    if (
      audioExplanationRef.current &&
      audioExplanationRef.current !== audioRef.current
    ) {
      audioExplanationRef.current.pause();
    }
    audioRef.current.play();
  };

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-lg relative max-w-4xl w-4/5 mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="border-4 border-gray-700 p-4 rounded-lg">
            <p className="text-xl font-bold">{text}</p>
            <div className="flex justify-center mt-4">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
                onClick={handleTranslate}
              >
                {isTranslated ? "Translate to Hindi" : "Translate to English"}
              </button>
            </div>
            <audio
              controls
              ref={audioTextRef}
              onPlay={() => handlePlayAudio(audioTextRef)}
              className="mt-4 w-full bg-gray-200 rounded"
            >
              <source src={audioText} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </div>
          <div className="border-4 border-gray-700 p-4 rounded-lg">
            <p className="text-xl font-bold">
              {isTranslated ? translation : explanation}
            </p>
            <audio
              controls
              ref={audioExplanationRef}
              onPlay={() => handlePlayAudio(audioExplanationRef)}
              className="mt-4 w-full bg-gray-200 rounded"
            >
              <source src={audioExplanation} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
        <button
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 text-3xl"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Popup;
