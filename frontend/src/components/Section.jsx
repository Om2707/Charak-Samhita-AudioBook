import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSectionsQuery } from "../services/sectionApi";
import Navbar from "./Navbar";

function Section() {
  const { bookId, chapterId } = useParams();
  const navigate = useNavigate();
  
  const { 
    data: sections = [], 
    isLoading: isLoadingSections,
    error: sectionsError 
  } = useGetSectionsQuery({ bookId, chapterId });

  const handleSectionClick = (sectionId) => {
    navigate(`/books/${bookId}/chapters/${chapterId}/sections/${sectionId}/shlokas`);
  };
  

  // Only redirect to shlokas if explicitly determined there are no sections
  useEffect(() => {
    if (!isLoadingSections && sections.length === 0) {
      navigate(`/books/${bookId}/chapters/${chapterId}/shlokas`);
    }
  }, [sections, isLoadingSections, navigate, bookId, chapterId]);

  if (isLoadingSections) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (sectionsError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-red-500 text-xl">
          Error loading sections: {sectionsError.message || 'Unknown error'}
        </div>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-no-repeat bg-cover">
      <Navbar />
      
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
              {section.section_image && (
                <div className="mb-4 h-40">
                  <img
                    src={section.section_image}
                    alt={section.section_name}
                    className="w-full h-full object-cover rounded"
                    loading="lazy"
                  />
                </div>
              )}
              <p 
                style={{ fontFamily: "'Tiro Devanagari Sanskrit', serif" }}
                className="text-center text-lg md:text-xl tracking-wide leading-relaxed"
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