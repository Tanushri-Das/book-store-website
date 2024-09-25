"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaStar, FaStarHalf } from "react-icons/fa";
import "./Testimonials.css";
import { RiDoubleQuotesR } from "react-icons/ri";
import getReviews from "@/services/getReviews";
import Image from "next/image";
import Container from "@/components/Container";

const Testimonials = () => {
  const { data: reviews = [] } = getReviews();

  const [swiperSlidesPerView, setSwiperSlidesPerView] = useState(1);

  useEffect(() => {
    // Update the number of slides per view based on screen size
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        // Medium screens
        setSwiperSlidesPerView(2);
      } else {
        // Small screens
        setSwiperSlidesPerView(1);
      }
    };

    // Initial call
    handleResize();

    // Add event listener to handle screen size changes
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Container>
        <div className="relative">
          <h2 className="text-4xl font-bold mb-5 text-center">
            Customer Reviews
          </h2>
          <p className="text-[16px] text-[#737373] text-center dark:font-semibold px-16">
            Discover what our customers have to say about their experiences! Our
            bookstore is dedicated to providing the best selection of books and
            an inviting atmosphere. Check out their reviews below to see why
            readers love us!
          </p>
          <div className="mx-20 xl:mx-0 mt-10">
            <Swiper
              slidesPerView={swiperSlidesPerView}
              spaceBetween={30}
              navigation={{
                prevEl: ".swiper-button-prev",
                nextEl: ".swiper-button-next",
              }}
              modules={[Navigation]}
              className="mySwiper mt-10 h-[300px] relative"
            >
              {reviews.map((review, index) => (
                <SwiperSlide key={index} style={{ height: "100%" }}>
                  <div className="flex flex-col border border-gray-200 rounded-xl px-5 pt-[33px] h-full">
                    <div className="flex justify-between">
                      <div className="mb-6 flex justify-between items-center">
                        <div className="flex justify-center items-center">
                          {Array.from(
                            { length: Math.floor(review.rating) },
                            (_, index) => (
                              <FaStar
                                key={index}
                                className="star-color text-lg me-2"
                              />
                            )
                          )}
                          {review.rating % 1 === 0.5 && (
                            <FaStarHalf className="star-color text-lg" />
                          )}
                        </div>
                      </div>
                      <div>
                        <RiDoubleQuotesR className="text-5xl star-color " />
                      </div>
                    </div>
                    <p className="text-[16px] my-5">{review.review}</p>
                    <div className="flex items-center">
                      <div className="relative w-[80px] h-[80px]">
                        <Image
                          src={review.image}
                          layout="fill"
                          objectFit="cover"
                          alt="review image"
                          className="rounded-full"
                        />
                      </div>

                      <div className="ms-[18px]">
                        <h1 className="text-xl font-semibold text-left">
                          {review.name}
                        </h1>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Left Border with Previous Button */}
            <div className="swiper-button-prev-container">
              <div className="swiper-button-prev">
                <FiChevronLeft />
              </div>
            </div>
            {/* Right Border with Next Button */}
            <div className="swiper-button-next-container">
              <div className="swiper-button-next">
                <FiChevronRight />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Testimonials;
