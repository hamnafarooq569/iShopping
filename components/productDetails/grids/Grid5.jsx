"use client";

import Image from "next/image";
import React from "react";

export default function Grid5({
  activeColor = "gray",
  setActiveColor = () => {},
  firstItem,
}) {
  const imageSrc = firstItem || "/images/default.png";

  return (
    <div className="tf-quick-view-image quick-view-image-area">
      <div className="wrap-quick-view">
        <div className="quickView-item quick-view-image-box">
          <Image
            src={imageSrc}
            alt="product"
            fill
            sizes="(max-width: 768px) 100vw, 42vw"
            className="quick-view-main-image"
            priority
          />
        </div>
      </div>
    </div>
  );
}