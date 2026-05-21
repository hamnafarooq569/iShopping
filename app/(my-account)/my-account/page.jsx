import Breadcrumbs from "@/components/custom/Breadcrumbs";
import AccountSidebar from "@/components/my-account/AccountSidebar";
import Information from "@/components/my-account/Information";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "My Account",
  description: "Ishop",
};

export default function MyAccountPage() {
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
            <Information />
          </div>
        </div>
      </section>
    </>
  );
}
