import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGetBooksQuery } from "../services/booksApi"; 

const BooksCards = () => {
  const { data: books, error, isLoading } = useGetBooksQuery();
  const navigate = useNavigate();

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching books: {error.message}</div>;

  return (
    <div className="cards-section-container text-center">
      <h2 className="text-2xl md:text-4xl font-bold text-black mb-4">List of Books</h2>

      <motion.div
        className="cards-container grid m-auto place-items-center gap-4 md:gap-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 p-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {books.map((book) => (
          <Card
            key={book.id}
            image={book.book_image}
            redirect={() => navigate(book.redirect_path)}
            variants={cardVariants}
          />
        ))}
      </motion.div>
    </div>
  );
};

const Card = ({ image, variants, redirect }) => (
  <motion.div
    className="relative group shadow-md rounded-lg hover:shadow-2xl transition-shadow duration-500"
    variants={variants}
  >
    <motion.img
      src={image}
      onClick={redirect}
      alt="Book"
      className="rounded-lg w-56 h-56 md:w-72 md:h-72 lg:w-[350px] lg:h-[400px] object-cover transform transition-transform ease-out duration-300 group-hover:scale-110"
    />
  </motion.div>
);

export default BooksCards;
