import Breadcrumbs from "@/components/custom/Breadcrumbs";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar6";
import AccountSidebar from "@/components/my-account/AccountSidebar";
import Information from "@/components/my-account/Information";
import Orers from "@/components/my-account/Orers";
import Link from "next/link";
import React from "react";

export const metadata = {
  title:
    "My Account Orders || IShop - e-commerce",
  description: "My Account Orders",
};

export default function MyAccountOrdersPage() {
  return (
    <>
      <>
        {/* page-title */}
        <div
          className="page-title"
        >
          <div className="container-full">
            <div className="row">
              <div className="col-12">
                <h3 className="heading text-center">My Account</h3>
                <Breadcrumbs/>
              </div>
            </div>
          </div>
        </div>
        {/* /page-title */}
        <div className="btn-sidebar-account">
          <button data-bs-toggle="offcanvas" data-bs-target="#mbAccount">
            <i className="icon icon-squares-four" />
          </button>
        </div>
      </>

      <section className="flat-spacing">
        <div className="container">
          <div className="my-account-wrap">
            <AccountSidebar />
            <Orers />
          </div>
        </div>
      </section>
    </>
  );
}
