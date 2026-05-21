"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SearchModal() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (!search.trim()) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);

        const res = await fetch(
          `https://web.ishopofficial.com/api/frontend/products?search=${search}`
        );

        const json = await res.json();

        setResults(json?.data?.data || []);
      } catch (err) {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [search]);

  const handleSelect = (item) => {
    setSearch("");
    setResults([]);
    document.querySelector('[data-bs-dismiss="modal"]')?.click();
    router.push(`/product-detail/${item.slug}`);
  };

  return (
    <div className="modal fade modal-search" id="search">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Search Products</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            />
          </div>

          {/* Input */}
          <div className="position-relative">
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* Dropdown */}
            {search.trim() && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  background: "#fff",
                  zIndex: 9999,
                  border: "1px solid #eee",
                  maxHeight: "300px",
                  overflowY: "auto",
                }}
              >
                {loading ? (
                  <div className="p-2">Loading...</div>
                ) : results.length > 0 ? (
                  results.map((item) => (
                    <div
                      key={item.id}
                      className="d-flex gap-2 align-items-center p-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleSelect(item)}
                    >
                      <Image
                        src={item.image_url || "/images/default.png"}
                        width={45}
                        height={45}
                        alt={item.name}
                      />
                      <p className="mb-0">{item.name}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-2">No results found</div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}