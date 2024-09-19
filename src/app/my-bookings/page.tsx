"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { FiTrash } from "react-icons/fi";
import axios from "axios";
import { Booking } from "@/types";
import useCart from "@/hooks/useCart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UpdateModal from "@/components/shared/UpdateModal";
import Image from "next/image";

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

  // Handle loading state
  if (isLoading) {
    return (
      <main className="mt-2 flex min-h-screen flex-col items-center">
        <p>Loading bookings...</p>
      </main>
    );
  }

  // Handle error state
  if (error) {
    return (
      <main className="mt-2 flex min-h-screen flex-col items-center">
        <p>There was an error loading the bookings.</p>
      </main>
    );
  }

  // Extract bookings from cartData
  const bookings = cartData?.mybookings || [];

  // Handle delete button click
  const handleDelete = (bookingId: string) => {
    deleteMutation.mutate(bookingId);
  };

  // Handle edit button click to open modal
  const handleEdit = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  return (
    <div className="m-6 md:m-12">
      <h1 className="text-3xl font-bold flex justify-center items-center">
        My Bookings
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
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Booking Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking: Booking, index: number) => (
                <tr key={booking._id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    {booking.bookName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {booking.writerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${booking.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {session?.user?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {booking.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {booking.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {booking.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center">
                    <button onClick={() => handleEdit(booking)}>
                      <MdOutlineModeEdit className="text-xl text-blue-500 hover:text-blue-700" />
                    </button>
                    <button
                      className="ms-4"
                      onClick={() => handleDelete(booking._id)}
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
