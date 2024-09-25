"use client";

import Banner from "./Banner";
import Faq from "./Faq";
import Testimonials from "./Testimonials/Testimonials";
import About from "./About";
import Choose from "./Choose";
import ContactUs from "./ContactUs";
import FeaturedBooks from "./FeaturedBooks";

const Homepage = () => {
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

export default Homepage;
