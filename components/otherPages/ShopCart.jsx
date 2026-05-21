"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CountdownTimer from "../common/Countdown";
import { useContextElement } from "@/context/Context";
import { formatPrice } from "@/utlis/PriceFormat";
const discounts = [
  {
    discount: "10% OFF",
    details: "For all orders from 200$",
    code: "Mo234231",
  },
  {
    discount: "10% OFF",
    details: "For all orders from 200$",
    code: "Mo234231",
  },
  {
    discount: "10% OFF",
    details: "For all orders from 200$",
    code: "Mo234231",
  },
];
const shippingOptions = [
  {
    id: "free",
    label: "Free Shipping",
    price: 0.0,
  },
  {
    id: "local",
    label: "Local:",
    price: 35.0,
  },
  {
    id: "rate",
    label: "Flat Rate:",
    price: 35.0,
  },
];

export default function ShopCart() {
  const [activeDiscountIndex, setActiveDiscountIndex] = useState(1);
  const [selectedOption, setSelectedOption] = useState(shippingOptions[0]);
  const { cartProducts, setCartProducts, totalPrice } = useContextElement();
  const setQuantity = (id, quantity) => {
    if (quantity >= 1) {
      const item = cartProducts.filter((elm) => elm.id == id)[0];
      const items = [...cartProducts];
      const itemIndex = items.indexOf(item);
      item.quantity = quantity;
      items[itemIndex] = item;
      setCartProducts(items);
    }
  };
  const removeItem = (id) => {
    setCartProducts((pre) => [...pre.filter((elm) => elm.id != id)]);
  };
  const handleOptionChange = (elm) => {
    setSelectedOption(elm);
  };

  useEffect(() => {
  const timeout = setTimeout(() => {
    const el = document.querySelector(".progress-cart .value");
    if (el) el.style.width = "70%";
  }, 100);

  return () => clearTimeout(timeout);
}, []);

  return (
    <>
      <section className="flat-spacing">
        <div className="container">
          <div className="row">
            <div className="col-xl-8">
              {cartProducts.length ? (
                <form onSubmit={(e) => e.preventDefault()}>
                  <table className="tf-table-page-cart">
                    <thead>
                      <tr>
                        <th>Products</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {cartProducts.map((elm) => (
                        <tr key={`${elm.id}-${elm.product_variant_combination_id || elm.selectedVariant?.id || "simple"}`}
                        className="tf-cart-item file-delete">
                          <td className="tf-cart-item_product">
                            <Link
                              href={`/product-detail/${elm.slug}`}
                              className="img-box"
                            >
                            <Image
                              alt="product"
                              src={elm.selectedVariant?.image_url || elm.image}
                              width={600}
                              height={800}
                            />
                            </Link>
                            <div className="cart-info">
                              <Link
                                href={`/product-detail/${elm.slug}`}
                                className="cart-title link"
                              >
                                {elm.title}
                              </Link>
{elm.selectedVariant?.options?.length > 0 && (
  <div className="variant-box d-flex flex-wrap gap-1 mt-1">
    {elm.selectedVariant.options.map((option, index) => (
      <span
        key={`${option.group_name}-${option.name}-${index}`}
        className="variant-tag border px-2 py-1 rounded"
        style={{ fontSize: "11px", lineHeight: "1.2" }}
      >
        {option.group_name}: {option.name}
      </span>
    ))}
  </div>
)}
</div>
                          </td>
                          <td
                            data-cart-title="Price"
                            className="tf-cart-item_price text-center"
                          >
                            <div className="cart-price text-button price-on-sale">
                              {formatPrice(elm.price.toFixed(2))}
                            </div>
                          </td>
                          <td
                            data-cart-title="Quantity"
                            className="tf-cart-item_quantity"
                          >
                            <div className="wg-quantity mx-md-auto">
                              <span
                                className="btn-quantity btn-decrease"
                                onClick={() =>
                                  setQuantity(elm.id, elm.quantity - 1)
                                }
                              >
                                -
                              </span>
                              <input
                                type="text"
                                className="quantity-product"
                                name="number"
                                value={elm.quantity}
                                readOnly
                              />
                              <span
                                className="btn-quantity btn-increase"
                                onClick={() =>
                                  setQuantity(elm.id, elm.quantity + 1)
                                }
                              >
                                +
                              </span>
                            </div>
                          </td>
                          <td
                            data-cart-title="Total"
                            className="tf-cart-item_total text-center"
                          >
                            <div className="cart-total text-button total-price">
                               {formatPrice(elm.price * elm.quantity)}
                            </div>
                          </td>
                          <td
                            data-cart-title="Remove"
                            className="remove-cart"
                            onClick={() => removeItem(elm.id)}
                          >
                            <span className="remove icon icon-close" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                </form>
              ) : (
                <div>
                  Your wishlist is empty. Start adding your favorite products to
                  save them for later!{" "}
                  <Link className="btn-line" href="/shop-default-grid">
                    Explore Products
                  </Link>
                </div>
              )}
            </div>
            <div className="col-xl-4">
              <div className="fl-sidebar-cart">
                <div className="box-order bg-surface">
                  <h5 className="title">Order Summary</h5>
                  <div className="subtotal text-button d-flex justify-content-between align-items-center">
                    <span>Subtotal</span>
                    <span className="total"> {formatPrice(totalPrice.toFixed(2))}</span>
                  </div>
                  <h5 className="total-order d-flex justify-content-between align-items-center">
                    <span>Total</span>
                    <span className="total">
                      
                      {formatPrice(totalPrice
                        ? (selectedOption.price + totalPrice).toFixed(2)
                        : 0)}
                    </span>
                  </h5>
                  <div className="box-progress-checkout">
                    <Link href={`/checkout`} className="tf-btn btn-reset">
                      Process To Checkout
                    </Link>
                    <Link href={'/shop'} className="text-button text-center">
                      Or continue shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
