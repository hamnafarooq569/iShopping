import { fetchProductById } from "@/app/services/api";
import Breadcumb from "@/components/productDetails/Breadcumb";
import Descriptions1 from "@/components/productDetails/descriptions/Descriptions1";
import Details1 from "@/components/productDetails/details/Details1";
import RelatedProducts from "@/components/productDetails/RelatedProducts";
import React from "react";

export const metadata = {
  title:"Shop",
  description: "Welcome to Ishop Store, your premier destination for accessories.",
};

export default async function ProductDetailPage({ params, searchParams }) {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;

  const selectedVariantId = resolvedSearchParams?.variant || null;

  let product = null;
  let relatedProducts = [];

  try {
    const res = await fetchProductById(id);

    if (!res || !res.data) {
      return <div className="container py-5">Product not found</div>;
    }

    product = res.data;

    relatedProducts = (res?.related_products || []).map((item) => {
      const colorMap = new Map();

      item.variant_combinations?.forEach((combination) => {
        const colorOption = combination.options?.find(
          (o) => o.group_name?.toLowerCase() === "color"
        );

        if (!colorOption) return;

        const colorKey = colorOption.id || colorOption.name;

        if (!colorMap.has(colorKey)) {
          colorMap.set(colorKey, {
            id: colorOption.id || combination.id,
            colorName: colorOption.name,
            hex_code: colorOption.hex_code,
            imgSrc:
              combination.image_url ||
              item.image_url ||
              "/images/default.png",
            price:
              combination.final_price ||
              combination.price ||
              item.price,
            stock: combination.stock,
            variant_ids: combination.variant_ids,
          });
        }
      });

      const colorVariants = Array.from(colorMap.values());

      return {
        id: item.id,
        title: item.name,
        slug: item.slug,
        category: item.categories?.[0] || null,
        price: colorVariants?.[0]?.price || item.price,
        oldPrice: null,
        imgSrc:
          colorVariants?.[0]?.imgSrc ||
          item.image_url ||
          "/images/default.png",
        imgHover:
          colorVariants?.[0]?.imgSrc ||
          item.image_url ||
          "/images/default.png",
        isOnSale: item.is_special,
        inStock: item.stock > 0,
        colors: colorVariants,
        variant_groups: item.variant_groups || [],
        variant_combinations: item.variant_combinations || [],
      };
    });
  } catch (error) {
    console.error(error);
  }

  if (!product) {
    return <p>Product with this id is not available</p>;
  }

  return (
    <>
      <Breadcumb product={product} />

      <Details1
        product={product}
        selectedVariantId={selectedVariantId}
      />

      <Descriptions1 product={product} />
      <RelatedProducts products={relatedProducts || []} />
    </>
  );
}
