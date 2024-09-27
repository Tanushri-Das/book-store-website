"use client";

import About from "./About";
import Banner from "./Banner";
import Choose from "./Choose";
import ContactUs from "./ContactUs";
import Faq from "./Faq";
import FeaturedBooks from "./FeaturedBooks";
import Testimonials from "./Testimonials/Testimonials";

const Home = () => {
  return (
    <>
      <Banner />
      <About />
      <FeaturedBooks />
      <Choose />
      <Testimonials />
      <Faq />
      <ContactUs />
    </>
  );
};

export default Home;
