"use client"

import React from "react";
import Pagination from "../common/Pagination";
import Link from "next/link";
import Image from "next/image";
import { useBlogs } from "@/app/hooks/useBlogs";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import { SwiperSlide } from "swiper/react";

export default function BlogGrid() {

  const {data,isLoading,error} = useBlogs(1);
  if (error) return <p className="text-danger">Error loading blogs</p>;

  return (
    <div className="main-content-page">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="tf-grid-layout md-col-3">
             {isLoading ? (
  Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                <Skeleton height={400} />
              </SwiperSlide>
            ))
) : data ? (
  data.blogs.map((blog) => (
    <div className="wg-blog style-1 hover-image" key={blog.id}>
      <div className="image">
        <Image
          src={blog.image_url}
          alt={blog.title}
          width={120}
          height={120}
        />
      </div>

      <div className="content">
        <div className="meta">
          <div className="meta-item gap-8">
            <i className="icon-calendar" />
            <p>{new Date(blog.published_at).toLocaleDateString()}</p>
          </div>

          <div className="meta-item gap-8">
            <i className="icon-user" />
            <p>by {blog.author?.name}</p>
          </div>
        </div>

        <h6>
          <Link href={`/blog-detail/${blog.slug}`}>
            {blog.title}
          </Link>
        </h6>

        <p>{blog.short_description}</p>
      </div>
    </div>
  ))
) : null}
              <ul className="wg-pagination justify-content-center">
                <Pagination />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
