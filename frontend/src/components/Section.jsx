import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSectionsQuery } from "../services/sectionApi";
import { useGetChaptersQuery } from "../services/chapterApi";
import Navbar from "./Navbar";

function Section() {
  const { bookId, chapterId } = useParams();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  
  const { 
    data: chapters = [], 
    isLoading: isLoadingChapter,
    error: chapterError 
  } = useGetChaptersQuery(bookId);

  const { 
    data: sections = [], 
    isLoading: isLoadingSections,
    error: sectionsError 
  } = useGetSectionsQuery({ bookId, chapterId });

  const currentChapter = chapters.find(chapter => chapter.id.toString() === chapterId);

  const handleSectionClick = (sectionId) => {
    navigate(`/books/${bookId}/chapters/${chapterId}/sections/${sectionId}/shlokas`);
  };

  if (isLoadingChapter || isLoadingSections) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (chapterError || sectionsError) {
    console.error("Error fetching data:", chapterError || sectionsError);
    return (
      <div className="p-4 mx-auto max-w-2xl text-center">
        <h2 className="text-xl font-bold text-red-600 mb-4">Error fetching data</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
          {JSON.stringify(chapterError || sectionsError, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-no-repeat bg-cover">
      <Navbar />
      
      <div className="px-4 mt-1 sm:mt-2">
  {currentChapter?.chapter_slider && !imageError ? (
    <div className="w-full">
      <img
        src={currentChapter.chapter_slider}
        alt={currentChapter.chapter_name}
        className="w-full h-auto max-h-[200px] sm:max-h-[300px] md:max-h-[400px] lg:max-h-[500px] xl:max-h-[600px] object-cover rounded-lg"
        onError={() => setImageError(true)}
        loading="lazy"
      />
    </div>
  ) : (
    <div className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] bg-gray-100 flex items-center justify-center">
      <span className="text-gray-400">Chapter image not available</span>
    </div>
  )}
</div>


      <div className="container mx-auto px-4 mt-3 sm:mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 xl:gap-10">
          {sections.map((section) => (
            <div
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className="bg-white shadow-lg rounded-lg p-4 cursor-pointer 
                       transform transition duration-200 hover:scale-105 
                       hover:shadow-xl border border-gray-100"
            >
              <p 
                style={{ fontFamily: "'Tiro Devanagari Sanskrit', serif" }}
                className="text-center text-lg md:text-xl 
                          tracking-wide leading-relaxed"
              >
                {section.section_name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Section;