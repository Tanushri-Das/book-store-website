import Container from "@/components/Container";
import { TBook } from "@/types";
import BookCard from "../cards/BookCard";

const FeaturedBooks = ({ books }: { books: TBook[] }) => {
  return (
    <div className="text-black dark:text-white">
      <Container>
        <h1 className="text-4xl text-center">
          Featured <span className="text-fuchsia-800">Books</span>
        </h1>
        <p className="text-gray-400 text-center italic w-2/4 mx-auto mt-2">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae
          quaerat vitae eius natus, quia, ipsum quod aliquam quae corporis error
          tempora, qui repudiandae assumenda.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-12 gap-8">
          {books.slice(0, 6).map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default FeaturedBooks;
