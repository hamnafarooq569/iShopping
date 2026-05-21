"use client";

import React from "react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { useUser } from "@/app/hooks/useAuth";

export default function Orers() {
  const { data: user, isLoading, isError } = useUser();

  if (isLoading) {
    return (
      <div className="my-account-content">
        <Skeleton height={300} />
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="my-account-content">
        <p>Failed to load orders.</p>
      </div>
    );
  }

  const orders = user.current_orders || [];

  return (
    <div className="my-account-content">
      <div className="account-orders">
        <div className="wrap-account-order">
          <table>
            <thead>
              <tr>
                <th className="fw-6">Order</th>
                <th className="fw-6">Date</th>
                <th className="fw-6">Status</th>
                <th className="fw-6">Total</th>
                {/* <th className="fw-6">Actions</th> */}
              </tr>
            </thead>

            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="5">No orders found.</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    className="tf-order-item"
                    key={order.id}
                  >
                    <td>{order.order_number}</td>

                    <td>
                      {new Date(
                        order.created_at
                      ).toLocaleDateString()}
                    </td>

                    <td>{order.order_status}</td>

                    <td>
  Rs. {order.total_amount} for{" "}
  {order.items
    .map((item) => item.product_name)
    .join(", ")}
</td>

                    {/* <td>
                      <Link
                        href={`/my-account-orders-details/${order.id}`}
                        className="tf-btn btn-fill radius-4"
                      >
                        <span className="text">
                          View
                        </span>
                      </Link>
                    </td> */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}