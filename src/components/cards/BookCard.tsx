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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import axios from "axios";

const BookCard = ({ book }: { book: TBook }) => {
  const { book_name, writer_name, image, price, _id } = book || {};
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession(); // Access session data
  const queryClient = useQueryClient();
  const router = useRouter();

  // Add to Cart Mutation
  const mutation = useMutation({
    mutationFn: (newBooking: NewBooking) => {
      return axios.post("/my-bookings/api/new-booking", newBooking);
    },
    onSuccess: () => {
      // Invalidate queries with user email
      queryClient.invalidateQueries({
        queryKey: ["myBookings", session?.user?.email],
      });
      router.push("/my-bookings");
    },
  });

  const handleAddToCart = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleBookingSubmit = async (newBooking: NewBooking) => {
    mutation.mutate(newBooking);
    handleCloseModal();
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
        <CardFooter className="p-4 flex justify-center">
          <Button variant="outline" onClick={handleAddToCart}>
            Add to Cart
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
