"use client";

import ProductCard1 from "@/components/productCards/ProductCard1";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Link from "next/link";
import { useProducts } from "@/app/hooks/useProducts";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Products2() {
  const pages = Array.from({ length: 15 }, (_, i) => i + 1);

  const results = pages.map((page) => useProducts(page));

  const isLoading = results.some((r) => r.isLoading);
  const error = results.find((r) => r.error)?.error;

  const allProducts = results.flatMap(
    (r) => r.data?.products || []
  );

  const isSpecialProducts = allProducts.filter(
    (item) => item.is_special
  );

  return (
    <section className="flat-spacing mb-2">
      <div className="container">

        <div className="heading-section-2 type-2">
          <h3 className="heading">Featured Product</h3>
          <Link href="/shop" className="btn-line">
            View All Products
          </Link>
        </div>

        <Swiper
          modules={[Pagination]}
          spaceBetween={15}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
          }}
        >
          {isLoading ? (
               Array.from({ length: 3 }).map((_, i) => (
                          <SwiperSlide key={i}>
                            <Skeleton height={400} />
                          </SwiperSlide>
                        ))
          ) : error ? (
            <p>error</p>
          ) : isSpecialProducts.length > 0 ? (
            isSpecialProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard1 product={product} isNotImageRatio />
              </SwiperSlide>
            ))
          ) : (
            <p>No special products found</p>
          )}
        </Swiper>

      </div>
    </section>
  );
}