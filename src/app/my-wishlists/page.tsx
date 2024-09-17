"use client";
import { Button } from "@/components/ui/button";
import { Wishlist } from "@/types";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { FiTrash } from "react-icons/fi";

const WishlistPage = () => {
  const { data: session } = useSession();
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);

  useEffect(() => {
    const loadData = async () => {
      if (session?.user?.email) {
        try {
          const res = await fetch(`/my-wishlists/api/${session.user.email}`);
          console.log("Wishlists", res);
          const data = await res.json();
          if (Array.isArray(data?.mywishlists)) {
            setWishlists(data.mywishlists);
          }
        } catch (error) {
          console.error("Error fetching bookings:", error);
        }
      }
    };
    loadData();
  }, [session]);
  return (
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
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {wishlists.length > 0 ? (
                wishlists?.map((wishlist: Wishlist, index) => (
                  <tr key={wishlist._id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {wishlist.book_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {wishlist.writer_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ${wishlist.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {session?.user?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex items-center">
                      <Button className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white px-4 py-2 font-semibold rounded-md text-[16px]">
                        Add to Cart
                      </Button>
                      <Button className="ms-4">
                        <FiTrash className="text-xl text-red-500 hover:text-red-700" />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="text-center px-6 py-4 text-gray-500"
                  >
                    No wishlists found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
