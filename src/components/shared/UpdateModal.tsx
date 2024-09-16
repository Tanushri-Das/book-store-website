import { Booking } from "@/types";
import React, { useState } from "react";

interface UpdateModalProps {
  booking: Booking;
  onClose: () => void;
}

const UpdateModal: React.FC<UpdateModalProps> = ({ booking, onClose }) => {
  const [formData, setFormData] = useState({
    address: booking.address,
    phone: booking.phone,
    date: booking.date,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/my-bookings/api/booking/${booking._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("PATCH", res);
      if (res.ok) {
        onClose();
      } else {
        console.error("Failed to update booking");
      }
    } catch (error) {
      console.error("An error occurred while updating the booking");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Update Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={onClose}
              className="border border-black dark:border-gray-300 text-black rounded-lg px-4 py-[6px] mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white px-4 py-2 font-semibold rounded-md text-[16px]"
            >
              Update Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
