"use client";
import React, { useState } from "react";
import Description from "./Description";
import Reviews from "./Reviews";
import Shipping from "./Shipping";
import ReturnPolicies from "./ReturnPolicies";

export default function Descriptions1({ product }) {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <section className="product-desc-section">
      <div className="container">
        <div className="row">
          <div className="col-12">

            {/* Desktop Tabs */}
            <div className="widget-tabs style-1 product-tabs-desktop">
              <ul className="widget-menu-tab">
                <li className={`item-title ${activeTab == 1 ? "active" : ""}`} onClick={() => setActiveTab(1)}>
                  <span className="inner">Description</span>
                </li>
                <li className={`item-title ${activeTab == 2 ? "active" : ""}`} onClick={() => setActiveTab(2)}>
                  <span className="inner">Customer Reviews</span>
                </li>
                <li className={`item-title ${activeTab == 3 ? "active" : ""}`} onClick={() => setActiveTab(3)}>
                  <span className="inner">Shipping &amp; Returns</span>
                </li>
                <li className={`item-title ${activeTab == 4 ? "active" : ""}`} onClick={() => setActiveTab(4)}>
                  <span className="inner">Return Policies</span>
                </li>
              </ul>

              <div className="widget-content-tab">
                <div className={`widget-content-inner ${activeTab == 1 ? "active" : ""}`}>
                  <Description product={product} />
                </div>

                <div className={`widget-content-inner ${activeTab == 2 ? "active" : ""}`}>
                  <Reviews productId={product?.id} reviews={product?.reviews || []} />
                </div>

                <div className={`widget-content-inner ${activeTab == 3 ? "active" : ""}`}>
                  <Shipping />
                </div>

                <div className={`widget-content-inner ${activeTab == 4 ? "active" : ""}`}>
                  <ReturnPolicies />
                </div>
              </div>
            </div>

            {/* Mobile Accordion */}
            <div className="product-accordion-mobile">
              <div className="accordion" id="productMobileAccordion">

                <div className="accordion-item">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#mobileDesc">
                    Description
                  </button>
                  <div id="mobileDesc" className="accordion-collapse collapse show" data-bs-parent="#productMobileAccordion">
                    <div className="accordion-body">
                      <Description product={product} />
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mobileReviews"
                  >
                    Customer Reviews
                  </button>
                  <div id="mobileReviews" className="accordion-collapse collapse" data-bs-parent="#productMobileAccordion">
                    <div className="accordion-body">
                      <Reviews productId={product?.id} reviews={product?.reviews || []} />
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#mobileShipping">
                    Shipping & Returns
                  </button>
                  <div id="mobileShipping" className="accordion-collapse collapse" data-bs-parent="#productMobileAccordion">
                    <div className="accordion-body">
                      <Shipping />
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#mobilePolicies">
                    Return Policies
                  </button>
                  <div id="mobilePolicies" className="accordion-collapse collapse" data-bs-parent="#productMobileAccordion">
                    <div className="accordion-body">
                      <ReturnPolicies />
                    </div>
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