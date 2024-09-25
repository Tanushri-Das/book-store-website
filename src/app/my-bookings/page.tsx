"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { FiMinusCircle, FiTrash } from "react-icons/fi";
import axios from "axios";
import { Booking } from "@/types";
import useCart from "@/hooks/useCart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UpdateModal from "@/components/shared/UpdateModal";
import Image from "next/image";
import { GoPlusCircle } from "react-icons/go";
import Swal from "sweetalert2";

const BookingsPage: React.FC = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { data: cartData, isLoading, error } = useCart();

  // State to control modal visibility and booking data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Mutation to handle booking deletion
  const deleteMutation = useMutation({
    mutationFn: async (bookingId: string) => {
      return await axios.delete(`/my-bookings/api/booking/${bookingId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myBookings", session?.user?.email ?? ""],
      });
    },
    onError: (error) => {
      console.error("Error deleting booking:", error);
    },
  });

  // Mutation to handle booking update
  const updateMutation = useMutation({
    mutationFn: async (updatedBooking: Booking) => {
      return await axios.patch(
        `/my-bookings/api/booking/${updatedBooking._id}`,
        updatedBooking
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myBookings", session?.user?.email ?? ""],
      });
      setIsModalOpen(false); // Close modal on success
    },
    onError: (error) => {
      console.error("Error updating booking:", error);
    },
  });

  // Extract bookings from cartData
  const bookings = cartData?.mybookings || [];

  // Handle delete button click
  const handleDelete = (bookingId: string) => {
    deleteMutation.mutate(bookingId);
    Swal.fire({
      title: "Success!",
      text: "Book deleted succesfully from the cart",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Handle edit button click to open modal
  const handleEdit = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };
  // Mutation for updating quantity
  const updateQuantityMutation = useMutation({
    mutationFn: async (updatedBooking: Booking) => {
      return await axios.patch(
        `/my-bookings/api/booking/${updatedBooking._id}`,
        {
          ...updatedBooking,
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myBookings", session?.user?.email ?? ""],
      });
    },
    onError: (error) => {
      console.error("Error updating quantity:", error);
    },
  });
  const handleIncrementQuantity = (booking: Booking) => {
    const updatedBooking = {
      ...booking,
      quantity: booking.quantity + 1,
      price: (booking.price / booking.quantity) * (booking.quantity + 1), // Calculate price based on the original price
    };
    updateQuantityMutation.mutate(updatedBooking);
  };

  const handleDecrementQuantity = (booking: Booking) => {
    if (booking.quantity > 1) {
      const updatedBooking = {
        ...booking,
        quantity: booking.quantity - 1,
        price: (booking.price / booking.quantity) * (booking.quantity - 1), // Calculate price based on the original price
      };
      updateQuantityMutation.mutate(updatedBooking);
    }
  };

  const totalAmount = bookings.reduce(
    (acc: number, booking: Booking) => acc + booking.price,
    0
  );

  if (isLoading) {
    return (
      <main className="mt-2 flex min-h-screen flex-col items-center">
        <h2 className="text-xl font-semibold">Loading bookings...</h2>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mt-2 flex min-h-screen flex-col items-center">
        <h2 className="text-xl font-semibold">
          There was an error loading the bookings...
        </h2>
      </main>
    );
  }
  return (
    <div className="m-6 md:m-12">
      <h1 className="text-3xl font-bold flex justify-center items-center">
        My Bookings
      </h1>
      <div className="mt-10">
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
                  Username
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Booking Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking: Booking, index: number) => (
                <tr key={booking._id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-black text-[16px] font-medium">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative w-[80px] h-[80px]">
                      <Image
                        src={booking.bookImage}
                        layout="fill"
                        objectFit="cover"
                        alt={`Image of ${booking.bookName}`}
                        className="rounded-full"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-black text-[16px] font-medium">
                    {booking.bookName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-black text-[16px] font-medium">
                    {booking.writerName}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-black text-[16px] font-medium">
                    {session?.user?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-black text-[16px] font-medium">
                    {booking.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-black text-[16px] font-medium">
                    {booking.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-black text-[16px] font-medium">
                    {booking.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <button
                        className="text-lg"
                        onClick={() => handleIncrementQuantity(booking)}
                      >
                        <GoPlusCircle />
                      </button>
                      <span className="mx-2 text-black text-[16px] font-medium">
                        {booking.quantity}
                      </span>
                      <button
                        className="text-lg"
                        onClick={() => handleDecrementQuantity(booking)}
                      >
                        <FiMinusCircle />
                      </button>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-black text-[16px] font-medium">
                    ${booking.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <button onClick={() => handleEdit(booking)}>
                        <MdOutlineModeEdit className="text-xl text-blue-500 hover:text-blue-700" />
                      </button>
                      <button
                        className="ms-4"
                        onClick={() => handleDelete(booking._id)}
                      >
                        <FiTrash className="text-xl text-red-500 hover:text-red-700" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Total Amount */}
      <div className="mt-4 text-lg font-bold text-center">
        Total Amount: ${totalAmount.toFixed(2)}
      </div>
      {/* Render Update Modal when open */}
      {isModalOpen && selectedBooking && (
        <UpdateModal
          booking={selectedBooking}
          onClose={() => setIsModalOpen(false)}
          onSubmit={(updatedBooking) => updateMutation.mutate(updatedBooking)}
        />
      )}
    </div>
  );
};

export default BookingsPage;
