"use client";

import React, { useEffect, useState } from "react";
import Slider1 from "../sliders/Slider1";
import ColorSelect from "../ColorSelect";
import QuantitySelect from "../QuantitySelect";
import { useContextElement } from "@/context/Context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/utlis/PriceFormat";

export default function Details1({ product, selectedVariantId = null }) {
  const router = useRouter();

  const [activeColor, setActiveColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const {
    addProductToCart,
    addToWishlist,
    isAddedtoWishlist,
    cartProducts,
    updateQuantity,
  } = useContextElement();

  const variants =
    product?.variant_groups?.flatMap((group) =>
      (group.options || []).map((option) => ({
        group_name: group.group_name,
        ...option,
      }))
    ) || [];

  const colorVariants = variants.filter(
    (variant) => variant.group_name?.toLowerCase() === "color"
  );

  const colorOptions = colorVariants.map((variant) => ({
    id: variant.id,
    name: variant.name,
    value: variant.name,
    color: variant.hex_code || "#999",
    hex_code: variant.hex_code,
  }));

  const otherVariants = variants.reduce((acc, variant) => {
    const group = variant.group_name?.trim();

    if (!group) return acc;
    if (group.toLowerCase() === "color") return acc;

    if (!acc[group]) acc[group] = [];
    acc[group].push(variant);

    return acc;
  }, {});

  const colorImageMap = React.useMemo(() => {
    const map = {};

    product?.variant_combinations?.forEach((combo) => {
      const colorOption = combo.options?.find(
        (option) => option.group_name?.toLowerCase() === "color"
      );

      if (colorOption?.id && combo.image_url) {
        if (!map[colorOption.id]) map[colorOption.id] = [];

        if (!map[colorOption.id].includes(combo.image_url)) {
          map[colorOption.id].push(combo.image_url);
        }
      }
    });

    return map;
  }, [product?.variant_combinations]);

  useEffect(() => {
    if (!selectedVariantId || !product?.variant_combinations?.length) return;

    const selectedCombo = product.variant_combinations.find((combo) => {
      const selectedId = String(selectedVariantId);

      const comboIdMatch = String(combo.id) === selectedId;

      const optionMatch = combo.options?.some(
        (option) => String(option.id) === selectedId
      );

      const variantIdMatch = combo.variant_ids
        ?.map((id) => String(id))
        .includes(selectedId);

      return comboIdMatch || optionMatch || variantIdMatch;
    });

    if (!selectedCombo) return;

    const selected = {};

    selectedCombo.options?.forEach((option) => {
      const isColor = option.group_name?.toLowerCase() === "color";
      const groupKey = isColor ? "color" : option.group_name;

      selected[groupKey] = {
        id: option.id,
        name: option.name,
        hex_code: option.hex_code,
        group_name: option.group_name,
      };

      if (isColor) {
        setActiveColor({
          id: option.id,
          name: option.name,
          value: option.name,
          color: option.hex_code || "#999",
          hex_code: option.hex_code,
        });
      }
    });

    setSelectedVariants(selected);
  }, [selectedVariantId, product?.variant_combinations]);

  const selectedVariantIds = React.useMemo(() => {
    return Object.values(selectedVariants || {})
      .filter(Boolean)
      .map((variant) => String(variant.id));
  }, [selectedVariants]);

  const selectedCombination = React.useMemo(() => {
    if (!product?.variant_combinations?.length) return null;

    return product.variant_combinations.find((combo) => {
      const comboIds = combo.variant_ids?.map((id) => String(id)) || [];

      return (
        selectedVariantIds.length === comboIds.length &&
        selectedVariantIds.every((id) => comboIds.includes(id))
      );
    });
  }, [product?.variant_combinations, selectedVariantIds]);

  const selectedColorImage = React.useMemo(() => {
    const colorId = selectedVariants?.color?.id;

    if (!colorId || !product?.variant_combinations?.length) return null;

    const combo = product.variant_combinations.find((combination) => {
      const comboIds = (combination.variant_ids || []).map((id) => String(id));

      return comboIds.includes(String(colorId)) && combination.image_url;
    });

    return combo?.image_url || null;
  }, [product?.variant_combinations, selectedVariants?.color?.id]);

  const currentPrice = Number(
    selectedCombination?.final_price ||
      selectedCombination?.sale_price ||
      selectedCombination?.price ||
      product?.price ||
      0
  );

  const currentStock = Number(selectedCombination?.stock ?? product?.stock ?? 0);

  const getAvailableOptionsForGroup = (groupName, values) => {
    /*
      Important:
      Do NOT hide options because stock is 0.
      Product detail should show all configured variant options.
      Stock validation can be handled on Add to Cart, but dropdowns must remain visible.
    */
    const selectedExceptCurrentGroup = Object.entries(selectedVariants || {})
      .filter(([group]) => group.toLowerCase() !== groupName.toLowerCase())
      .map(([, variant]) => String(variant.id));

    return values.filter((variant) => {
      if (!product?.variant_combinations?.length) return true;

      return product.variant_combinations.some((combo) => {
        const comboIds = combo.variant_ids?.map((id) => String(id)) || [];

        return (
          comboIds.includes(String(variant.id)) &&
          selectedExceptCurrentGroup.every((id) => comboIds.includes(id))
        );
      });
    });
  };

  const handleVariantChange = (group, variant) => {
    if (!variant) {
      setSelectedVariants((prev) => {
        const updated = { ...prev };
        delete updated[group];
        return updated;
      });
      return;
    }

    setSelectedVariants((prev) => ({
      ...prev,
      [group]: {
        id: variant.id,
        name: variant.name,
        price: variant.price,
        hex_code: variant.hex_code,
        group_name: variant.group_name || group,
      },
    }));
  };

  const activeImages = React.useMemo(() => {
    const images = [];

    const addImage = (imageUrl) => {
      if (imageUrl && !images.includes(imageUrl)) {
        images.push(imageUrl);
      }
    };

    addImage(product?.image_url);

    product?.gallery?.forEach((image) => {
      addImage(image.image_url);
    });

    product?.variant_combinations?.forEach((combo) => {
      addImage(combo.image_url);
    });

    return images.length ? images : ["/images/default.png"];
  }, [product]);

  const validateVariants = () => {
    if (colorVariants.length > 0 && !selectedVariants.color) {
      alert("Please select color");
      return false;
    }

    const requiredGroups = Object.keys(otherVariants);

    for (const group of requiredGroups) {
      const availableValues = getAvailableOptionsForGroup(group, otherVariants[group]);

      if (availableValues.length > 0 && !selectedVariants[group]) {
        alert(`Please select ${group}`);
        return false;
      }
    }

    if (product?.variant_combinations?.length && !selectedCombination) {
      alert("Selected variant combination is not available.");
      return false;
    }

    return true;
  };

  const selectedProductForCart = {
    ...product,
    price: currentPrice,
    product_variant_combination_id: selectedCombination?.id || null,
    selectedCombination,
  };

  const handleBuyNow = () => {
    if (!validateVariants()) return;

    addProductToCart(selectedProductForCart, quantity, false, selectedVariants);
    router.push("/checkout");
  };

  const handleWishlist = async () => {
    if (wishlistLoading) return;

    setWishlistLoading(true);

    try {
      await addToWishlist(product.id);
    } catch (err) {
      console.error(err);
    } finally {
      setWishlistLoading(false);
    }
  };

  const existingCartItem = cartProducts.find((item) => {
    const itemCombinationId =
      item.product_variant_combination_id || item.selectedVariant?.id || null;

    if (selectedCombination?.id) {
      return (
        Number(item.id) === Number(product.id) &&
        Number(itemCombinationId) === Number(selectedCombination.id)
      );
    }

    return Number(item.id) === Number(product.id) && !itemCombinationId;
  });

  const isCurrentItemAdded = Boolean(existingCartItem);
  const displayQuantity = existingCartItem?.quantity || quantity;

  return (
    <section className="flat-spacing">
      <div className="tf-main-product section-image-zoom">
        <div className="container">
          <div className="row">
            {/* LEFT SIDE IMAGE */}
            <div className="col-md-6">
              <div className="tf-product-media-wrap sticky-top">
                <Slider1
                  setActiveColor={setActiveColor}
                  activeColor={activeColor}
                  images={activeImages}
                  colorImageMap={colorImageMap}
                  selectedImageUrl={
                    selectedCombination?.image_url || selectedColorImage || null
                  }
                />
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="col-md-6">
              <div className="tf-product-info-wrap position-relative mw-100p-hidden">
                <div className="tf-zoom-main" />

                <div className="tf-product-info-list other-image-zoom">
                  {/* HEADER */}
                  <div className="tf-product-info-heading">
                    <div className="tf-product-info-name">
                      <div className="text text-btn-uppercase">
                        {product.categories?.[0]?.name}
                      </div>

                      <h3 className="name">{product.name}</h3>

                      <div className="sub">
                        <div className="tf-product-info-rate">
                          <div className="list-star">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <i
                                key={star}
                                className={`icon icon-star ${
                                  star <= Math.round(product?.average_rating || 0)
                                    ? ""
                                    : "text-secondary"
                                }`}
                              />
                            ))}
                          </div>

                          <div className="text text-caption-1">
                            {`(${product.reviews_count || 0}) reviews`}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* PRICE + DESCRIPTION */}
                    <div className="tf-product-info-desc">
                      <div className="tf-product-info-price">
                        <h5 className="price-on-sale font-2">
                          {formatPrice(currentPrice)}
                        </h5>

                        {product.oldPrice ? (
                          <>
                            <div className="compare-at-price font-2">
                              {formatPrice(Number(product.oldPrice || 0))}
                            </div>

                            <div className="badges-on-sale text-btn-uppercase">
                              -25%
                            </div>
                          </>
                        ) : null}
                      </div>

                      <p>{product.description}</p>

                      <div className="tf-product-info-liveview">
                        <i className="icon icon-eye" />
                        <p className="text-caption-1">
                          <span className="liveview-count">
                            {product.views}
                          </span>{" "}
                          people are viewing this right now
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* OPTIONS */}
                  <div className="tf-product-info-choose-option">
                    {/* COLORS */}
                    {colorOptions.length > 0 ? (
                      <ColorSelect
                        activeColorId={activeColor?.id}
                        setActiveColor={(colorObj) => {
                          setActiveColor(colorObj);

                          setSelectedVariants((prev) => ({
                            ...prev,
                            color: {
                              id: colorObj.id,
                              name: colorObj.name || colorObj.value || "",
                              hex_code: colorObj.color || colorObj.hex_code,
                              group_name: "Color",
                            },
                          }));
                        }}
                        colorOptions={colorOptions}
                      />
                    ) : null}

                    {/* OTHER VARIANTS */}
                    {Object.entries(otherVariants).map(([group, values]) => {
                      const availableValues = getAvailableOptionsForGroup(group, values);

                      if (availableValues.length === 0) return null;

                      return (
                        <div className="tf-product-info-size" key={group}>
                          <div className="title mb_6 text-capitalize">
                            {group}:
                          </div>

                          <select
                            className="form-select"
                            value={selectedVariants[group]?.id || ""}
                            onChange={(e) => {
                              const value = e.target.value;

                              if (!value) {
                                handleVariantChange(group, null);
                                return;
                              }

                              const selected = availableValues.find(
                                (variant) => String(variant.id) === String(value)
                              );

                              if (!selected) return;

                              handleVariantChange(group, selected);
                            }}
                          >
                            <option value="">Select {group}</option>

                            {availableValues.map((variant) => (
                              <option key={variant.id} value={variant.id}>
                                {variant.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      );
                    })}

                    {/* QUANTITY */}
                    <div className="tf-product-info-quantity">
                      <div className="title mb_12">Quantity:</div>

                      <QuantitySelect
                        quantity={displayQuantity}
                        setQuantity={(qty) => {
                          if (existingCartItem) {
                            updateQuantity(
                              existingCartItem.cartKey || existingCartItem.id,
                              qty
                            );
                          } else {
                            setQuantity(qty);
                          }
                        }}
                      />
                    </div>

                    {/* BUTTONS */}
                    <div>
                      <div className="tf-product-info-by-btn mb_10">
                        <button
                          type="button"
                          onClick={() => {
                            if (!validateVariants()) return;

                            addProductToCart(
                              selectedProductForCart,
                              quantity,
                              true,
                              selectedVariants
                            );
                          }}
                          className="btn-style-2 flex-grow-1 text-btn-uppercase fw-6 btn-add-to-cart"
                        >
                          <span>
                            {isCurrentItemAdded ? "Already Added" : "Add to cart -"}
                          </span>

                          <span className="tf-qty-price total-price">
                            PKR {(currentPrice * displayQuantity).toFixed(2)}
                          </span>
                        </button>

                        <a
                          onClick={handleWishlist}
                          className="box-icon hover-tooltip text-caption-2 wishlist btn-icon-action"
                        >
                          <span className="icon icon-heart" />

                          <span className="tooltip text-caption-2">
                            {wishlistLoading
                              ? "..."
                              : isAddedtoWishlist(product.id)
                              ? "Already Wishlisted"
                              : "Wishlist"}
                          </span>
                        </a>
                      </div>

                      <a
                        onClick={handleBuyNow}
                        className="btn-style-3 text-btn-uppercase"
                      >
                        Buy it now
                      </a>
                    </div>

                    {/* INFO SECTION */}
                    <div className="tf-product-info-help">
                      <div className="tf-product-info-extra-link">
                        <a
                          href="#delivery_return"
                          data-bs-toggle="modal"
                          className="tf-product-extra-icon"
                        >
                          <div className="icon">
                            <i className="icon-shipping" />
                          </div>

                          <p className="text-caption-1">
                            Delivery &amp; Return
                          </p>
                        </a>
                      </div>

                      <div className="tf-product-info-return">
                        <div className="icon">
                          <i className="icon-arrowClockwise" />
                        </div>

                        <p className="text-caption-1">
                          Return within <span>45 days</span> of purchase.
                          Duties &amp; taxes are non-refundable.
                        </p>
                      </div>
                    </div>

                    {/* SKU */}
                    <ul className="tf-product-info-sku">
                      <li>
                        <p className="text-caption-1">
                          {selectedCombination?.sku || product.sku}
                        </p>
                      </li>

                      <li>
                        <p className="text-caption-1">Available:</p>
                        <p className="text-caption-1 text-1">{currentStock}</p>
                      </li>

                      <li>
                        <p className="text-caption-1">Categories:</p>
                        <p className="text-caption-1">
                          <Link href="#" className="text-1 link">
                            {product.categories?.[0]?.name}
                          </Link>
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT END */}
          </div>
        </div>
      </div>
    </section>
  );
}
