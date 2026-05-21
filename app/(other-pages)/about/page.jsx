import Brands from "@/components/common/Brands";
import Features2 from "@/components/common/Features2";
import Link from "next/link";
import About from "@/components/otherPages/About";
import Testimonials from "@/components/otherPages/Testimonials";
import React from "react";
import Breadcrumbs from "@/components/custom/Breadcrumbs";

export const metadata = {
  title: "About Us ",
  description: "Welcome to Ishop Store, your premier destination for accessories.",
};

export default function AboutUsPage() {
  return (
    <>
      <div
        className="page-title">
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <h3 className="heading text-center">About Us</h3>
              <Breadcrumbs/>
              </div>
          </div>
        </div>
      </div>
      <About />
      <Features2 parentClass="flat-spacing line-bottom-container" />
      {/* <Team /> */}
      <Brands parentClass="flat-spacing-5 bg-surface" />
      <Testimonials />
    </>
  );
}
