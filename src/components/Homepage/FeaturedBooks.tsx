import useBooks from "@/hooks/useBook";
import React from "react";
import Featured from "./Featured";

const FeaturedBooks = () => {
  const { data: booksData, isLoading, isError, isSuccess } = useBooks();

  if (isLoading) {
    return (
      <main className="mt-2 flex min-h-screen flex-col items-center">
        <h2 className="text-xl font-semibold">Loading...</h2>
      </main>
    );
  }
  if (isError) {
    return (
      <main className="mt-2 flex min-h-screen flex-col items-center">
        <h2 className="text-xl font-semibold">There is an error...</h2>
      </main>
    );
  }
  return <div>{isSuccess && booksData && <Featured books={booksData} />}</div>;
};

export default FeaturedBooks;
