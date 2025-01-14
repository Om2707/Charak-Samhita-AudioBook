import  { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSectionByIdQuery, useGetSectionShlokasQuery } from "../services/sectionApi";
import { usePlayAudioMutation } from "../services/shlokaApi";
import Modal from "./Modal";
import Navbar from "./Navbar";

function SectionShlokas() {
  const { bookId, chapterId, sectionId } = useParams();
  const [selectedShloka, setSelectedShloka] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const {
    data: section,
    isLoading: isLoadingSection,
    error: sectionError
  } = useGetSectionByIdQuery({ bookId, chapterId, sectionId });

  const {
    data: shlokas = [],
    isLoading: isLoadingShlokas,
    error: shlokasError
  } = useGetSectionShlokasQuery({ bookId, chapterId, sectionId });

  const [playAudio] = usePlayAudioMutation();

  const handlePlayAudio = async (shlokaId, e) => {
    e.stopPropagation();
    if (isPlaying) return;

    try {
      setIsPlaying(true);
      const response = await playAudio({ bookId, chapterId, shlokaId }).unwrap();
      const audioBlob = new Blob([response], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);

      audio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };

      audio.play();
    } catch (error) {
      console.error("Error playing audio:", error);
      setIsPlaying(false);
    }
  };

  const openModal = (shloka) => {
    setSelectedShloka(shloka);
  };

  const closeModal = () => {
    setSelectedShloka(null);
  };

  if (isLoadingSection || isLoadingShlokas) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (sectionError || shlokasError) {
    console.error("Error fetching data:", sectionError || shlokasError);
    return (
      <div className="p-4 mx-auto max-w-2xl text-center">
        <h2 className="text-xl font-bold text-red-600 mb-4">Error fetching data</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
          {JSON.stringify(sectionError || shlokasError, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-no-repeat bg-cover">
      <Navbar />
      <div className="px-4 mt-1 sm:mt-2">
        {section && (
          <div className="w-full">
            <img
              className="w-full h-auto max-h-[200px] sm:max-h-[300px] md:max-h-[400px] lg:max-h-[500px] xl:max-h-[600px] object-cover rounded-lg"
              src={section.section_slider}
              alt="Section Cover"
              loading="lazy"
            />
          </div>
        )}
      </div>
      <div className="container mx-auto px-4 mt-3 sm:mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {shlokas.map((shloka) => (
            <div
              key={shloka.id}
              onClick={() => openModal(shloka)}
              className="bg-white shadow-lg rounded-lg p-4 cursor-pointer 
                       transform transition duration-200 hover:scale-105 
                       hover:shadow-xl border border-gray-100"
            >
              <p
               style={{ fontFamily: "'playfair', serif" }}
                className="text-center text-lg md:text-xl tracking-wide leading-relaxed"
              >
                Shloka {shloka.shloka_number}
              </p>
            </div>
          ))}
        </div>
      </div>

      {selectedShloka && (
        <Modal
          shloka={selectedShloka}
          sectionId={sectionId}
          bookId={bookId}
          chapterId={chapterId}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default SectionShlokas;
