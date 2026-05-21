"use client";

import React, { useState } from "react";
import { useAddBlogComment } from "@/app/hooks/useBlogs";
import { toast } from "react-toastify";

export default function CommentForm({ blogId }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const { mutate, isPending } = useAddBlogComment();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(
      {
        blog_id: blogId,
        ...form,
      },
      {
        onSuccess: (res) => {
          toast.success(res?.message || "Comment added successfully");
          setForm({ name: "", email: "", comment: "" });
        },

        onError: (err) => {
          toast.error(
            err?.response?.data?.message ||
              err?.message ||
              "Failed to submit comment"
          );
        },
      }
    );
  };

  return (
    <div className="leave-comment mb-2">
      <h4>Leave A Comment</h4>

      <form onSubmit={handleSubmit}>
        <div className="wrap">
          <div className="cols">
            <fieldset>
              <input
                placeholder="Your Name*"
                tabIndex="2"
                aria-required="true"
                required
                type="text"
                value={form.name}
                name="name"
                onChange={handleChange}
              />
            </fieldset>

            <fieldset>
              <input
                placeholder="Your Email*"
                tabIndex="2"
                aria-required="true"
                required
                type="email"
                value={form.email}
                name="email"
                onChange={handleChange}
              />
            </fieldset>
          </div>

          <textarea
            className="mt-2"
            name="comment"
            value={form.comment}
            onChange={handleChange}
            placeholder="Your Message"
            required
          />
        </div>

        <button disabled={isPending}>
          {isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}