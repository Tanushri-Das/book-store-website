"use client";

import useBooks from "@/hooks/useBook";
import FeaturedBooks from "../Featured/page";
import Banner from "./Banner";
import Faq from "./Faq";
import Testimonials from "./Testimonials/Testimonials";
import About from "./About";
import Choose from "./Choose/Choose";
import ContactUs from "../ContactUs/ContactUs";

const Homepage = () => {
  const { data: booksData, isLoading, isError, isSuccess } = useBooks();

  if (isLoading) {
    return (
      <main className="mt-2 flex min-h-screen flex-col items-center">
        It is loading...
      </main>
    );
  }
  if (isError) {
    return (
      <main className="mt-2 flex min-h-screen flex-col items-center">
        There is an error...
      </main>
    );
  }

  return (
    <div>
      <Banner />
      <About />
      {isSuccess && booksData && <FeaturedBooks books={booksData} />}
      <Choose />
      <Faq />
      <Testimonials />
      <ContactUs />
    </div>
  );
};

export default Homepage;
