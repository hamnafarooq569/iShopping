"use client";

import React, { useEffect, useMemo, useState } from "react";
import Grid5 from "../productDetails/grids/Grid5";
import { useContextElement } from "@/context/Context";
import QuantitySelect from "../productDetails/QuantitySelect";

export default function QuickView() {
  const [activeColor, setActiveColor] = useState("gray");
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState({});

  const {
    quickViewItem,
    addProductToCart,
    isAddedToCartProducts,
    cartProducts,
    updateQuantity,
  } = useContextElement();

  useEffect(() => {
    setSelectedVariants({});
    setQuantity(1);
    setActiveColor("gray");
  }, [quickViewItem?.id]);

  const variantOptions = useMemo(() => {
    return (
      quickViewItem?.variant_groups?.flatMap((group) =>
        (group.options || []).map((option) => ({
          ...option,
          group_name: group.group_name,
        }))
      ) || []
    );
  }, [quickViewItem]);

  const colorVariants = useMemo(() => {
    return variantOptions.filter(
      (variant) => variant.group_name?.toLowerCase() === "color"
    );
  }, [variantOptions]);

  const otherVariants = useMemo(() => {
    return variantOptions.reduce((acc, variant) => {
      const group = variant.group_name?.trim();

      if (!group || group.toLowerCase() === "color") return acc;

      if (!acc[group]) acc[group] = [];
      acc[group].push(variant);

      return acc;
    }, {});
  }, [variantOptions]);

  const selectedVariantIds = useMemo(() => {
    return Object.values(selectedVariants || {})
      .filter(Boolean)
      .map((variant) => String(variant.id));
  }, [selectedVariants]);

  const selectedCombination = useMemo(() => {
    if (!quickViewItem?.variant_combinations?.length) return null;

    return quickViewItem.variant_combinations.find((combo) => {
      const comboIds = combo.variant_ids?.map((id) => String(id)) || [];

      return (
        selectedVariantIds.length === comboIds.length &&
        selectedVariantIds.every((id) => comboIds.includes(id))
      );
    });
  }, [quickViewItem, selectedVariantIds]);

  const selectedCombinationId = selectedCombination?.id || null;

  const cartKey = quickViewItem
    ? `${quickViewItem.id}-${selectedCombinationId || "simple"}`
    : null;

  const cartItem = useMemo(() => {
    if (!quickViewItem) return null;

    return cartProducts.find((item) => {
      const itemKey = `${item.id}-${
        item.product_variant_combination_id || item.selectedVariant?.id || "simple"
      }`;

      return itemKey === cartKey;
    });
  }, [cartProducts, quickViewItem, cartKey]);

  const currentPrice = Number(
    selectedCombination?.final_price ||
      selectedCombination?.sale_price ||
      selectedCombination?.price ||
      quickViewItem?.price ||
      0
  );

  const displayImage =
    selectedCombination?.image_url ||
    quickViewItem?.image ||
    quickViewItem?.imgSrc ||
    quickViewItem?.image_url ||
    "/images/default.png";

  const getAvailableOptionsForGroup = (groupName, values) => {
    const selectedExceptCurrentGroup = Object.entries(selectedVariants || {})
      .filter(([group]) => group.toLowerCase() !== groupName.toLowerCase())
      .map(([, variant]) => String(variant.id));

    return values.filter((variant) => {
      return quickViewItem?.variant_combinations?.some((combo) => {
        const comboIds = combo.variant_ids?.map((id) => String(id)) || [];

        return (
          comboIds.includes(String(variant.id)) &&
          selectedExceptCurrentGroup.every((id) => comboIds.includes(id)) &&
          Number(combo.stock || 0) > 0
        );
      });
    });
  };

  const handleColorSelect = (color) => {
    setSelectedVariants((prev) => ({
      ...prev,
      color: {
        id: color.id,
        name: color.name,
        hex_code: color.hex_code,
        group_name: color.group_name,
      },
    }));

    setActiveColor(color.name || color.id);
  };

  const handleAddToCart = () => {
    if (quickViewItem?.variant_combinations?.length && !selectedCombination) {
      alert("Please select available variant options.");
      return;
    }

    addProductToCart(
      {
        ...quickViewItem,
        price: currentPrice,
        product_variant_combination_id: selectedCombinationId,
        selectedCombination,
        image: displayImage,
        imgSrc: displayImage,
      },
      quantity,
      true,
      selectedVariants
    );
  };

  const productAlreadyInCart = quickViewItem
    ? isAddedToCartProducts(quickViewItem.id, selectedCombinationId) || !!cartItem
    : false;

  const shownQuantity = productAlreadyInCart ? cartItem?.quantity || quantity : quantity;

  return (
    <div className="modal fullRight fade modal-quick-view" id="quickView">
      <div className="modal-dialog">
        <div className="modal-content">
          {quickViewItem ? (
            <>
<Grid5
  firstItem={displayImage}
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
                  <div className="tf-product-info-heading">
                    <div className="tf-product-info-name">
                      <div className="text text-btn-uppercase">
                        {typeof quickViewItem.category === "object"
                          ? quickViewItem.category?.name
                          : quickViewItem.category || ""}
                      </div>

                      <h3 className="name">
                        {quickViewItem.title || quickViewItem.name}
                      </h3>
                    </div>

                    <div className="tf-product-info-desc">
                      <div className="tf-product-info-price">
                        <h5 className="price-on-sale font-2">
                          PKR {currentPrice.toFixed(2)}
                        </h5>

                        {quickViewItem.oldPrice && (
                          <>
                            <div className="compare-at-price font-2">
                              PKR {Number(quickViewItem.oldPrice).toFixed(2)}
                            </div>
                            <div className="badges-on-sale text-btn-uppercase">
                              -25%
                            </div>
                          </>
                        )}
                      </div>

                      <p>{quickViewItem?.description || "No description available"}</p>

                      <div className="tf-product-info-liveview">
                        <i className="icon icon-eye" />
                        <p className="text-caption-1">
                          <span className="liveview-count">28</span> people are
                          viewing this right now
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="tf-product-info-choose-option">
                    <div className="quick-view-variants">
                    {colorVariants.length > 0 && (
                      <div className="variant-group">
                        <span className="variant-label">Colors:</span>

                        <div className="d-flex align-items-center gap-3 flex-wrap">
                          {colorVariants.map((color) => {
                            const isActive =
                              String(selectedVariants.color?.id) === String(color.id);

                            return (
                              <button
                                key={color.id}
                                type="button"
                                className="quick-view-color-btn"
                                onClick={() => handleColorSelect(color)}
                                title={color.name}
                                style={{
                                  backgroundColor: color.hex_code || "#ddd",
                                  border: isActive
                                    ? "2px solid #111"
                                    : "1px solid #ddd",
                                  boxShadow: isActive
                                    ? "0 0 0 3px #fff, 0 0 0 4px #111"
                                    : "none",
                                }}
                              />
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {Object.entries(otherVariants).map(([group, values]) => {
                      const availableValues = getAvailableOptionsForGroup(group, values);

                      if (availableValues.length === 0) return null;

                      return (
                        <div className="variant-group" key={group}>
                          <span className="variant-label text-capitalize">{group}:</span>

                          <select
                            className="form-select"
                            value={selectedVariants[group]?.id || ""}
                            onChange={(event) => {
                              const selected = availableValues.find(
                                (variant) =>
                                  String(variant.id) === String(event.target.value)
                              );

                              setSelectedVariants((prev) => ({
                                ...prev,
                                [group]: selected
                                  ? {
                                      id: selected.id,
                                      name: selected.name,
                                      hex_code: selected.hex_code,
                                      group_name: selected.group_name || group,
                                    }
                                  : null,
                              }));
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

                    </div>

                    <div className="tf-product-info-quantity">
                      <div className="title mb_12">Quantity:</div>

                      <QuantitySelect
                        quantity={shownQuantity}
                        setQuantity={(qty) => {
                          if (productAlreadyInCart && cartKey) {
                            updateQuantity(cartKey, qty);
                          } else {
                            setQuantity(qty);
                          }
                        }}
                      />
                    </div>

                    <div className="tf-product-info-by-btn mb_10">
                      <a
                        className="btn-style-2 flex-grow-1 text-btn-uppercase fw-6 show-shopping-cart"
                        onClick={handleAddToCart}
                      >
                        <span>
                          {productAlreadyInCart ? "Already Added" : "Add to cart -"}
                        </span>

                        <span className="tf-qty-price total-price">
                          PKR{" "}
                          {productAlreadyInCart
                            ? (currentPrice * shownQuantity).toFixed(2)
                            : (currentPrice * quantity).toFixed(2)}
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
