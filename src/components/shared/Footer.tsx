import logo from "@/assets/logo.png";
import Image from "next/image";
import Container from "../Container";
import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="dark:text-black bg-black/80 text-white dark:bg-gray-200">
      <Container className="py-8 flex flex-col items-center justify-between">
        <Image src={logo} width={80} height={80} alt="logo" />
        <div className="font-bold mt-6">
          <h1 className="text-2xl font-bold text-center">Book Net</h1>
          <p className="max-w-xl mx-auto text-[16px] text-center my-5">
            Discover, review, and rate your favorite books. Join a community of
            book lovers and share your reading experiences.
          </p>
        </div>
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>

        <div className="flex gap-x-5 mt-5">
          <Link
            className="social-link flex items-center justify-center w-10 h-10 rounded-full bg-white text-black hover:bg-gray-200"
            href="https://www.linkedin.com/in/tanushri-das-06a520194/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-xl" />
          </Link>
          <Link
            className="social-link flex items-center justify-center w-10 h-10 rounded-full bg-white text-black hover:bg-gray-200"
            href="https://www.facebook.com/tanushri.das01?mibextid=ZbWKwL"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="text-xl" />
          </Link>
          <Link
            className="social-link flex items-center justify-center w-10 h-10 rounded-full bg-white text-black hover:bg-gray-200"
            href="https://www.youtube.com/watch?v=ZvggB9FT4gM&ab_channel=MuseumofFineArts%2CBoston"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className="text-xl" />
          </Link>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
