"use client";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  onSearch: (term: string) => void;
  onClear: () => void; // New prop to handle clearing the input and resetting
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onClear }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm); // Call the onSearch function with the current search term
  };

  const handleClear = () => {
    setSearchTerm(""); // Clear the input
    onClear(); // Call the onClear function to reset the state
  };

  return (
    <div className="mb-4">
      <h1 className="text-lg mb-4">Search by Bookname :</h1>
      <div className="flex items-center">
        <form onSubmit={handleSearch}>
          <div className="relative w-[250px] sm:w-[440px] lg:w-[390px] xl:w-[440px]">
            <FaSearch className="absolute left-[6px] md:left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-7 md:pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-fuchsia-800"
              placeholder="Search for a book"
            />

            <button
              type="submit"
              className="absolute right-0 top-0 bottom-0 px-4 bg-fuchsia-800 text-white rounded-r-md hover:bg-fuchsia-700 transition-colors"
            >
              Search
            </button>
          </div>
        </form>
        <button
          onClick={handleClear}
          className="ml-2 2xl:ml-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
