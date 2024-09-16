import clientPromise from "@/lib/MongodbClient";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { email: string } }
) => {
  const client = await clientPromise;
  const db = client.db();
  const bookingsCollection = db.collection("bookings");

  try {
    const mybookings = await bookingsCollection
      .find({ email: params.email })
      .toArray();
    console.log("Requested email:", params.email);

    return NextResponse.json({ mybookings });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
};
