import React from "react";

export default function FilterMeta({ allProps, productLength }) {
  const hasVariantFilters = Object.values(
    allProps.selectedVariantFilters || {}
  ).some((ids) => ids.length > 0);

  const hasNewFilters =
    !!allProps.priceFilter ||
    allProps.stockFilter !== "all" ||
    hasVariantFilters;

  const hasOldFilters =
    allProps.availability != "All" ||
    allProps.size != "All" ||
    allProps.color != "All" ||
    allProps.brands?.length;

  const clearAllFilters = () => {
    if (allProps.clearShopFilters) {
      allProps.clearShopFilters();
      return;
    }

    if (allProps.clearFilter) {
      allProps.clearFilter();
    }
  };

  const getPriceLabel = (priceFilter) => {
    if (!priceFilter) return "";

    if (priceFilter.max === null) {
      return `Above Rs ${Number(priceFilter.min || 0).toLocaleString()}`;
    }

    if (Number(priceFilter.min || 0) === 0) {
      return `Under Rs ${Number(priceFilter.max || 0).toLocaleString()}`;
    }

    return `Rs ${Number(priceFilter.min || 0).toLocaleString()} - Rs ${Number(
      priceFilter.max || 0
    ).toLocaleString()}`;
  };

  return (
    <div className="meta-filter-shop" style={{}}>
      <div id="product-count-grid" className="count-text">
        <span className="count">{productLength}</span> Products Found
      </div>

      <div id="applied-filters">
        {/* New dynamic price filter */}
        {allProps.priceFilter ? (
          <span
            className="filter-tag"
            onClick={() => allProps.setPriceFilter?.(null, null)}
          >
            {getPriceLabel(allProps.priceFilter)}
            <span className="remove-tag icon-close" />
          </span>
        ) : (
          ""
        )}

        {/* New stock filter */}
        {allProps.stockFilter && allProps.stockFilter !== "all" ? (
          <span
            className="filter-tag"
            onClick={() => allProps.setStockFilter?.(allProps.stockFilter)}
          >
            {allProps.stockFilter === "in_stock" ? "In Stock" : "Out of Stock"}
            <span className="remove-tag icon-close" />
          </span>
        ) : (
          ""
        )}

        {/* New dynamic variant filters */}
        {Object.entries(allProps.selectedVariantFilters || {}).map(
          ([groupName, ids]) =>
            ids.map((id) => {
              const group = allProps.variantFilters?.find(
                (item) => item.group_name === groupName
              );

              const option = group?.options?.find(
                (opt) => Number(opt.id) === Number(id)
              );

              if (!option) return null;

              return (
                <span
                  key={`${groupName}-${id}`}
                  className="filter-tag"
                  onClick={() => allProps.setVariantFilter?.(groupName, id)}
                >
                  {groupName}: {option.name}
                  <span className="remove-tag icon-close" />
                </span>
              );
            })
        )}

        {/* Old/static filters kept for backward compatibility */}
        {allProps.availability != "All" ? (
          <span
            className="filter-tag"
            onClick={() => allProps.setAvailability("All")}
          >
            {allProps.availability.label}
            <span className="remove-tag icon-close" />
          </span>
        ) : (
          ""
        )}

        {allProps.size != "All" ? (
          <span className="filter-tag" onClick={() => allProps.setSize("All")}>
            {allProps.size}
            <span className="remove-tag icon-close" />
          </span>
        ) : (
          ""
        )}

        {allProps.color != "All" ? (
          <span
            className="filter-tag color-tag"
            onClick={() => allProps.setColor("All")}
          >
            <span className={`color bg-red ${allProps.color.className} `} />
            {allProps.color.name}
            <span className="remove-tag icon-close" />
          </span>
        ) : (
          ""
        )}

        {allProps.brands?.length ? (
          <React.Fragment>
            {allProps.brands.map((brand, i) => (
              <span
                key={i}
                className="filter-tag"
                onClick={() => allProps.removeBrand(brand)}
              >
                {brand}
                <span className="remove-tag icon-close" />
              </span>
            ))}
          </React.Fragment>
        ) : (
          ""
        )}
      </div>

      {hasNewFilters || hasOldFilters ? (
        <button
          id="remove-all"
          className="remove-all-filters text-btn-uppercase"
          onClick={clearAllFilters}
        >
          REMOVE ALL <i className="icon icon-close" />
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
