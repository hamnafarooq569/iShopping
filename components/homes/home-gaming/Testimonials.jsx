"use client";
import { useTestimonials } from "@/app/hooks/useTestimonials";
// import { testimonials9 } from "@/data/testimonials";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Testimonials() {
  const {isLoading,data,error} = useTestimonials();
  return (
    <section className="flat-spacing pt-0 pb-4">
      <div className="container">
        <div className="flat-sw-navigation flat-spacing bg-surface radius-20 px_15 home-gaming-testimonials">
          <Swiper
            dir="ltr"
            className="swiper tf-sw-testimonial"
            spaceBetween={30}
            modules={[Navigation]}
            navigation={{
              prevEl: ".snbp28",
              nextEl: ".snbn28",
            }}
          >
            {isLoading ? (
              <div>
                <Skeleton className="w-100%" height={400}/>
              </div>
            ):data ? data.map((testimonial)=>(
              <SwiperSlide className="swiper-slide" key={testimonial.id}>
                <div className="testimonial-item-v2 type-space-2 text-center">
                  <div className="quote-box">
                    <span className="icon icon-quote" />
                    <div className="text-btn-uppercase text-secondary-2">
                      Customer Say!
                    </div>
                  </div>
                  <h4>"{testimonial.message}"</h4>
                  <div className="rate-box">
                    <h6>
                      {testimonial.name}
                      <span className="text-title text-se">
                        / {testimonial.designation}
                      </span>
                    </h6>
                  </div>
                </div>
              </SwiperSlide>
            )):error}
          </Swiper>
          <div className="nav-prev-testimonial d-none d-lg-flex nav-sw style-line nav-sw-left space-md snbp28">
            <i className="icon icon-arrLeft" />
          </div>
          <div className="nav-next-testimonial d-none d-lg-flex nav-sw style-line nav-sw-right space-md snbn28">
            <i className="icon icon-arrRight" />
          </div>
        </div>
      </div>
    </section>
  );
}
