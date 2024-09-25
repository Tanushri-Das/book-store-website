import clientPromise from "@/lib/MongodbClient";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const newContact = await request.json();

    // MongoDB তে সংযোগ স্থাপন
    const client = await clientPromise;
    const db = client.db();
    const contactsCollection = db.collection("contacts");

    // নতুন contact ডেটা MongoDB তে insert করা
    await contactsCollection.insertOne(newContact);

    return NextResponse.json(
      { message: "Contact added successfully" },
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
