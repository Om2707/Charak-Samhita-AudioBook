import  { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetChaptersQuery } from '../services/chapterApi';
import { useGetShlokasQuery } from '../services/shlokaApi';
import Modal from './Modal';
import Navbar from './Navbar';

function Shlokas() {
  const { bookId, chapterId, sectionId } = useParams(); 
  const { data: chapters = [], chapter_error, chapter_isLoading } = useGetChaptersQuery(bookId);
  const { data: shlokas = [], error, isLoading } = useGetShlokasQuery({ bookId, chapterId });

  const [selectedShloka, setSelectedShloka] = useState(null);

  if (isLoading || chapter_isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || chapter_error) {
    console.error("Error fetching data:", error || chapter_error);
    return (
      <div className="p-4 mx-auto max-w-2xl text-center">
        <h2 className="text-xl font-bold text-red-600 mb-4">Error fetching data</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
          {JSON.stringify(error || chapter_error, null, 2)}
        </pre>
      </div>
    );
  }

  const chapter = chapters.find(chap => chap.id === parseInt(chapterId));

  const openModal = (shloka) => {
    setSelectedShloka(shloka);
  };

  const closeModal = () => {
    setSelectedShloka(null);
  };

  return (
    <div className="min-h-screen bg-no-repeat bg-cover">
      <Navbar />
      <div className="px-4 mt-1 sm:mt-2">
  {chapter && (
    <div className="w-full">
      <img
        className="w-full h-auto max-h-[200px] sm:max-h-[300px] md:max-h-[400px] lg:max-h-[500px] xl:max-h-[600px] object-cover rounded-lg"
        src={chapter.chapter_slider}
        alt={`Chapter ${chapter.chapter_number}`}
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
          bookId={bookId}
          chapterId={chapterId}
          sectionId={sectionId}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default Shlokas;