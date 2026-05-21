import BlogGrid from "@/components/blogs/BlogGrid";
import Breadcrumbs from "@/components/custom/Breadcrumbs";

import Link from "next/link";
import React from "react";


export const metadata = {
  title: "Blog",
  description: "Welcome to Ishop Store, your premier destination for accessories.",
};

export default function BlogGridPage() {
  return (
    <>
      <div
        className="page-title"
       >
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <h3 className="heading text-center">Blogs</h3>
              <Breadcrumbs/>
              </div>
          </div>
        </div>
      </div>
      <BlogGrid />
    </>
  );
}
