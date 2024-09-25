import Container from "@/components/Container";
import { TBook } from "@/types";
import BookCard from "../cards/BookCard";

const FeaturedBooks = ({ books }: { books: TBook[] }) => {
  return (
    <div className="text-black dark:text-white mt-0 lg:mt-3">
      <Container>
        <h1 className="text-4xl text-center font-bold mb-4">
          Featured <span className="text-fuchsia-800">Books</span>
        </h1>
        <p className="text-[16px] text-[#737373] text-center dark:font-semibold w-2/4 mx-auto">
          Discover our top picks from a variety of genres. Whether you're into
          fiction, non-fiction, or educational books, our featured collection
          offers something for every reader. Dive into a new story today!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 gap-8">
          {books.slice(0, 6).map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default FeaturedBooks;
