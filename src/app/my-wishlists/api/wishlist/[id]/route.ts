// import clientPromise from "@/lib/MongodbClient";
// import { ObjectId } from "mongodb";

// export const DELETE = async (req: any, { params }: { params: { id: string } }) => {
//   const client = await clientPromise;
//   const db = client.db();
//   const wishlistsCollection = db.collection("wishlists");

//   try {
//     // Log the incoming ID parameter
//     console.log("Params ID:", params.id);
//     const id = new ObjectId(params.id);
//     console.log("Attempting to delete document with ID:", id);

//     // Check if document exists
//     const existingDocument = await wishlistsCollection.findOne({ _id: id });
//     console.log("Existing document:", existingDocument);

//     if (!existingDocument) {
//       return new Response(JSON.stringify({ message: "No wishlist found with this ID" }), { status: 404 });
//     }

//     // Attempt to delete the document with the provided ID
//     const result = await wishlistsCollection.deleteOne({ _id: id });
//     console.log("Deletion result:", result);

//     // Optional: Hardcoded ID test deletion
//     const testId = new ObjectId("66e81ef4a5bc207b2486b4eb");
//     const testResult = await wishlistsCollection.deleteOne({ _id: testId });
//     console.log("Deletion result for hardcoded ID:", testResult);

//     if (result.deletedCount === 0) {
//       return new Response(JSON.stringify({ message: "Failed to delete wishlist" }), { status: 500 });
//     }

//     return new Response(JSON.stringify({ message: "Deleted wishlist successfully" }), { status: 200 });
//   } catch (error) {
//     console.error("Error in DELETE request:", error);
//     return new Response(JSON.stringify({ message: "Something went wrong" }), { status: 500 });
//   }
// };

import clientPromise from "@/lib/MongodbClient";
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

    return Response.json({
      message: "Deleted wishlists successfully",
      response: res,
    });
  } catch (error) {
    return Response.json({ message: "Something went wrong" });
  }
};
