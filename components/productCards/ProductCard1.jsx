"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CountdownTimer from "../common/Countdown";
import { useContextElement } from "@/context/Context";
import { useAddWishlist, useRemoveWishlist, useWishlist } from "@/app/hooks/useWishList";
import { formatPrice } from "@/utlis/PriceFormat";


export default function ProductCard1({
  product,
   isInWishlist = false,
  gridClass = "",
  parentClass = "card-product wow fadeInUp",
  isNotImageRatio = false,
  radiusClass = "",
}) {
  const [currentImage, setCurrentImage] = useState(product.imgSrc);
  // console.log(product)
const [mounted, setMounted] = useState(false);
useEffect(() => {
  setMounted(true);
}, []);
  const {
    setQuickAddItem,
    addToCompareItem,
    isAddedtoCompareItem,
    setQuickViewItem,
    addProductToCart,
    isAddedToCartProducts,
  } = useContextElement();

  useEffect(() => {
    setCurrentImage(product.imgSrc);
  }, [product]);

  const add = useAddWishlist();
  const remove = useRemoveWishlist();
  const isLoading = add.isPending || remove.isPending;

  const getColorValue = (color) => {
    return (
      color?.hex_code ||
      color?.hex ||
      color?.color ||
      color?.value ||
      color?.bgColor ||
      color?.colorCode ||
      "#ffffff"
    );
  };

  const getColorVariantId = (color) => {
    return color?.variant_id || color?.variantId || color?.id || null;
  };

  const uniqueColors = React.useMemo(() => {
    const map = new Map();

    product.colors?.forEach((color, index) => {
      const colorValue = getColorValue(color);
      const key =
        getColorVariantId(color) ||
        color?.colorName ||
        color?.name ||
        colorValue ||
        index;

      if (!map.has(key)) {
        map.set(key, color);
      }
    });

    return Array.from(map.values());
  }, [product.colors]);


  return (
<div
  className={`${parentClass} equal-product-card ${gridClass} ${
    product.isOnSale ? "on-sale" : ""
  } ${product.sizes ? "card-product-size" : ""}`}
  suppressHydrationWarning
>
      <div
        className={`card-product-wrapper ${
          isNotImageRatio ? "aspect-ratio-0" : ""
        } ${radiusClass} `}
      >
        <Link href={`/product-detail/${product.slug}`} className="product-img custom-product-img bg-surface">
          <Image
            className="lazyload img-product"
            src={currentImage || product.imgHover ||  "/images/default.png"}
            alt={product.title}
            width={600}
            height={800}
          />

          <Image
            className="lazyload img-hover"
           src={product.imgHover || product.imgSrc || "/images/default.png"}
            alt={product.title}
            width={600}
            height={800}
          />
        </Link>
        {product.hotSale && (
          <div className="marquee-product bg-main">
            <div className="marquee-wrapper">
              <div className="initial-child-container">
                <div className="marquee-child-item">
                  <p className="font-2 text-btn-uppercase fw-6 text-white">
                    Hot Sale 25% OFF
                  </p>
                </div>
                <div className="marquee-child-item">
                  <span className="icon icon-lightning text-critical" />
                </div>
                <div className="marquee-child-item">
                  <p className="font-2 text-btn-uppercase fw-6 text-white">
                    Hot Sale 25% OFF
                  </p>
                </div>
                <div className="marquee-child-item">
                  <span className="icon icon-lightning text-critical" />
                </div>
                <div className="marquee-child-item">
                  <p className="font-2 text-btn-uppercase fw-6 text-white">
                    Hot Sale 25% OFF
                  </p>
                </div>
                <div className="marquee-child-item">
                  <span className="icon icon-lightning text-critical" />
                </div>
                <div className="marquee-child-item">
                  <p className="font-2 text-btn-uppercase fw-6 text-white">
                    Hot Sale 25% OFF
                  </p>
                </div>
                <div className="marquee-child-item">
                  <span className="icon icon-lightning text-critical" />
                </div>
                <div className="marquee-child-item">
                  <p className="font-2 text-btn-uppercase fw-6 text-white">
                    Hot Sale 25% OFF
                  </p>
                </div>
                <div className="marquee-child-item">
                  <span className="icon icon-lightning text-critical" />
                </div>
              </div>
            </div>
            <div className="marquee-wrapper">
              <div className="initial-child-container">
                <div className="marquee-child-item">
                  <p className="font-2 text-btn-uppercase fw-6 text-white">
                    Hot Sale 25% OFF
                  </p>
                </div>
                <div className="marquee-child-item">
                  <span className="icon icon-lightning text-critical" />
                </div>
                <div className="marquee-child-item">
                  <p className="font-2 text-btn-uppercase fw-6 text-white">
                    Hot Sale 25% OFF
                  </p>
                </div>
                <div className="marquee-child-item">
                  <span className="icon icon-lightning text-critical" />
                </div>
                <div className="marquee-child-item">
                  <p className="font-2 text-btn-uppercase fw-6 text-white">
                    Hot Sale 25% OFF
                  </p>
                </div>
                <div className="marquee-child-item">
                  <span className="icon icon-lightning text-critical" />
                </div>
                <div className="marquee-child-item">
                  <p className="font-2 text-btn-uppercase fw-6 text-white">
                    Hot Sale 25% OFF
                  </p>
                </div>
                <div className="marquee-child-item">
                  <span className="icon icon-lightning text-critical" />
                </div>
                <div className="marquee-child-item">
                  <p className="font-2 text-btn-uppercase fw-6 text-white">
                    Hot Sale 25% OFF
                  </p>
                </div>
                <div className="marquee-child-item">
                  <span className="icon icon-lightning text-critical" />
                </div>
              </div>
            </div>
          </div>
        )}
        {product.isOnSale && (
          <div className="on-sale-wrap">
            <span className="on-sale-item">-{product.salePercentage}</span>
          </div>
        )}
        {product.sizes && (
          <div className="variant-wrap size-list">
            <ul className="variant-box">
              {product.sizes.map((size) => (
                <li key={size} className="size-item">
                  {size}
                </li>
              ))}
            </ul>
          </div>
        )}
        {product.countdown && (
          <div className="variant-wrap countdown-wrap">
            <div className="variant-box">
              <div
                className="js-countdown"
                data-timer={product.countdown}
                data-labels="D :,H :,M :,S"
              >
                <CountdownTimer />
              </div>
            </div>
          </div>
        )}
        {product.oldPrice ? (
          <div className="on-sale-wrap">
            <span className="on-sale-item">-25%</span>
          </div>
        ) : (
          ""
        )}
        <div className="list-product-btn">
        <a
  onClick={() => {
    if (isLoading) return;

    if (isInWishlist) {
      remove.mutate(product.id);
    } else {
      add.mutate(product.id);
    }
  }}
  className={`box-icon wishlist btn-icon-action ${
    isLoading ? "disabled" : ""
  }`}
>
  <span className="icon icon-heart" />

  <span className="tooltip">
    {isLoading
      ? "..."
      : isInWishlist
      ? "Already in wishlist"
      : "Add to wishlist"}
  </span>
</a>
  {/* <a
            href="#compare"
            data-bs-toggle="offcanvas"
            aria-controls="compare"
            onClick={() => addToCompareItem(product.id)}
            className="box-icon compare btn-icon-action"
          >
            <span className="icon icon-gitDiff" />
            <span className="tooltip">
              {isAddedtoCompareItem(product.id)
                ? "Already compared"
                : "Compare"}
            </span>
          </a> */}
          <a
            href="#quickView"
            onClick={() => setQuickViewItem(product)}
            data-bs-toggle="modal"
            className="box-icon quickview tf-btn-loading"
          >
            <span className="icon icon-eye" />
            <span className="tooltip">Quick View</span>
          </a>
        </div>
        <div className="list-btn-main">
          {product.variant_combinations?.length > 0 ? (
            <a
              href="#quickView"
              className="btn-main-product"
              data-bs-toggle="modal"
              onClick={() => setQuickViewItem(product)}
            >
              SELECT OPTIONS
            </a>
          ) : product.addToCart == "Quick Add" ? (
            <a
              className="btn-main-product"
              href="#quickAdd"
              onClick={() => setQuickAddItem(product.id)}
              data-bs-toggle="modal"
            >
              Quick Add
            </a>
          ) : (
            <a
              className="btn-main-product"
              onClick={() => addProductToCart(product)}
            >
              {isAddedToCartProducts(product.id)
                ? "Already Added"
                : "ADD TO CART"}
            </a>
          )}
        </div>
        
      </div>
      <div className="card-product-info">
        <Link href={`/product-detail/${product.slug}`} className="title link">
          {product.title}
        </Link>
        <span className="price">
          {product.oldPrice && (
            <span className="old-price">{product.oldPrice.toFixed(2)}</span>
          )}{" "}
          {formatPrice(product.price?.toFixed(2))}
        </span>
{uniqueColors.length > 0 && (
  <ul className="list-color-product">
    {uniqueColors.map((color, index) => {
      const colorValue = getColorValue(color);
      const variantId = getColorVariantId(color);

      return (
          <li
            key={`${product.id}-${variantId || color.colorName || color.name || colorValue || index}`}
            className={`list-color-item color-swatch ${
              currentImage === color.imgSrc ? "active" : ""
            }`}
            style={{
              width: "24px",
              height: "24px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          title={color.colorName || color.name || ""}
          onMouseEnter={() => {
            if (color.imgSrc) {
              setCurrentImage(color.imgSrc);
            }
          }}
        >
      <Link
        href={`/product-detail/${product.slug}${variantId ? `?variant=${variantId}` : ""}`}
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "inline-flex",
          width: "24px",
          height: "24px",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
        }}
      >
        <span
          className="swatch-value"
          style={{
            display: "block",
            width: "22px",
            height: "22px",
            minWidth: "22px",
            minHeight: "22px",
            borderRadius: "50%",
            backgroundColor: colorValue,
            border:
              colorValue?.toLowerCase() === "#ffffff" ||
              colorValue?.toLowerCase() === "white"
                ? "1px solid #d1d5db"
                : "1px solid rgba(0,0,0,0.25)",
          }}
        />
      </Link>
        </li>
      );
    })}
  </ul>
)}
      </div>
    </div>
  );
}
