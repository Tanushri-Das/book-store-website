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
    <div className="mt-10">
      <Container>
        <Carousel
          autoPlay
          infiniteLoop
          interval={5000}
          stopOnHover
          showThumbs={false}
          showStatus={false}
        >
          {[
            {
              img: Img1,
              title: "Bestselling Books of 2024",
              desc: "Discover the most popular books that are making waves this year!",
            },
            {
              img: Img2,
              title: "New Arrivals",
              desc: "Check out the latest releases from your favorite authors.",
            },
            {
              img: Img3,
              title: "Curated Collections",
              desc: "Explore handpicked collections across genres—fiction, non-fiction, and more.",
            },
            {
              img: Img4,
              title: "Exclusive Discounts",
              desc: "Get up to 50% off on select titles. Hurry, limited time only!",
            },
          ].map((slide, index) => (
            <div key={index} className="relative h-[600px] w-full">
              <Image
                src={slide.img}
                layout="fill"
                objectFit="cover"
                alt={`banner img${index + 1}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-center items-center text-white">
                <h1 className="text-4xl font-bold text-center mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg text-center">{slide.desc}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </Container>
    </div>
  );
};

export default Banner;
