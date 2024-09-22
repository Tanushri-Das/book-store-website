"use client";
import React, { useState } from "react";

interface SearchByPriceProps {
  onPriceChange: (priceRange: string) => void;
}

const SearchByPrice: React.FC<SearchByPriceProps> = ({ onPriceChange }) => {
  const [selectedPriceRange, setSelectedPriceRange] = useState("");

  const handlePriceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedPriceRange(selectedValue);
    onPriceChange(selectedValue); // Trigger the price change callback
  };

  return (
    <div className="w-[240px] sm:w-[440px] lg:w-[390px] xl:w-[440px] flex flex-col justify-end mb-4">
      <h1 className="text-lg mb-4">Search by Price :</h1>
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
    </div>
  );
};

export default SearchByPrice;
