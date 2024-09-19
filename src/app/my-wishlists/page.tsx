"use client";
import { Button } from "@/components/ui/button";
import useWishlist from "@/hooks/useWishlist";
import { Wishlist } from "@/types";
import { useSession } from "next-auth/react";
import React from "react";
import { FiTrash } from "react-icons/fi";
import Image from "next/image"; // Import the Image component

const WishlistPage = () => {
  const { data: session } = useSession();
  const { data: wishlistData, isLoading, error } = useWishlist();

  // Handle loading state
  if (isLoading) {
    return (
      <main className="mt-2 flex min-h-screen flex-col items-center">
        <p>Loading wishlists...</p>
      </main>
    );
  }

  // Handle error state
  if (error) {
    return (
      <main className="mt-2 flex min-h-screen flex-col items-center">
        <p>There was an error loading the wishlists.</p>
      </main>
    );
  }

  // Extract wishlists from wishlistData
  const wishlists = wishlistData?.mywishlists || [];

  console.log("wishlists", wishlists);

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
            <tbody className="">
              {wishlists.map((wishlist: Wishlist, index: number) => (
                <tr key={wishlist._id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative w-[80px] h-[80px]">
                      <Image
                        src={wishlist.image}
                        layout="fill"
                        objectFit="cover"
                        alt={`Image of ${wishlist.book_name}`}
                        className="rounded-full"
                      />
                    </div>
                  </td>
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
                  <td className="px-6 py-4 whitespace-nowrap flex items-center justify-center">
                    <Button variant="outline">Add to Cart</Button>
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

export default WishlistPage;
