import clientPromise from "@/lib/MongodbClient";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const client = await clientPromise;
  const db = client.db();
  const bookingsCollection = db.collection("bookings");

  try {
    const res = await bookingsCollection.deleteOne({
      _id: new ObjectId(params.id),
    });

    return NextResponse.json({
      message: "Deleted bookings successfully",
      response: res,
    });
  } catch (error) {
    console.error("Error deleting booking:", error);
    return NextResponse.json({ message: "Something went wrong" });
  }
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const client = await clientPromise;
  const db = client.db();
  const bookingsCollection = db.collection("bookings");
  const { address, date, phone, quantity, price } = await req.json();

  try {
    const res = await bookingsCollection.updateOne(
      { _id: new ObjectId(params.id) },
      { $set: { address, date, phone, quantity, price } }, // Include quantity and price in the update
      { upsert: true }
    );
    return NextResponse.json({
      message: "Updated the booking successfully",
      response: res,
    });
  } catch (error) {
    console.error("Error updating booking:", error);
    return NextResponse.json({ message: "Something went wrong" });
  }
};

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const client = await clientPromise;
  const db = client.db();
  const bookingsCollection = db.collection("bookings");

  try {
    const res = await bookingsCollection.findOne({
      _id: new ObjectId(params.id),
    });
    return NextResponse.json({
      message: "Booking found successfully",
      response: res,
    });
  } catch (error) {
    console.error("Error fetching booking:", error);
    return NextResponse.json({ message: "Something went wrong" });
  }
};
