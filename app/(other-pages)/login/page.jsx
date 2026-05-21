import Breadcrumbs from "@/components/custom/Breadcrumbs";
import LoginWrapper from "@/components/custom/LoginWrapper";
import Login from "@/components/otherPages/Login";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Login || Modave - Multipurpose React Nextjs eCommerce Template",
  description: "Modave - Multipurpose React Nextjs eCommerce Template",
};

export default function LoginPage() {
  return (
    <>
      <div
        className="page-title"
       >
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <h3 className="heading text-center">Login</h3>
              <Breadcrumbs/>
              </div>
          </div>
        </div>
      </div>

      <LoginWrapper/>
    </>
  );
}
