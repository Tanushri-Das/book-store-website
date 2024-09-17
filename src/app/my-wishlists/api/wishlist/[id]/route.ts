import clientPromise from "@/lib/MongodbClient";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export const DELETE = async (
  req: any,
  { params }: { params: { id: string } }
) => {
  const client = await clientPromise;
  const db = client.db();
  const wishlistsCollection = db.collection("wishlists");

  try {
    const res = await wishlistsCollection.deleteOne({
      _id: new ObjectId(params.id),
    });

    return NextResponse.json({
      message: "Deleted bookings successfully",
      response: res,
    });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" });
  }
};
