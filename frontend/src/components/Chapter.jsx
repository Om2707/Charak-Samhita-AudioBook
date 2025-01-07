import { useNavigate, useParams } from "react-router-dom";
import { useGetBooksQuery } from "../services/booksApi";
import { useGetChaptersQuery } from "../services/chapterApi";
import Navbar from "./Navbar";

function Chapter() {
  const { bookId } = useParams(); 
  const { data: books = [], book_error, book_isLoading } = useGetBooksQuery(); // Fetch all books
  const { data: chapters = [], error, isLoading } = useGetChaptersQuery(bookId);
  const navigate = useNavigate();

  // Find the specific book by its ID
  const book = books.find((book) => book.id === parseInt(bookId));

  const handleChapterClick = (chapterId) => {
    navigate(`/books/${bookId}/chapters/${chapterId}/shlokas`); 
  };

  if (isLoading || book_isLoading) return <div>Loading...</div>;

  if (error || book_error) {
    console.error("Error fetching data:", error || book_error);
    return (
      <div>
        <h2>Error fetching data</h2>
        <pre>{JSON.stringify(error || book_error, null, 2)}</pre>
      </div>
    );
  }

  return (
    <div className="bg-ashtangBg bg-no-repeat overflow-hidden bg-cover h-screen w-screen">
      <Navbar />
      <div className="flex justify-center">
        <div className="w-11/12 "> {/* Centered container with fixed width */}
          <div className="w-full h-96">
            {book && (
              <img
                className="w-full h-full rounded-lg mt-5 object-cover"
                src={book.book_slider}
                alt="Book Cover"
              />
            )}
          </div>
          <div className="mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              {chapters.map((chapter) => (
                <div
                  key={chapter.id}
                  className="bg-white shadow-lg rounded-lg p-4 cursor-pointer"
                  onClick={() => handleChapterClick(chapter.id)}
                >
                  <p className="text-center font-semibold text-lg">
                    {chapter.chapter_name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chapter;
