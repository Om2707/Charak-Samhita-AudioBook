
import React, { useState, useRef } from 'react';
import Navbar from '../../components/Navbar';

import shlokaSans1 from '../../Music/ShlokaSans1.mp3'
import shlokaSans2 from '../../Music/ShlokaSans2.mp3'
import shlokaSans3 from '../../Music/ShlokaSans3.mp3'
import shlokaHin1 from '../../Music/ShlokaHin1.mp3'
import shlokaHin2 from '../../Music/ShlokaHin2.mp3'
import shlokaEng3 from '../../Music/ShlokaEng3.mp3'

const shloksData = [
  {
    id: 1,
    shlokText: "अथातः प्रत्येकमर्मनिर्देशं शारीरं व्याख्यास्यामः ||१||",
    explanationLang1: "अब हम प्रत्येक मर्म का निर्देश करते हुए शरीर का वर्णन करेंगे।",
    explanationLang2: "Now, therefore, we shall expound the detailed enumeration of each Marma (vital point) in the Sharira",
    audioShlok: shlokaSans1,
    audioExplanation: shlokaHin1,
  },
  {
    id: 2,
    shlokText: "यथोवाच भगवान् धन्वन्तरिः ||२||",
    explanationLang1: "जैसा भगवान धन्वन्तरि ने कहा",
    explanationLang2: "as declared by the revered Lord Dhanvantari.",
    audioShlok: shlokaSans2,
    audioExplanation: shlokaHin2,
  },
  {
    id: 3,
    shlokText: "सप्तोत्तरं मर्मशतम् | तानि मर्माणि पञ्चात्मकानि भवन्ति; तद्यथा- मांसमर्माणि, सिरामर्माणि, स्नायुमर्माणि, अस्थिमर्माणि, सन्धिमर्माणि चेति | न खलु मांससिरास्नाय्वस्थिसन्धिव्यतिरेकेणान्यानि मर्माणि भवन्ति, यस्मान्नोपलभ्यन्ते ||३||",
    explanationLang1: "मर्मशत होते हैं। ये मर्म पांच प्रकार के होते हैं; जैसे- मांस के मर्म, नाड़ियों के मर्म, स्नायुओं के मर्म, हड्डियों के मर्म, और जोड़ के मर्म। इसके अतिरिक्त मांस, नाड़ी, स्नायु, हड्डी और जोड़ के मर्मों को छोड़कर कोई अन्य मर्म नहीं होते, क्योंकि वे प्रकट नहीं होते",
    explanationLang2: "There are 107 Marmas (vital points) in the body. These Marmas are classified into five types: Mansa Marmas (muscle-related), Sira Marmas (vein-related), Snayu Marmas (ligament-related), Asthi Marmas (bone-related), and Sandhi Marmas (joint-related). There are no Marmas other than these five types (muscle, vein, ligament, bone, and joint), as no others are recognized	सप्तोत्तर (107)",
    audioShlok: shlokaSans3,
    audioExplanation: shlokaEng3,
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
            className="w-full h-full object-cover rounded-2xl"
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
            className="bg-white max-w-3xl p-8 rounded-lg shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-red-600 font-bold text-2xl"
              onClick={handleClosePopUp}
            >
              &times;
            </button>
            <div className="flex justify-between">
              <div className="w-1/2 p-4 border-r overflow-auto">
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
