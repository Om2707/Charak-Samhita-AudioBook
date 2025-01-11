import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSectionByIdQuery, useGetSectionShlokasQuery } from "../services/sectionApi";
import Navbar from "./Navbar";

function SectionShlokas() {
  const { bookId, chapterId, sectionId } = useParams();
  const navigate = useNavigate();
  const [sliderImageError, setSliderImageError] = useState(false);

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
          <div className="w-full h-[150px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
            <img
              className="w-full h-full object-contain sm:object-cover"
              src={section.section_slider}
              alt="Section Cover"
              loading="lazy"
              onError={() => setSliderImageError(true)}
            />
            {sliderImageError && (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Section image not available</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 mt-3 sm:mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 xl:gap-10">
          {shlokas.map((shloka, index) => (
            <div
              key={shloka.id}
              className="bg-white shadow-lg rounded-lg p-4 cursor-pointer 
                         transform transition duration-200 hover:scale-105 
                         hover:shadow-xl border border-gray-100"
              onClick={() => navigate(`/books/${bookId}/chapters/${chapterId}/shlokas/${shloka.id}`)}
            >
              <p
                style={{ fontFamily: "'Tiro Devanagari Sanskrit', serif" }}
                className="text-center text-lg md:text-xl tracking-wide leading-relaxed"
              >
                Shloka {index + 1}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SectionShlokas;
