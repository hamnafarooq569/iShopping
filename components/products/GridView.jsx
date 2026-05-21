"use client"
import React from "react";
import ProductCard1 from "../productCards/ProductCard1";
import Pagination from "../common/Pagination";

export default function GridView({ 
  products = [],
  wishlist = [],
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
          <ProductCard1
            key={product.id} // ✅ fix key
            product={product}
            gridClass="grid"
            isInWishlist={isInWishlist} // ✅ pass it
          />
        );
      })}
      {/* pagination */}
          <Pagination
          currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
          />
      
    </>
  );
}
