import React, { useState, useRef } from 'react';
import Navbar from '../../components/Navbar';

import shlokaSans1 from '../../Music/ShlokaSans1.mp3'
import shlokaSans2 from '../../Music/ShlokaSans2.mp3'
import shlokaSans3 from '../../Music/ShlokaSans3.mp3'
import shlokaHin1 from '../../Music/ShlokaHin1.mp3'
import shlokaHin2 from '../../Music/ShlokaHin2.mp3'
import shlokaHin3 from '../../Music/ShlokaHin3.mp3'

const shloksData = [
  {
    id: 1,
    shlokText: "अथातोऽभयामलकीयं रसायनपादं व्याख्यास्यामः ||१|| इति ह स्माह भगवानात्रेयः ||२||",
    explanationLang1: "चिकित्सितं व्याधिहरं पथ्यं साधनमौषधम् | प्रायश्चित्तं प्रशमनं प्रकृतिस्थापनं हितम् ||३||",
    explanationLang2: "This shloks tells that dash and dash",
    audioShlok: shlokaSans1,
    audioExplanation: shlokaHin1,
  },
  {
    id: 2,
    shlokText: "विद्याद्भेषजनामानि,भेषजं द्विविधं च तत् | स्वस्थस्योर्जस्करं किञ्चित् किञ्चिदार्तस्य रोगनुत् ||४||",
    explanationLang1: "चिकित्सितं व्याधिहरं पथ्यं साधनमौषधम् | प्रायश्चित्तं प्रशमनं प्रकृतिस्थापनं हितम् ||३||",
    explanationLang2: "This shloks tells that dash and dash",
    audioShlok: shlokaSans2,
    audioExplanation: shlokaHin2,
  },
  {
  id: 3,
  shlokText: "विद्याद्भेषजनामानि,भेषजं द्विविधं च तत् | स्वस्थस्योर्जस्करं किञ्चित् किञ्चिदार्तस्य रोगनुत् ||४||",
  explanationLang1: "चिकित्सितं व्याधिहरं पथ्यं साधनमौषधम् | प्रायश्चित्तं प्रशमनं प्रकृतिस्थापनं हितम् ||३||",
  explanationLang2: "This shloks tells that dash and dash",
  audioShlok: shlokaSans3,
  audioExplanation: shlokaHin3,
},
{
  id: 4,
  shlokText: "विद्याद्भेषजनामानि,भेषजं द्विविधं च तत् | स्वस्थस्योर्जस्करं किञ्चित् किञ्चिदार्तस्य रोगनुत् ||४||",
  explanationLang1: "चिकित्सितं व्याधिहरं पथ्यं साधनमौषधम् | प्रायश्चित्तं प्रशमनं प्रकृतिस्थापनं हितम् ||३||",
  explanationLang2: "This shloks tells that dash and dash",
  audioShlok: "/path/to/shlokAudio1.mp3",
  audioExplanation: "/path/to/explanationAudio1.mp3",
},
{
  id: 5,
  shlokText: "विद्याद्भेषजनामानि,भेषजं द्विविधं च तत् | स्वस्थस्योर्जस्करं किञ्चित् किञ्चिदार्तस्य रोगनुत् ||४||",
  explanationLang1: "चिकित्सितं व्याधिहरं पथ्यं साधनमौषधम् | प्रायश्चित्तं प्रशमनं प्रकृतिस्थापनं हितम् ||३||",
  explanationLang2: "This shloks tells that dash and dash",
  audioShlok: "/path/to/shlokAudio1.mp3",
  audioExplanation: "/path/to/explanationAudio1.mp3",
},
{
  id: 6,
  shlokText: "विद्याद्भेषजनामानि,भेषजं द्विविधं च तत् | स्वस्थस्योर्जस्करं किञ्चित् किञ्चिदार्तस्य रोगनुत् ||४||",
  explanationLang1: "चिकित्सितं व्याधिहरं पथ्यं साधनमौषधम् | प्रायश्चित्तं प्रशमनं प्रकृतिस्थापनं हितम् ||३||",
  explanationLang2: "This shloks tells that dash and dash",
  audioShlok: "/path/to/shlokAudio1.mp3",
  audioExplanation: "/path/to/explanationAudio1.mp3",
},
{
  id: 7,
  shlokText: "विद्याद्भेषजनामानि,भेषजं द्विविधं च तत् | स्वस्थस्योर्जस्करं किञ्चित् किञ्चिदार्तस्य रोगनुत् ||४||",
  explanationLang1: "चिकित्सितं व्याधिहरं पथ्यं साधनमौषधम् | प्रायश्चित्तं प्रशमनं प्रकृतिस्थापनं हितम् ||३||",
  explanationLang2: "This shloks tells that dash and dash",
  audioShlok: "/path/to/shlokAudio1.mp3",
  audioExplanation: "/path/to/explanationAudio1.mp3",
},
{
  id: 8,
  shlokText: "विद्याद्भेषजनामानि,भेषजं द्विविधं च तत् | स्वस्थस्योर्जस्करं किञ्चित् किञ्चिदार्तस्य रोगनुत् ||४||",
  explanationLang1: "चिकित्सितं व्याधिहरं पथ्यं साधनमौषधम् | प्रायश्चित्तं प्रशमनं प्रकृतिस्थापनं हितम् ||३||",
  explanationLang2: "This shloks tells that dash and dash",
  audioShlok: "/path/to/shlokAudio1.mp3",
  audioExplanation: "/path/to/explanationAudio1.mp3",
},
];

function SushrutChapter1() {
  const [selectedShlok, setSelectedShlok] = useState(null);
  const [language, setLanguage] = useState("lang1");
  
  const shlokAudioRef = useRef(null);
  const explanationAudioRef = useRef(null);

  const handleCardClick = (shlok) => {
    setSelectedShlok(shlok);
    setLanguage("lang1");
  };

  const handleClosePopUp = () => {
    setSelectedShlok(null);
    if (shlokAudioRef.current) shlokAudioRef.current.pause();
    if (explanationAudioRef.current) explanationAudioRef.current.pause();
  };

  const handleTranslate = () => {
    setLanguage((prevLang) => (prevLang === "lang1" ? "lang2" : "lang1"));
  };

  const handlePlayAudio = (audioRef) => {
    if (shlokAudioRef.current && shlokAudioRef.current !== audioRef.current) shlokAudioRef.current.pause();
    if (explanationAudioRef.current && explanationAudioRef.current !== audioRef.current) explanationAudioRef.current.pause();
    
    audioRef.current.play();
  };

  return (
    <div className='bg-gray-100 min-h-screen'>
      <Navbar />
      <div className=" mx-auto p-4">
        <div className="w-full h-96">
          <img
            className="w-full h-full object-cover"
            src="\src\Images\depts-banner.png"
            alt="Ashtang Samgraha"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-8">
          {shloksData.map((shlok) => (
            <div
              key={shlok.id}
              className="bg-white shadow-lg rounded-lg p-4 cursor-pointer"
              onClick={() => handleCardClick(shlok)}
            >
              <p className="text-center">Shlok {shlok.id}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pop-up Modal */}
      {selectedShlok && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleClosePopUp}
        >
          <div
            className="bg-white w-4/5 max-w-3xl p-8 rounded-lg shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-red-600 font-bold text-2xl"
              onClick={handleClosePopUp}
            >
              &times;
            </button>
            <div className="flex justify-between">
              <div className="w-1/2 p-4 border-r">
                <h2 className="text-2xl font-bold mb-4">{selectedShlok.shlokText}</h2>
                <audio
                  controls
                  ref={shlokAudioRef}
                  onPlay={() => handlePlayAudio(shlokAudioRef)}
                  src={selectedShlok.audioShlok}
                  className="w-full mt-4"
                />
              </div>
              <div className="w-1/2 p-4">
                <h2 className="text-2xl font-bold mb-4">
                  {language === "lang1"
                    ? selectedShlok.explanationLang1
                    : selectedShlok.explanationLang2}
                </h2>
                <audio
                  controls
                  ref={explanationAudioRef}
                  onPlay={() => handlePlayAudio(explanationAudioRef)}
                  src={selectedShlok.audioExplanation}
                  className="w-full mt-4"
                />
                <button
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={handleTranslate}
                >
                  {language === "lang1" ? "Translate to English" : "Translate to Hindi"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SushrutChapter1;
