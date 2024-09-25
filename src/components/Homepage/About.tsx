import Container from "../Container";
import Image from "next/image";
import about1 from "@/assets/about1.jpg";
import about2 from "@/assets/about2.png";

const About = () => {
  return (
    <div className="-mt-9">
      <Container>
        <div className="flex flex-col lg:flex-row gap-16 md:gap-44 lg:gap-24">
          {/* Image section wrapper to center the images */}
          <div className="md:flex md:justify-center lg:justify-start">
            <div className="relative w-full h-[300px] md:w-[400px] xl:w-[400px]">
              {/* First image, full width on small screens */}
              <Image
                src={about1}
                alt="about1"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />

              {/* Second image, hidden on small screens */}
              <div className="hidden md:block absolute top-1/2 -right-12 w-[327px] h-[280px]">
                <Image
                  src={about2}
                  alt="about2"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Text section */}
          <div className="lg:w-1/2">
            <h1 className="text-xl text-fuchsia-800 font-bold mb-4">
              About Us
            </h1>
            <h3 className="text-4xl font-bold mb-4">
              Explore Endless Stories and Adventures in Every Book
            </h3>
            <p className="mb-4 text-[16px] text-[#737373] dark:font-semibold text-justify">
              We believe that books hold the power to transform lives. Since our
              founding, we’ve been dedicated to offering a carefully curated
              selection of books from all genres. Whether you’re looking for
              timeless classics, the latest bestsellers, or rare finds, we have
              something for every reader.
            </p>
            <p className="mb-7 text-[16px] text-[#737373] dark:font-semibold text-justify">
              Our mission is to create a haven for book lovers and foster a love
              for reading in the community. From cozy corners to immersive
              events, we offer more than just books — we offer an experience.
              Whether you visit us online or in-store, our knowledgeable staff
              is always here to help you discover your next great read.
            </p>
            <button className="rounded-md text-white text-lg px-4 py-[6px] font-medium bg-fuchsia-800 hover:bg-fuchsia-700 dark:bg-transparent dark:border dark:border-gray-300">
              Get more info
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default About;
