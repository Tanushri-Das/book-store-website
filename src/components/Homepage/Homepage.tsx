import React from "react";
import FeaturedBooks from "../Featured/page";
import { getBooks } from "@/services/getBooks";

const Homepage = async () => {
  const books = await getBooks();
  return (
    <div>
      <FeaturedBooks books={books}/>
    </div>
  );
};

export default Homepage;
