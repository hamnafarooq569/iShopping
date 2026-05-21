"use client";

const filterOptions = [
  { label: "Sort by (Default)", value: "Sort by (Default)" },
  { label: "Title Ascending", value: "Title Ascending" },
  { label: "Title Descending", value: "Title Descending" },
  { label: "Price Ascending", value: "Price Ascending" },
  { label: "Price Descending", value: "Price Descending" },
];

export default function Sorting({ allProps }) {
  return (
    <select
      className="tf-select-sort"
      value={allProps.sortingOption || "Sort by (Default)"}
      onChange={(e) => allProps.setSortingOption(e.target.value)}
    >
      {filterOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}