"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useReducer, useState } from "react";
import ProductSkeleton from "./ProductSkeleton";
import LayoutHandler from "../products/LayoutHandler";
import Sorting from "../products/Sorting";
import FilterMeta from "../products/FilterMeta";
import Listview from "../products/Listview";
import GridView from "../products/GridView";
import FilterModal from "../products/FilterModal";
import { initialState, reducer } from "@/reducer/filterReducer";
import { useWishlist } from "@/app/hooks/useWishList";
import { useProducts } from "@/app/hooks/useProducts";

export default function ProductsContent({
  parentClass = "flat-spacing",
  products: serverProducts = [],
  meta: serverMeta = {},
  search = "",
}) {
  const [activeLayout, setActiveLayout] = useState(4);
  const [state, dispatch] = useReducer(reducer, initialState);

  // Dynamic shop filters
  const [priceFilter, setPriceFilterState] = useState(null);
  const [stockFilter, setStockFilterState] = useState("all");
  const [selectedVariantFilters, setSelectedVariantFilters] = useState({});

  const { sortingOption } = state;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page") || 1);

  const { data, isLoading: hookLoading } = useProducts(currentPage, search);

  const isServerMode = serverProducts && serverProducts.length > 0;

  const products = isServerMode
    ? serverProducts
    : data?.products || [];

  const meta = isServerMode
    ? serverMeta
    : data?.meta || {};

  const isLoading = isServerMode ? false : hookLoading;

  const setCurrentPage = (page) => {
    const params = new URLSearchParams(searchParams.toString());

    if (Number(params.get("page")) === page) return;

    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  const getProductDisplayPrice = (product) => {
    const combinationPrices =
      product.variant_combinations
        ?.map((combo) =>
          Number(combo.final_price || combo.sale_price || combo.price || 0)
        )
        .filter((price) => price > 0) || [];

    if (combinationPrices.length) {
      return Math.min(...combinationPrices);
    }

    return Number(product.price || 0);
  };

  const variantFilters = useMemo(() => {
    const groups = {};

    products.forEach((product) => {
      product.variant_groups?.forEach((group) => {
        const groupName = group.group_name || "General";

        if (!groups[groupName]) {
          groups[groupName] = new Map();
        }

        group.options?.forEach((option) => {
          groups[groupName].set(option.id, option);
        });
      });
    });

    return Object.entries(groups).map(([groupName, optionsMap]) => ({
      group_name: groupName,
      options: Array.from(optionsMap.values()),
    }));
  }, [products]);

  const setPriceFilter = (min, max) => {
    if (min === null && max === null) {
      setPriceFilterState(null);
      return;
    }

    setPriceFilterState({ min, max });
  };

  const setStockFilter = (value) => {
    setStockFilterState((prev) => (prev === value ? "all" : value));
  };

  const setVariantFilter = (groupName, optionId) => {
    setSelectedVariantFilters((prev) => {
      const current = prev[groupName] || [];

      const updated = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId];

      return {
        ...prev,
        [groupName]: updated,
      };
    });
  };

  const clearShopFilters = () => {
    setPriceFilterState(null);
    setStockFilterState("all");
    setSelectedVariantFilters({});
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const productPrice = getProductDisplayPrice(product);

      if (priceFilter) {
        if (priceFilter.min !== null && productPrice < priceFilter.min) {
          return false;
        }

        if (priceFilter.max !== null && productPrice > priceFilter.max) {
          return false;
        }
      }

      const hasStock =
        Number(product.stock || 0) > 0 ||
        product.variant_combinations?.some((combo) => Number(combo.stock || 0) > 0);

      if (stockFilter === "in_stock" && !hasStock) {
        return false;
      }

      if (stockFilter === "out_of_stock" && hasStock) {
        return false;
      }

      const activeVariantGroups = Object.entries(selectedVariantFilters).filter(
        ([, ids]) => ids.length > 0
      );

      if (activeVariantGroups.length > 0) {
        for (const [, selectedIds] of activeVariantGroups) {
          const matched = product.variant_combinations?.some((combo) => {
            const comboIds = combo.variant_ids?.map((id) => Number(id)) || [];

            return selectedIds.some((selectedId) =>
              comboIds.includes(Number(selectedId))
            );
          });

          if (!matched) return false;
        }
      }

      return true;
    });
  }, [products, priceFilter, stockFilter, selectedVariantFilters]);

  const allProps = useMemo(() => {
    return {
      ...state,
      setSortingOption: (value) =>
        dispatch({ type: "SET_SORTING_OPTION", payload: value }),
      toggleFilterWithOnSale: () =>
        dispatch({ type: "TOGGLE_FILTER_ON_SALE" }),
      setCurrentPage,

      priceFilter,
      stockFilter,
      selectedVariantFilters,
      variantFilters,
      setPriceFilter,
      setStockFilter,
      setVariantFilter,
      clearShopFilters,
    };
  }, [
    state,
    searchParams,
    priceFilter,
    stockFilter,
    selectedVariantFilters,
    variantFilters,
  ]);

  const { data: wishlist = [] } = useWishlist();

const getProductSortPrice = (product) => {
  const combinationPrices =
    product.variant_combinations
      ?.map((combo) =>
        Number(combo.final_price || combo.sale_price || combo.price || 0)
      )
      .filter((price) => price > 0) || [];

  if (combinationPrices.length > 0) {
    return Math.min(...combinationPrices);
  }

  return Number(product.price || 0);
};

const getProductTitle = (product) => {
  return String(product.title || product.name || "").toLowerCase();
};

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];

    const option = String(sortingOption || "").toLowerCase();

    if (
      option.includes("price ascending") ||
      option.includes("price low") ||
      option.includes("low to high") ||
      option.includes("price: low")
    ) {
      return list.sort(
        (a, b) => getProductSortPrice(a) - getProductSortPrice(b)
      );
    }

    if (
      option.includes("price descending") ||
      option.includes("price high") ||
      option.includes("high to low") ||
      option.includes("price: high")
    ) {
      return list.sort(
        (a, b) => getProductSortPrice(b) - getProductSortPrice(a)
      );
    }

    if (
      option.includes("title ascending") ||
      option.includes("alphabetically a-z") ||
      option.includes("a-z")
    ) {
      return list.sort((a, b) =>
        getProductTitle(a).localeCompare(getProductTitle(b), undefined, {
          numeric: true,
          sensitivity: "base",
        })
      );
    }

    if (
      option.includes("title descending") ||
      option.includes("alphabetically z-a") ||
      option.includes("z-a")
    ) {
      return list.sort((a, b) =>
        getProductTitle(b).localeCompare(getProductTitle(a), undefined, {
          numeric: true,
          sensitivity: "base",
        })
      );
    }

    if (
      option.includes("newest") ||
      option.includes("latest") ||
      option.includes("date")
    ) {
      return list.sort(
        (a, b) =>
          new Date(b.created_at || 0).getTime() -
          new Date(a.created_at || 0).getTime()
      );
    }

    return list;
  }, [filteredProducts, sortingOption]);

  if (isLoading) {
    return (
      <section className={parentClass}>
        <div className="container">
          <div className="tf-grid-layout wrapper-shop tf-col-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <section className={parentClass}>
        <div className="container text-center py-5">
          <h5>No products found</h5>
        </div>
      </section>
    );
  }

  return (
    <section className={parentClass}>
      <div className="container">
        {/* TOP CONTROLS */}
        <div className="tf-shop-control">
          <div className="tf-control-filter">
            <a
              href="#filterShop"
              data-bs-toggle="offcanvas"
              className="tf-btn-filter"
            >
              <span className="icon icon-filter" />
              <span className="text">Filters</span>
            </a>
          </div>

          <ul className="tf-control-layout">
            <LayoutHandler
              setActiveLayout={setActiveLayout}
              activeLayout={activeLayout}
            />
          </ul>

          <div className="tf-control-sorting">
            <Sorting allProps={allProps} />
          </div>
        </div>

        <div className="wrapper-control-shop">
          <FilterMeta
            productLength={filteredProducts.length}
            allProps={allProps}
          />

          {filteredProducts.length === 0 ? (
            <div className="text-center py-5">
              <h5>No products match the selected filters</h5>
              <button
                type="button"
                className="tf-btn btn-reset mt-3"
                onClick={clearShopFilters}
              >
                Reset Filters
              </button>
            </div>
          ) : activeLayout === 1 ? (
            <Listview
              products={sortedProducts}
              currentPage={currentPage}
              totalPages={meta.lastPage}
              onPageChange={setCurrentPage}
              wishlist={wishlist}
            />
          ) : (
            <div
              className={`tf-grid-layout wrapper-shop tf-col-${activeLayout}`}
            >
              <GridView
                products={sortedProducts}
                wishlist={wishlist}
                currentPage={currentPage}
                totalPages={meta.lastPage}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>

      <FilterModal allProps={allProps} />
    </section>
  );
}
