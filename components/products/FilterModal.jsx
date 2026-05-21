"use client";

import { useCategories } from "@/app/hooks/useCategories";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const priceRanges = [
  { label: "Under Rs 50,000", min: 0, max: 50000 },
  { label: "Rs 50,000 - Rs 150,000", min: 50000, max: 150000 },
  { label: "Rs 150,000 - Rs 300,000", min: 150000, max: 300000 },
  { label: "Above Rs 300,000", min: 300000, max: null },
];

const getColorValue = (option) => {
  return (
    option?.hex_code ||
    option?.hex ||
    option?.color ||
    option?.value ||
    option?.bgColor ||
    option?.colorCode ||
    "#ddd"
  );
};

export default function FilterModal({ allProps = {} }) {
  const { isLoading, data, error } = useCategories();
  const pathname = usePathname();

  useEffect(() => {
    const el = document.getElementById("filterShop");
    if (!el) return;

    (async () => {
      const { Offcanvas } = await import("bootstrap");

      const instance = Offcanvas.getInstance(el);
      instance?.hide();
    })();

    document.body.classList.remove("offcanvas-open");
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }, [pathname]);

  const isPriceActive = (range) => {
    return (
      allProps.priceFilter?.min === range.min &&
      allProps.priceFilter?.max === range.max
    );
  };

  const handlePriceClick = (range) => {
    if (!allProps.setPriceFilter) return;

    if (isPriceActive(range)) {
      allProps.setPriceFilter(null, null);
      return;
    }

    allProps.setPriceFilter(range.min, range.max);
  };

  const handleReset = () => {
    if (allProps.clearShopFilters) {
      allProps.clearShopFilters();
    }
  };

  return (
    <div className="offcanvas offcanvas-start canvas-filter" id="filterShop">
      <div className="canvas-wrapper">
        <div className="canvas-header">
          <h5>Filters</h5>
          <span className="icon-close icon-close-popup" data-bs-dismiss="offcanvas" />
        </div>

        <div className="canvas-body">
          {isLoading ? (
            <p>loading</p>
          ) : data ? (
            <div className="widget-facet facet-categories">
              <h6 className="facet-title">Product Categories</h6>
              <ul className="facet-content">
                {data.map((category) => (
                  <li key={category.id}>
                    <Link href={`/shop/${category.slug}`} className="categories-item">
                      {category.name}{" "}
                      <span className="count-cate">({category.products_count})</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : error ? (
            <p>error</p>
          ) : null}

          <div className="widget-facet facet-price">
            <h6 className="facet-title">Price</h6>
            <div className="box-fieldset-item">
              {priceRanges.map((range) => {
                const active = isPriceActive(range);

                return (
                  <fieldset
                    key={range.label}
                    className="fieldset-item"
                    onClick={() => handlePriceClick(range)}
                  >
                    <input
                      type="checkbox"
                      className="tf-check"
                      readOnly
                      checked={active}
                    />
                    <label>{range.label}</label>
                  </fieldset>
                );
              })}
            </div>
          </div>

          <div className="widget-facet facet-fieldset">
            <h6 className="facet-title">Availability</h6>
            <div className="box-fieldset-item">
              <fieldset
                className="fieldset-item"
                onClick={() => allProps.setStockFilter?.("in_stock")}
              >
                <input
                  type="checkbox"
                  className="tf-check"
                  readOnly
                  checked={allProps.stockFilter === "in_stock"}
                />
                <label>In Stock</label>
              </fieldset>

              <fieldset
                className="fieldset-item"
                onClick={() => allProps.setStockFilter?.("out_of_stock")}
              >
                <input
                  type="checkbox"
                  className="tf-check"
                  readOnly
                  checked={allProps.stockFilter === "out_of_stock"}
                />
                <label>Out of Stock</label>
              </fieldset>
            </div>
          </div>

          {allProps.variantFilters?.map((group) => (
            <div className="widget-facet facet-fieldset" key={group.group_name}>
              <h6 className="facet-title">{group.group_name}</h6>

              <div className="box-fieldset-item">
                {group.options?.map((option) => {
                  const active = allProps.selectedVariantFilters?.[
                    group.group_name
                  ]?.includes(option.id);
                  const isColor = group.group_name?.toLowerCase() === "color";
                  const colorValue = getColorValue(option);

                  return (
                    <fieldset
                      key={option.id}
                      className="fieldset-item"
                      onClick={() =>
                        allProps.setVariantFilter?.(group.group_name, option.id)
                      }
                    >
                      <input
                        type="checkbox"
                        className="tf-check"
                        readOnly
                        checked={!!active}
                      />

                      <label className="d-flex align-items-center gap-2">
                        {isColor && (
                          <span
                            style={{
                              width: "16px",
                              height: "16px",
                              minWidth: "16px",
                              borderRadius: "50%",
                              backgroundColor: colorValue,
                              border:
                                colorValue?.toLowerCase() === "#ffffff" ||
                                colorValue?.toLowerCase() === "white"
                                  ? "1px solid #aaa"
                                  : "1px solid #ccc",
                              display: "inline-block",
                            }}
                          />
                        )}
                        {option.name}
                      </label>
                    </fieldset>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="canvas-bottom">
          <button type="button" className="tf-btn btn-reset" onClick={handleReset}>
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
}
