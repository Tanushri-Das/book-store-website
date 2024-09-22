import { NewBooking, NewWishlist, TBook } from "@/types";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import BookingModal from "../shared/BookingModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import axios from "axios";
import useCart from "@/hooks/useCart";

type BookingItem = {
  bookID: string;
  // add other relevant properties if necessary
};

interface CartData {
  mybookings: BookingItem[];
  // add other properties as needed
}

const BookCard = ({ book }: { book: TBook }) => {
  const { book_name, writer_name, image, price, _id } = book || {};
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: cartData } = useCart() as { data: CartData | undefined };

  const isInCart = cartData?.mybookings?.some(
    (item: BookingItem) => item.bookID === _id
  );

  // Add to Booking Mutation
  const bookingMutation = useMutation({
    mutationFn: (newBooking: NewBooking) => {
      return axios.post("/my-bookings/api/new-booking", newBooking);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myBookings", session?.user?.email],
      });
      router.push("/my-bookings");
    },
  });

  // Add to Wishlist Mutation
  const wishlistMutation = useMutation({
    mutationFn: (newWishlist: NewWishlist) => {
      return axios.post("/my-wishlists/api/new-wishlist", newWishlist);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myWishlists", session?.user?.email],
      });
      router.push("/my-wishlists");
    },
  });

  const handleAddToCart = () => {
    if (isInCart) {
      alert("This book is already in your cart.");
      return;
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleBookingSubmit = async (newBooking: NewBooking) => {
    bookingMutation.mutate(newBooking);
    handleCloseModal();
  };

  const handleAddToWishlist = () => {
    if (session?.user?.email) {
      const newWishlist: NewWishlist = {
        bookName: book_name,
        writerName: writer_name,
        bookImage: image,
        bookID: _id,
        price: price,
        email: session?.user?.email || "",
      };

      wishlistMutation.mutate(newWishlist);
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="p-0">
          <div className="w-full h-[210px] rounded-t-lg overflow-hidden">
            <div className="relative w-full h-full">
              <Image
                src={image}
                layout="fill"
                objectFit="cover"
                alt="Book Image"
                className="rounded-t-lg"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-xl text-center font-semibold">
            {book_name}
          </CardTitle>
          <CardDescription className="text-[16px] font-medium text-center my-3">
            {writer_name}
          </CardDescription>
          <h5 className="text-lg text-primary font-semibold text-center">
            Price: ${price}
          </h5>
        </CardContent>
        <CardFooter className="p-4 flex justify-center gap-x-5">
          <Button variant="outline" onClick={handleAddToCart}>
            Add to Cart
          </Button>
          <Button variant="outline" onClick={handleAddToWishlist}>
            Add to Wishlist
          </Button>
        </CardFooter>
      </Card>
      {showModal && (
        <BookingModal
          book={book}
          onClose={handleCloseModal}
          onSubmit={handleBookingSubmit}
        />
      )}
    </>
  );
};

export default BookCard;
