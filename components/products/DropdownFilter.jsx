"use client";

import { categories } from "@/data/productFilterOptions";

const priceRanges = [
  { label: "Under Rs 50,000", min: 0, max: 50000 },
  { label: "Rs 50,000 - Rs 150,000", min: 50000, max: 150000 },
  { label: "Rs 150,000 - Rs 300,000", min: 150000, max: 300000 },
  { label: "Above Rs 300,000", min: 300000, max: null },
];

const isSamePriceRange = (activeRange, range) =>
  activeRange?.min === range.min && activeRange?.max === range.max;

const getSelectedVariantIds = (allProps, groupName) =>
  allProps?.selectedVariantFilters?.[groupName] || [];

export default function DropdownFilter({ allProps, setIsDDActive }) {
  const resetFilters = allProps?.clearShopFilters || allProps?.clearFilter;

  return (
    <div className="canvas-wrapper">
      <div className="canvas-header d-flex d-xl-none">
        <h5>Filters</h5>
        <span
          className="icon-close close-filter"
          onClick={() => setIsDDActive(false)}
        />
      </div>

      <div className="canvas-body">
        <div className="widget-facet facet-categories">
          <h6 className="facet-title">Product Categories</h6>
          <ul className="facet-content">
            {categories.map((category, index) => (
              <li key={index}>
                <a href="#" className="categories-item">
                  {category.name}{" "}
                  <span className="count-cate">({category.count})</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="widget-facet facet-price">
          <h6 className="facet-title">Price</h6>

          <div className="box-fieldset-item">
            {priceRanges.map((range) => {
              const active = isSamePriceRange(allProps?.priceFilter, range);

              return (
                <fieldset
                  key={range.label}
                  className="fieldset-item"
                  onClick={() => allProps?.setPriceFilter?.(range.min, range.max)}
                >
                  <input
                    type="checkbox"
                    className="tf-check"
                    readOnly
                    checked={!!active}
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
              onClick={() => allProps?.setStockFilter?.("in_stock")}
            >
              <input
                type="checkbox"
                className="tf-check"
                readOnly
                checked={allProps?.stockFilter === "in_stock"}
              />
              <label>In Stock</label>
            </fieldset>

            <fieldset
              className="fieldset-item"
              onClick={() => allProps?.setStockFilter?.("out_of_stock")}
            >
              <input
                type="checkbox"
                className="tf-check"
                readOnly
                checked={allProps?.stockFilter === "out_of_stock"}
              />
              <label>Out of Stock</label>
            </fieldset>
          </div>
        </div>

        {allProps?.variantFilters?.map((group) => (
          <div className="widget-facet facet-fieldset" key={group.group_name}>
            <h6 className="facet-title">{group.group_name}</h6>

            <div className="box-fieldset-item">
              {group.options.map((option) => {
                const active = getSelectedVariantIds(
                  allProps,
                  group.group_name
                ).includes(option.id);

                return (
                  <fieldset
                    key={option.id}
                    className="fieldset-item"
                    onClick={() =>
                      allProps?.setVariantFilter?.(group.group_name, option.id)
                    }
                  >
                    <input
                      type="checkbox"
                      className="tf-check"
                      readOnly
                      checked={!!active}
                    />

                    <label className="d-flex align-items-center gap-2">
                      {group.group_name.toLowerCase() === "color" && (
                        <span
                          style={{
                            width: "16px",
                            height: "16px",
                            borderRadius: "50%",
                            backgroundColor: option.hex_code || "#ddd",
                            border: "1px solid #ccc",
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

      <div className="canvas-bottom d-block d-xl-none">
        <button
          id="reset-filter"
          onClick={resetFilters}
          className="tf-btn btn-reset"
          type="button"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}
