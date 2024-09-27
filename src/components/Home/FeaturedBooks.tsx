import useBooks from "@/hooks/useBook";
import Featured from "./Featured";

const FeaturedBooks = () => {
  const { data: booksData, isSuccess } = useBooks();

  return <div>{isSuccess && booksData && <Featured books={booksData} />}</div>;
};

export default FeaturedBooks;
