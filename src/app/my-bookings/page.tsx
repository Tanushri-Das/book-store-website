"use client";

import { useSession } from "next-auth/react";
import React from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { FiTrash } from "react-icons/fi";
import { Booking } from "@/types";
import useCart from "@/hooks/useCart";

const BookingsPage: React.FC = () => {
  const { data: session } = useSession();
  const { data: cartData, isLoading, error } = useCart();

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

  // Handle empty bookings
  if (bookings.length === 0) {
    return (
      <main className="mt-2 flex min-h-screen flex-col items-center">
        <p>No bookings found.</p>
      </main>
    );
  }

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
                    <button>
                      <MdOutlineModeEdit className="text-xl text-blue-500 hover:text-blue-700" />
                    </button>
                    <button className="ms-4">
                      <FiTrash className="text-xl text-red-500 hover:text-red-700" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;
