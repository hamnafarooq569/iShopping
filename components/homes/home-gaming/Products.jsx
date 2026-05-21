"use client";

import ProductCard1 from "@/components/productCards/ProductCard1";
import React, { useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useCategories, useProductWithCategories } from "@/app/hooks/useCategories";


export default function Products() {
  const [activeCategory, setActiveCategory] = useState("all");

  const { data: categoryData } = useCategories();

  const {
    data: productData,
    isLoading,
  } = useProductWithCategories(activeCategory);

  const products = productData?.products || [];

  return (
    <section>
      <div className="container mb-5">

        {/* HEADER */}
        <div className="heading-section-4">
          <div className="heading-left">
            <h3 className="heading font-5 fw-bold">Best Sellers</h3>

            <ul className="tab-product style-2">
              {/* ALL */}
              <li className="nav-tab-item">
                <a
className={activeCategory === "all" ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveCategory("all");
                  }}
                >
                  All
                </a>
              </li>

              {/* CATEGORIES */}
              {categoryData?.map((item) => (
                <li key={item.id} className="nav-tab-item">
                  <a
                    className={activeCategory === item.slug ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveCategory(item.slug);
                    }}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <Link href="/shop" className="btn-line">
            View All Products
          </Link>
        </div>

        {/* PRODUCTS */}
        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={4}
          breakpoints={{
            0: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 },
          }}
        >
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <SwiperSlide key={i}>
                <Skeleton height={400} />
              </SwiperSlide>
            ))
          ) : products.length > 0 ? (
            products.map((item) => (
              <SwiperSlide key={item.id}>
                <ProductCard1 product={item} isNotImageRatio />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div>No products found</div>
            </SwiperSlide>
          )}
        </Swiper>

      </div>
    </section>
  );
}