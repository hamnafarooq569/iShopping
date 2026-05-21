import AnimatedBanner from "@/components/custom/AnimatedBanner";
import Blogs from "@/components/homes/home-gaming/Blogs";
import Collections from "@/components/homes/home-gaming/Collections";
import Features from "@/components/homes/home-gaming/Features";
import Lookbook from "@/components/homes/home-gaming/Lookbook";
import Products from "@/components/homes/home-gaming/Products";
import Products2 from "@/components/homes/home-gaming/Products2";
import Testimonials from "@/components/homes/home-gaming/Testimonials";
import React from "react";

export const metadata = {
  title: "Home",
  description: "IShop - Mobile accessories and repairing brand",
};

export default function HomePage() {
  return (
    <>

            {/* <Hero /> */}
            <AnimatedBanner/>
            <Collections />
            <Products  />
            {/* <Collections2 /> */}
            <Lookbook />
            <Features />
            <Products2 />
            <Testimonials />
            {/* <Blogs /> */}
            
            
      </>
  );
}
