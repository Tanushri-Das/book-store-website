"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TBook, Categories } from "@/types";
import BookCard from "../cards/BookCard";

const BooksTab = ({ books }: { books: TBook[] }) => {
  const categories: Categories = {
    "Mystery and Thriller": books.filter(
      (book: TBook) => book.category === "Mystery and Thriller"
    ),
    "Science Fiction": books.filter(
      (book: TBook) => book.category === "Science Fiction"
    ),
    "Historical Fiction": books.filter(
      (book: TBook) => book.category === "Historical Fiction"
    ),
    "Self Help": books.filter((book: TBook) => book.category === "Self Help"),
    Biography: books.filter((book: TBook) => book.category === "Biography"),
    "Classic Literature": books.filter(
      (book: TBook) => book.category === "Classic Literature"
    ),
  };

  return (
    <Tabs defaultValue="Mystery and Thriller" className="w-full">
      {/* TabsList with responsive gap */}
      <TabsList className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4 md:gap-6 lg:gap-8 my-4">
        {Object.keys(categories).map((category) => (
          <TabsTrigger key={category} value={category}>
            {category}
          </TabsTrigger>
        ))}
      </TabsList>

      {Object.keys(categories).map((category) => (
        <TabsContent key={category} value={category}>
          {categories[category as keyof Categories].length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mt-[110px] sm:mt-20 md:mt-8">
              {categories[category as keyof Categories].map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          ) : (
            <p>No books available in this category.</p>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default BooksTab;