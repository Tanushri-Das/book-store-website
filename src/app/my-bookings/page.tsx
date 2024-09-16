"use client";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { FiTrash } from "react-icons/fi";
import { Booking } from "@/types";
import UpdateModal from "@/components/shared/UpdateModal";

const BookingsPage: React.FC = () => {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (session?.user?.email) {
        try {
          const res = await fetch(`/my-bookings/api/${session.user.email}`);
          console.log("Bookings", res);
          const data = await res.json();
          if (Array.isArray(data?.mybookings)) {
            setBookings(data.mybookings);
          }
        } catch (error) {
          console.error("Error fetching bookings:", error);
        }
      }
    };
    loadData();
  }, [session]);

  // Function to load bookings data
  const loadBookingsData = async () => {
    if (session?.user?.email) {
      try {
        const res = await fetch(`/my-bookings/api/${session.user.email}`);
        const data = await res.json();
        if (Array.isArray(data?.mybookings)) {
          setBookings(data.mybookings);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    }
  };

  useEffect(() => {
    loadBookingsData();
  }, [session]);

  const handleEdit = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/booking/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (res.ok) {
        setBookings((prev) => prev.filter((booking) => booking._id !== id));
      } else {
        console.error("Failed to delete booking:", result.message);
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  return (
    <>
      <div className="m-6 md:m-12">
        <h1 className="text-white text-3xl font-bold flex justify-center items-center">
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
                {bookings.length > 0 ? (
                  bookings.map((booking: Booking, index) => (
                    <tr key={booking._id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {index + 1}
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
                          onClick={() => handleDelete(booking._id)}
                          className="ms-4"
                        >
                          <FiTrash className="text-xl text-red-500 hover:text-red-700" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={9}
                      className="text-center px-6 py-4 text-gray-500"
                    >
                      No bookings found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showModal && selectedBooking && (
        <UpdateModal
          booking={selectedBooking}
          onClose={() => {
            setShowModal(false);
            loadBookingsData(); // Reload data when modal closes
          }}
        />
      )}
    </>
  );
};

export default BookingsPage;
