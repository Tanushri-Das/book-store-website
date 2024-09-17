"use client";
import { NewBooking, TBook } from "@/types";
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

const BookCard = ({ book }: { book: TBook }) => {
  const { book_name, writer_name, image, price, _id } = book || {};
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleAddToCart = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleBookingSubmit = async (newBooking: NewBooking) => {
    const res = await fetch(`/my-bookings/api/new-booking`, {
      method: "POST",
      body: JSON.stringify(newBooking),
      headers: {
        "content-type": "application/json",
      },
    });
    handleCloseModal();
    console.log("my-bookings", res);
    if (res.status === 200) {
      router.push("/my-bookings");
    }
  };

  const handleAddToWishlist = async (book: TBook) => {
    const res = await fetch(`/my-wishlists/api/new-wishlist`, {
      method: "POST",
      body: JSON.stringify(book),
      headers: {
        "content-type": "application/json",
      },
    });
    console.log("my-wishlists", res);
    if (res.status === 200) {
      router.push("/my-wishlists");
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
        <CardFooter className="flex justify-center items-center gap-x-5">
          <Button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white px-4 py-2 font-semibold rounded-md text-[16px]"
          >
            Add to Cart
          </Button>
          <Button
            onClick={() => handleAddToWishlist(book)} // Pass the book data here
            className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white px-4 py-2 font-semibold rounded-md text-[16px]"
          >
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
