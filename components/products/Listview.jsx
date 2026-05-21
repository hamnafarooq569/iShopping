"use client";
import React from "react";
import ProductsCards6 from "../productCards/ProductsCards6";
import Pagination from "../common/Pagination";

export default function Listview({
  products = [],
  wishlist=[],
  currentPage,
  totalPages = 1,
  onPageChange,
}) {
  return (
    <>
       {products.map((product) => {
        const isInWishlist = wishlist.some(
          (item) => item.product_id === product.id
        );

        return (
          <ProductsCards6
            key={product.id} // ✅ fix key
            product={product}
            isInWishlist={isInWishlist} // ✅ pass it
          />
        );
      })}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
}