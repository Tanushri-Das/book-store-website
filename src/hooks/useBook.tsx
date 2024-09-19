import { useQuery } from "@tanstack/react-query";
import { TBook } from "@/types";

const useBooks = () => {
  return useQuery<TBook[]>({
    queryKey: ["books"],
    queryFn: () => fetch(`/api/books`).then((res) => res.json()),
  });
};

export default useBooks;
