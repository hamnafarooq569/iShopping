import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar6";
import Faqs from "@/components/otherPages/Faqs";
import React from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/custom/Breadcrumbs";
export const metadata = {
  title: "Faqs",
  description: "ISHOP",
};

export default function FAQSPage() {
  return (
    <>
      <div
        className="page-title"
       >
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <h3 className="heading text-center">FAQs</h3>
              <Breadcrumbs/>
              </div>
          </div>
        </div>
      </div>
      <Faqs />
    </>
  );
}
