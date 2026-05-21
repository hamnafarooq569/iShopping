import Breadcrumbs from "@/components/custom/Breadcrumbs";
import Products1 from "@/components/products/Products1";
import React, { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Shop",
  description: "Welcome to Ishop Store, your premier destination for accessories.",
};
export default async function ShopDefaultGridPage({ searchParams }) {

  const search =  await searchParams?.search || "";

  return (
    <>
      <div className="page-title">
        <div className="container-full">
          <div className="row">
            <div className="col-12">

              <h3 className="heading text-center">
                {search ? `Search ${search}` : "All Products"}
              </h3>

              <Breadcrumbs />

            </div>
          </div>
        </div>
      </div>

      <Suspense fallback={<div>loading...</div>}>
        <Products1 search={search} />
      </Suspense>
    </>
  );
}