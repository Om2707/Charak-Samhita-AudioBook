import { useNavigate } from "react-router-dom";
import { useGetBooksQuery } from "../services/booksApi";
import Navbar from "./Navbar";
import Slider from "./Slider";
import { motion } from 'framer-motion';

function Home() {
  const navigate = useNavigate();
  const { data: books = [], error, isLoading } = useGetBooksQuery();

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    console.error("Error fetching books:", error);
    return <div>Error fetching books</div>;
  }

  const handleBookClick = (bookId) => {
    navigate(`/books/${bookId}/chapters`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: 'beforeChildren',
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <div>
      <Navbar />
      <Slider />
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-3 text-center">Books</h2>
        <motion.div
          className="grid m-auto place-items-center gap-4 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {books.map((book) => (
            <motion.div
              key={book.id}
              className="relative group shadow-md rounded-lg hover:shadow-2xl transition-shadow duration-500"
              variants={cardVariants}
              onClick={() => handleBookClick(`${book.id}`)}
            >
              <motion.img
                src={book.book_image}
                alt={book.book_name}
                className="rounded-lg w-56 h-56 md:w-72 md:h-72 lg:w-[350px] lg:h-[400px] object-cover transform transition-transform ease-out duration-300 group-hover:scale-110"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Home;
