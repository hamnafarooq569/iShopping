
import { fetchProductsByCategories } from '@/app/services/api';
import Breadcrumbs from '@/components/custom/Breadcrumbs';
import Products1 from '@/components/products/Products1';
import React from 'react';

export const metadata = {
  title: "Shop",
  description: "Welcome to Ishop Store, your premier destination for accessories.",
};

export default async function ShopCategory({ params }) {
  const { slug } = await params;

  let category = null;

  try {
    category = await fetchProductsByCategories(slug);
  } catch (error) {
    console.error(error);
  }

  return (
    <>
      <div className="page-title">
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <h3 className="heading text-center">
               {category?.category?.name || slug.replace("-","")}
              </h3>
              <Breadcrumbs />
            </div>
          </div>
        </div>
      </div>

      {/* ✅ PASS DATA HERE */}
      <Products1 products={category?.products || []} meta={category?.meta} />
    </>
  );
}