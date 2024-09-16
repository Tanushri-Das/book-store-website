"use client";
import { useSession } from "next-auth/react";
import React, { FormEvent } from "react";
import { TBook, NewBooking } from "@/types";

interface BookingModalProps {
  book: TBook;
  onClose: () => void;
  onSubmit: (newBooking: NewBooking) => void;
}

const BookingModal = ({ book, onClose, onSubmit }: BookingModalProps) => {
  const { data: session } = useSession();
  const { book_name, writer_name, price, _id } = book || {};

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newBooking: NewBooking = {
      email: session?.user?.email || "",
      name: session?.user?.name || "",
      address: e.currentTarget.address.value,
      phone: e.currentTarget.phone.value,
      date: e.currentTarget.date.value,
      bookName: book_name,
      writerName: writer_name,
      bookID: _id,
      price: price,
    };
    onSubmit(newBooking);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={session?.user?.name || ""}
              readOnly
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={session?.user?.email || ""}
              readOnly
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Address</label>
            <input
              type="text"
              name="address"
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Date</label>
            <input
              type="date"
              name="date"
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
          <div className="flex justify-center gap-x-5">
            <button
              type="button"
              onClick={onClose}
              className="border border-black dark:border-gray-300 text-black rounded-lg px-4 py-[6px]"
            >
              Cancel
            </button>
            <button type="submit" className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white px-4 py-2 font-semibold rounded-md text-[16px]">
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
