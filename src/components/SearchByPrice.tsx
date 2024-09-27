"use client";
import React, { useState } from "react";

interface SearchByPriceProps {
  onPriceChange: (priceRange: string) => void;
  onClear: () => void; // New prop to handle clearing the input and resetting
}

const SearchByPrice: React.FC<SearchByPriceProps> = ({
  onPriceChange,
  onClear,
}) => {
  const [selectedPriceRange, setSelectedPriceRange] = useState("");

  const handlePriceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedPriceRange(selectedValue);
    onPriceChange(selectedValue); // Trigger the price change callback
  };
  const handleReset = () => {
    setSelectedPriceRange(""); // Clear the input
    onClear(); // Call the onClear function to reset the state
  };
  return (
    <div className="w-[290px] sm:w-[440px] lg:w-[390px] xl:w-[440px] flex flex-col justify-end mb-4">
      <h1 className="text-xl font-semibold mb-4">Search by Price :</h1>
      <div className="flex items-center">
        <select
          id="priceRange"
          value={selectedPriceRange}
          onChange={handlePriceChange}
          className="block w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select a price range</option>
          <option value="0-100">0-100</option>
          <option value="101-200">101-200</option>
          <option value="201-300">201-300</option>
          <option value="301-400">301-400</option>
        </select>
        <button
          onClick={handleReset}
          className="ml-2 2xl:ml-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default SearchByPrice;
