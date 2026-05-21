"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/utlis/PriceFormat";

export default function ThankYouPage() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("lastOrder");
    if (data) {
      setOrder(JSON.parse(data));
    }
  }, []);

  if (!order) {
    return (
      <div className="text-center py-5">
        <h2>No order found</h2>
        <Link href="/" className="tf-btn btn-reset mt-3">
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <section className="py-5">
      <div className="container">

        {/* HEADER */}
        <div className="text-center mb-4">
          <h2>🎉 Order Placed Successfully</h2>
          <p>Thank you for your purchase!</p>
        </div>

        {/* INVOICE BOX */}
        <div className="border p-4 rounded bg-white">

          <h4 className="mb-3">Invoice</h4>

          <p><strong>Order Number:</strong> {order.order_number}</p>
          <p><strong>Payment Method:</strong> {order.payment_method}</p>

          <hr />

          <div className="d-flex justify-content-between">
            <span>Subtotal</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>

          <div className="d-flex justify-content-between">
            <span>Delivery Charges</span>
            <span>{formatPrice(order.delivery_charges)}</span>
          </div>

          <div className="d-flex justify-content-between">
            <span>Tax</span>
            <span>{formatPrice(order.tax)}</span>
          </div>

          <div className="d-flex justify-content-between">
            <span>Discount</span>
            <span>-{formatPrice(order.discount_amount)}</span>
          </div>

          <hr />

          <h4 className="d-flex justify-content-between">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </h4>
        </div>

        {/* BUTTON */}
        <div className="text-center mt-4">
          <Link href="/shop" className="tf-btn btn-reset">
            Continue Shopping
          </Link>
        </div>

      </div>
    </section>
  );
}