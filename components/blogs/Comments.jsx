import React from "react";
import Image from "next/image";
import { useBlogComments } from "@/app/hooks/useBlogs";

export default function Comments({ slug }) {
  const { isLoading, data, error } = useBlogComments(slug);

  if (isLoading) return <p>Loading comments...</p>;
  if (error) return <p>Failed to load comments</p>;

  return (
    <div className="reply-comment">
      <h4 className="reply-comment-heading">
        {data?.length || 0} Comments
      </h4>

      <div className="reply-comment-wrap">
        {data?.map((comment, i) => (
          <div key={i} className="reply-comment-item">
            <div className="image">
              <Image
                alt=""
                src="/ishop-assets/user-male.png"
                width={90}
                height={113}
              />
            </div>

            <div className="content">
              <div>
                <h6>
                  <span className="link">
                    {comment.name}
                  </span>
                </h6>

                <div className="day text-caption-1">
                  {new Date(comment.created_at).toLocaleDateString()}
                </div>
              </div>

              <p>{comment.comment}</p>

              <div>
                <a className="text-button" href="#">
                  Reply
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}