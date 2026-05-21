"use client";

import { useEffect, useState } from "react";

const sectionIds = [
  "terms",
  "products-and-pricing",
  "orders-and-payments",
  "shipping-and-delivery",
  "warranty-and-returns",
];
const sections = [
  { id: 1, text: "Terms", scroll: "terms" },
  { id: 2, text: "Products & Pricing", scroll: "products-and-pricing" },
  {
    id: 3,
    text: "Orders & Payments",
    scroll: "orders-and-payments",
  },
  {
    id: 4,
    text: "Shipping & Delivery",
    scroll: "shipping-and-delivery",
  },
  { id: 5, text: "Warranty & Returns", scroll: "warranty-and-returns" },
];

export default function Terms() {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    },
    {
      rootMargin: "-50% 0px",
    }
  );

  sectionIds.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      observer.observe(element);
    }
  });

  return () => {
    observer.disconnect();
  };
}, []);  

  const handleClick = (id) => {
    document
      .getElementById(id)
      .scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="terms-of-use-wrap">
          <div className="left sticky-top">
            {sections.map(({ id, text, scroll, isActive }) => (
              <h6
                key={id}
                onClick={() => handleClick(scroll)}
                className={`btn-scroll-target ${
                  activeSection == scroll ? "active" : ""
                }`}
              >
                {id}. {text}
              </h6>
            ))}
          </div>
          <div className="right">
            <h4 className="heading">Terms of use</h4>
            <div className="terms-of-use-item item-scroll-target" id="terms">
              <h5 className="terms-of-use-title">1. Terms</h5>
              <div className="terms-of-use-content">
                <p>
                  Welcome to iShopping. By accessing and using our website, you agree to comply with our terms and conditions. iShopping offers a wide collection of Apple products, smart gadgets, and premium accessories including iPhones, MacBooks, iPads, AirPods, Apple Watches, chargers, cases, and other tech essentials. We aim to provide customers with a secure, reliable, and smooth online shopping experience.
                </p>
              </div>
            </div>
            <div
              className="terms-of-use-item item-scroll-target"
              id="products-and-pricing"
            >
              <h5 className="terms-of-use-title">2. Products & Pricing</h5>
              <div className="terms-of-use-content">
                <p>
                  All products listed on iShopping are subject to availability. We continuously update our inventory to provide the latest Apple devices and accessories at competitive prices. While we try our best to maintain accurate product descriptions, specifications, images, and pricing, slight variations may occur. Prices may change without prior notice due to market conditions, promotions, or stock availability.
                </p>

              </div>
            </div>
            <div
              className="terms-of-use-item item-scroll-target"
              id="orders-and-payments"
            >
              <h5 className="terms-of-use-title">3. Orders & Payments</h5>
              <div className="terms-of-use-content">
                <p>
                  Customers are required to provide accurate personal, billing, and shipping information while placing orders. Once an order is confirmed, our team processes it for shipment as quickly as possible. iShopping supports secure payment methods to ensure safe transactions. We reserve the right to cancel or hold orders in cases of suspicious activity, incorrect pricing, or unavailable stock.
                </p>
              </div>
            </div>
            <div
              className="terms-of-use-item item-scroll-target"
              id="shipping-and-delivery"
            >
              <h5 className="terms-of-use-title">
                4. Shipping & Delivery
              </h5>
              <div className="terms-of-use-content">
                <p>
                  iShopping delivers products across Pakistan through trusted courier partners. Delivery timelines may vary depending on the customer’s location, product availability, holidays, or courier delays. Customers are advised to provide complete delivery details to avoid shipping issues. Once the order is dispatched, tracking details may be shared for customer convenience.
                </p>

              </div>
            </div>
            <div className="terms-of-use-item item-scroll-target" id="warranty-and-returns">
              <h5 className="terms-of-use-title">5. Warranty & Returns</h5>
              <div className="terms-of-use-content">
                <p>
                  Selected products may include official brand warranty or iShopping store warranty depending on the item category. Customers can request returns or exchanges for damaged, defective, or incorrect products within the specified return period. Products must be returned in original condition with packaging and proof of purchase. Physical damage or misuse may void warranty claims.
                </p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
