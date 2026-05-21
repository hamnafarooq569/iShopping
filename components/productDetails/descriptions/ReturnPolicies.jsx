import React from "react";

export default function ReturnPolicies() {
  return (
    <>
      <div className="text-btn-uppercase mb_12">
        RETURN POLICIES
      </div>

      <p className="mb_12 text-secondary">
        At iShopping, customer satisfaction is important to us. We carefully
        inspect all Apple products, accessories, and repair services before
        delivery to ensure quality and reliability.
      </p>

      <div className="text-btn-uppercase mb_12">
        EXCHANGES POLICY
      </div>

      <ul className="list-text type-disc mb_12 gap-6">
        <li className="text-secondary font-2">
          We currently offer exchange only services.
        </li>

        <li className="text-secondary font-2">
          Exchanges are available for damaged, defective, or incorrect products
          received by the customer.
        </li>

        <li className="text-secondary font-2">
          Products must be unused and returned in original packaging with proof
          of purchase.
        </li>

        <li className="text-secondary font-2">
          Exchange requests should be made within the allowed timeframe after
          receiving the order.
        </li>
      </ul>

      <div className="text-btn-uppercase mb_12">
        NO RETURN POLICY
      </div>

      <ul className="list-text type-disc mb_12 gap-6">
        <li className="text-secondary font-2">
          iShopping does not offer returns or refunds on products or services.
        </li>

        <li className="text-secondary font-2">
          Customers are advised to carefully review product specifications and
          details before placing an order.
        </li>
      </ul>

      <div className="text-btn-uppercase mb_12">
        SIMPLE EXCHANGE PROCESS
      </div>

      <p className="text-secondary font-2 mb_12">
        Contact our customer support team with your order details and issue
        description. Our team will review the request and guide you through the
        exchange procedure.
      </p>

      <p className="text-secondary font-2 mb_12">
        Please ensure the item is securely packed and in original condition
        before sending it for exchange.
      </p>

      <div className="text-btn-uppercase mb_12">
        DELIVERY INFORMATION
      </div>

      <ul className="list-text type-disc gap-6">
        <li className="text-secondary font-2">
          Same-day delivery available in Karachi on selected orders
        </li>

        <li className="text-secondary font-2">
          Delivery to other cities within 2 working days
        </li>

        <li className="text-secondary font-2">
          Delivery timelines may vary slightly during holidays or courier delays
        </li>
      </ul>
    </>
  );
}