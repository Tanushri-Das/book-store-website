import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Retrieve the session using getServerSession
    const session = await getServerSession(authOptions);
    console.log("get data", session);

    // Check if the session is not available
    if (!session) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 }); // Use 401 for unauthorized
    }

    // Return the session data with a success status
    return NextResponse.json({ success: session }, { status: 200 });
  } catch (error) {
    // Handle unexpected errors
    console.error("Error fetching session:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
