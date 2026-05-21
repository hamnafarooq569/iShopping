"use client";

import ProductCard1 from "../productCards/ProductCard1";
import Pagination from "../common/Pagination";
import Link from "next/link";
import { useRemoveWishlist, useWishlist } from "@/app/hooks/useWishList";
import React, { useEffect, useState } from "react";

export default function Wishlist() {
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { data: wishlist = [], isLoading } = useWishlist();
  const remove = useRemoveWishlist();

  useEffect(() => {
    setMounted(true);
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const items =
    wishlist?.map((item) => ({
      id: item.product_id,
      wishlistId: item.id,
      slug: item.slug,
      title: item.name,
      price: item.price,
      imgSrc: item.image_url,
    })) || [];

  if (!mounted) {
    return null;
  }

  return (
    <section className="flat-spacing">
      <div className="container">
        {!isLoggedIn ? (
          <div className="p-5 text-center">
            <h4 className="mb-3">Please login to view your wishlist.</h4>

            <p className="text-secondary mb-4">
              You need to login before you can view or manage your wishlist items.
            </p>

              <Link className="wishlist-login-button" href="/login">
                Login
              </Link>
          </div>
        ) : (
          <>
            {isLoading && <p>Loading wishlist...</p>}

            {!isLoading && items.length === 0 ? (
              <div className="p-5 text-center">
                Your wishlist is empty.{" "}
                <Link className="btn-line" href="/shop">
                  Explore Products
                </Link>
              </div>
            ) : (
              <div className="tf-grid-layout tf-col-2 md-col-3 xl-col-4">
                {items.map((product) => {
                  const isInWishlist = wishlist.some(
                    (item) => item.product_id === product.id
                  );

                  return (
                    <ProductCard1
                      key={product.wishlistId || product.id}
                      product={product}
                      isInWishlist={isInWishlist}
                      remove={remove}
                    />
                  );
                })}

                <ul className="wg-pagination justify-content-center">
                  <Pagination />
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}