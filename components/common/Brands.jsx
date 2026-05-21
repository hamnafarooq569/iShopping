"use client";
import { brands } from "@/data/brands";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
export default function Brands({ parentClass = "flat-spacing-5 line-top" }) {
  return (
    <section className={parentClass}>
      <Swiper
        dir="ltr"
        className="swiper tf-sw-partner sw-auto"
        spaceBetween={50} 
        loop={true} 
        autoplay={{ delay: 0 }}
        breakpoints={{
          1024: {
            slidesPerView: "auto",
            spaceBetween: 74, 
          },
          768: {
            slidesPerView: "auto", 
            spaceBetween: 50, 
          },
          0: {
            slidesPerView: 2, 
            spaceBetween: 50, 
          },
        }}
      >
        {brands.map((brand) => (
          <SwiperSlide key={brand.id}>
            <a href="#" className="brand-item">
              <Image
                alt={brand.alt}
                src={brand.imgSrc}
                width={brand.width}
                height={brand.height}
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
