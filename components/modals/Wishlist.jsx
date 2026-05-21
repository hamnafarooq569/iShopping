"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useWishlist, useRemoveWishlist } from "@/app/hooks/useWishList";

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
      title: item.product?.name || item.name,
      slug: item.product?.slug || item.slug,
      price: item.product?.price || item.price,
      imgSrc: item.product?.image_url || item.image_url,
    })) || [];

  return (
    <div className="modal fullRight fade modal-wishlist" id="wishlist">
      <div className="modal-dialog">
        <div className="modal-content">
          {/* HEADER */}
          <div className="header">
            <h5 className="title">Wish List</h5>
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="modal"
            />
          </div>

          <div className="wrap">
            <div className="tf-mini-cart-wrap">
              <div className="tf-mini-cart-main">
                <div className="tf-mini-cart-sroll">
                  {!mounted ? null : !isLoggedIn ? (
                    <div className="p-4 text-center">
                      <h6 className="mb-2">
                        Please login to view your wishlist.
                      </h6>

                      <p className="text-secondary mb-3">
                        Login to save and view your favorite products.
                      </p>

                      <Link
                        href="/login"
                        className="btn-style-2 w-100 radius-4"
                        data-bs-dismiss="modal"
                      >
                        Login
                      </Link>
                    </div>
                  ) : (
                    <>
                      {/* LOADING */}
                      {isLoading && <p>Loading...</p>}

                      {/* ITEMS */}
                      {!isLoading && items.length ? (
                        <div className="tf-mini-cart-items">
                          {items.map((elm) => (
                            <div
                              key={elm.wishlistId || elm.id}
                              className="tf-mini-cart-item file-delete"
                            >
                              <div className="tf-mini-cart-image">
                                <Image
                                  alt={elm.title || "product img"}
                                  src={elm.imgSrc || "/images/default.png"}
                                  width={600}
                                  height={800}
                                />
                              </div>

                              <div className="tf-mini-cart-info flex-grow-1">
                                <div className="mb_12 d-flex align-items-center justify-content-between flex-wrap gap-12">
                                  <div className="text-title">
                                    <Link
                                      href={`/product-detail/${elm.slug}`}
                                      className="link text-line-clamp-1"
                                      data-bs-dismiss="modal"
                                    >
                                      {elm.title}
                                    </Link>
                                  </div>

                                  {/* REMOVE */}
                                  <div
                                    className="text-button tf-btn-remove remove"
                                    onClick={() =>
                                      remove.mutate(elm.wishlistId || elm.id)
                                    }
                                  >
                                    Remove
                                  </div>
                                </div>

                                <div className="d-flex align-items-center justify-content-between flex-wrap gap-12">
                                  <div className="text-secondary-2">
                                    {/* variants later */}
                                  </div>

                                  <div className="text-button">
                                    Rs {Number(elm.price || 0).toLocaleString()}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        !isLoading && (
                          <div className="p-4 text-center">
                            Your wishlist is empty. Start adding your favorite
                            products.
                            <br />
                            <Link
                              className="btn-line"
                              href="/shop-default-grid"
                              data-bs-dismiss="modal"
                            >
                              Explore Products
                            </Link>
                          </div>
                        )
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* FOOTER */}
              {mounted && isLoggedIn && (
                <div className="tf-mini-cart-bottom">
                  <Link
                    href="/wish-list"
                    className="btn-style-2 w-100 radius-4 view-all-wishlist"
                    data-bs-dismiss="modal"
                  >
                    <span className="text-btn-uppercase">
                      View All Wish List
                    </span>
                  </Link>

                  <Link
                    href="/shop-default-grid"
                    className="text-btn-uppercase"
                    data-bs-dismiss="modal"
                  >
                    Or continue shopping
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}