export type TBook = {
  _id: string;
  book_name: string;
  price: number;
  writer_name: string;
  category: string;
  image: string;
};
export type Categories = Record<
  "Mystery and Thriller" |
  "Science Fiction" |
  "Historical Fiction" |
  "Self Help" |
  "Biography" |
  "Classic Literature",
  TBook[]
>;