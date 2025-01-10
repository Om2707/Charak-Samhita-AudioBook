import { useNavigate, useParams } from "react-router-dom";
import { useGetBooksQuery } from "../services/booksApi";
import { useGetChaptersQuery } from "../services/chapterApi";
import { useGetSectionsQuery } from "../services/sectionApi";
import Navbar from "./Navbar";

function Chapter() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { data: books = [], book_error, book_isLoading } = useGetBooksQuery();
  const { data: chapters = [], error, isLoading } = useGetChaptersQuery(bookId);

  const book = books.find((book) => book.id === parseInt(bookId));

  const handleChapterClick = async (chapterId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/${bookId}/chapters/${chapterId}/sections/`);
      const sectionsData = await response.json();
      if (sectionsData.length > 0) {
        navigate(`/books/${bookId}/chapters/${chapterId}/sections`);
      } else {
        navigate(`/books/${bookId}/chapters/${chapterId}/shlokas`);
      }
    } catch (error) {
      console.error("Error fetching sections:", error);
      // Optional: Show an error message to the user.
    }
  };
  

  if (isLoading || book_isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || book_error) {
    console.error("Error fetching data:", error || book_error);
    return (
      <div className="p-4 mx-auto max-w-2xl text-center">
        <h2 className="text-xl font-bold text-red-600 mb-4">Error fetching data</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
          {JSON.stringify(error || book_error, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-no-repeat bg-cover">
      <Navbar />
      <div className="px-4 mt-1 sm:mt-2">
        {book && (
          <div className="w-full h-[150px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
            <img
              className="w-full h-full object-contain sm:object-cover"
              src={book.book_slider}
              alt="Book Cover"
              loading="lazy"
            />
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 mt-3 sm:mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 xl:gap-10">
          {chapters.map((chapter) => (
            <div
              key={chapter.id}
              onClick={() => handleChapterClick(chapter.id)}
              className="bg-white shadow-lg rounded-lg p-4 cursor-pointer 
                       transform transition duration-200 hover:scale-105 
                       hover:shadow-xl border border-gray-100"
            >
              <p
                style={{ fontFamily: "'Tiro Devanagari Sanskrit', serif" }}
                className="text-center text-lg md:text-xl 
                          tracking-wide leading-relaxed"
              >
                {chapter.chapter_name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Chapter;