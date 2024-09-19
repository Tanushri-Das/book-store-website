"use client";
import Container from "@/components/Container";
import BooksTab from "@/components/tabs/BooksTab";
import useBooks from "@/hooks/useBook";

const Books = () => {
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
    <div className="text-black dark:text-white">
      <Container>
        <div className="mb-10">
          <h1 className="text-4xl text-center">
            <span className="text-fuchsia-800">Books</span>
          </h1>
          <p className="text-gray-400 text-center italic w-2/4 mx-auto mt-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Recusandae, saepe officia. Quia!
          </p>
        </div>
        {isSuccess && booksData && <BooksTab books={booksData} />}
      </Container>
    </div>
  );
};

export default Books;
