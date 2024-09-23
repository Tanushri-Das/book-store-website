import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Img1 from "@/assets/banner1.jpg";
import Img2 from "@/assets/banner2.jpg";
import Img3 from "@/assets/banner3.jpg";
import Img4 from "@/assets/banner4.jpg";
import Image from "next/image";
import Container from "../Container";

const Banner = () => {
  return (
    <div className="mt-14">
      <Container>
        {" "}
        <Carousel autoPlay infiniteLoop>
          <div className="relative h-[600px] w-full">
            <Image
              src={Img1}
              layout="fill"
              objectFit="cover"
              alt="banner img1"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-center items-center text-white">
              <h1 className="text-4xl font-bold text-center mb-4">
                Bestselling Books of 2024
              </h1>
              <p className="text-xl text-center">
                Discover the most popular books that are making waves this year!
              </p>
            </div>
          </div>
          <div className="relative h-[600px] w-full">
            <Image
              src={Img2}
              layout="fill"
              objectFit="cover"
              alt="banner img2"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-center items-center text-white">
              <h1 className="text-4xl font-bold text-center mb-4">
                New Arrivals
              </h1>
              <p className="text-lg text-center">
                Check out the latest releases from your favorite authors.
              </p>
            </div>
          </div>
          <div className="relative h-[600px] w-full">
            <Image
              src={Img3}
              layout="fill"
              objectFit="cover"
              alt="banner img3"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-center items-center text-white">
              <h1 className="text-4xl font-bold text-center mb-4">
                Curated Collections
              </h1>
              <p className="text-lg text-center">
                Explore handpicked collections across genres—fiction,
                non-fiction, and more.
              </p>
            </div>
          </div>
          <div className="relative h-[600px] w-full">
            <Image
              src={Img4}
              layout="fill"
              objectFit="cover"
              alt="banner img4"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-center items-center text-white">
              <h1 className="text-4xl font-bold text-center mb-4">
                Exclusive Discounts
              </h1>
              <p className="text-lg text-center">
                Get up to 50% off on select titles. Hurry, limited time only!
              </p>
            </div>
          </div>
        </Carousel>
      </Container>
    </div>
  );
};

export default Banner;
