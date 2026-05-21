import React from "react";
import Image from "next/image";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

export default function BlogDetail1({ blog }) {
  if (!blog) return null;
  

  return (
    <div className="blog-detail-wrap">

      {/* IMAGE */}
      <div
  className="image"
  style={{
    backgroundImage: `url(${blog.image_url})`,
    backgroundSize: "cover",
    backgroundPosition: "top",
    height: "400px",
  }}
></div>
      

      <div className="inner">

        {/* TITLE */}
        <div className="heading">
          <h3 className="fw-5">{blog.title}</h3>

          <div className="meta justify-content-center">
            <div className="meta-item gap-8">
              <i className="icon-calendar" />
              <p className="body-text-1">
                {new Date(blog.published_at).toLocaleDateString()}
              </p>
            </div>

            <div className="meta-item gap-8">
              <i className="icon-user" />
              <p className="body-text-1">
                by {blog.author?.name}
              </p>
            </div>
          </div>
        </div>

        {/* SHORT DESCRIPTION */}
        <div className="content">
          <p className="body-text-1 mb_12">
            {blog.short_description}
          </p>

          {/* FULL CONTENT (HTML safe) */}
          {blog.content && (
            <div
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          )}
        </div>

        {/* TAGS (if available) */}
        <div className="bot d-flex justify-content-between gap-10 flex-wrap">
          <ul className="list-tags has-bg">
            <li>Tag:</li>
            <li>
              <a href="#" className="link">
                Blog
              </a>
            </li>
          </ul>
        </div>

        {/* COMMENTS */}
        <Comments slug={blog.slug} />
        <CommentForm blogId={blog.id}/>

      </div>
    </div>
  );
}