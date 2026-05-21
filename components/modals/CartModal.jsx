"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useContextElement } from "@/context/Context";
import { formatPrice } from "@/utlis/PriceFormat";
import { toast } from "react-toastify";

export default function CartModal() {
  const {
    cartProducts,
    setCartProducts,
    totalPrice,
  } = useContextElement();

  const removeItem = (id) => {
    setCartProducts((prev) => prev.filter((elm) => elm.id !== id));
  };

  const handleEmptyCart = (e) =>{
 if (!cartProducts || cartProducts.length === 0) {
      e.preventDefault();

      toast.error("Your cart is empty");
    }
  };

  const handleClearCart = (e) =>{
    e.preventDefault();
    setCartProducts([]);
  };

  return (
    <div className="modal fullRight fade modal-shopping-cart" id="shoppingCart">
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="d-flex flex-column flex-grow-1 h-100">
            <div className="header">
              <h5 className="title">Shopping Cart</h5>
              <span
                className="icon-close icon-close-popup"
                data-bs-dismiss="modal"
              />
            </div>

            <div className="wrap">
              <div className="tf-mini-cart-wrap">
                <div className="tf-mini-cart-main">
                  <div className="tf-mini-cart-sroll">

                    {cartProducts.length ? (
                      <>
                      <div className="cart-custom-space">
                        <div className="tf-mini-cart-items">

                        {cartProducts.map((product) => {

                  const variant = product.selectedVariant || null;

                   const options = variant?.options || [];

                          return (
                              <div
                                key={`${product.id}-${product.product_variant_combination_id || product.selectedVariant?.id || "simple"}`}
                                className="tf-mini-cart-item file-delete"
                              >
                              <div className="tf-mini-cart-image">
                                <Image
                                  className="lazyload"
                                  alt=""
                                  src={variant?.image_url||product.image || "/images/default.png"}
                                  width={600}
                                  height={800}
                                />
                              </div>

                              <div className="tf-mini-cart-info flex-grow-1">

                                <div className="mb_12 d-flex align-items-center justify-content-between flex-wrap gap-12">
                                  <div className="text-title">
                                    <Link
                                      href={`/product-detail/${product.slug}`}
                                      className="link text-line-clamp-1"
                                    >
                                      {product.title || product.name}
                                    </Link>
                                  </div>

                                  <div
                                    className="text-button tf-btn-remove remove"
                                    onClick={() => removeItem(product.id)}
                                  >
                                    Remove
                                  </div>
                                </div>

                                <div className="d-flex align-items-center justify-content-between flex-wrap gap-12">

                                  {variant?.options?.length > 0 ? (
  <div className="text-secondary-2">
    {variant.options.map((opt, i) => (
      <span key={i}>
        {opt.group_name}: {opt.name}
        {i < variant.options.length - 1 ? " / " : ""}
      </span>
    ))}
  </div>
) : (
  <div className="text-secondary-2">Default</div>
)}

                                  <div className="text-button">
                                  {product.quantity || 1} X {formatPrice(Number(variant?.final_price || product.price || 0))}</div>

                                </div>
                                
                              </div>
                             
                            </div>
                          );
                        })}

                      </div>
                      <div className="d-flex justify-content-end custom-clear-cart mr-2">
                        <p onClick={handleClearCart} className="text-danger">Clear Cart</p>
                      </div>
                      </div>
                      </>
                    ) : (
                      <div className="p-4">
                        Your Cart is empty. Start adding favorite products to cart!{" "}
                        <Link className="btn-line" href="/shop">
                          Explore Products
                        </Link>
                      </div>
                    )}

                  </div>
                </div>

                <div className="tf-mini-cart-bottom">
                  <div className="tf-mini-cart-bottom-wrap">

                    <div className="tf-cart-totals-discounts">
                      <h5>Subtotal</h5>
                      <h5 className="tf-totals-total-value">
                        {formatPrice(totalPrice || 0)}
                      </h5>
                    </div>

                    <div className="tf-mini-cart-view-checkout">
                      <Link
                      onClick={handleEmptyCart}
                        href={`/shopping-cart`}
                        className="tf-btn w-100 btn-white radius-4 has-border"
                      >
                        <span className="text">View cart</span>
                      </Link>

                      <Link
                      onClick={handleEmptyCart}
                        href={`/checkout`}
                        className="tf-btn w-100 btn-fill radius-4"
                      >
                        <span className="text">Check Out</span>
                      </Link>
                    </div>

                    <div className="text-center">
                      <Link
                        className="link text-btn-uppercase"
                        href={`/shop`}
                      >
                        Or continue shopping
                      </Link>
                    </div>

                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}