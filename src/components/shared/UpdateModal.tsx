import { Booking } from "@/types";
import React, { useState } from "react";

interface UpdateModalProps {
    booking: Booking;
    onClose: () => void;
    onSubmit: (updatedBooking: Booking) => void; // Added onSubmit
  }
  
  const UpdateModal: React.FC<UpdateModalProps> = ({ booking, onClose, onSubmit }) => {
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
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit({ ...booking, ...formData }); // Submit updated booking data
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
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default UpdateModal;
  
