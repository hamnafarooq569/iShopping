"use client";

import { useUser } from "@/app/hooks/useAuth";
import { useCheckout } from "@/app/hooks/useCheckout";
import { validateCoupon } from "@/app/services/api";
import { useContextElement } from "@/context/Context";
import { formatPrice } from "@/utlis/PriceFormat";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Checkout() {
  const router = useRouter();

  const { cartProducts, setCartProducts, totalPrice } =
    useContextElement();

  const { mutate, isPending } = useCheckout();
  const { data: user } = useUser();

  const [coupon, setCoupon] = useState({
    applied: false,
    discount: 0,
    code: "",
  });

  const [couponLoading, setCouponLoading] = useState(false);

  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    address: "",
    notes: "",
    coupon_code: "",
  });

  // APPLY COUPON
  const handleApplyCoupon = async () => {
    if (!form.coupon_code) {
      toast.error("Please enter coupon code");
      return;
    }

    try {
      setCouponLoading(true);

      const res = await validateCoupon({
        coupon_code: form.coupon_code.trim(),
        subtotal: Number(totalPrice),
      });

      const discountAmount =
        res?.discount_amount ||
        res?.data?.discount_amount ||
        0;

      setCoupon({
        applied: true,
        discount: discountAmount,
        code: form.coupon_code,
      });

      toast.success(
        res.message || "Coupon applied successfully"
      );
    } catch (error) {
      setCoupon({
        applied: false,
        discount: 0,
        code: "",
      });

      toast.error(error.message || "Invalid coupon");
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setCoupon({
      applied: false,
      discount: 0,
      code: "",
    });

    setForm({
      ...form,
      coupon_code: "",
    });

    toast.info("Coupon removed");
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // CHECKOUT
  const handleCheckout = (e) => {
    e.preventDefault();

    if (!cartProducts.length) {
      toast.error("Cart is empty");
      return;
    }

    if (
      !form.customer_name ||
      !form.customer_email ||
      !form.customer_phone ||
      !form.address
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!validateEmail(form.customer_email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    const payload = {
      ...form,

      coupon_code: coupon.applied
        ? coupon.code
        : null,

      items: cartProducts.map((item) => ({
        product_id: item.id,
        product_variant_combination_id:
          item.product_variant_combination_id ||
          item.selectedVariant?.id ||
          null,
        quantity: item.quantity,
      })),
    };

    toast.promise(
      new Promise((resolve, reject) => {
        mutate(payload, {
          onSuccess: (data) => {
            try {
              localStorage.setItem(
                "lastOrder",
                JSON.stringify(data.data)
              );

              localStorage.removeItem("cartList");
            } catch (err) {
              console.log(
                "LocalStorage clear failed",
                err
              );
            }

            setCartProducts([]);

            resolve(data);

            router.push("/thank-you");
          },

          onError: (err) => reject(err),
        });
      }),
      {
        pending: "Placing your order...",
        success: (data) =>
          data?.message ||
          "Order placed successfully 🎉",

        error: (err) =>
          err?.message || "Something went wrong",
      }
    );
  };

  const finalTotal = Math.max(
    totalPrice - coupon.discount,
    0
  );

  return (
    <section>
      <div className="container">
        <div className="row">

          {/* LEFT SIDE */}
          <div className="col-xl-6">
            <div className="flat-spacing tf-page-checkout">

              {!user && (
                <div className="wrap">
                  <div className="title-login">
                    <p>Already have an account?</p>

                    <Link
                      href="/login"
                      className="text-button"
                    >
                      Login here
                    </Link>
                  </div>
                </div>
              )}

              {user && (
                <div className="wrap">
                  <h5>
                    Welcome back, {user.name}
                  </h5>

                  <p>
                    You are logged in. Proceed to
                    checkout.
                  </p>
                </div>
              )}

              {/* FORM */}
              <div className="wrap">
                <h5 className="title">
                  Information
                </h5>

                <form
                  className="info-box"
                  onSubmit={(e) =>
                    e.preventDefault()
                  }
                >

                  <div className="grid-1">
                    <input
                      required
                      type="text"
                      placeholder="First Name*"
                      value={form.customer_name}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          customer_name:
                            e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="grid-2">
                    <input
                      required
                      type="email"
                      placeholder="Email Address*"
                      value={form.customer_email}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          customer_email:
                            e.target.value,
                        })
                      }
                    />

                    <input
                      required
                      type="text"
                      placeholder="Phone Number*"
                      value={form.customer_phone}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          customer_phone:
                            e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="grid-1">
                    <input
                      required
                      type="text"
                      placeholder="Address*"
                      value={form.address}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          address:
                            e.target.value,
                        })
                      }
                    />
                  </div>

                  <textarea
                    placeholder="Write note..."
                    value={form.notes}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        notes: e.target.value,
                      })
                    }
                  />
                </form>
              </div>

              {/* PAYMENT */}
              <div className="wrap">
                <h5 className="title">
                  Choose payment Option:
                </h5>

                <form
                  className="form-payment"
                  onSubmit={(e) =>
                    e.preventDefault()
                  }
                >
                  <div
                    className="payment-box"
                    id="payment-box"
                  >
                    <div className="payment-item">
                      <label
                        htmlFor="delivery-method"
                        className="payment-header collapsed"
                      >
                        <input
                          type="radio"
                          name="payment-method"
                          className="tf-check-rounded"
                          id="delivery-method"
                          defaultChecked
                        />

                        <span className="text-title">
                          Cash on delivery
                        </span>
                      </label>
                    </div>
                  </div>

                  <button
                    className="tf-btn btn-reset"
                    onClick={handleCheckout}
                    disabled={isPending}
                  >
                    {isPending
                      ? "Processing..."
                      : "Place Order"}
                  </button>
                </form>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-xl-6">
            <div className="flat-spacing flat-sidebar-checkout">

              <div className="sidebar-checkout-content">

                <h5 className="title">
                  Shopping Cart
                </h5>

                <div className="list-product">

                  {cartProducts.map((elm, i) => (

                    <div
                      key={i}
                      className="item-product"
                    >

                      <Link
                        href={`/product-detail/${elm.slug}`}
                        className="img-product"
                      >
                        <Image
                          alt="img-product"
                          src={
                            elm.selectedVariant
                              ?.image_url ||
                            elm.image
                          }
                          width={600}
                          height={800}
                        />
                      </Link>

<div className="content-box checkout-product-content">
  <div className="info checkout-product-info">
    <Link
      href={`/product-detail/${elm.slug}`}
      className="name-product link text-title"
    >
      {elm.title}
    </Link>

    {elm.selectedVariant?.options?.length > 0 && (
      <div className="text-secondary mt-1 checkout-variant-text">
        {elm.selectedVariant.options.map((opt, i) => (
          <span key={i}>
            {opt.group_name}: {opt.name}
            {i < elm.selectedVariant.options.length - 1 ? " / " : ""}
          </span>
        ))}
      </div>
    )}

    <div className="total-price text-button checkout-item-price">
      <span className="count">{elm.quantity}</span> X{" "}
      <span className="price">
        {formatPrice(
          (
            elm.selectedVariant?.final_price ||
            elm.price ||
            0
          ).toFixed(2)
        )}
      </span>
    </div>
  </div>
</div>

                    </div>

                  ))}

                </div>

                {/* TOTAL */}
                <div className="sec-total-price">
                  <div className="bottom">

                    <div className="d-flex justify-content-between mb-2">
                      <span>Subtotal</span>

                      <span>
                        {formatPrice(
                          totalPrice.toFixed(2)
                        )}
                      </span>
                    </div>

                    {!coupon.applied ? (
                      <div className="d-flex gap-2 mt-3 mb-3">

                        <input
                          type="text"
                          placeholder="Coupon code"
                          value={
                            form.coupon_code
                          }
                          onChange={(e) =>
                            setForm({
                              ...form,
                              coupon_code:
                                e.target.value,
                            })
                          }
                        />

                        <button
                          type="button"
                          className="tf-btn btn-reset"
                          onClick={
                            handleApplyCoupon
                          }
                          disabled={
                            couponLoading
                          }
                        >
                          {couponLoading
                            ? "Applying..."
                            : "Apply"}
                        </button>

                      </div>
                    ) : (
                      <div className="d-flex justify-content-between align-items-center mt-3">

                        <span className="text-success">
                          Coupon{" "}
                          <b>{coupon.code}</b>{" "}
                          applied
                        </span>

                        <button
                          type="button"
                          className="tf-btn btn-reset"
                          onClick={
                            handleRemoveCoupon
                          }
                        >
                          Cancel
                        </button>

                      </div>
                    )}

                    {coupon.applied && (
                      <div className="d-flex justify-content-between mb-2 text-success">

                        <span>Discount</span>

                        <span>
                          -
                          {formatPrice(
                            coupon.discount.toFixed(
                              2
                            )
                          )}
                        </span>

                      </div>
                    )}

                    <h5 className="d-flex justify-content-between">

                      <span>Total</span>

                      <span className="total-price-checkout">
                        {formatPrice(
                          finalTotal.toFixed(2)
                        )}
                      </span>

                    </h5>

                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}