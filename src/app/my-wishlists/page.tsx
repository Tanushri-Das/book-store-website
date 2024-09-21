"use client";
import { Button } from "@/components/ui/button";
import useWishlist from "@/hooks/useWishlist";
import { NewBooking, Wishlist, TBook } from "@/types";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { FiTrash } from "react-icons/fi";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import BookingModal from "@/components/shared/BookingModal";
import { useRouter } from "next/navigation";

const WishlistPage = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { data: wishlistData, isLoading, error } = useWishlist();
  const router = useRouter();

  // State for modal and selected book
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<TBook | null>(null);

  const deleteMutation = useMutation({
    mutationFn: async (wishlistId: string) => {
      try {
        const response = await axios.delete(
          `/my-wishlists/api/wishlist/${wishlistId}`
        );
        return response.data;
      } catch (error) {
        console.error("Error deleting wishlist:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myWishlists", session?.user?.email ?? ""],
      });
    },
    onError: (error) => {
      console.error("Error deleting wishlist:", error);
    },
  });

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

  if (isLoading) {
    return (
      <main className="mt-2 flex min-h-screen flex-col items-center">
        <p>Loading wishlists...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mt-2 flex min-h-screen flex-col items-center">
        <p>There was an error loading the wishlists.</p>
      </main>
    );
  }

  const wishlists = wishlistData?.mywishlists || [];

  // Handle add to cart (open modal, but do not delete item yet)
  const handleAddToCart = (book: Wishlist) => {
    setSelectedBook({
      book_name: book.bookName,
      writer_name: book.writerName,
      price: book.price,
      _id: book._id,
      image: book.bookImage,
    });
    setShowModal(true);
  };

  // Close modal without deleting
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBook(null); // Reset selected book when modal closes
  };

  // When booking is confirmed, delete from wishlist and close modal
  const handleBookingSubmit = async (newBooking: NewBooking) => {
    bookingMutation.mutate(newBooking);

    // After successful booking, remove the item from wishlist
    if (selectedBook?._id) {
      deleteMutation.mutate(selectedBook._id);
    }

    handleCloseModal();
  };

  const handleDelete = (wishlistId: string) => {
    deleteMutation.mutate(wishlistId);
  };

  return (
    <div className="m-6 md:m-12">
      <h1 className="text-3xl font-bold flex justify-center items-center">
        My Wishlist
      </h1>
      <div className="mt-12">
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="min-w-full text-left text-sm font-light">
            <thead className="bg-gray-700 text-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  Book Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Book Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Writer Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Username
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {wishlists.map((wishlist: Wishlist, index: number) => (
                <tr key={wishlist._id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative w-[80px] h-[80px]">
                      <Image
                        src={wishlist.bookImage}
                        layout="fill"
                        objectFit="cover"
                        alt={`Image of ${wishlist.bookName}`}
                        className="rounded-full"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {wishlist.bookName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {wishlist.writerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${wishlist.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {session?.user?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center justify-center">
                    <Button
                      variant="outline"
                      onClick={() => handleAddToCart(wishlist)}
                    >
                      Add to Cart
                    </Button>

                    <button
                      onClick={() => handleDelete(wishlist._id)}
                      className="ms-4"
                    >
                      <FiTrash className="text-xl text-red-500 hover:text-red-700" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && selectedBook && (
        <BookingModal
          book={selectedBook}
          onClose={handleCloseModal}
          onSubmit={handleBookingSubmit}
        />
      )}
    </div>
  );
};

export default WishlistPage;
