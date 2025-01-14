import { useNavigate } from "react-router-dom";
import { useGetBooksQuery } from "../services/booksApi";
import Navbar from "./Navbar";
import Slider from "./Slider";
import { motion } from 'framer-motion';

function Home() {
  const navigate = useNavigate();
  const { data: books = [], error, isLoading } = useGetBooksQuery();

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-xl">Loading...</div>
    </div>
  );

  if (error) {
    console.error("Error fetching books:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Error fetching books</div>
      </div>
    );
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="w-full">
        <Slider />
      </div>
      
      <div className="container mx-auto px-4 py-6 flex-grow">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">List of Sthana</h2>
        
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-32 max-w-7xl mx-auto px-2 sm:px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {books.map((book) => (
            <motion.div
              key={book.id}
              className="relative group cursor-pointer"
              variants={cardVariants}
              onClick={() => handleBookClick(`${book.id}`)}
            >
              <div className="rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-500">
                <motion.img
                  src={book.book_image}
                  alt={book.book_name}
                  className="w-full aspect-[3/4] object-cover transform transition-transform duration-300 group-hover:scale-105"
                  style={{ 
                    imageRendering: 'crisp-edges',
                    maxHeight: '400px'
                  }}
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-end">
                <p className="text-white text-sm sm:text-base md:text-lg p-2 sm:p-3 w-full text-center">
                  {book.book_name}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Home;