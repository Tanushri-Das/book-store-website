export type TBook = {
  _id: string;
  book_name: string;
  price: number;
  writer_name: string;
  category?: string;
  image: string;
};
export interface Categories {
  [key: string]: TBook[];
}

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export type UserProps = {
  user?: {
    name?: string | null | undefined;
    email?: string | null | undefined;
  };
};
export interface NewBooking {
  email: string;
  name: string;
  address: string;
  phone: string;
  date: string;
  bookName: string;
  writerName: string;
  bookImage: string;
  bookID: string;
  price: number;
}
export type Booking = {
  _id: string;
  bookName: string;
  writerName: string;
  price: number;
  address: string;
  phone: string;
  date: string;
  bookImage: string;
};

export type NewWishlist = {
  bookName: string;
  writerName: string;
  bookID: string;
  bookImage: string;
  price: number;
  email: string;
};
export type Wishlist = {
  _id: string;
  bookName: string;
  writerName: string;
  price: number;
  bookImage: string;
};
