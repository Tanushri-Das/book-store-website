import clientPromise from "@/lib/MongodbClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Connect to the database
    const client = await clientPromise;
    const db = client.db();

    // Fetch all books from the 'books' collection
    const books = await db.collection("books").find({}).toArray();

    // Return the books as a JSON response
    return NextResponse.json(books, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Handle any errors that occur during the database fetch
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    // Return a generic error message if something unexpected occurs
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}
