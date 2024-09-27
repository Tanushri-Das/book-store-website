// "use client";
// import Container from "@/components/Container";
// import BooksTab from "@/components/tabs/BooksTab";
// import useBooks from "@/hooks/useBook";
// import SearchBar from "@/components/SearchBar";
// import { useState } from "react";
// import SearchByPrice from "@/components/SearchByPrice";

// const Books = () => {
//   const { data: booksData, isLoading, isError } = useBooks();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [activeTab, setActiveTab] = useState("Mystery and Thriller");
//   const [searchMessage, setSearchMessage] = useState("");
//   const [filteredBooks, setFilteredBooks] = useState(booksData || []);

//   const handleSearch = (term: string) => {
//     setSearchTerm(term);

//     if (!booksData || !Array.isArray(booksData)) return;

//     const foundBook = booksData.find((book) =>
//       book.book_name.toLowerCase().includes(term.toLowerCase())
//     );

//     if (foundBook && foundBook.category) {
//       setActiveTab(foundBook.category); // Automatically switch to the book's category
//       setSearchMessage("");
//     } else {
//       setSearchMessage("This book is not available.");
//     }
//   };

//   const handleTabChange = (newTab: string) => {
//     setActiveTab(newTab);
//     setSearchTerm(""); // Reset search term on manual tab change
//     setSearchMessage(""); // Clear search message on manual tab change
//   };

//   const handleClear = () => {
//     setActiveTab("Mystery and Thriller"); // Reset to default tab
//     setSearchTerm(""); // Clear the search term
//     setSearchMessage(""); // Clear any search message
//     setFilteredBooks(booksData || []); // Reset filtered books
//   };

//   const handlePriceChange = (priceRange: string) => {
//     if (!booksData || !Array.isArray(booksData)) return;

//     const [min, max] = priceRange.split("-").map(Number);
//     const filtered = booksData.filter(
//       (book) => book.price >= min && book.price <= max
//     );
//     setFilteredBooks(filtered);
//   };

//   if (isLoading) {
//     return (
//       <main className="mt-2 flex min-h-screen flex-col items-center">
//         It is loading...
//       </main>
//     );
//   }

//   if (isError) {
//     return (
//       <main className="mt-2 flex min-h-screen flex-col items-center">
//         There is an error...
//       </main>
//     );
//   }

//   return (
//     <div className="text-black dark:text-white">
//       <Container>
//         <div className="mb-10">
//           <h1 className="text-4xl text-center">
//             <span className="text-fuchsia-800">Books</span>
//           </h1>
//         </div>
//         <div className="grid grid-cols-2 gap-6">
//           <SearchBar onSearch={handleSearch} onClear={handleClear} />
//           <SearchByPrice onPriceChange={handlePriceChange} />
//         </div>

//         <BooksTab
//           books={booksData || []}
//           searchTerm={searchTerm}
//           activeTab={activeTab}
//           searchMessage={searchMessage}
//           onTabChange={handleTabChange} // Pass tab change handler
//         />
//       </Container>
//     </div>
//   );
// };

// export default Books;

// // price
// "use client";
// import Container from "@/components/Container";
// import BooksTab from "@/components/tabs/BooksTab";
// import useBooks from "@/hooks/useBook";
// import SearchBar from "@/components/SearchBar";
// import { useState, useEffect } from "react";
// import SearchByPrice from "@/components/SearchByPrice";

// const Books = () => {
//   const { data: booksData, isLoading, isError } = useBooks();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [activeTab, setActiveTab] = useState("Mystery and Thriller");
//   const [searchMessage, setSearchMessage] = useState("");
//   const [filteredBooks, setFilteredBooks] = useState(booksData || []);
//   const [selectedPriceRange, setSelectedPriceRange] = useState("");

//   useEffect(() => {
//     if (booksData) {
//       setFilteredBooks(booksData); // Initialize filteredBooks with all books
//     }
//   }, [booksData]);

//   const handleSearch = (term: string) => {
//     setSearchTerm(term);
//     if (!booksData || !Array.isArray(booksData)) return;

//     const filtered = booksData.filter((book) =>
//       book.book_name.toLowerCase().includes(term.toLowerCase())
//     );

//     setFilteredBooks(filtered); // Update filteredBooks based on search term
//   };

//   const handleTabChange = (newTab: string) => {
//     setActiveTab(newTab);
//     setSearchTerm(""); // Reset search term on manual tab change
//     setSearchMessage(""); // Clear search message on manual tab change

//     const categoryBooks =
//       booksData?.filter((book) => book.category === newTab) || [];
//     setFilteredBooks(categoryBooks);
//   };

//   const handleClear = () => {
//     setActiveTab("Mystery and Thriller");
//     setSearchTerm("");
//     setSearchMessage("");
//     setFilteredBooks(booksData || []);
//   };

//   const handlePriceChange = (priceRange: string) => {
//     setSelectedPriceRange(priceRange);
//     if (!booksData || !Array.isArray(booksData)) return;

//     if (priceRange) {
//       const [min, max] = priceRange.split("-").map(Number);
//       const filteredByPrice = booksData.filter(
//         (book) => book.price >= min && book.price <= max
//       );
//       setFilteredBooks(filteredByPrice); // Update filteredBooks based on price range
//     } else {
//       setFilteredBooks(booksData); // Reset to all books if no price range is selected
//     }
//   };

//   if (isLoading) {
//     return (
//       <main className="mt-2 flex min-h-screen flex-col items-center">
//         It is loading...
//       </main>
//     );
//   }

//   if (isError) {
//     return (
//       <main className="mt-2 flex min-h-screen flex-col items-center">
//         There is an error...
//       </main>
//     );
//   }

//   return (
//     <div className="text-black dark:text-white">
//       <Container>
//         <div className="mb-10">
//           <h1 className="text-4xl text-center">
//             <span className="text-fuchsia-800">Books</span>
//           </h1>
//         </div>
//         <div className="grid grid-cols-2 gap-6">
//           <SearchBar onSearch={handleSearch} onClear={handleClear} />
//           <SearchByPrice onPriceChange={handlePriceChange} />{" "}
//           {/* Pass price change handler */}
//         </div>

//         <BooksTab
//           books={filteredBooks} // Pass filtered books to BooksTab
//           searchTerm={searchTerm}
//           activeTab={activeTab}
//           searchMessage={searchMessage}
//           onTabChange={handleTabChange}
//           selectedPriceRange={selectedPriceRange} // Pass the selected price range
//         />
//       </Container>
//     </div>
//   );
// };

// export default Books;

"use client";
import Container from "@/components/Container";
import BooksTab from "@/components/tabs/BooksTab";
import useBooks from "@/hooks/useBook";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";
import SearchByPrice from "@/components/SearchByPrice";

const Books = () => {
  const { data: booksData } = useBooks();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Mystery and Thriller");
  const [searchMessage, setSearchMessage] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState(""); // State for price range

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
    setSelectedPriceRange(""); // Reset price range
  };

  const handlePriceChange = (priceRange: string) => {
    setSelectedPriceRange(priceRange); // Set the selected price range
  };

  return (
    <div className="text-black dark:text-white mt-10">
      <Container>
        <div className="mb-10">
          <h1 className="text-4xl font-semibold text-center">Books</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 justify-between items-center">
          <SearchBar onSearch={handleSearch} onClear={handleClear} />
          <SearchByPrice
            onPriceChange={handlePriceChange}
            onClear={handleClear}
          />
        </div>

        <BooksTab
          books={booksData || []}
          searchTerm={searchTerm}
          activeTab={activeTab}
          searchMessage={searchMessage}
          onTabChange={handleTabChange} // Pass tab change handler
          selectedPriceRange={selectedPriceRange} // Pass price range
        />
      </Container>
    </div>
  );
};

export default Books;
