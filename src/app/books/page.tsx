"use client";
import Container from "@/components/Container";
import BooksTab from "@/components/tabs/BooksTab";
import useBooks from "@/hooks/useBook";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";

const Books = () => {
  const { data: booksData, isLoading, isError } = useBooks();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Mystery and Thriller");
  const [searchMessage, setSearchMessage] = useState("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);

    if (!booksData || !Array.isArray(booksData)) return;

    const foundBook = booksData.find((book) =>
      book.book_name.toLowerCase().includes(term.toLowerCase())
    );

    if (foundBook && foundBook.category) {
      setActiveTab(foundBook.category); // Automatically switch to the book's category
      setSearchMessage("");
    } else {
      setSearchMessage("This book is not available.");
    }
  };

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    setSearchTerm(""); // Reset search term on manual tab change
    setSearchMessage(""); // Clear search message on manual tab change
  };

  const handleClear = () => {
    setActiveTab("Mystery and Thriller"); // Reset to default tab
    setSearchTerm(""); // Clear the search term
    setSearchMessage(""); // Clear any search message
  };

  if (isLoading) {
    return (
      <main className="mt-2 flex min-h-screen flex-col items-center">
        It is loading...
      </main>
    );
  }

  if (isError) {
    return (
      <main className="mt-2 flex min-h-screen flex-col items-center">
        There is an error...
      </main>
    );
  }

  return (
    <div className="text-black dark:text-white">
      <Container>
        <div className="mb-10">
          <h1 className="text-4xl text-center">
            <span className="text-fuchsia-800">Books</span>
          </h1>
        </div>
        <SearchBar onSearch={handleSearch} onClear={handleClear} />
        <BooksTab
          books={booksData || []}
          searchTerm={searchTerm}
          activeTab={activeTab}
          searchMessage={searchMessage}
          onTabChange={handleTabChange} // Pass tab change handler
        />
      </Container>
    </div>
  );
};

export default Books;
