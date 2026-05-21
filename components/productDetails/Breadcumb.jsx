"use client";
import React from "react";
import Link from "next/link";

export default function Breadcumb({ product }) {
  if (!product) return null;

  return (
    <div className="page-title">
      <div className="container-full">
        <div className="row">
          <div className="col-12">

            <h3 className="heading text-center line-clamp-1">
              {product.name}
            </h3>

            <ul className="breadcrumbs d-flex align-items-center justify-content-center">
              <li>
                <Link href="/">Home</Link>
              </li>

              {/* SHOP */}
              <li className="d-flex align-items-center">
                <i className="icon-arrRight mx-2" />
                <Link href="/shop">
                  Shop
                </Link>
              </li>

              {/* CATEGORY */}
              {/* <li className="d-flex align-items-center">
                <i className="icon-arrRight mx-2" />
                <Link href={`/shop/${product.category?.slug}`}>
                  {product.category?.name}
                </Link>
              </li> */}

              {/* PRODUCT */}
              <li className="d-flex align-items-center">
                <i className="icon-arrRight mx-2" />
                <span className="text-capitalize">
                  {product.name}
                </span>
              </li>
            </ul>

          </div>
        </div>
      </div>
    </div>
  );
}