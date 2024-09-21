"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TBook, Categories } from "@/types";
import BookCard from "../cards/BookCard";

const BooksTab = ({
  books,
  searchTerm,
  activeTab,
  searchMessage,
  onTabChange, // Receive the handler for tab change
}: {
  books: TBook[];
  searchTerm: string;
  activeTab: string;
  searchMessage: string;
  onTabChange: (tab: string) => void; // Handler for tab change
}) => {
  const categories: Categories = {
    "Mystery and Thriller": books.filter(
      (book) => book.category === "Mystery and Thriller"
    ),
    "Science Fiction": books.filter(
      (book) => book.category === "Science Fiction"
    ),
    "Historical Fiction": books.filter(
      (book) => book.category === "Historical Fiction"
    ),
    "Self Help": books.filter((book) => book.category === "Self Help"),
    "Biography": books.filter((book) => book.category === "Biography"),
    "Classic Literature": books.filter(
      (book) => book.category === "Classic Literature"
    ),
  };

  const filteredBooks = searchTerm
    ? categories[activeTab].filter((book) =>
        book.book_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : categories[activeTab];

  return (
    <Tabs value={activeTab || "Mystery and Thriller"} className="w-full mt-10">
      <TabsList className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4 md:gap-6 lg:gap-8 my-4">
        {Object.keys(categories).map((category) => (
          <TabsTrigger
            key={category}
            value={category}
            onClick={() => onTabChange(category)} // Handle manual tab change
          >
            {category}
          </TabsTrigger>
        ))}
      </TabsList>

      {Object.keys(categories).map((category) => (
        <TabsContent key={category} value={category}>
          {activeTab && filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mt-[110px] sm:mt-20 md:mt-8">
              {filteredBooks.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          ) : (
            <p>{searchMessage}</p>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default BooksTab;
