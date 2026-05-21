"use client";
import React, { useState } from "react";
import Grid5 from "../productDetails/grids/Grid5";
import { useContextElement } from "@/context/Context";
import QuantitySelect from "../productDetails/QuantitySelect";

export default function QuickView() {
  const [activeColor, setActiveColor] = useState("gray");
  const [quantity, setQuantity] = useState(1);

  const {
    quickViewItem,
    addProductToCart,
    isAddedToCartProducts,
    cartProducts,
    updateQuantity,
  } = useContextElement();
  
  return (
    <div className="modal fullRight fade modal-quick-view" id="quickView">
      <div className="modal-dialog">
        <div className="modal-content">

          {/* SHOW ONLY WHEN DATA EXISTS */}
          {quickViewItem ? (
            <>
              {/* PRODUCT IMAGES */}
              <Grid5
                firstItem={quickViewItem.image}
                activeColor={activeColor}
                setActiveColor={setActiveColor}
              />

              <div className="wrap mw-100p-hidden">
                <div className="header">
                  <h5 className="title">Quick View</h5>

                  <span
                    className="icon-close icon-close-popup"
                    data-bs-dismiss="modal"
                  />
                </div>

                <div className="tf-product-info-list">

                  {/* PRODUCT INFO */}
                  <div className="tf-product-info-heading">

                    <div className="tf-product-info-name">
                      <div className="text text-btn-uppercase">
                        {typeof quickViewItem.category === "object"
                          ? quickViewItem.category?.name
                          : quickViewItem.category || ""}
                      </div>

                      <h3 className="name">{quickViewItem.title}</h3>

                     
                    </div>

                    {/* PRICE */}
                    <div className="tf-product-info-desc">

                      <div className="tf-product-info-price">
                        <h5 className="price-on-sale font-2">
                          PKR {quickViewItem.price?.toFixed(2)}
                        </h5>

                        {quickViewItem.oldPrice && (
                          <>
                            <div className="compare-at-price font-2">
                              PKR {quickViewItem.oldPrice.toFixed(2)}
                            </div>
                            <div className="badges-on-sale text-btn-uppercase">
                              -25%
                            </div>
                          </>
                        )}
                      </div>

                      <p>
                        {quickViewItem?.description || "no description"}
                      </p>

                      <div className="tf-product-info-liveview">
                        <i className="icon icon-eye" />
                        <p className="text-caption-1">
                          <span className="liveview-count">28</span> people are
                          viewing this right now
                        </p>
                      </div>

                    </div>
                  </div>

                  {/* QUANTITY */}
                  <div className="tf-product-info-choose-option">

                    <div className="tf-product-info-quantity">
                      <div className="title mb_12">Quantity:</div>

                      <QuantitySelect
                        quantity={
                          isAddedToCartProducts(quickViewItem.id)
                            ? cartProducts.filter(
                                (elm) => elm.id === quickViewItem.id
                              )[0].quantity
                            : quantity
                        }
                        setQuantity={(qty) => {
                          if (isAddedToCartProducts(quickViewItem.id)) {
                            updateQuantity(quickViewItem.id, qty);
                          } else {
                            setQuantity(qty);
                          }
                        }}
                      />
                    </div>

                    {/* ACTION BUTTON */}
                    <div className="tf-product-info-by-btn mb_10">

                      <a
                        className="btn-style-2 flex-grow-1 text-btn-uppercase fw-6 show-shopping-cart"
                        onClick={() =>
                          addProductToCart(quickViewItem, quantity)
                        }
                      >
                        <span>
                          {isAddedToCartProducts(quickViewItem.id)
                            ? "Already Added"
                            : "Add to cart -"}
                        </span>

                        <span className="tf-qty-price total-price">
                          PKR{" "}
                          {isAddedToCartProducts(quickViewItem.id)
                            ? (
                                quickViewItem.price *
                                cartProducts.filter(
                                  (elm) => elm.id === quickViewItem.id
                                )[0].quantity
                              ).toFixed(2)
                            : (quickViewItem.price * quantity).toFixed(2)}
                        </span>
                      </a>

                    </div>

                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="p-4">Loading...</div>
          )}

        </div>
      </div>
    </div>
  );
}