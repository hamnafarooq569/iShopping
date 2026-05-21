import Breadcrumbs from "@/components/custom/Breadcrumbs";
import Checkout from "@/components/otherPages/Checkout";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Checkout",
  description: "Welcome to Ishop Store, your premier destination for accessories.",
};

export default function CheckoutPage() {
  return (
    <>
      <div
        className="page-title"
        >
        <div className="container">
          <h3 className="heading text-center">Check Out</h3>
          <Breadcrumbs/>
          </div>
      </div>
      <Checkout />
    </>
  );
}
