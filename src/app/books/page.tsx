import BookCard from "@/components/cards/BookCard";
import Container from "@/components/Container";
import { getBooks } from "@/services/getBooks";
import { TBook } from "@/types";
import React from "react";

const BooksPage = async () => {
  const books = await getBooks();
  return (
    <div className="text-black dark:text-white">
      <Container>
        <div className="my-10 w-[90%] mx-auto">
          <h1 className="text-4xl text-center">
            <span className="text-fuchsia-800">Books</span>
          </h1>
          <p className="text-gray-400 text-center italic w-2/4 mx-auto mt-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Recusandae, saepe officia. Quia!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-12 gap-8">
            {books.map((book: TBook) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BooksPage;
