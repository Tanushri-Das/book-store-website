import clientPromise from "@/lib/MongodbClient";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { email: string } }
) => {
  const client = await clientPromise;
  const db = client.db();
  const wishlistsCollection = db.collection("wishlists");

  try {
    const mywishlists = await wishlistsCollection
      .find({ email: params.email })
      .toArray();
    console.log("Requested email:", params.email);

    return NextResponse.json({ mywishlists });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch wishlists" },
      { status: 500 }
    );
  }
};
