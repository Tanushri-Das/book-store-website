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
    <div className="flex items-center justify-center mb-4">
      {/* Search form */}
      <form onSubmit={handleSearch}>
        <div className="relative w-[440px]">
          {/* FaSearch icon */}
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-fuchsia-800"
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

      {/* Clear button outside the input */}
      <button
        onClick={handleClear}
        className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
      >
        Clear
      </button>
    </div>
  );
};

export default SearchBar;
