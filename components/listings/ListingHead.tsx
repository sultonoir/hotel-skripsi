"use client";

import { SafeImage, SafeListing, SafeUser } from "@/types";
import Image from "next/image";
import Heading from "../Heading";
import HearthButton from "./HearthButton";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import { Autoplay, Pagination, Navigation } from "swiper";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";

interface ListingHeadProps {
  title: string;
  imageSrc: SafeImage[];
  id: string;
  currentUser: SafeUser | null;
}
const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  imageSrc,
  id,
  currentUser,
}) => {
  return (
    <>
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Swiper
          spaceBetween={30}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {imageSrc.map((img) => {
            return (
              <SwiperSlide key={img.id}>
                <Image
                  alt="image"
                  width={1200}
                  height={3100}
                  src={img.img}
                  key={img.id}
                  className="object-cover w-full"
                />
              </SwiperSlide>
            );
          })}

          <div className="swiper-button-next hover:bg-secondary/75 absolute top-1/2 left-2  -translate-y-1/2 rounded-full z-10">
            <HiOutlineArrowLeft size={30} />
          </div>
          <div className="swiper-button-prev hover:bg-secondary/75 absolute top-1/2 -translate-y-1/2 right-2 rounded-full  z-10">
            <HiOutlineArrowRight size={30} />
          </div>
        </Swiper>

        <div className="absolute top-3 right-3 z-20">
          <HearthButton
            listingId={id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </>
  );
};

export default ListingHead;