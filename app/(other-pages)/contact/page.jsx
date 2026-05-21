import Contact3 from "@/components/otherPages/Contact3";
import StoreLocations3 from "@/components/otherPages/StoreLocations3";
import React from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/custom/Breadcrumbs";
export const metadata = {
  title: "Contact-Us",
  description: "Welcome to Ishop Store, your premier destination for accessories.",
};

export default function ContactPage2() {
  return (
    <>
      <div
        className="page-title"
       >
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <h3 className="heading text-center">Contact Us</h3>
              <Breadcrumbs/>
              </div>
          </div>
        </div>
      </div>
      <StoreLocations3 />
      <Contact3 />

    </>
  );
}
