import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetChaptersQuery } from '../services/chapterApi';
import { useGetShlokasQuery } from '../services/shlokaApi';
import Modal from './Modal';
import Navbar from './Navbar';

function Shlokas() {
  const { bookId, chapterId } = useParams();
  const { data: chapters = [], chapter_error, chapter_isLoading } = useGetChaptersQuery(bookId);
  const { data: shlokas = [], error, isLoading } = useGetShlokasQuery({ bookId, chapterId });

  const [selectedShloka, setSelectedShloka] = useState(null);

  if (isLoading || chapter_isLoading) return <div>Loading...</div>;
  if (error || chapter_error) return <div>Error fetching data</div>;

  const chapter = chapters.find(chap => chap.id === parseInt(chapterId));

  const openModal = (shloka) => {
    setSelectedShloka(shloka);
  };

  const closeModal = () => {
    setSelectedShloka(null);
  };

  return (
    <div className="bg-chapterBg bg-no-repeat overflow-hidden bg-cover min-h-screen">
      <Navbar />
      <div className="flex justify-center">
        <div className="w-11/12">
          <div className="w-full h-96">
            {chapter && (
              <img
                className="w-full h-full mt-5 rounded-lg object-cover"
                src={chapter.chapter_slider}
                alt={`Chapter ${chapter.chapter_number}`}
              />
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            {shlokas.map((shloka) => (
              <div
                key={shloka.id}
                className="bg-white shadow-lg rounded-lg p-4 cursor-pointer hover:shadow-xl transition-shadow duration-200"
                onClick={() => openModal(shloka)}
              >
                <p className="text-center">Shloka {shloka.shloka_number}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedShloka && (
        <Modal
          shloka={selectedShloka}
          bookId={bookId}
          chapterId={chapterId}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default Shlokas;
