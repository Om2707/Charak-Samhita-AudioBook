import { useRef, useState } from "react";
import Navbar from "../../components/Navbar";

import shlokaEng3 from "../../Music/Ashtang/ShlokaEng3.mp3";
import shlokaHin1 from "../../Music/Ashtang/ShlokaHin1.mp3";
import shlokaHin2 from "../../Music/Ashtang/ShlokaHin2.mp3";
import shlokaSans1 from "../../Music/Ashtang/ShlokaSans1.mp3";
import shlokaSans2 from "../../Music/Ashtang/ShlokaSans2.mp3";
import shlokaSans3 from "../../Music/Ashtang/ShlokaSans3.mp3";

const shloksData = [
  {
    id: 1,
    shlokText:
      "अथातः पुत्रकामीयमध्यायं व्याख्यास्यामः| इति ह स्माहुरात्रेयादयो महर्षयः||१||",
    explanationLang1:
      "इसके आगे पुत्रकामीय अध्यायकी व्याख्या करेंगे-जैसा कि आत्रेय आदि महर्षियोंने कहा था ।",
    explanationLang2:
      "We will now expound the chapter called Putrakāmīya (desire for begetting a son); thus said Atreya and other great sages.",
    audioShlok: shlokaSans1,
    audioExplanation: shlokaHin1,
  },
  {
    id: 2,
    shlokText:
      "अथ खलु पुमानेकविंशतिवर्षः कन्यामतुल्यगोत्रां तुल्याभिजनामसञ्चारिरोगकुलप्रसूतां रूपशीललक्षणसम्पन्नामनूनामविनष्टदन्तौष्ठकर्णनासानखकेशस्तनीं मृदुमरोगप्रकृतिमकपिलामपिङ्गलामहीनाधिकाङ्गीं द्वादशवर्षदेशीयाममरभुजगसरिदचलवृक्षपक्षिनक्षत्रान्त्यप्रेष्यभीषणकनामान्यनुद्वहन्तीमनघामनिन्द्यामानिन्द्येन विधिनोद्वहेत्",
    explanationLang1:
      "इक्कीस वर्षका पुरुष असमान गोत्रवाली; धन और कुलमें समान; संचरण करनेवाले (यक्ष्मा- कुष्ठ आदि) रोगोंवाले कुलमें न उत्पन्न हुई; रूप-शील एवं शुभ लक्षणोंसे युक्त; दांत-ओष्ठ-कान-नख-केश और स्तनोंसे पूर्ण तथा उत्पन्न होनेके उपरान्तभी जिसके अंग सम्पूर्ण हों (विकृत न हों); कोमलांगी; स्वस्थ प्रकृतिवाली; न तो कपिल, न पिंगलवर्ण, न हीन अंगोंवाली, और न अधिक अंगोंवाली, बारह सालकी आयुवाली; देवता (शची-उमा-लक्ष्मी आदि)भुजग (तक्षकी आदि), सरित् (गंगा-जमुना), अचल (पर्वत- मलय, विन्ध्य आदि), वृक्ष (अपराजिता आदि), पक्षि ( बलाका-हंस आदि), नक्षत्र (रेवती-रोहिणी आदि), अन्त्या (नीचजात रजक चण्डाल आदि); प्रेष्य (दासवाची- रामदासी आदि), भीषण (डरावने-शूर्पणखा, हिडम्बा आदि ■ अथवा बोलनेमें कठोर) नामोंको न धारण करनेवाली; पाप- रहित, लोकमें अन्य किसी कारणसे निन्दित न हो, ऐसी कन्याके साथ विधिपूर्वक विवाह कैरे.",
    explanationLang2:
      "A man of twenty-one years of age, should take a maiden as his wife, who belongs to a gotra (family lineage) other than his own, but to the community of his own; who is not from the family in which some diseases are hereditary; who is endowed with beauty. chastity, and auspicious qualities; in whom the teeth, lips, ears, nose, nails, hairs, and breasts have neither developed to the full nor have fallen; who is of tender and healthy constitution, whose colour is neither yellowish-r nor crimson-red, who has neither more number nor less number of body parts than usual, who is twelve years of age, whose name is not other than that of gods, serpents, rivers, mountains, trees, birds or stars and also not of the lower castes, slaves, or menials; which is not harsh (to hear); whose charector is sinless and who is not of bad reputation in the society",
    audioShlok: shlokaSans2,
    audioExplanation: shlokaHin2,
  },
  {
    id: 3,
    shlokText:
      "तस्यां षोडशवर्षायां पञ्चविंशतिवर्षः पुरुषः पुत्रार्थं प्रयतेत| तदा हि तौ प्राप्तवीर्यौ वीर्यान्वितमपत्यं जनयतः||",
    explanationLang1:
      "चिकित्सितं व्याधिहरं पथ्यं साधनमौषधम् | प्रायश्चित्तं प्रशमनं प्रकृतिस्थापनं हितम् ||३||इस विवाहित कन्याकी सोलह वर्षकी आयु होनेपर पच्चीस वर्षकी आयुवाला पुरुष पुत्रकी उत्पत्तिके लिये यत्न करे । इस सोलह और पच्चीस वर्षकी आयुमेंही ये दोनों सम्पूर्ण रूपसे वीर्य- - सम्पन्न होते हैं; तभी वीर्यसे पूर्ण सन्तानको उत्पन्न करते हैं.",
    explanationLang2:
      "This shloks tells that dash and dashwife, who has attained sixteen years of age, for the purpose of begetting male offspring. Only at those ages, both of them will have attained full vigour and will be capable of producing children of valour.",
    audioShlok: shlokaSans3,
    audioExplanation: shlokaEng3,
  },
  {
    id: 4,
    shlokText:
      "विद्याद्भेषजनामानि,भेषजं द्विविधं च तत् | स्वस्थस्योर्जस्करं किञ्चित् किञ्चिदार्तस्य रोगनुत् ||४||",
    explanationLang1:
      "चिकित्सितं व्याधिहरं पथ्यं साधनमौषधम् | प्रायश्चित्तं प्रशमनं प्रकृतिस्थापनं हितम् ||३||",
    explanationLang2: "This shloks tells that dash and dash",
    audioShlok: "/path/to/shlokAudio1.mp3",
    audioExplanation: "/path/to/explanationAudio1.mp3",
  },
  {
    id: 5,
    shlokText:
      "विद्याद्भेषजनामानि,भेषजं द्विविधं च तत् | स्वस्थस्योर्जस्करं किञ्चित् किञ्चिदार्तस्य रोगनुत् ||४||",
    explanationLang1:
      "चिकित्सितं व्याधिहरं पथ्यं साधनमौषधम् | प्रायश्चित्तं प्रशमनं प्रकृतिस्थापनं हितम् ||३||",
    explanationLang2: "This shloks tells that dash and dash",
    audioShlok: "/path/to/shlokAudio1.mp3",
    audioExplanation: "/path/to/explanationAudio1.mp3",
  },
];

function AshtangChapter1() {
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
    if (shlokAudioRef.current && shlokAudioRef.current !== audioRef.current)
      shlokAudioRef.current.pause();
    if (
      explanationAudioRef.current &&
      explanationAudioRef.current !== audioRef.current
    )
      explanationAudioRef.current.pause();

    audioRef.current.play();
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className=" mx-auto p-4">
        <div className="w-full h-96">
          <img
            className="w-full h-full object-cover rounded-2xl "
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
              <div className="w-1/2 h-auto p-4 border-r overflow-auto">
                <h2 className="text-2xl font-bold mb-4">
                  {selectedShlok.shlokText}
                </h2>
                <audio
                  controls
                  ref={shlokAudioRef}
                  onPlay={() => handlePlayAudio(shlokAudioRef)}
                  src={selectedShlok.audioShlok}
                  className="w-full mt-4"
                />
              </div>
              <div className="w-full p-4 overflow-auto">
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
                  {language === "lang1"
                    ? "Translate to English"
                    : "Translate to Hindi"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AshtangChapter1;
