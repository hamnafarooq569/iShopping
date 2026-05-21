"use client";

import { useTestimonials } from "@/app/hooks/useTestimonials";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Testimonials() {
  const { isLoading, data, error } = useTestimonials();

  const testimonials = data || [];

  return (
    <section className="flat-spacing">
      <div className="container">

        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">Customer Review</h3>
        </div>

        {isLoading ? (
          <Skeleton width={"100%"} height={300} />
        ) : error ? (
          <p>Failed to load testimonials</p>
        ) : (
          <Swiper
            className="tf-sw-testimonial wow fadeInUp"
            data-wow-delay="0.1s"
            spaceBetween={30}
            slidesPerView={3}
            breakpoints={{
              768: { slidesPerView: 3 },
              576: { slidesPerView: 2 },
              0: { slidesPerView: 1 },
            }}
            modules={[Pagination]}
            pagination={{
              clickable: true,
              el: ".spd81",
            }}
            dir="ltr"
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="testimonial-item style-4">

                  <div className="content-top">

                    <div className="box-icon">
                      <i className="icon icon-quote" />
                    </div>

                    <div className="text-title">
                      {item.designation}
                    </div>

                    <p className="text-secondary">
                      {item.message}
                    </p>

                    <div className="box-rate-author">

                      <div className="box-author">
                        <div className="text-title author">
                          {item.name}
                        </div>
                      </div>

                      <div className="list-star-default color-primary">
                        {Array(item.rating)
                          .fill(0)
                          .map((_, starIndex) => (
                            <i
                              key={starIndex}
                              className="icon icon-star"
                            />
                          ))}
                      </div>

                    </div>

                  </div>
                </div>
              </SwiperSlide>
            ))}

            <div className="sw-pagination-testimonial sw-dots type-circle d-flex justify-content-center spd81" />
          </Swiper>
        )}

      </div>
    </section>
  );
}