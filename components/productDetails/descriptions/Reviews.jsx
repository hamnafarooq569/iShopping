"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ReviewSorting from "./ReviewSorting";
import { useAddProductReview } from "@/app/hooks/useProducts";
import { toast } from "react-toastify";

export default function Reviews({
  reviews = [],
  productId,
}) {
  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    review: "",
    rating: 5,
  });

  const [showForm, setShowForm] = useState(false);

  const { mutate, isPending } = useAddProductReview();

  useEffect(() => {
    const writeBtn = document.querySelector(
      ".btn-write-review"
    );

    const cancelBtn = document.querySelector(
      ".btn-cancel-review"
    );

    const formWrap = document.querySelector(
      ".write-review-wrap"
    );

    if (showForm) {
      formWrap?.classList.add("open");
      writeBtn?.classList.add("d-none");
      cancelBtn?.classList.add("d-flex");
    } else {
      formWrap?.classList.remove("open");
      writeBtn?.classList.remove("d-none");
      cancelBtn?.classList.remove("d-flex");
    }
  }, [showForm]);

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, item) => acc + item.rating, 0) /
          reviews.length
        ).toFixed(1)
      : 0;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.promise(
      new Promise((resolve, reject) => {
        mutate(
          {
            id: productId,
            payload: form,
          },
          {
            onSuccess: (data) => {
              resolve(data);

              setForm({
                customer_name: "",
                customer_email: "",
                review: "",
                rating: 5,
              });

              setShowForm(false);
            },
            onError: (err) => {
              reject(err);
            },
          }
        );
      }),
      {
        pending: "Submitting review...",
        success: "Review submitted successfully!",
        error: "Failed to submit review",
      }
    );
  };

  return (
    <>
      <div className="tab-reviews-heading">
        <div className="top">
          <div className="text-center">
            <div className="number title-display">
              {averageRating}
            </div>

            <div className="list-star">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="icon icon-star" />
              ))}
            </div>

            <p>({reviews.length} Ratings)</p>
          </div>

          <div className="rating-score">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = reviews.filter(
                (item) => item.rating === star
              ).length;

              const percentage =
                reviews.length > 0
                  ? (count / reviews.length) * 100
                  : 0;

              return (
                <div className="item" key={star}>
                  <div className="number-1 text-caption-1">
                    {star}
                  </div>

                  <i className="icon icon-star" />

                  <div className="line-bg">
                    <div style={{ width: `${percentage}%` }} />
                  </div>

                  <div className="number-2 text-caption-1">
                    {count}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <div
            className={`btn-style-4 text-btn-uppercase letter-1 btn-comment-review btn-cancel-review ${
              showForm ? "d-flex" : "d-none"
            }`}
            onClick={() => setShowForm(false)}
          >
            Cancel Review
          </div>

          <div
            className={`btn-style-4 text-btn-uppercase letter-1 btn-comment-review btn-write-review ${
              showForm ? "d-none" : ""
            }`}
            onClick={() => setShowForm(true)}
          >
            Write a review
          </div>
        </div>
      </div>

      <div className="reply-comment style-1 cancel-review-wrap">
        <div className="d-flex mb_24 gap-20 align-items-center justify-content-between flex-wrap">
          <h4>{reviews.length} Reviews</h4>

          <div className="d-flex align-items-center gap-12">
            <div className="text-caption-1">Sort by:</div>
            <ReviewSorting />
          </div>
        </div>

        <div className="reply-comment-wrap">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div className="reply-comment-item" key={review.id}>
                <div className="user">
                  <div className="image">
                    <Image
                      alt=""
                      src="/images/avatar/user-default.jpg"
                      width={120}
                      height={120}
                    />
                  </div>

                  <div>
                    <h6>
                      <span className="link">
                        {review.customer_name}
                      </span>
                    </h6>

                    <div className="d-flex align-items-center gap-2 mb-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <i
                          key={i}
                          className="icon icon-star"
                        />
                      ))}
                    </div>

                    <div className="day text-secondary-2 text-caption-1">
                      {new Date(
                        review.created_at
                      ).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <p className="text-secondary">
                  {review.review}
                </p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>

      <form
        className={`mt-5 form-write-review write-review-wrap ${
          showForm ? "d-block" : "d-none"
        }`}
        onSubmit={handleSubmit}
      >
        <div className="heading">
          <h4>Write a review:</h4>

          <div className="list-rating-check">
            {[5, 4, 3, 2, 1].map((star) => (
              <React.Fragment key={star}>
                <input
                  type="radio"
                  id={`star${star}`}
                  name="rating"
                  value={star}
                  checked={Number(form.rating) === star}
                  onChange={handleChange}
                />

                <label htmlFor={`star${star}`} title="text" />
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="mb_32">
          <div className="mb_8">Review</div>

          <fieldset className="d-flex mb_20">
            <textarea
              rows={4}
              placeholder="Write your comment here"
              required
              name="review"
              value={form.review}
              onChange={handleChange}
            />
          </fieldset>

          <div className="cols mb_20">
            <fieldset>
              <input
                type="text"
                placeholder="You Name (Public)"
                required
                name="customer_name"
                value={form.customer_name}
                onChange={handleChange}
              />
            </fieldset>

            <fieldset>
              <input
                type="email"
                placeholder="Your email (private)"
                required
                name="customer_email"
                value={form.customer_email}
                onChange={handleChange}
              />
            </fieldset>
          </div>

         </div>

        <div className="button-submit">
          <button
            className="text-btn-uppercase"
            type="submit"
            disabled={isPending}
          >
            {isPending
              ? "Submitting..."
              : "Submit Reviews"}
          </button>
        </div>
      </form>
    </>
  );
}