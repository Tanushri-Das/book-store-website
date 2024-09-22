import clientPromise from "@/lib/MongodbClient";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const newBooking = await request.json();

    // Connect to the database using clientPromise
    const client = await clientPromise;
    const db = client.db();
    const bookingsCollection = db.collection("bookings");

    // Insert the new booking into the database
    await bookingsCollection.insertOne(newBooking); // No need to store the result

    return NextResponse.json(
      { message: "Booking added successfully" },
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
