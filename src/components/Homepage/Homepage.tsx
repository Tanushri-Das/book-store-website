"use client";

import useBooks from "@/hooks/useBook";
import FeaturedBooks from "../Featured/page";

const Homepage = () => {
  const { data: booksData, isLoading, isError, isSuccess } = useBooks();

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
    <div>{isSuccess && booksData && <FeaturedBooks books={booksData} />}</div>
  );
};

export default Homepage;
