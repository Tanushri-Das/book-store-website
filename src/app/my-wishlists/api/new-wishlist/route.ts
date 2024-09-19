import clientPromise from "@/lib/MongodbClient";

import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const newWishlist = await request.json();

    // Connect to the database using clientPromise
    const client = await clientPromise;
    const db = client.db();
    const wishlistsCollection = db.collection("wishlists");

    // Insert the new wishlist into the database
    const res = await wishlistsCollection.insertOne(newWishlist);

    return NextResponse.json(
      { message: "Wishlist added successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
};
