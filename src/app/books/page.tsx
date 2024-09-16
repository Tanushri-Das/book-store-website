import Container from "@/components/Container";
import { getBooks } from "@/services/getBooks";
import BooksTab from "@/components/tabs/BooksTab";

const Books = async () => {
  const books = await getBooks();

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
        <BooksTab books={books} />
      </Container>
    </div>
  );
};

export default Books;
