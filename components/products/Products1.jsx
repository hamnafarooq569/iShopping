"use client";

import { Suspense } from "react";
import ProductsContent from "../custom/ProductsContent";

export default function Products1(props) {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ProductsContent {...props} />
    </Suspense>
  );
}