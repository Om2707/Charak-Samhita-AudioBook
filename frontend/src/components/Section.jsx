import { useNavigate, useParams } from "react-router-dom";
import { useGetBooksQuery } from "../services/booksApi";
import { useGetChaptersQuery } from "../services/chapterApi";
import { useGetSectionsQuery } from "../services/sectionApi";
import Navbar from "./Navbar";

function Section() {
  const { bookId, chapterId } = useParams();
  const navigate = useNavigate();
  
  const { data: books = [], error: bookError, isLoading: isLoadingBooks } = useGetBooksQuery();
  const { data: chapters = [], error: chapterError, isLoading: isLoadingChapters } = useGetChaptersQuery(bookId);
  const { 
    data: sections = [], 
    error: sectionError, 
    isLoading: isLoadingSections 
  } = useGetSectionsQuery({ bookId, chapterId });

  const book = books.find((book) => book.id === parseInt(bookId));
  const chapter = chapters.find((chapter) => chapter.id === parseInt(chapterId));

  const handleSectionClick = (sectionId) => {
    // Using the exact path structure you specified
    navigate(`/books/${bookId}/chapters/${chapterId}/sections/${sectionId}`);
  };

  const handleViewShlokas = () => {
    // Direct path to chapter shlokas when no sections exist
    navigate(`/books/${bookId}/chapters/${chapterId}/shlokas`);
  };

  if (isLoadingBooks || isLoadingChapters || isLoadingSections) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (bookError || chapterError || sectionError) {
    return (
      <div className="p-4 mx-auto max-w-2xl text-center">
        <h2 className="text-xl font-bold text-red-600 mb-4">Error fetching data</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
          {JSON.stringify(bookError || chapterError || sectionError, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-no-repeat bg-cover">
      <Navbar />
      
      <div className="container mx-auto px-4 mt-3 sm:mt-6">
        {book && chapter && (
          <div className="mb-6 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2"
                style={{ fontFamily: "'Tiro Devanagari Sanskrit', serif" }}>
              {chapter.chapter_name}
            </h1>
            <p className="text-gray-600 text-lg">
              {book.book_name}
            </p>
          </div>
        )}

        {sections.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 xl:gap-10">
            {sections.map((section) => (
              <div
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className="bg-white shadow-lg rounded-lg p-4 cursor-pointer 
                         transform transition duration-200 hover:scale-105 
                         hover:shadow-xl border border-gray-100"
              >
                <p style={{ fontFamily: "'Tiro Devanagari Sanskrit', serif" }}
                   className="text-center text-lg md:text-xl 
                            tracking-wide leading-relaxed">
                  {section.section_name}
                </p>
                {section.section_description && (
                  <p className="text-gray-600 text-sm mt-2 text-center">
                    {section.section_description}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-xl text-gray-600">
              No sections found in this chapter. 
              <button 
                onClick={handleViewShlokas}
                className="text-blue-500 hover:text-blue-700 ml-2">
                View Shlokas
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Section;