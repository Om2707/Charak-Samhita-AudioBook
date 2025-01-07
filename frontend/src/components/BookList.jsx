import { useGetBooksQuery } from "../services/booksApi"; // Adjust the path accordingly

function BookList() {
  const { data: books, error, isLoading } = useGetBooksQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching books: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {books.map((book) => (
        <BookCard
          key={book.id}
          image={book.book_image}
          redirect={() => {
            console.log(`Redirecting to ${book.redirect_path}`); // Assuming redirect_path is provided by the backend
          }}
        />
      ))}
    </div>
  );
}

export default BookList;
