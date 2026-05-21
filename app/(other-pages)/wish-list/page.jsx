import Breadcrumbs from "@/components/custom/Breadcrumbs";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar6";
import Wishlist from "@/components/otherPages/Wishlist";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Wishlist",
  description: "Welcome to Ishop Store, your premier destination for accessories.",
};

export default function WishListPage() {
  return (
    <>
      <div
        className="page-title"
       >
        <div className="container">
          <h3 className="heading text-center">Your Wishlist</h3>
          <Breadcrumbs/>
          </div>
      </div>

      <Wishlist />

    </>
  );
}
