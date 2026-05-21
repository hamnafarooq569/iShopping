"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import ProductCard1 from "../productCards/ProductCard1";
export default function RelatedProducts({products = []}) {
  return (
    <section className="flat-spacing">
      <div className="container flat-animate-tab">
        <ul
          className="tab-product justify-content-sm-center wow fadeInUp"
          data-wow-delay="0s"
          role="tablist"
        >
          <li className="nav-tab-item mt-2" role="presentation">
            <a href="#ralatedProducts" className="active mb-4" data-bs-toggle="tab">
              Ralated Products
            </a>
          </li>
         </ul>
        <div className="tab-content">
          <div
            className="tab-pane active show"
            id="ralatedProducts"
            role="tabpanel"
          >
            <Swiper
              className="swiper tf-sw-latest"
              dir="ltr"
              spaceBetween={15}
              breakpoints={{
                0: { slidesPerView: 2, spaceBetween: 15 },

                768: { slidesPerView: 3, spaceBetween: 30 },
                1200: { slidesPerView: 4, spaceBetween: 30 },
              }}
              modules={[Pagination]}
              pagination={{
                clickable: true,
                el: ".spd4",
              }}
            >
             {products.length > 0 ? (
  products.map((product, i) => (
    <SwiperSlide key={i}>
      <ProductCard1 product={product} />
    </SwiperSlide>
  ))
) : (
  <p>No related products found</p>
)}
              <div className="sw-pagination-latest spd4  sw-dots type-circle justify-content-center" />
            </Swiper>
          </div>
          </div>
      </div>
    </section>
  );
}
