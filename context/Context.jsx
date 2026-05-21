"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { openCartModal } from "@/utlis/openCartModal";
import { openWistlistModal } from "@/utlis/openWishlist";

const dataContext = createContext();

export const useContextElement = () => useContext(dataContext);

const getCartItemKey = (item) => {
  return `${item.id}-${item.product_variant_combination_id || item.selectedVariant?.id || "simple"}`;
};

const normalizePrice = (value) => Number(value || 0);

export default function Context({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [compareItem, setCompareItem] = useState([]);

  const [quickViewItem, setQuickViewItemState] = useState(null);
  const [quickAddItem, setQuickAddItem] = useState(1);

  const [totalPrice, setTotalPrice] = useState(0);

  // ======================
  // LOAD FROM LOCALSTORAGE
  // ======================
  useEffect(() => {
    try {
      const cart = JSON.parse(localStorage.getItem("cartList")) || [];
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      const compare = JSON.parse(localStorage.getItem("compare")) || [];

      setCartProducts(cart);
      setWishList(wishlist);
      setCompareItem(compare);
    } catch (err) {
      console.log("LocalStorage parse error:", err);
    }
  }, []);

  // ======================
  // SAVE CART
  // ======================
  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartProducts));
  }, [cartProducts]);

  // ======================
  // SAVE WISHLIST
  // ======================
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishList));
  }, [wishList]);

  // ======================
  // SAVE COMPARE
  // ======================
  useEffect(() => {
    localStorage.setItem("compare", JSON.stringify(compareItem));
  }, [compareItem]);

  // ======================
  // TOTAL PRICE CALC
  // ======================
  useEffect(() => {
    const subtotal = cartProducts.reduce((acc, item) => {
      const itemPrice = normalizePrice(
        item.selectedVariant?.final_price || item.selectedVariant?.price || item.price
      );

      return acc + (item.quantity || 0) * itemPrice;
    }, 0);

    setTotalPrice(subtotal);
  }, [cartProducts]);

  // ======================
  // CHECK CART
  // ======================
  const isAddedToCartProducts = (id, variantCombinationId = null) => {
    if (variantCombinationId) {
      return cartProducts.some(
        (item) =>
          item.id === id &&
          String(item.product_variant_combination_id || item.selectedVariant?.id) ===
            String(variantCombinationId)
      );
    }

    return cartProducts.some((item) => item.id === id);
  };

  // ======================
  // ADD TO CART
  // ======================
  const addProductToCart = (
    product,
    qty = 1,
    isModal = true,
    selectedVariants = null
  ) => {
    if (!product) return;

    const normalizedImage =
      product.imgSrc ||
      product.image_url ||
      product.image ||
      "/images/default.png";

    const selectedIds = Object.values(selectedVariants || {})
      .filter(Boolean)
      .map((variant) => String(variant.id));

    // Find matching Shopify-style variant combination.
    let matchedCombination =
      product.selectedCombination ||
      product.selectedVariant ||
      null;

    if (!matchedCombination && selectedIds.length && product.variant_combinations?.length) {
      matchedCombination = product.variant_combinations.find((combo) => {
        const comboOptionIds = (
          combo.variant_ids ||
          combo.options?.map((option) => option.id) ||
          []
        ).map((id) => String(id));

        return (
          comboOptionIds.length === selectedIds.length &&
          selectedIds.every((id) => comboOptionIds.includes(id))
        );
      });
    }

    if (product.variant_combinations?.length && !matchedCombination) {
      alert("Please select product options first.");
      return;
    }

    const finalPrice = normalizePrice(
      matchedCombination?.final_price ||
        matchedCombination?.sale_price ||
        matchedCombination?.price ||
        product.price
    );

    const variantCombinationId =
      matchedCombination?.id ||
      product.product_variant_combination_id ||
      product.selectedCombination?.id ||
      null;

    const newItemKey = `${product.id}-${variantCombinationId || "simple"}`;

    setCartProducts((prev) => {
      const existingIndex = prev.findIndex((item) => getCartItemKey(item) === newItemKey);
      const updated = [...prev];

      if (existingIndex > -1) {
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: (updated[existingIndex].quantity || 0) + qty,
          price: finalPrice,
          selectedVariant: matchedCombination
            ? {
                id: matchedCombination.id,
                image_url: matchedCombination.image_url,
                final_price: finalPrice,
                price: finalPrice,
                options: matchedCombination.options || [],
              }
            : updated[existingIndex].selectedVariant,
        };
      } else {
        updated.push({
          id: product.id,
          slug: product.slug,
          title: product.name || product.title,
          description: product.description,

          image: matchedCombination?.image_url || normalizedImage,

          price: finalPrice,
          quantity: qty,

          product_variant_combination_id: variantCombinationId,

          selectedVariant: matchedCombination
            ? {
                id: matchedCombination.id,
                image_url: matchedCombination.image_url,
                final_price: finalPrice,
                price: finalPrice,
                options: matchedCombination.options || [],
              }
            : selectedIds.length
              ? {
                  options: Object.entries(selectedVariants || {})
                    .filter(([, value]) => Boolean(value))
                    .map(([group, value]) => ({
                      group_name: group,
                      id: value.id,
                      name: value.name,
                    })),
                }
              : null,
        });
      }

      return updated;
    });

    if (isModal) openCartModal();
  };

  // ======================
  // UPDATE QTY
  // ======================
  const updateQuantity = (cartKeyOrId, qty) => {
    setCartProducts((prev) =>
      prev.map((item) => {
        const matchesCartKey = getCartItemKey(item) === cartKeyOrId;
        const matchesLegacyId = item.id === cartKeyOrId;

        return matchesCartKey || matchesLegacyId
          ? { ...item, quantity: qty }
          : item;
      })
    );
  };

  // ======================
  // REMOVE CART ITEM
  // ======================
  const removeCartItem = (cartKeyOrId) => {
    setCartProducts((prev) =>
      prev.filter((item) => {
        const matchesCartKey = getCartItemKey(item) === cartKeyOrId;
        const matchesLegacyId = item.id === cartKeyOrId;

        return !(matchesCartKey || matchesLegacyId);
      })
    );
  };

  // ======================
  // WISHLIST
  // ======================
  const addToWishlist = (id) => {
    setWishList((prev) => {
      if (!prev.includes(id)) {
        // openWistlistModal();
        return [...prev, id];
      }
      return prev;
    });
  };

  const removeFromWishlist = (id) => {
    setWishList((prev) => prev.filter((item) => item !== id));
  };

  const isAddedtoWishlist = (id) => wishList.includes(id);

  // ======================
  // COMPARE
  // ======================
  const addToCompareItem = (id) => {
    setCompareItem((prev) =>
      prev.includes(id) ? prev : [...prev, id]
    );
  };

  const removeFromCompareItem = (id) => {
    setCompareItem((prev) => prev.filter((item) => item !== id));
  };

  const isAddedtoCompareItem = (id) => compareItem.includes(id);

  // ======================
  // CONTEXT VALUE
  // ======================
  const contextElement = {
    cartProducts,
    setCartProducts,
    totalPrice,
    addProductToCart,
    isAddedToCartProducts,
    updateQuantity,
    removeCartItem,
    getCartItemKey,

    wishList,
    addToWishlist,
    removeFromWishlist,
    isAddedtoWishlist,

    compareItem,
    addToCompareItem,
    removeFromCompareItem,
    isAddedtoCompareItem,

    quickViewItem,
    setQuickViewItem: (product) => {
      if (!product) return;

      setQuickViewItemState({
        ...product,

        id: product.id,
        slug: product.slug,

        title: product.title || product.name || "",

        description:
          product.description ||
          product.desc ||
          "No description available",

        category: product.category,

        image:
          product.image ||
          product.imgSrc ||
          product.image_url ||
          "/images/default.png",

        imgSrc:
          product.imgSrc ||
          product.image_url ||
          product.image ||
          "/images/default.png",

        imgHover:
          product.imgHover ||
          product.imgSrc ||
          product.image_url ||
          product.image ||
          "/images/default.png",

        price: Number(product.price || 0),

        oldPrice: product.oldPrice ? Number(product.oldPrice) : null,

        colors: product.colors || [],
        variant_groups: product.variant_groups || [],
        variant_combinations: product.variant_combinations || [],
      });
    },

    quickAddItem,
    setQuickAddItem,
  };

  return (
    <dataContext.Provider value={contextElement}>
      {children}
    </dataContext.Provider>
  );
}
