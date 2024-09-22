import clientPromise from "@/lib/MongodbClient";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const client = await clientPromise;
  const db = client.db();
  const wishlistsCollection = db.collection("wishlists");

  try {
    const res = await wishlistsCollection.deleteOne({
      _id: new ObjectId(params.id),
    });

    return Response.json({
      message: "Deleted wishlists successfully",
      response: res,
    });
  } catch (error) {
    return Response.json({ message: "Something went wrong" });
  }
};
