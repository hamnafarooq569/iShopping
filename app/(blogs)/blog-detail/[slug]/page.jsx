"use client";

import { useParams } from "next/navigation";
import { useBlogDetail } from "@/app/hooks/useBlogs";
import BlogDetail1 from "@/components/blogs/BlogDetail1";
import RelatedBlogs from "@/components/blogs/RelatedBlogs";
import Skeleton from "react-loading-skeleton";

export default function BlogDetailsPage1() {
  const { slug } = useParams();

  const { data, isLoading, error } = useBlogDetail(slug);

  if (isLoading) return <div className="d-flex justify-content-center"><Skeleton width={1000} height={500}/></div>;
  if (error) return <p>Blog not found</p>;

  return (
    <>
      <BlogDetail1 blog={data} />
      {/* <RelatedBlogs /> */}
    </>
  );
}