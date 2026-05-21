"use client";
import React from "react";

export default function Pagination({
  currentPage,
  totalPages = 1,
  onPageChange,
}) {
  const handlePageClick = (page) => {
    if (!onPageChange) return;
    if (page < 1 || page > totalPages) return;
    if (page === currentPage) return;
    onPageChange(page);
  };

  const getPages = () => {
    const pages = [];

    const siblingCount = 1;

    const left = Math.max(currentPage - siblingCount, 1);
    const right = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = left > 2;
    const showRightDots = right < totalPages - 1;

    // first page
    pages.push(1);

    // left dots
    if (showLeftDots) pages.push("...");

    // middle pages
    for (let i = left; i <= right; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }

    // right dots
    if (showRightDots) pages.push("...");

    // last page
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  return (
    <ul className="wg-pagination d-flex justify-content-center gap-2 items-center" >
      {/* Prev */}
      <li
        className="cursor-pointer pagination-box"
        style={{ width: "35px", height: "35px" }}
        onClick={() => handlePageClick(currentPage - 1)}
      >
        Prev
      </li>

      {/* Pages */}
      {getPages().map((page, index) => {
        if (page === "...") {
          return (
            <li key={`dots-${index}`} className="pagination-box cursor-pointer" style={{ width: "35px", height: "35px" }}>
              ...
            </li>
          );
        }

        return (
          <li
            key={page}
            onClick={() => handlePageClick(page)}
            className={
              currentPage === page
                ? "active pagination-box cursor-pointer"
                : "pagination-box cursor-pointer"
            }
            style={{ width: "35px", height: "35px" }}
          >
            {page}
          </li>
        );
      })}

      {/* Next */}
      <li
        className="pagination-box cursor-pointer" style={{ width: "35px", height: "35px" }}
        onClick={() => handlePageClick(currentPage + 1)}
      >
        Next
      </li>
    </ul>
  );
}