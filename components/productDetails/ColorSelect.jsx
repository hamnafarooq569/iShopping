"use client";

import React from "react";

export default function ColorSelect({
  activeColorId,
  setActiveColor,
  colorOptions = [],
}) {
  return (
    <div className="variant-picker-item">
      <div className="variant-picker-label mb_12">
        Colors:
      </div>

      <div className="variant-picker-values">
        {colorOptions.map((item) => (
          <label
  key={item.id}
  onClick={() => setActiveColor(item)}
  className={`hover-tooltip tooltip-bot radius-60 color-btn ${
    activeColorId === item.id ? "active" : "blurred"
  }`}
>
            <input
              type="radio"
              checked={activeColorId === item.id}
              readOnly
            />

          <span
  className="btn-checkbox"
  style={{
    backgroundColor: item.color,

    border: 
      item.color?.toLowerCase() === "#ffffff"
        ? "2px solid #111"
        : "1px solid rgba(0,0,0,0.25)",

    boxShadow:
      item.color?.toLowerCase() === "#ffffff"
        ? "0 2px 6px rgba(0,0,0,0.15), inset 0 0 0 3px #00000010"
        : "0 2px 4px rgba(0,0,0,0.08)",
    transition: "all 0.2s ease",
  }}
/>

            <span className="tooltip">{item.value}</span>
          </label>
        ))}
      </div>
    </div>
  );
}